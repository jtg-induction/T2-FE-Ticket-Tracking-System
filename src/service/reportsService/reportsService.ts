import { API_CONSTANTS } from '@constant';
import { FilterFormValues } from '@schema';
import { baseApi } from '@service';
import { EntityResponse } from '@type';
import { TicketStatsResponseData } from '@type';
import { DonutItem, StackedItem } from '@type/report.types';

export const reportsApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        getTicketReports: builder.query<
            EntityResponse<TicketStatsResponseData>,
            { projectId?: string; userId?: string } & FilterFormValues
        >({
            query: ({ projectId, userId, userIds, startDate, endDate }) => {
                const params: Record<string, string | undefined> = {
                    project: projectId,
                    user: userId,
                };

                if (userIds && userIds.length > 0) {
                    params.users = userIds.join(',');
                }

                if (startDate) params.start_date = startDate;
                if (endDate) params.end_date = endDate;

                return {
                    url: API_CONSTANTS.ENDPOINTS.REPORTS,
                    params,
                };
            },

            transformResponse: (response: {
                success: boolean;
                message: string;
                data: {
                    status_stats: DonutItem[];
                    priority_stats: DonutItem[];
                    efficiency_stats: StackedItem[];
                    timeline_stats: StackedItem[];
                };
            }): EntityResponse<TicketStatsResponseData> => ({
                success: true,
                message: response.message,
                data: {
                    statusStats: response.data.status_stats.map((s: any) => ({
                        name: s.name,
                        count: s.count,
                        statusKey: s.status_key,
                    })),
                    priorityStats: response.data.priority_stats.map(
                        (p: any) => ({
                            name: p.name,
                            count: p.count,
                            priorityKey: p.priority_key,
                        }),
                    ),
                    efficiencyStats: response.data.efficiency_stats,
                    timelineStats: response.data.timeline_stats,
                },
            }),
        }),

        downloadTicketReport: builder.query<
            void,
            { projectId?: string; userId?: string } & FilterFormValues
        >({
            query: ({ projectId, userId, userIds, startDate, endDate }) => {
                const params: Record<string, string | undefined> = {
                    project: projectId,
                    user: userId,
                };

                if (userIds && userIds.length > 0) {
                    params.users = userIds.join(',');
                }

                if (startDate) params.start_date = startDate;
                if (endDate) params.end_date = endDate;

                return {
                    url: `${API_CONSTANTS.ENDPOINTS.REPORTS}download/`,
                    params,
                    responseHandler: async (response) => {
                        const blob = await response.blob();
                        const url = window.URL.createObjectURL(blob);
                        const link = document.createElement('a');
                        link.href = url;

                        const filename = `Ticket_Report_${new Date().toISOString().split('T')[0]}.pdf`;
                        link.setAttribute('download', filename);

                        document.body.appendChild(link);
                        link.click();

                        link.parentNode?.removeChild(link);
                        window.URL.revokeObjectURL(url);
                    },
                    cache: 'no-cache',
                };
            },
        }),
    }),
});

export const { useGetTicketReportsQuery, useLazyDownloadTicketReportQuery } =
    reportsApi;
