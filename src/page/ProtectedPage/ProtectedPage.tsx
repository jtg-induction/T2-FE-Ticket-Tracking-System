import { useEffect, useState } from 'react';

import { Outlet, useLocation, useNavigate } from 'react-router';

import { Header, LoadingOverlay } from '@component';
import { PATHS, PUBLICPATHS } from '@constant';
import { Sidebar } from '@container';
import { useAppSelector } from '@hook';

import { StyledMainContent } from './ProtectedPage.style';

export const ProtectedPage = () => {
    const [isDrawerOpen, setIsDrawerOpen] = useState(false);
    const { accessToken, isLoading } = useAppSelector((state) => state.auth);

    const navigate = useNavigate();
    const location = useLocation();

    const isPublicPath = PUBLICPATHS.includes(location.pathname);

    useEffect(() => {
        if (isLoading) return;

        if (!accessToken && !isPublicPath) {
            void navigate(PATHS.LOGIN);
        }
    }, [accessToken, isLoading, location.pathname, navigate]);

    if (isLoading) return <LoadingOverlay />;

    return (
        <>
            <Header onSidebarToggle={() => setIsDrawerOpen((prev) => !prev)} />
            <Sidebar
                onClose={() => setIsDrawerOpen(false)}
                open={isDrawerOpen}
            />
            <StyledMainContent component="main">
                <Outlet />
            </StyledMainContent>
        </>
    );
};
