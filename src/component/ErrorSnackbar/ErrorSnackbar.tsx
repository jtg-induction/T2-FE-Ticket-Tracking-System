import { Alert, Snackbar, Stack, Typography } from '@mui/material';

import type { ErrorSnackbarProps } from './ErrorSnackbar.types';

export const ErrorSnackbar = ({
    error,
    onClose,
    autoHideDuration = 4000,
}: ErrorSnackbarProps) => (
    <Snackbar
        open={Boolean(error)}
        autoHideDuration={autoHideDuration}
        onClose={onClose}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
        sx={{ border: 1, borderColor: 'error.light' }}
    >
        <Alert severity="error" onClose={onClose}>
            {error?.errors && Object.keys(error.errors).length > 0 ? (
                <Stack>
                    {Object.entries(error.errors).map(([field, messages]) => {
                        const messageList = Array.isArray(messages)
                            ? messages
                            : [messages];

                        return messageList.map((msg, idx) => (
                            <Typography
                                variant="subtitle2"
                                key={`${field}-${idx}`}
                            >
                                {msg}
                            </Typography>
                        ));
                    })}
                </Stack>
            ) : (
                <Typography variant="subtitle2">{error?.message}</Typography>
            )}
        </Alert>
    </Snackbar>
);
