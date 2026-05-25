/**
 * Convert ISO 8061 extend date in string to Little-Endian format string
 * @param isoString : date in ISO 8061 format
 * @returns Converted date in string format
 */
export const convertIsoToDateYear = (isoString: string) => {
    try {
        return Intl.DateTimeFormat('en-US', {
            day: 'numeric',
            month: 'long',
            year: 'numeric',
        }).format(new Date(isoString));
    } catch (err) {
        return String(err);
    }
};

/**
 * Convert ISO 8061 string to YYYY-MM-DDTHH:mm format for datetime-local inputs
 * @param isoString : date in ISO 8061 format
 * @returns Formatted string for input value
 */
export const toDateTimeLocalValue = (isoString: string | undefined | null) => {
    if (!isoString) return '';
    try {
        const date = new Date(isoString);
        if (isNaN(date.getTime())) return '';

        date.setMinutes(date.getMinutes() - date.getTimezoneOffset());
        return date.toISOString().slice(0, 16);
    } catch {}
};
