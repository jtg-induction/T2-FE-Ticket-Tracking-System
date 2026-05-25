import { Outlet } from 'react-router';

import { LoadingOverlay } from '@component';
import { useAppSelector } from '@hook';

import { StyledLayoutRoot } from './RootLayout.style';

export const RootLayout = () => {
    const { isLoading } = useAppSelector((state) => state.auth);
    if (isLoading) return <LoadingOverlay />;
    return (
        <StyledLayoutRoot maxWidth="xl" disableGutters>
            <Outlet />
        </StyledLayoutRoot>
    );
};
