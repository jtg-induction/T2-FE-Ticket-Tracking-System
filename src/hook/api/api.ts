import { useCallback, useEffect, useState } from 'react';

import { API_CONSTANTS } from '@constant';

import type { Request } from './api.type';

export const useApi = <T>(request: Request, dependencies: unknown[] = []) => {
    const [data, setData] = useState<T | null>(null);
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);

    const {
        endpoint,
        method = 'GET',
        pathParams,
        queryParams,
        headers,
        body,
    } = request;

    const serializedPath = JSON.stringify(pathParams);
    const serializedQuery = JSON.stringify(queryParams);
    const serializedHeaders = JSON.stringify(headers);
    const serializedBody = JSON.stringify(body);

    const execute = useCallback(async () => {
        setLoading(true);
        setError(null);

        try {
            const baseUrl = API_CONSTANTS.BASE_URL.replace(/\/$/, '');
            const cleanEndpoint = endpoint.startsWith('/')
                ? endpoint
                : `/${endpoint}`;

            let url = `${baseUrl}${cleanEndpoint}`;

            if (pathParams) {
                Object.entries(pathParams).forEach(([key, value]) => {
                    url = url.replace(
                        `:${key}`,
                        encodeURIComponent(String(value)),
                    );
                });
            }

            if (queryParams) {
                const searchParams = new URLSearchParams();
                Object.entries(queryParams).forEach(([key, value]) => {
                    if (value !== undefined && value !== null) {
                        searchParams.append(key, String(value));
                    }
                });
                const queryString = searchParams.toString();
                if (queryString) url += `?${queryString}`;
            }

            const response = await fetch(url, {
                method,
                headers: {
                    'Content-Type': 'application/json',
                    ...headers,
                },
                body: body ? JSON.stringify(body) : undefined,
            });

            if (!response.ok) {
                throw new Error(
                    `Error: ${response.status} ${response.statusText}`,
                );
            }

            const result = (await response.json()) as T;
            setData(result);
        } catch (err) {
            setError(err instanceof Error ? err.message : 'An error occurred');
        } finally {
            setLoading(false);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [
        endpoint,
        method,
        serializedPath,
        serializedQuery,
        serializedHeaders,
        serializedBody,
    ]);

    useEffect(() => {
        void execute();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [...dependencies]);

    return { data, loading, error, refresh: execute };
};
