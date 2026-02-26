import { Alert, AlertTitle, Box, Snackbar, Typography } from '@mui/material';

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
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
    >
        <Alert
            severity="error"
            variant="filled"
            onClose={onClose}
            sx={{ width: '100%', textAlign: 'left' }}
        >
            <AlertTitle>Action Failed</AlertTitle>
            <Box>
                <Typography variant="body2" fontWeight="bold">
                    {error?.message || 'An unexpected error occurred.'}
                </Typography>

                {error?.errors && Object.keys(error.errors).length > 0 && (
                    <Box component="ul" sx={{ mt: 1, pl: 2, mb: 0 }}>
                        {Object.entries(error.errors).map(([field, messages]) =>
                            messages.map((msg, idx) => (
                                <li key={`${field}-${idx}`}>
                                    <Typography variant="caption">
                                        <strong>{field}:</strong> {msg}
                                    </Typography>
                                </li>
                            )),
                        )}
                    </Box>
                )}
            </Box>
        </Alert>
    </Snackbar>
);
