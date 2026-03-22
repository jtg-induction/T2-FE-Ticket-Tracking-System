import { API_CONSTANTS } from '@constant';
import { baseApi } from '@service';
import {
    Comment,
    CommentInput,
    EntityResponse,
    ErrorResponse,
    PaginatedResponse,
} from '@type';

export const commentApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        getTicketComments: builder.query<
            PaginatedResponse<Comment>,
            { ticketId: string; cursor?: string | null; pageSize?: number }
        >({
            query: ({ ticketId, cursor, pageSize }) => ({
                url: `${API_CONSTANTS.ENDPOINTS.TICKET}${ticketId}/comment/`,
                params: {
                    cursor: cursor || undefined,
                    page_size: pageSize,
                },
            }),
            serializeQueryArgs: ({ endpointName, queryArgs }) => `${endpointName}-${queryArgs.ticketId}`,
            merge: (currentCache, newItems, { arg }) => {
                if (!arg.cursor) {
                    return newItems;
                }
                return {
                    ...newItems,
                    data: [...currentCache.data, ...newItems.data],
                };
            },
            forceRefetch({ currentArg, previousArg }) {
                return currentArg !== previousArg;
            },
            providesTags: (result, _error, { ticketId }) => [
                { type: 'Comment', id: `LIST-${ticketId}` },
                ...(result?.data?.map(({ id }) => ({
                    type: 'Comment' as const,
                    id,
                })) || []),
            ],
        }),

        createComment: builder.mutation<
            EntityResponse<Comment>,
            { ticketId: string; body: CommentInput }
        >({
            query: ({ ticketId, body }) => ({
                url: `${API_CONSTANTS.ENDPOINTS.TICKET}${ticketId}/comment/`,
                method: API_CONSTANTS.METHODS.POST,
                body,
            }),
            invalidatesTags: (_result, _error, { ticketId }) => [
                { type: 'Comment', id: `LIST-${ticketId}` },
            ],
        }),

        updateComment: builder.mutation<
            EntityResponse<Comment>,
            { ticketId: string; commentId: string; body: Partial<CommentInput> }
        >({
            query: ({ ticketId, commentId, body }) => ({
                url: `${API_CONSTANTS.ENDPOINTS.TICKET}${ticketId}/comment/${commentId}/`,
                method: API_CONSTANTS.METHODS.PATCH,
                body,
            }),
            invalidatesTags: (_result, _error, { commentId, ticketId }) => [
                { type: 'Comment', id: commentId },
                { type: 'Comment', id: `LIST-${ticketId}` },
            ],
        }),

        deleteComment: builder.mutation<
            EntityResponse<null> | ErrorResponse,
            { ticketId: string; commentId: string }
        >({
            query: ({ ticketId, commentId }) => ({
                url: `${API_CONSTANTS.ENDPOINTS.TICKET}${ticketId}/comment/${commentId}/`,
                method: API_CONSTANTS.METHODS.DELETE,
            }),
            invalidatesTags: (_result, _error, { ticketId }) => [
                { type: 'Comment', id: `LIST-${ticketId}` },
            ],
        }),
    }),
});

export const {
    useGetTicketCommentsQuery,
    useCreateCommentMutation,
    useUpdateCommentMutation,
    useDeleteCommentMutation,
} = commentApi;
