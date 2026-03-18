import { Box, Card, Stack, styled } from '@mui/material';

export const StyledDashboardLayout = styled(Stack)(
    ({ theme: { palette, spacing } }) => ({
        height: '100%',
        padding: spacing(3),
        boxSizing: 'border-box',
        overflow: 'hidden',
        backgroundColor: palette.background.default,
    }),
);

export const StyledMainContent = styled(Box)({
    flex: '1 1 320px',
    display: 'flex',
    flexDirection: 'column',
    minWidth: 0,
    height: '100%',
    overflow: 'hidden',
});

export const StyledScrollableArea = styled(Box)(({ theme: { spacing } }) => ({
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    gap: spacing(2),
    overflowY: 'auto',
    paddingRight: spacing(0.5),
}));

export const StyledSidebar = styled(Stack)({
    flex: '0 0 320px',
    height: '100%',
    overflowY: 'auto',
});

export const StyledTicketColumn = styled(Box)(
    ({ theme: { palette, shape, spacing } }) => ({
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        backgroundColor: palette.grey[200],
        borderRadius: shape.borderRadius * 2,
        padding: spacing(2),
        minHeight: '180px',
    }),
);

export const StyledTicketCard = styled(Card)(({ theme: { shadows } }) => ({
    minWidth: 220,
    maxWidth: 220,
    height: '100%',
    cursor: 'pointer',
    transition: 'all 0.2s',
    '&:hover': {
        transform: 'translateY(-2px)',
        boxShadow: shadows[3],
    },
}));
