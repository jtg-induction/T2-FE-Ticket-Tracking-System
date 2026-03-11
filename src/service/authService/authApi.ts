import { API_CONSTANTS } from '@constant';
import { baseApi } from '@service';
import {
    LoginRequest,
    LoginResponse,
    RefreshResponse,
    RegisterRequest,
    SignupResponse,
} from '@type';

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

        register: builder.mutation<LoginResponse, RegisterRequest>({
            query: (body) => ({
                url: API_CONSTANTS.ENDPOINTS.USER,
                method: 'POST',
                body,
            }),
        }),

        logout: builder.mutation<void, void>({
            query: () => ({
                url: API_CONSTANTS.ENDPOINTS.LOGOUT,
                method: 'POST',
                credentials: 'include',
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
