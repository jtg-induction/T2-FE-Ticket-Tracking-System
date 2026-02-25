import { API_CONSTANTS } from '@constant';
import { baseApi } from '@store';
import {
    LoginRequest,
    LoginResponse,
    RefreshResponse,
    RegisterRequest,
    SignupResponse,
} from '@type';

const BASE_URL = import.meta.env.VITE_API_BASE_URL as string;

export const authApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        login: builder.mutation<LoginResponse, LoginRequest>({
            query: (credentials) => ({
                url: API_CONSTANTS.ENDPOINTS.LOGIN,
                method: 'POST',
                body: credentials,
                credentials: 'include',
            }),
        }),

        signup: builder.mutation<SignupResponse, { email: string }>({
            query: (body) => ({
                url: API_CONSTANTS.ENDPOINTS.SIGNUP,
                method: 'POST',
                body,
            }),
        }),

        register: builder.mutation<unknown, RegisterRequest>({
            query: (body) => ({
                url: API_CONSTANTS.ENDPOINTS.REGISTER,
                method: 'POST',
                body,
            }),
        }),

        logout: builder.mutation<void, void>({
            query: () => ({
                url: API_CONSTANTS.ENDPOINTS.LOGOUT,
                method: 'POST',
            }),
        }),

        refresh: builder.mutation<RefreshResponse, void>({
            query: () => ({
                url: API_CONSTANTS.ENDPOINTS.REFRESH,
                method: 'POST',
                credentials: 'include',
            }),
        }),
    }),
    overrideExisting: false,
});

export const {
    useLoginMutation,
    useSignupMutation,
    useRegisterMutation,
    useLogoutMutation,
    useRefreshMutation,
} = authApi;
