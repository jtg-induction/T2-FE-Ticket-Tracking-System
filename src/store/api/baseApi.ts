import { Mutex } from 'async-mutex';

import { API_CONSTANTS } from '@constant';
import {
    BaseQueryFn,
    createApi,
    FetchArgs,
    fetchBaseQuery,
    FetchBaseQueryError,
} from '@reduxjs/toolkit/query/react';
import { RootState } from '@store';
import { logOut, setCredentials } from '@store';

const mutex = new Mutex();

const baseQuery = fetchBaseQuery({
    baseUrl: API_CONSTANTS.BASE_URL,
    prepareHeaders: (headers, { getState }) => {
        const token = (getState() as RootState).auth.accessToken;
        if (token && !headers.has('authorization')) {
            headers.set('authorization', `Bearer ${token}`);
        }
        return headers;
    },
});

const baseQueryWithReauth: BaseQueryFn<
    string | FetchArgs,
    unknown,
    FetchBaseQueryError
> = async (args, api, extraOptions) => {
    await mutex.waitForUnlock();

    let result = await baseQuery(args, api, extraOptions);

    if (result.error && result.error.status === 401) {
        if (!mutex.isLocked()) {
            const release = await mutex.acquire();
            try {
                const refreshResult = await baseQuery(
                    {
                        url: '/api/login/refresh/',
                        method: 'POST',
                        credentials: 'include',
                    },
                    api,
                    extraOptions,
                );

                const data = refreshResult.data as { access?: string };
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

    return result;
};

export const baseApi = createApi({
    reducerPath: 'api',
    baseQuery: baseQueryWithReauth,
    tagTypes: ['User', 'Project', 'ProjectMember'],
    endpoints: () => ({}),
});
