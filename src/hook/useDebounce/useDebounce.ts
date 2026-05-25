import { useEffect, useState } from 'react';

/**
 * A custom hook that delays updating a value.
 * @param value The value to be debounced (e.g., search string)
 * @param delay The delay in milliseconds (default 500ms)
 */
export const useDebounce = <T>(value: T, delay: number = 500): T => {
    const [debouncedValue, setDebouncedValue] = useState<T>(value);

    useEffect(() => {
        const handler = setTimeout(() => {
            setDebouncedValue(value);
        }, delay);

        return () => {
            clearTimeout(handler);
        };
    }, [value, delay]);

    return debouncedValue;
};
