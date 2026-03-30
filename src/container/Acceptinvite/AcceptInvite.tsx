import { useEffect, useRef, useState } from 'react';

import { useNavigate, useParams } from 'react-router';

import {
    Alert,
    Button,
    CircularProgress,
    Snackbar,
    Stack,
    Typography,
} from '@mui/material';

import { ErrorSnackbar } from '@component';
import { PATHS } from '@constant';
import { useAcceptInviteMutation, useRejectInviteMutation } from '@service';
import { ErrorResponse } from '@type';

import {
    StyledActionArea,
    StyledInviteCard,
    StyledInviteRoot,
} from './AcceptInvite.style';
import { InviteAction } from './AcceptInvite.types';

export const AcceptInvite = () => {
    const { token } = useParams<{ token: string }>();
    const navigate = useNavigate();
    const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

    const [activeError, setActiveError] = useState<ErrorResponse | null>(null);
    const [successMessage, setSuccessMessage] = useState<string | null>(null);

    const [acceptInvite, { isLoading: isLoadingAccept }] =
        useAcceptInviteMutation();
    const [rejectInvite, { isLoading: isLoadingReject }] =
        useRejectInviteMutation();

    useEffect(
        () => () => {
            if (timeoutRef.current) clearTimeout(timeoutRef.current);
        },
        [],
    );

    const handleError = (err: unknown) => {
        const errorObj = err as ErrorResponse;
        setActiveError({
            message: errorObj?.message || 'An unexpected error occurred.',
            success: false,
        });
    };

    const handleAction = async (action: InviteAction) => {
        if (!token) return;

        try {
            setActiveError(null);

            const response =
                action === InviteAction.ACCEPT
                    ? await acceptInvite(token).unwrap()
                    : await rejectInvite(token).unwrap();

            const message =
                response?.message ||
                (action === InviteAction.ACCEPT
                    ? 'Successfully joined the project!'
                    : 'Invitation declined successfully.');
            setSuccessMessage(message);

            timeoutRef.current = setTimeout(() => {
                void navigate(PATHS.PROJECTS);
            }, 2000);
        } catch (err: unknown) {
            handleError(err);
        }
    };

    const isProcessing = isLoadingAccept || isLoadingReject;

    return (
        <StyledInviteRoot>
            <StyledInviteCard variant="outlined">
                {isProcessing ? (
                    <StyledActionArea>
                        <CircularProgress size={40} sx={{ mb: 2 }} />
                        <Typography variant="h6">
                            {isLoadingAccept
                                ? 'Accepting Invitation...'
                                : 'Rejecting Invitation...'}
                        </Typography>
                    </StyledActionArea>
                ) : successMessage ? (
                    <StyledActionArea>
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
                        <Typography display="block" mt={2} variant="caption">
                            Redirecting to projects...
                        </Typography>
                    </StyledActionArea>
                ) : (
                    <StyledActionArea>
                        <Typography variant="h6" gutterBottom>
                            Do you want to accept the invite?
                        </Typography>
                        <Stack
                            direction="row"
                            spacing={2}
                            justifyContent="center"
                            mt={3}
                        >
                            <Button
                                variant="contained"
                                disabled={isProcessing}
                                onClick={() =>
                                    void handleAction(InviteAction.ACCEPT)
                                }
                            >
                                Yes
                            </Button>
                            <Button
                                variant="outlined"
                                color="error"
                                disabled={isProcessing}
                                onClick={() =>
                                    void handleAction(InviteAction.REJECT)
                                }
                            >
                                No
                            </Button>
                        </Stack>
                    </StyledActionArea>
                )}
            </StyledInviteCard>

            <ErrorSnackbar
                error={activeError}
                onClose={() => setActiveError(null)}
            />

            <Snackbar
                open={Boolean(successMessage)}
                autoHideDuration={4000}
                onClose={() => setSuccessMessage(null)}
                anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
            >
                <Alert
                    severity="success"
                    variant="filled"
                    sx={{ width: '100%' }}
                >
                    {successMessage}
                </Alert>
            </Snackbar>
        </StyledInviteRoot>
    );
};
