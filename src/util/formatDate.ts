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
