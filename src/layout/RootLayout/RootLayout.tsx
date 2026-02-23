import { useEffect } from 'react';

import { Outlet, useLocation, useNavigate } from 'react-router';

import { PATHS, PUBLICPATHS } from '@constant';
import { useAuth } from '@context';

import { RootContainer } from './rootLayout.style';

export const RootLayout = () => {
    const { accessToken } = useAuth();
    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        const isPublicPath = PUBLICPATHS.includes(location.pathname);

        if (accessToken) {
            if (isPublicPath || location.pathname === '/') {
                void navigate(PATHS.PROJECTS, { replace: true });
            }
        } else {
            if (!isPublicPath) {
                void navigate(PATHS.LOGIN, { replace: true });
            }
        }
    }, [accessToken, location.pathname, navigate]);

    return (
        <RootContainer>
            <Outlet />
        </RootContainer>
    );
};
