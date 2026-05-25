import { Box, Paper, styled } from '@mui/material';

export const StyledJQLSearchWrapper = styled(Paper)(
    ({ theme: { spacing } }) => ({
        maxWidth: '480px',
        height: '100%',
        padding: spacing(3),
        boxSizing: 'border-box',
        display: 'flex',
        flexDirection: 'column',
        overflow: 'hidden',
    }),
);

export const StyledResultsWrapper = styled(Box)(({ theme: { spacing } }) => ({
    padding: spacing(1),
    flex: 1,
    overflow: 'auto',
}));

export const StyledTicketItem = styled(Box)(
    ({ theme: { spacing, palette, shape } }) => ({
        display: 'flex',
        gap: spacing(2),
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: spacing(1, 2),
        border: `1px solid ${palette.divider}`,
        borderRadius: shape.borderRadius,
        marginBottom: spacing(1.5),
        backgroundColor: palette.background.paper,
        boxSizing: 'border-box',
    }),
);
