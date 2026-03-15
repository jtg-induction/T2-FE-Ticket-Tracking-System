import { Mutex } from 'async-mutex';

import { API_CONSTANTS } from '@constant';
import {
    BaseQueryFn,
    createApi,
    FetchArgs,
    fetchBaseQuery,
} from '@reduxjs/toolkit/query/react';
import type { RootState } from '@store';
import { logOut, setCredentials } from '@store-logic';
import { RefreshResponse } from '@type';
import {
    EntityResponse,
    ErrorResponse,
    PaginatedResponse,
} from '@type/standard.types';

const BASE_URL = import.meta.env.VITE_API_BASE_URL as string;
const mutex = new Mutex();

const baseQuery = fetchBaseQuery({
    baseUrl: BASE_URL,
    prepareHeaders: (headers, { getState }) => {
        const token = (getState() as RootState).auth.accessToken;
        if (token && !headers.has('authorization')) {
            headers.set('authorization', `Bearer ${token}`);
        }
        return headers;
    },
});

/**
 * Enhanced base query wrapper that handles:
 * 1. Automatic token refreshing using a Mutex to avoid race conditions.
 * 2. Response normalization for paginated and entity-based data.
 * 3. Standardized error formatting based on {@link ErrorResponse}.
 */
const baseQueryWithReauth: BaseQueryFn<
    string | FetchArgs,
    unknown, // Using unknown because we normalize different response shapes here; unknown ensures the final type is determined by the specific API endpoint.
    ErrorResponse
> = async (args, api, extraOptions) => {
    await mutex.waitForUnlock();

    let result = await baseQuery(args, api, extraOptions);

    if (result.error && result.error.status === 401) {
        if (!mutex.isLocked()) {
            const release = await mutex.acquire();
            try {
                const refreshResult = await baseQuery(
                    {
                        url: API_CONSTANTS.ENDPOINTS.REFRESH,
                        method: 'POST',
                        credentials: 'include',
                    },
                    api,
                    extraOptions,
                );

                const data = refreshResult.data as RefreshResponse;
                const newToken = data?.access;

                if (newToken) {
                    api.dispatch(setCredentials(newToken));

                    const retryArgs: FetchArgs =
                        typeof args === 'string' ? { url: args } : { ...args };
                    const headers = new Headers();

                    if (retryArgs.headers) {
                        const existingHeaders = retryArgs.headers as Record<
                            string,
                            string
                        >;
                        Object.entries(existingHeaders).forEach(
                            ([key, value]) => {
                                if (value) headers.set(key, value);
                            },
                        );
                    }

                    headers.set('authorization', `Bearer ${newToken}`);
                    retryArgs.headers = headers;

                    result = await baseQuery(retryArgs, api, extraOptions);
                } else {
                    api.dispatch(logOut());
                }
            } finally {
                release();
            }
        } else {
            await mutex.waitForUnlock();
            result = await baseQuery(args, api, extraOptions);
        }
    }

    if (result.data) {
        const raw = result.data as
            | PaginatedResponse<unknown>
            | EntityResponse<unknown>;

        if ('meta' in raw && Array.isArray(raw.data)) {
            return {
                data: {
                    results: raw.data,
                    meta: raw.meta,
                },
            };
        }
        return { data: raw.data };
    }

    if (result.error) {
        const errData = result.error.data as ErrorResponse | undefined;
        return {
            error: {
                success: false,
                message: errData?.message || 'A network error occurred',
                errors: errData?.errors || {},
                code: errData?.code || `HTTP_${result.error.status}`,
            },
        };
    }

    return result;
};

export const baseApi = createApi({
    reducerPath: 'api',
    baseQuery: baseQueryWithReauth,
    tagTypes: ['User', 'Project', 'ProjectMember'],
    endpoints: () => ({}),
});
