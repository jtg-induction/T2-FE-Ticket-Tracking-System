import { Outlet } from 'react-router';

import { SidePanel } from '@container';

import { StyledAuthLayout } from './AuthPage.style';

export const AuthPage = () => (
    <StyledAuthLayout component="main">
        <SidePanel />
        <Outlet />
    </StyledAuthLayout>
);
