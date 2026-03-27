import { Box, Stack, styled } from '@mui/material';

export const StyledLayoutRoot = styled(Stack)(
    ({ theme: { palette, spacing } }) => ({
        height: '100%',

        padding: spacing(3),
        boxSizing: 'border-box',
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'center',
        alignContent: 'flex-start',
        gap: spacing(3),
        backgroundColor: palette.background.default,
        overflowY: 'auto',
    }),
);

export const StyledMainSlot = styled(Box)(() => ({
    flex: '8 8 400px',
    minWidth: 0,
    height: '100%',
}));

export const StyledSidebarSlot = styled(Stack)(({ theme: { spacing } }) => ({
    flex: '0 1 auto',
    height: '100%',
    padding: spacing(1),
    gap: spacing(3),
    overflow: 'hidden',
}));
