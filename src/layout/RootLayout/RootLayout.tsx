import { useEffect } from 'react';

import { Outlet, useLocation, useNavigate } from 'react-router';

import { Box } from '@mui/material';

import { Header } from '@component';
import { LAYOUT, PATHS, PUBLICPATHS } from '@constant';
import { useAppSelector } from '@hook';

import { RootContainer } from './rootLayout.style';

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

        const isPublicPath = PUBLICPATHS.includes(location.pathname);

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
            <Header userInitial="U" onSidebarToggle={() => {}} />
            <Box
                sx={{
                    position: 'fixed',
                    height: '100%',
                    width: '100%',
                    top: LAYOUT.HEADER,
                }}
            >
                <Outlet />
            </Box>
        </RootContainer>
    );
};
