import { CircularProgress } from '@mui/material';

import { LoadingWrapper } from './LoadingPage.style';

export const LoadingPage = () => (
    <LoadingWrapper>
        <CircularProgress size={100} />
    </LoadingWrapper>
);
