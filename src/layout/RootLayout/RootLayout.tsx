import { useEffect, useState } from 'react';

import { Outlet, useLocation, useNavigate } from 'react-router';

import { Box } from '@mui/material';

import { Header } from '@component';
import { LAYOUT, PATHS, PUBLICPATHS } from '@constant';
import { useAppSelector } from '@hook';

import { RootContainer } from './RootLayout.style';

export const RootLayout = () => {
    const { accessToken, isLoading } = useAppSelector((state) => state.auth);

    const navigate = useNavigate();
    const location = useLocation();

    const isPublicPath = PUBLICPATHS.includes(location.pathname);

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
        } else if (!isPublicPath) {
            void navigate(PATHS.LOGIN);
        }
    }, [accessToken, isLoading, navigate]);

    if (isLoading) {
        return null;
    }

    return (
        <RootContainer>
            {isPublicPath && (
                <Header userInitial="U" onSidebarToggle={() => {}} />
                <Sidebar onClose={handleDrawerToggle} open={sidebarOpen} />
            )}
            <InnerContainer>
                <Outlet />
            </InnerContainer>
        </RootContainer>
    );
};
