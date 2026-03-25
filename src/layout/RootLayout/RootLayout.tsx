import { Outlet } from 'react-router';

import { StyledLayoutRoot } from './RootLayout.style';
import { useAppSelector } from '@hook';
import { LoadingOverlay } from '@component';

export const RootLayout = () => {
    const { isLoading } = useAppSelector((state) => state.auth);
    if (isLoading) return <LoadingOverlay />;
    return (
        <StyledLayoutRoot maxWidth="xl" disableGutters>
            <Outlet />
        </StyledLayoutRoot>
    );
};
