import { Outlet } from 'react-router';

import { SidePanel } from '@container';

import { AuthPageRoot } from './AuthPage.style';

export const AuthPage = () => (
    <AuthPageRoot>
        <SidePanel />
        <Outlet />
    </AuthPageRoot>
);
