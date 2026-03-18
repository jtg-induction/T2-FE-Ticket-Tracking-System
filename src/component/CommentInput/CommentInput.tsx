import { useState } from 'react';

import { Box, Button, CircularProgress, Stack } from '@mui/material';

import { RichTextEditor } from '@component';

import { CommentInputProps } from './CommentInput.type';

export const CommentInput = ({ onSubmit, isSubmitting }: CommentInputProps) => {
    const [message, setMessage] = useState('');

    const handlePost = async () => {
        const trimmedMessage = message.trim();
        if (!trimmedMessage || isSubmitting) return;

        try {
            await onSubmit(trimmedMessage);
            setMessage('');
        } catch {}
    };

    return (
        <Box sx={{ mt: 2 }}>
            <RichTextEditor
                value={message}
                onChange={setMessage}
                placeholder="Add a comment..."
            />
            <Stack direction="row" justifyContent="flex-end" sx={{ mt: 1 }}>
                <Button
                    variant="contained"
                    size="small"
                    disabled={isSubmitting || !message.trim()}
                    onClick={() => void handlePost()}
                    startIcon={
                        isSubmitting && (
                            <CircularProgress size={16} color="inherit" />
                        )
                    }
                >
                    {isSubmitting ? 'Posting...' : 'Comment'}
                </Button>
            </Stack>
        </Box>
    );
};
