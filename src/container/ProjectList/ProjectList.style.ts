import { Box, Stack, styled } from '@mui/material';

export const EmptyStateContainer = styled(Stack)(
    ({ theme: { shape, palette, spacing } }) => ({
        flexGrow: 1,
        margin: spacing(16),
        alignItems: 'center',
        justifyContent: 'center',
        spacing: spacing(3),
        borderRadius: shape.borderRadius * 4,
        border: `8px dashed ${palette.divider}`,
        backgroundColor: palette.action.hover,
    }),
);

export const EmptyStateContent = styled(Box)(({ theme }) => ({
    marginBottom: theme.spacing(3),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: theme.spacing(1),
}));
