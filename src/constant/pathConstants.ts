export const PATHS = {
    LOGIN: '/login',
    SIGNUP: '/signup',
    REGISTER: '/register',
    PROJECTS: '/projects',
    PROFILE: '/profile',
    TICKET: '/tickets',
    ACCEPT_INVITE: '/accept-invite/:token',
    INSIGHTS: '/insights',
    DETAIL: '/detail',
} as const;

const AUTH_PUBLIC_PATHS = [PATHS.LOGIN, PATHS.SIGNUP, PATHS.REGISTER] as const;

export const PUBLICPATHS = AUTH_PUBLIC_PATHS.flatMap((path) => [
    path,
    `${path}/`,
]);
