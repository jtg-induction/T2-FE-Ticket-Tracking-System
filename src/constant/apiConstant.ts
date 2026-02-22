export const API_CONSTANTS = {
    BASE_URL: import.meta.env.VITE_API_BASE_URL as string,
    ENDPOINTS: {
        LOGIN: '/api/login/',
        SIGNUP: '/api/request-link/',
        REGISTER: '/api/user/',
        REFRESH: '/api/login/refresh/',
        LOGOUT: '/api/logout/',
    },
};
