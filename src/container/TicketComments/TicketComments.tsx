import { useParams } from 'react-router';

import {
    Alert,
    Box,
    Button,
    CircularProgress,
    Divider,
    Paper,
    Stack,
    Typography,
} from '@mui/material';

import { CommentInput, CommentItem, ErrorSnackbar } from '@component';
import { DIMENSIONS } from '@constant';
import { useTicketComments } from '@hook';

export const TicketComments = () => {
    const { ticketId = '' } = useParams<{ ticketId: string }>();
    const {
        comments,
        hasMore,
        isLoading,
        isFetching,
        fetchError,
        actionError,
        isCreating,
        isDeleting,
        handleLoadMore,
        handleCreateComment,
        handleDeleteComment,
        clearActionError,
    } = useTicketComments(ticketId);

    if (fetchError) {
        return (
            <Box p={2}>
                <Alert severity="error">Failed to load comments.</Alert>
            </Box>
        );
    }

    if (isLoading) {
        return (
            <Box display="flex" justifyContent="center" p={4}>
                <CircularProgress size={24} />
            </Box>
        );
    }

    return (
        <Stack
            flex={1}
            component={Paper}
            height={`calc(100vh - ${DIMENSIONS.HEADER_HEIGHT + 48}px)`}
            minHeight={500}
            padding={4}
            direction="column"
            overflow="hidden"
        >
            <Typography variant="h6" fontWeight={700} gutterBottom>
                Comments
            </Typography>
            <Divider sx={{ mb: 3 }} />

            <Stack flex={1} mb={2} spacing={2} sx={{ overflowY: 'auto' }}>
                {isDeleting ? (
                    <Box
                        display="flex"
                        flexDirection="column"
                        alignItems="center"
                        justifyContent="center"
                        flex={1}
                    >
                        <CircularProgress size={32} />
                        <Typography
                            variant="caption"
                            sx={{ mt: 1 }}
                            color="textSecondary"
                        >
                            Loading...
                        </Typography>
                    </Box>
                ) : (
                    <>
                        {hasMore && (
                            <Box display="flex" justifyContent="center">
                                <Button
                                    variant="outlined"
                                    size="small"
                                    onClick={() => handleLoadMore()}
                                    disabled={isFetching}
                                    startIcon={
                                        isFetching ? (
                                            <CircularProgress size={16} />
                                        ) : null
                                    }
                                >
                                    {isFetching
                                        ? 'Loading older comments...'
                                        : 'Load More'}
                                </Button>
                            </Box>
                        )}

                        {comments.map((comment) => (
                            <CommentItem
                                key={comment.id}
                                comment={comment}
                                ticketId={ticketId}
                                onDelete={() =>
                                    void handleDeleteComment(comment.id)
                                }
                            />
                        ))}

                        {comments.length === 0 && (
                            <Typography
                                variant="body2"
                                color="textSecondary"
                                align="center"
                                fontStyle="italic"
                            >
                                No comments yet.
                            </Typography>
                        )}
                    </>
                )}
            </Stack>

            <Stack borderTop="1px solid" borderColor="divider" pt={2}>
                <Typography variant="subtitle2" fontWeight={700} mb={1}>
                    Leave a comment
                </Typography>
                <CommentInput
                    onSubmit={handleCreateComment}
                    isSubmitting={isCreating}
                />
            </Stack>

            <ErrorSnackbar error={actionError} onClose={clearActionError} />
        </Stack>
    );
};
