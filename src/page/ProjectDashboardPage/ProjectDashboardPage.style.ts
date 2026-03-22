import { Stack, styled } from '@mui/material';

export const StyledDashboardLayout = styled(Stack)(
    ({ theme: { palette, spacing } }) => ({
        height: '100%',
        padding: spacing(3),
        boxSizing: 'border-box',
        backgroundColor: palette.background.default,
    }),
);

export const StyledSidebar = styled(Stack)(({ theme: { spacing } }) => ({
    padding: spacing(1),
    flex: '1 1 400px',
    height: '100%',
    gap: spacing(3),
    overflow: 'hidden',
}));
