import { API_CONSTANTS } from '@constant';
import { FilterFormValues } from '@schema';
import { baseApi } from '@service';
import { EntityResponse } from '@type';
import { TicketStatsResponseData } from '@type';

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
            providesTags: ['Ticket'],
        }),
    }),
});

export const { useGetTicketReportsQuery } = reportsApi;
