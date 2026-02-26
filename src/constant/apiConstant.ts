const baseUrl = import.meta.env.VITE_API_BASE_URL as string;

if (!baseUrl) {
    throw new Error('Missing required env var: VITE_API_BASE_URL');
}

export const API_CONSTANTS = {
    BASE_URL: baseUrl.replace(/\/+$/, ''),
    ENDPOINTS: {
        LOGIN: '/api/login/',
        SIGNUP: '/api/request-link/',
        REGISTER: '/api/user/',
        REFRESH: '/api/login/refresh/',
        LOGOUT: '/api/logout/',
    },
} as const;
