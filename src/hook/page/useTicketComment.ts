import { useEffect, useState } from 'react';

import {
    useCreateCommentMutation,
    useDeleteCommentMutation,
    useGetTicketCommentsQuery,
} from '@service';
import { ErrorResponse } from '@type';

export const useTicketComments = (ticketId: string) => {
    const [actionError, setActionError] = useState<ErrorResponse | null>(null);
    const [cursor, setCursor] = useState<string | null>(null);

    const {
        data: response,
        isLoading,
        isFetching,
        error: fetchError,
    } = useGetTicketCommentsQuery({ ticketId, cursor }, { skip: !ticketId });

    const [createComment, { isLoading: isCreating, error: createError }] =
        useCreateCommentMutation();
    const [deleteComment, { isLoading: isDeleting, error: deleteError }] =
        useDeleteCommentMutation();

    const handleLoadMore = () => {
        const nextUrl = response?.meta?.next;
        if (nextUrl) {
            const url = new URL(nextUrl);
            const nextCursor = url.searchParams.get('cursor');
            setCursor(nextCursor);
        }
    };

    useEffect(() => {
        const error = createError || deleteError;
        if (!error) return;

        if ('data' in error) {
            const serverError = error.data as ErrorResponse;
            setActionError(serverError);
        } else {
            setActionError({
                success: false,
                message: error.message || 'An error occurred.',
            });
        }
    }, [createError, deleteError]);

    const handleCreateComment = async (message: string) => {
        if (!ticketId) return;
        return await createComment({ ticketId, body: { message } }).unwrap();
    };

    const handleDeleteComment = async (commentId: string) => {
        if (!ticketId || !window.confirm('Delete this comment?')) return;
        try {
            await deleteComment({ ticketId, commentId }).unwrap();
        } catch {
            /* useEffect handles the Snackbar */
        }
    };

    return {
        comments: response?.data ?? [],
        hasMore: !!response?.meta?.next,
        isLoading,
        isFetching,
        fetchError,
        actionError,
        isCreating,
        isDeleting,
        handleLoadMore,
        handleCreateComment,
        handleDeleteComment,
        clearActionError: () => setActionError(null),
    };
};
