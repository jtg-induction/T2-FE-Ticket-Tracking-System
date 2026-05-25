import { useParams } from 'react-router';

import {
    Box,
    Button,
    CircularProgress,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    Divider,
    Paper,
    Stack,
    Typography,
} from '@mui/material';

import {
    CommentInput,
    CommentItem,
    ErrorOverlay,
    ErrorSnackbar,
    LoadingOverlay,
} from '@component';
import { useTicketComments } from '@hook';

export const TicketComments = () => {
    const { ticketId = '' } = useParams<{ ticketId: string }>();
    const {
        comments,
        hasMore,
        isLoading,
        isFetching,
        fetchError,
        refetch,
        actionError,
        isCreating,
        isDeleting,
        handleLoadMore,
        handleCreateComment,
        handleDeleteComment,
        clearActionError,
        pendingDeleteId,
        setPendingDeleteId,
    } = useTicketComments(ticketId);

    return (
        <Stack
            position="relative"
            component={Paper}
            height="100%"
            minWidth={500}
            padding={4}
            direction="column"
            overflow="hidden"
        >
            {(isLoading || isFetching) && <LoadingOverlay size={60} />}
            {fetchError && (
                <ErrorOverlay
                    actionLabel="Retry"
                    action={refetch}
                    error="Failed to load comments"
                />
            )}
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
                            mt={1}
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
                                onDelete={() => setPendingDeleteId(comment.id)}
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

            <Dialog
                open={!!pendingDeleteId}
                onClose={() => setPendingDeleteId(null)}
            >
                <DialogTitle>Delete Comment</DialogTitle>
                <DialogContent>
                    <Typography>
                        Are you sure you want to delete this comment?
                    </Typography>
                </DialogContent>
                <DialogActions sx={{ p: 3 }}>
                    <Button onClick={() => setPendingDeleteId(null)}>
                        Cancel
                    </Button>
                    <Button
                        color="error"
                        variant="contained"
                        disabled={isDeleting}
                        onClick={() => void handleDeleteComment()}
                    >
                        {isDeleting ? (
                            <CircularProgress size={20} color="inherit" />
                        ) : (
                            'Delete'
                        )}
                    </Button>
                </DialogActions>
            </Dialog>

            <ErrorSnackbar error={actionError} onClose={clearActionError} />
        </Stack>
    );
};
