import { Header, LoadingOverlay } from '@component';
import { Sidebar } from '@container';
import { useEffect, useState } from 'react';
import { Outlet, useLocation, useNavigate } from 'react-router';
import { StyledMainContent } from './ProtectedPage.style';

import { PATHS, PUBLICPATHS } from '@constant';
import { useAppSelector } from '@hook';

export const ProtectedPage = () => {
    const [isDrawerOpen, setIsDrawerOpen] = useState(false);
    const { accessToken, isLoading } = useAppSelector((state) => state.auth);

    const navigate = useNavigate();
    const location = useLocation();

    const isPublicPath = PUBLICPATHS.includes(location.pathname);

    useEffect(() => {
        if (isLoading) return;

        if (!accessToken) {
            if (!isPublicPath) {
                void navigate(PATHS.LOGIN);
            }
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
