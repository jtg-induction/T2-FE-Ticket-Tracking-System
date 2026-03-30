import { useNavigate } from 'react-router';

import { Button, Stack, Typography } from '@mui/material';

import errorIllustration from '@assets/illustrations/error-404-illustration.webp';

import { StyledErrorContainer, StyledIllustration } from './ErrorPage.style';
import { ErrorPageProps } from './ErrorPage.types';

export const ErrorPage = ({ action, actionLabel, error }: ErrorPageProps) => {
    const navigate = useNavigate();
    return (
        <StyledErrorContainer>
            <Stack
                gap={4}
                alignItems="center"
                justifyContent="center"
                width="100%"
            >
                <StyledIllustration
                    component="img"
                    src={errorIllustration}
                    alt="Project illustration"
                />
                <Typography variant="h4" color="textSecondary" fontWeight={600}>
                    {error ? error : 'Something unexpected occured'}
                </Typography>
                <Button
                    variant="contained"
                    onClick={action ? action : () => void navigate('/')}
                >
                    {actionLabel ? actionLabel : 'Go back home'}
                </Button>
            </Stack>
        </StyledErrorContainer>
    );
};
