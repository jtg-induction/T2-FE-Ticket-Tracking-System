import { useEffect, useState } from 'react';

import { Outlet, useLocation, useNavigate } from 'react-router';

import { Header } from '@component';
import { PATHS, PUBLICPATHS } from '@constant';
import { useAppSelector } from '@hook';

import { StyledLayoutRoot, StyledMainContent } from './RootLayout.style';
import { Sidebar } from '@container';

export const RootLayout = () => {
    const { accessToken, isLoading } = useAppSelector((state) => state.auth);

    const navigate = useNavigate();
    const location = useLocation();

    const isPublicPath = PUBLICPATHS.includes(location.pathname);
    const loading =
        (accessToken && (isPublicPath || location.pathname === '/')) ||
        (!accessToken && !isPublicPath);

    const [sidebarOpen, toggleSidebar] = useState(false);
    const handleDrawerToggle = () => {
        toggleSidebar((prev) => !prev);
    };

    useEffect(() => {
        if (isLoading) return;

        if (accessToken) {
            if (isPublicPath || location.pathname === '/') {
                void navigate(PATHS.PROJECTS);
            }
        } else {
            if (!isPublicPath) {
                void navigate(PATHS.LOGIN);
            }
        }
    }, [accessToken, isLoading, location.pathname, navigate]);

    if (loading) {
        return null;
    }

    return (
        <StyledLayoutRoot maxWidth="xl" disableGutters>
            {isPublicPath && (
                <>
                    <Header userInitial="U" onSidebarToggle={() => {}} />
                    <Sidebar onClose={handleDrawerToggle} open={sidebarOpen} />
                </>
            )}
            <StyledMainContent component="main">
                <Outlet />
            </StyledMainContent>
        </StyledLayoutRoot>
    );
};
