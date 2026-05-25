import { Box, Fab, Paper, Stack, styled } from '@mui/material';

export const StyledMainContent = styled(Paper)(({ theme: { spacing } }) => ({
    position: 'relative',
    flex: '8 8 400px',
    display: 'flex',
    flexDirection: 'column',
    minWidth: 0,
    height: '100%',
    padding: spacing(2),
    overflow: 'hidden',
}));

export const StyledScrollableArea = styled(Box)(({ theme: { spacing } }) => ({
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    gap: spacing(2),
    overflowY: 'auto',
    paddingRight: spacing(0.5),
}));

export const StyledTicketColumn = styled(Box)(
    ({ theme: { palette, shape, spacing } }) => ({
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        backgroundColor: palette.grey[200],
        borderRadius: shape.borderRadius * 2,
        padding: spacing(2),
        minHeight: '200px',
    }),
);

export const StyledColumnHeader = styled(Stack)(({ theme: { spacing } }) => ({
    marginBottom: spacing(1.5),
}));

export const StyledFab = styled(Fab)(({ theme: { spacing } }) => ({
    position: 'absolute',
    bottom: spacing(6),
    right: spacing(6),
    '&:hover': {
        transform: 'scale(1.05)',
        transition: 'transform 0.2s ease-in-out',
    },
}));
