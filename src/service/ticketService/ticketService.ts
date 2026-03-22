import { API_CONSTANTS } from '@constant';
import { baseApi } from '@service';
import {
    CreateTicketInput,
    EntityResponse,
    ErrorResponse,
    PaginatedResponse,
    Ticket,
} from '@type';

export const ticketApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        getProjectTickets: builder.query<
            PaginatedResponse<Ticket>,
            {
                projectId: string;
                page: number;
                pageSize: number;
                status?: string;
            }
        >({
            query: ({ projectId, page, pageSize, status }) => ({
                url: `${API_CONSTANTS.ENDPOINTS.PROJECT}${projectId}/ticket/`,
                params: {
                    page,
                    page_size: pageSize,
                    ...(status && { status }),
                },
            }),
            providesTags: (result, _error, { projectId }) =>
                result?.success && Array.isArray(result.data)
                    ? [
                          ...result.data.map(({ id }) => ({
                              type: 'Ticket' as const,
                              id,
                          })),
                          { type: 'Ticket', id: `LIST-${projectId}` },
                      ]
                    : [{ type: 'Ticket', id: `LIST-${projectId}` }],
        }),

        createTicket: builder.mutation<
            EntityResponse<Ticket>,
            { projectId: string; body: CreateTicketInput }
        >({
            query: ({ projectId, body }) => ({
                url: `${API_CONSTANTS.ENDPOINTS.PROJECT}${projectId}/ticket/`,
                method: API_CONSTANTS.METHODS.POST,
                body,
            }),
            invalidatesTags: (_result, _error, { projectId }) => [
                { type: 'Ticket', id: `LIST-${projectId}` },
            ],
        }),

        getTicketById: builder.query<
            EntityResponse<Ticket>,
            { projectId: string; ticketId: string }
        >({
            query: ({ projectId, ticketId }) => ({
                url: `${API_CONSTANTS.ENDPOINTS.PROJECT}${projectId}/ticket/${ticketId}/`,
            }),
            providesTags: (result, _error, { ticketId }) =>
                result?.success ? [{ type: 'Ticket', id: ticketId }] : [],
        }),

        updateTicket: builder.mutation<
            EntityResponse<Ticket>,
            {
                projectId: string;
                ticketId: string;
                body: Partial<CreateTicketInput>;
            }
        >({
            query: ({ projectId, ticketId, body }) => ({
                url: `${API_CONSTANTS.ENDPOINTS.PROJECT}${projectId}/ticket/${ticketId}/`,
                method: API_CONSTANTS.METHODS.PATCH,
                body,
            }),
            invalidatesTags: (_result, _error, { ticketId, projectId }) => [
                { type: 'Ticket', id: ticketId },
                { type: 'Ticket', id: `LIST-${projectId}` },
            ],
        }),

        getMyTickets: builder.query<
            PaginatedResponse<Ticket>,
            { page: number; pageSize: number }
        >({
            query: ({ page, pageSize }) => ({
                url: `${API_CONSTANTS.ENDPOINTS.TICKET}`,
                params: { page, pageSize },
            }),
            providesTags: (result) =>
                result?.success && Array.isArray(result.data)
                    ? [
                          ...result.data.map(({ id }) => ({
                              type: 'Ticket' as const,
                              id,
                          })),
                          { type: 'Ticket', id: 'MY-LIST' },
                      ]
                    : [{ type: 'Ticket', id: 'MY-LIST' }],
        }),

        deleteTicket: builder.mutation<
            EntityResponse<null> | ErrorResponse,
            { projectId: string; ticketId: string }
        >({
            query: ({ projectId, ticketId }) => ({
                url: `${API_CONSTANTS.ENDPOINTS.PROJECT}${projectId}/ticket/${ticketId}/`,
                method: API_CONSTANTS.METHODS.DELETE,
            }),
            invalidatesTags: (_result, _error, { projectId }) => [
                { type: 'Ticket', id: `LIST-${projectId}` },
            ],
        }),

        searchTicketsJql: builder.query<
            PaginatedResponse<Ticket>,
            {
                projectId: string;
                query: string;
                max_results: number;
                cursor?: string;
            }
        >({
            query: ({ projectId, query, max_results, cursor }) => ({
                url: `${API_CONSTANTS.ENDPOINTS.PROJECT}${projectId}/jql/ticket/`,
                params: {
                    q: query,
                    max_results,
                    ...(cursor && { cursor }),
                },
            }),
            serializeQueryArgs: ({ queryArgs }) => `jql-search-${queryArgs.projectId}-${queryArgs.query}`,
            forceRefetch({ currentArg, previousArg }) {
                return (
                    currentArg?.cursor !== previousArg?.cursor ||
                    currentArg?.query !== previousArg?.query
                );
            },
            merge: (currentCache, newItems) => {
                if (newItems.data) {
                    if (!currentCache.data) currentCache.data = [];

                    const existingIds = new Set(
                        currentCache.data.map((t) => t.jira_id),
                    );
                    const uniqueTickets = newItems.data.filter(
                        (t) => !existingIds.has(t.jira_id),
                    );

                    currentCache.data.push(...uniqueTickets);
                    currentCache.meta = newItems.meta;
                }
            },
        }),

        importJiraTicket: builder.mutation<
            EntityResponse<Ticket>,
            { projectId: string; jira_id: string }
        >({
            query: ({ projectId, jira_id }) => ({
                url: `${API_CONSTANTS.ENDPOINTS.PROJECT}${projectId}/jql/ticket/`,
                method: API_CONSTANTS.METHODS.POST,
                body: { jira_id },
            }),
            async onQueryStarted({ projectId }, { dispatch, queryFulfilled }) {
                try {
                    await queryFulfilled;
                    dispatch(
                        ticketApi.util.invalidateTags([
                            { type: 'Ticket', id: `LIST-${projectId}` },
                        ]),
                    );
                } catch {}
            },
        }),
    }),
});

export const {
    useGetProjectTicketsQuery,
    useCreateTicketMutation,
    useGetMyTicketsQuery,
    useGetTicketByIdQuery,
    useUpdateTicketMutation,
    useDeleteTicketMutation,
    useSearchTicketsJqlQuery,
    useImportJiraTicketMutation,
} = ticketApi;
