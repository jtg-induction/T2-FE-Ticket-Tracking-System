import { useMemo } from 'react';

import { useTheme } from '@mui/material';

import { getGraphColors } from '@constant';
import { TicketStatsData } from '@container';
import { FilterFormValues } from '@schema';
import { useGetTicketReportsQuery } from '@service';
import { TicketPriority, TicketStatus } from '@type';

export const useReport = (
    projectId?: string,
    userId?: string,
    filters?: FilterFormValues,
) => {
    const theme = useTheme();
    const colors = getGraphColors(theme);

    const {
        data: response,
        isLoading: loading,
        error,
    } = useGetTicketReportsQuery({
        projectId,
        userId,
        userIds: filters?.userIds || [],
        startDate: filters?.startDate || '',
        endDate: filters?.endDate || '',
    });

    const PRIORITY_KEYS = useMemo(
        () => [
            TicketPriority.Highest,
            TicketPriority.High,
            TicketPriority.Medium,
            TicketPriority.Low,
            TicketPriority.Lowest,
        ],
        [],
    );

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
    }, [response]);

    return {
        data: transformedData,
        loading,
        priorityKeys: PRIORITY_KEYS,
        error,
    };
};
