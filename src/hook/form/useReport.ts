import { useMemo } from 'react';

import { useTheme } from '@mui/material';

import { getGraphColors, TicketPriority, TicketStatus } from '@constant';
import { TicketStatsData } from '@container';
import { FilterFormValues } from '@schema';
import {
    useGetProjectByIdQuery,
    useGetTicketReportsQuery,
    useGetUserByIdQuery,
} from '@service';

export const useReport = (
    projectId?: string,
    userId?: string,
    filters?: FilterFormValues,
) => {
    const theme = useTheme();
    const colors = getGraphColors(theme);

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

    return {
        data: transformedData,
        reportSubject,
        loading: reportsLoading || projectLoading || userLoading,
        isFetching: reportsFetching,
        error: reportsError || projectError || userError,
        priorityKeys: PRIORITY_KEYS,
    };
};
