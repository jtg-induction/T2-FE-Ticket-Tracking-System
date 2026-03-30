import { Button, Stack, Typography } from '@mui/material';

import errorIllustration from '@assets/illustrations/error-illustration.webp';

import { StyledErrorOverlay, StyledIllustration } from './ErrorOverlay.style';
import { ErrorOverlayProps } from './ErrorOverlay.types';

export const ErrorOverlay = ({
    action,
    actionLabel,
    error,
}: ErrorOverlayProps) => (
    <StyledErrorOverlay>
        <Stack gap={4} alignItems="center" justifyContent="center" width="100%">
            <StyledIllustration
                component="img"
                src={errorIllustration}
                alt="Project illustration"
            />
            {error && (
                <Typography variant="h5" color="textSecondary" fontWeight={600}>
                    {error}
                </Typography>
            )}
            {actionLabel && (
                <Button variant="contained" onClick={action}>
                    {actionLabel}
                </Button>
            )}
        </Stack>
    </StyledErrorOverlay>
);
