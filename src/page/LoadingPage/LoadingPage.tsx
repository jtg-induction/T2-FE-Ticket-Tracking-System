import { CircularProgress } from '@mui/material';

import { StyledLoadingOverlay } from './LoadingPage.style';

export const LoadingPage = () => (
    <StyledLoadingOverlay role="status">
        <CircularProgress size={100} />
    </StyledLoadingOverlay>
);
