import { HeroSection, LoadingOverlay } from '@component';

import { StyledAuthLayout } from './AuthPage.style';

import { useEffect } from 'react';

import { Outlet, useLocation, useNavigate } from 'react-router';

import { APP_NAME, PATHS, PUBLICPATHS } from '@constant';
import { useAppSelector, useDocumentTitle } from '@hook';

export const AuthPage = () => {
    document.title = 'new one';
    useDocumentTitle(`${APP_NAME}: Onboard`);
    const { accessToken, isLoading } = useAppSelector((state) => state.auth);

    const navigate = useNavigate();
    const location = useLocation();

    const isPublicPath = PUBLICPATHS.includes(location.pathname);

    useEffect(() => {
        if (isLoading) return;

        if (accessToken) {
            if (isPublicPath || location.pathname === '/') {
                void navigate(PATHS.PROJECTS);
            }
        }
    }, [accessToken, isLoading, location.pathname, navigate]);

    if (isLoading) return <LoadingOverlay />;

    return (
        <StyledAuthLayout component="main">
            <HeroSection />
            <Outlet />
        </StyledAuthLayout>
    );
};
