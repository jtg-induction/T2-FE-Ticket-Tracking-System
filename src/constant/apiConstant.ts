export const API_CONSTANTS = {
    ENDPOINTS: {
        LOGIN: '/api/login/',
        SIGNUP: '/api/request-link/',
        REFRESH: '/api/login/refresh/',
        LOGOUT: '/api/logout/',
        USER: '/api/user/',
        PROJECT: '/api/project/',
        TICKET: '/api/ticket/',
        REPORTS: '/api/report/',
        SUBSCRIBE: 'tickets/',
        UNSUBSCRIBE: 'tickets/',
    },
    METHODS: {
        GET: 'GET',
        POST: 'POST',
        PUT: 'PUT',
        PATCH: 'PATCH',
        DELETE: 'DELETE',
    },
} as const;
