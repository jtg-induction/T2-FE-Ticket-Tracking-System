import { SerializedError } from '@reduxjs/toolkit';
import { FetchBaseQueryError } from '@reduxjs/toolkit/query';

export const resolveApiError = (error: unknown): string => {
    if (!error) return '';

    if (typeof error === 'object' && error !== null && 'message' in error) {
        const serError = error as SerializedError;
        return serError.message || 'Connection failed';
    }

    if (typeof error === 'object' && error !== null && 'data' in error) {
        const fbqError = error as FetchBaseQueryError;
        const errorData = fbqError.data;

        if (
            errorData &&
            typeof errorData === 'object' &&
            !Array.isArray(errorData)
        ) {
            const data = errorData as Record<string, unknown>;

            if (typeof data.detail === 'string') return data.detail;

            const firstError = Object.values(data)[0];

            if (
                Array.isArray(firstError) &&
                typeof firstError[0] === 'string'
            ) {
                return firstError[0];
            }
            if (typeof firstError === 'string') {
                return firstError;
            }
        }
    }

    return 'An unknown error occurred';
};
