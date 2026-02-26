import { useState } from 'react';

import { useNavigate, useParams } from 'react-router';

import {
    Alert,
    Box,
    Button,
    CircularProgress,
    Paper,
    Snackbar,
    Stack,
    Typography,
} from '@mui/material';

import { ErrorSnackbar } from '@component';
import { PATHS } from '@constant';
import { useAcceptInviteMutation, useRejectInviteMutation } from '@service';
import { ErrorResponse } from '@type';

export const AcceptInviteContainer = () => {
    const { token } = useParams<{ token: string }>();
    const navigate = useNavigate();

    const [activeError, setActiveError] = useState<ErrorResponse | null>(null);
    const [successMessage, setSuccessMessage] = useState<string | null>(null);

    const [acceptInvite, { isLoading: isLoadingAccept }] =
        useAcceptInviteMutation();
    const [rejectInvite, { isLoading: isLoadingReject }] =
        useRejectInviteMutation();

    const handleAcceptance = async () => {
        if (!token) return;

        try {
            setActiveError(null);
            const response = await acceptInvite(token).unwrap();
            setSuccessMessage(response?.message || 'Successfully joined!');

            setTimeout(() => void navigate(PATHS.PROJECTS), 2000);
        } catch (err: unknown) {
            const errorObj = err as { data: ErrorResponse };
            if (errorObj.data) {
                setActiveError(errorObj.data);
            } else {
                setActiveError({
                    message: 'Invalid or expired invitation token.',
                    success: false,
                    errors: {},
                } as ErrorResponse);
            }
        }
    };

    const handleRejection = async () => {
        if (!token) return;

        try {
            setActiveError(null);
            const response = await rejectInvite(token).unwrap();
            setSuccessMessage(response?.message || 'Successfully joined!');
        } catch (err: unknown) {
            const errorObj = err as { data: ErrorResponse };
            if (errorObj.data) {
                setActiveError(errorObj.data);
            } else {
                setActiveError({
                    message: 'Invalid or expired invitation token.',
                    success: false,
                    errors: {},
                } as ErrorResponse);
            }
        }
    };

    return (
        <Stack
            alignItems="center"
            justifyContent="center"
            sx={{ minHeight: '60vh', p: 3 }}
        >
            <Paper
                variant="outlined"
                sx={{
                    p: 4,
                    maxWidth: 400,
                    textAlign: 'center',
                    borderRadius: 2,
                    bgcolor: 'background.paper',
                }}
            >
                {isLoadingAccept || isLoadingReject ? (
                    <Box sx={{ py: 2 }}>
                        <CircularProgress size={40} sx={{ mb: 2 }} />
                        <Typography variant="h6">
                            Processing Invitation
                        </Typography>
                    </Box>
                ) : successMessage ? (
                    <Box sx={{ py: 2 }}>
                        <Typography
                            variant="h6"
                            color="success.main"
                            gutterBottom
                        >
                            Success!
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                            {successMessage}
                        </Typography>
                    </Box>
                ) : (
                    <Box>
                        <Typography variant="h6" gutterBottom>
                            Do you want to accept the invite?
                        </Typography>
                        <Stack
                            direction="row"
                            spacing={2}
                            justifyContent="center"
                            sx={{ mt: 3 }}
                        >
                            <Button
                                variant="contained"
                                color="primary"
                                onClick={() => void handleAcceptance()}
                            >
                                Yes
                            </Button>
                            <Button
                                variant="outlined"
                                color="error"
                                onClick={() => void handleRejection()}
                            >
                                No
                            </Button>
                        </Stack>
                    </Box>
                )}
            </Paper>

            <ErrorSnackbar
                error={activeError}
                onClose={() => setActiveError(null)}
            />

            <Snackbar
                open={Boolean(successMessage)}
                autoHideDuration={4000}
                anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
            >
                <Alert
                    severity="success"
                    variant="filled"
                    onClose={() => setSuccessMessage(null)}
                    sx={{ width: '100%' }}
                >
                    {successMessage}
                </Alert>
            </Snackbar>
        </Stack>
    );
};
