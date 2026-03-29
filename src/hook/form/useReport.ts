import { useCallback, useEffect, useMemo, useRef, useState } from 'react';

import { useTheme } from '@mui/material';

import { getGraphColors, TicketPriority, TicketStatus } from '@constant';
import { TicketStatsData } from '@container';
import { FilterFormValues } from '@schema';
import {
    useGenerateTicketReportMutation,
    useGetProjectByIdQuery,
    useGetTicketReportsQuery,
    useGetUserByIdQuery,
    useLazyDownloadReportQuery,
    useLazyGetReportTaskStatusQuery,
} from '@service';
import { ErrorResponse } from '@type/standard.types';

export const useReport = (
    projectId?: string,
    userId?: string,
    filters?: FilterFormValues,
) => {
    const theme = useTheme();
    const colors = getGraphColors(theme);
    const [downloadError, setDownloadError] = useState<ErrorResponse | null>(
        null,
    );
    const pollingRef = useRef<ReturnType<typeof setInterval> | null>(null);

    const {
        data: response,
        isLoading: reportsLoading,
        error: reportsError,
        isFetching: reportsFetching,
    } = useGetTicketReportsQuery({
        projectId,
        userId,
        userIds: filters?.userIds || [],
        startDate: filters?.startDate || '',
        endDate: filters?.endDate || '',
    });

    const {
        data: projectRes,
        isLoading: projectLoading,
        error: projectError,
    } = useGetProjectByIdQuery(projectId!, { skip: !projectId || !!userId });

    const {
        data: userRes,
        isLoading: userLoading,
        error: userError,
    } = useGetUserByIdQuery(userId!, { skip: !userId });

    const [generateReport, { isLoading: isStarting }] =
        useGenerateTicketReportMutation();
    const [checkStatus, { isFetching: isPolling }] =
        useLazyGetReportTaskStatusQuery();

    const clearPolling = useCallback(() => {
        if (pollingRef.current) {
            clearInterval(pollingRef.current);
            pollingRef.current = null;
        }
    }, []);

    useEffect(() => () => clearPolling(), [clearPolling]);

    const PRIORITY_KEYS = useMemo(
        () => [
            TicketPriority.Lowest,
            TicketPriority.Low,
            TicketPriority.Medium,
            TicketPriority.High,
            TicketPriority.Highest,
        ],
        [],
    );

    const reportSubject = useMemo(() => {
        if (userId && userRes?.data) {
            return {
                type: 'User',
                name: `${userRes.data.first_name} ${userRes.data.last_name}`,
                details: userRes.data.role,
            };
        }
        if (projectId && projectRes?.data) {
            return {
                type: 'Project',
                name: projectRes.data.title,
                details: projectRes.data.jira_project_key,
            };
        }
        return null;
    }, [userRes, projectRes, userId, projectId]);

    const transformedData = useMemo((): TicketStatsData | null => {
        if (!response?.data) return null;
        const raw = response.data;

        return {
            statusData: raw.statusStats.map((item) => ({
                name: item.name,
                value: item.count,
                fill: colors.status[item.statusKey as TicketStatus],
            })),
            priorityData: raw.priorityStats.map((item) => ({
                name: item.name,
                value: item.count,
                fill: colors.priority[item.priorityKey as TicketPriority],
            })),
            deadlineData: raw.timelineStats,
            successFailureData: raw.efficiencyStats,
            totalStatus: raw.statusStats.reduce(
                (acc, curr) => acc + curr.count,
                0,
            ),
            totalPriority: raw.priorityStats.reduce(
                (acc, curr) => acc + curr.count,
                0,
            ),
            priorityColors: colors.priority,
            statusColors: colors.status,
        };
    }, [response, colors]);

    const [triggerDownload] = useLazyDownloadReportQuery();

    const handleDownload = async (exportFilters: FilterFormValues) => {
        setDownloadError(null);
        clearPolling();

        try {
            const taskResponse = await generateReport({
                projectId,
                userId,
                userIds: exportFilters.userIds,
                startDate: exportFilters.startDate,
                endDate: exportFilters.endDate,
            }).unwrap();

            const taskId = taskResponse.task_id;
            if (!taskId) throw new Error('Task ID not found');

            const pollStatus = async () => {
                try {
                    const statusResult = await checkStatus(taskId).unwrap();

                    if (
                        statusResult.status === 'SUCCESS' &&
                        statusResult.download_url
                    ) {
                        clearPolling();

                        const filename = statusResult.download_url
                            .split('/')
                            .filter(Boolean)
                            .pop();

                        if (!filename)
                            throw new Error('Could not parse filename');

                        const blob = await triggerDownload(filename).unwrap();

                        const blobUrl = window.URL.createObjectURL(blob);
                        const link = document.createElement('a');
                        link.href = blobUrl;
                        link.setAttribute('download', filename);
                        document.body.appendChild(link);
                        link.click();

                        link.remove();
                        window.URL.revokeObjectURL(blobUrl);
                    } else if (statusResult.status === 'FAILURE') {
                        clearPolling();
                        setDownloadError({
                            message: 'Server failed to generate report',
                        } as ErrorResponse);
                    }
                } catch (err) {
                    clearPolling();
                    setDownloadError(err as ErrorResponse);
                }
            };

            void pollStatus();

            pollingRef.current = setInterval(() => {
                void pollStatus();
            }, 2000);
        } catch (err) {
            setDownloadError(err as ErrorResponse);
        }
    };

    return {
        data: transformedData,
        reportSubject,
        loading: reportsLoading || projectLoading || userLoading,
        isFetching: reportsFetching,
        error: reportsError || projectError || userError,
        priorityKeys: PRIORITY_KEYS,
        handleDownload,
        isDownloading: isStarting || isPolling,
        downloadError,
        clearDownloadError: () => setDownloadError(null),
    };
};
