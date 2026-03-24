import { Outlet } from 'react-router';

import { HeroSection } from '@component';

import { StyledAuthLayout } from './AuthPage.style';

export const AuthPage = () => (
    <StyledAuthLayout component="main">
        <HeroSection />
        <Outlet />
    </StyledAuthLayout>
);
