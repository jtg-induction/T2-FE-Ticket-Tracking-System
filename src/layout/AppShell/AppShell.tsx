import { useEffect, useState } from 'react';

import { Outlet, useLocation, useNavigate } from 'react-router';

import { Header, HeroSection, LoadingOverlay } from '@component';
import { APP_NAME, PATHS, PUBLICPATHS } from '@constant';
import { Sidebar } from '@container';
import { useAppSelector, useDocumentTitle } from '@hook';

import { StyledAuthLayout, StyledMainContent } from './AppShell.style';

export const AppShell = () => {
    const [isDrawerOpen, setIsDrawerOpen] = useState(false);
    const { accessToken, isLoading } = useAppSelector((state) => state.auth);
    const navigate = useNavigate();
    const location = useLocation();

    const isPublicPath = PUBLICPATHS.includes(location.pathname);

    useDocumentTitle(isPublicPath ? `${APP_NAME}: Onboard` : APP_NAME);

    useEffect(() => {
        if (isLoading) return;

        if (!accessToken && !isPublicPath) {
            void navigate(PATHS.LOGIN);
        }

        if (accessToken && (isPublicPath || location.pathname === '/')) {
            void navigate(PATHS.PROJECTS);
        }
    }, [accessToken, isLoading, location.pathname, navigate]);

    if (isLoading) return <LoadingOverlay />;

    if (isPublicPath) {
        return (
            <StyledAuthLayout component="main">
                <HeroSection />
                <Outlet />
            </StyledAuthLayout>
        );
    }

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
