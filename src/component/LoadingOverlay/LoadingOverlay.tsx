import { CircularProgress } from '@mui/material';

import { StyledLoadingOverlay } from './LoadingOverlay.style';

export const LoadingOverlay = () => (
    <StyledLoadingOverlay>
        <CircularProgress size={100} />
    </StyledLoadingOverlay>
);
