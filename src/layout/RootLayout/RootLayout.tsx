import { useEffect } from 'react';

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
    const loading =
        (accessToken && (isPublicPath || location.pathname === '/')) ||
        (!accessToken && !isPublicPath);

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
        <RootContainer>
            {/* TODO: Add logic to hide header when we are on Auth page */}
            <Header userInitial="U" onSidebarToggle={() => {}} />
            <Box
                sx={{
                    height: '100%',
                    top: LAYOUT.HEADER,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    overflowY: 'auto',
                }}
            >
                <Outlet />
            </Box>
        </RootContainer>
    );
};
