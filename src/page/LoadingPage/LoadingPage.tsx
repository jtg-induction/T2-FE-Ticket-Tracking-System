import { CircularProgress } from '@mui/material';

import { StyledLoadingOverlay } from './LoadingPage.style';

export const LoadingPage = () => (
    <StyledLoadingOverlay>
        <CircularProgress size={100} />
    </StyledLoadingOverlay>
);
