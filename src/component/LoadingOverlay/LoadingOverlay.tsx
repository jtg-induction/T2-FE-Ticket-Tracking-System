import { CircularProgress } from '@mui/material';

import { StyledLoadingOverlay } from './LoadingOverlay.style';

export const LoadingOverlay = ({ size }: { size?: number }) => (
    <StyledLoadingOverlay>
        <CircularProgress size={size ? size : 100} />
    </StyledLoadingOverlay>
);
