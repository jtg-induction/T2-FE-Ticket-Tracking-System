import { createBrowserRouter } from 'react-router';

import { Box } from '@mui/material';

import { PATHS } from '@constant';
import { LoginForm, RegisterForm, SignupForm } from '@container';
import { RootLayout } from '@layout';
import { AuthPage, ErrorPage, ProfilePage } from '@page';

export const router = createBrowserRouter([
    {
        path: '/',
        element: <RootLayout />,
        errorElement: <ErrorPage />,
        children: [
            {
                element: <AuthPage />,
                children: [
                    { path: PATHS.LOGIN, element: <LoginForm /> },
                    { path: PATHS.SIGNUP, element: <SignupForm /> },
                    { path: PATHS.REGISTER, element: <RegisterForm /> },
                ],
            },
            // TODO: Create actual projects page
            { path: PATHS.PROJECTS, element: <Box>Projects Page</Box> },
            { path: PATHS.PROFILE, element: <ProfilePage /> },
        ],
    },
]);
