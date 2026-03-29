import { API_CONSTANTS, TicketPriority, TicketStatus } from '@constant';
import { FilterFormValues } from '@schema';
import { baseApi } from '@service';
import { EntityResponse, TicketStatsResponseData } from '@type';
import {
    StackedItem,
    TaskResponse,
    TaskStatusResponse,
} from '@type/report.types';

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
                    status_stats: Array<{
                        name: string;
                        count: number;
                        status_key: TicketStatus;
                    }>;
                    priority_stats: Array<{
                        name: string;
                        count: number;
                        priority_key: TicketPriority;
                    }>;
                    efficiency_stats: StackedItem[];
                    timeline_stats: StackedItem[];
                };
            }): EntityResponse<TicketStatsResponseData> => ({
                success: true,
                message: response.message,
                data: {
                    statusStats: response.data.status_stats.map((s) => ({
                        name: s.name,
                        count: s.count,
                        statusKey: s.status_key,
                    })),
                    priorityStats: response.data.priority_stats.map((p) => ({
                        name: p.name,
                        count: p.count,
                        priorityKey: p.priority_key,
                    })),
                    efficiencyStats: response.data.efficiency_stats,
                    timelineStats: response.data.timeline_stats,
                },
            }),
        }),

        generateTicketReport: builder.mutation<
            TaskResponse,
            { projectId?: string; userId?: string } & FilterFormValues
        >({
            query: ({ projectId, userId, userIds, startDate, endDate }) => {
                const params: Record<string, string | undefined> = {
                    project: projectId,
                    user: userId,
                };

                if (userIds?.length) params.users = userIds.join(',');
                if (startDate) params.start_date = startDate;
                if (endDate) params.end_date = endDate;

                return {
                    url: `${API_CONSTANTS.ENDPOINTS.REPORTS}download/generate/`,
                    method: 'GET',
                    params,
                };
            },
            transformResponse: (response: EntityResponse<TaskResponse>) =>
                response.data,
        }),

        getReportTaskStatus: builder.query<TaskStatusResponse, string>({
            query: (taskId) => ({
                url: `${API_CONSTANTS.ENDPOINTS.REPORTS}download/${taskId}/status/`,
            }),
            providesTags: [],
            transformResponse: (response: EntityResponse<TaskStatusResponse>) =>
                response.data,
        }),

        downloadReport: builder.query<Blob, string>({
            query: (filename) => ({
                url: `${API_CONSTANTS.ENDPOINTS.REPORTS}download/fetch/${filename}/`,
                method: 'GET',

                responseHandler: (response) => response.blob(),
            }),
        }),
    }),
});

export const {
    useGetTicketReportsQuery,
    useGenerateTicketReportMutation,
    useLazyGetReportTaskStatusQuery,
    useLazyDownloadReportQuery,
} = reportsApi;
