import { createBrowserRouter, Navigate } from 'react-router';

import { PATHS } from '@constant';
import { LoginForm, RegisterForm, SignupForm } from '@container';
import { RootLayout } from '@layout';
import {
    AcceptInvitePage,
    AuthPage,
    ErrorPage,
    ProfilePage,
    ProjectDetailPage,
    ProjectPage,
    TasksPage,
} from '@page';

export const router = createBrowserRouter([
    {
        path: '/',
        element: <RootLayout />,
        errorElement: <ErrorPage />,
        children: [
            {
                index: true,
                element: <Navigate to={PATHS.PROJECTS} replace />,
            },
            {
                element: <AuthPage />,

                children: [
                    {
                        path: PATHS.LOGIN,
                        element: <LoginForm />,
                    },
                    {
                        path: PATHS.SIGNUP,
                        element: <SignupForm />,
                    },
                    {
                        path: PATHS.REGISTER,
                        element: <RegisterForm />,
                    },
                ],
            },
            { path: PATHS.PROJECTS, element: <ProjectPage /> },
            { path: PATHS.TASKS, element: <TasksPage /> },
            { path: PATHS.PROFILE, element: <ProfilePage /> },
            { path: `${PATHS.PROFILE}/:id`, element: <ProfilePage /> },
            {
                path: `${PATHS.PROJECTS}/:projectId`,
                element: <ProjectDetailPage />,
            },
            {
                path: PATHS.ACCEPT_INVITE,
                element: <AcceptInvitePage />,
            },
        ],
    },
]);
