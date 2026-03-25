import { Box } from '@mui/material';

/**
 * Highlights the matching text from the whole string
 * @param text {string} Text to be matched
 * @param query {string} String to be highlighted
 * @returns {JSX.Element} Highlighted text
 */
/**
 * Highlights the matching text from the whole string
 */
export const HighlightTextMatch = (text: string, query: string) => {
    if (!query.trim()) return <span>{text}</span>;

    const regex = new RegExp(`(${query})`, 'ig');
    const parts = text.split(regex);

    return (
        <>
            {parts.map((part, index) =>
                part.toLowerCase() === query.toLowerCase() ? (
                    <Box
                        key={index}
                        component="span"
                        sx={{
                            color: 'primary.main',
                            fontWeight: 700,
                        }}
                    >
                        {part}
                    </Box>
                ) : (
                    <span key={index}>{part}</span>
                ),
            )}
        </>
    );
};
