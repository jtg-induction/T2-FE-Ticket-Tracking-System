import { createBrowserRouter, Navigate } from 'react-router';

import { PATHS } from '@constant';
import { LoginForm, RegisterForm, SignupForm } from '@container';
import { RootLayout } from '@layout';
import {
    AcceptInvitePage,
    AuthPage,
    ErrorPage,
    MyTicketsPage,
    ProfilePage,
    ProjectDashboardPage,
    ProjectDetailPage,
    ProjectPage,
    ReportsPage,
    TicketDetailPage,
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
            { path: PATHS.TICKET, element: <MyTicketsPage /> },
            { path: PATHS.PROFILE, element: <ProfilePage /> },
            { path: `${PATHS.PROFILE}/:id`, element: <ProfilePage /> },
            {
                path: `${PATHS.PROJECTS}/:projectId`,
                element: <ProjectDashboardPage />,
            },
            {
                path: `${PATHS.PROJECTS}/:projectId/detail`,
                element: <ProjectDetailPage />,
            },
            {
                path: `${PATHS.PROJECTS}/:projectId${PATHS.TICKET}/:ticketId`,
                element: <TicketDetailPage />,
            },
            {
                path: PATHS.ACCEPT_INVITE,
                element: <AcceptInvitePage />,
            },

            {
                path: `${PATHS.PROJECTS}/:projectId/insights`,
                element: <ReportsPage />,
            },
            {
                path: `${PATHS.PROFILE}/insights`,
                element: <ReportsPage />,
            },
            {
                path: `${PATHS.PROFILE}/:userId/insights`,
                element: <ReportsPage />,
            },
        ],
    },
]);
