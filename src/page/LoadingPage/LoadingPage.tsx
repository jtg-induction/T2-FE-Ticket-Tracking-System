import { CircularProgress } from '@mui/material';

import { LoadingWrapper } from './loadingPage.style';

export const LoadingPage = () => (
    <LoadingWrapper>
        <CircularProgress size={100} />
    </LoadingWrapper>
);
