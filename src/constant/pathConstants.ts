export const PATHS = {
    LOGIN: '/login',
    SIGNUP: '/signup',
    REGISTER: '/register',
    PROJECTS: '/projects',
    PROFILE: '/profile',
    TASKS: '/tasks',
} as const;

const AUTH_PUBLIC_PATHS = [PATHS.LOGIN, PATHS.SIGNUP, PATHS.REGISTER] as const;

export const PUBLICPATHS = AUTH_PUBLIC_PATHS.flatMap((path) => [
    path,
    `${path}/`,
]);
