import { Outlet } from 'react-router';

import { SidePanel } from '@container';

import { AuthPageRoot } from './authPage.style';

export const AuthPage = () => (
    <AuthPageRoot>
        <SidePanel />
        <Outlet />
    </AuthPageRoot>
);
