import { Box, BoxProps, Stack, styled } from '@mui/material';

export const SidePanelRoot = styled(Stack)(
    ({ theme: { palette, breakpoints, spacing } }) => ({
        height: '100%',
        flex: 3,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: spacing(5),
        backgroundColor: palette.grey[300],

        [breakpoints.down('md')]: {
            display: 'none',
        },
    }),
);

export const Illustration = styled(Box)<BoxProps<'img'>>(
    ({ theme: { spacing } }) => ({
        aspectRatio: 'auto',
        width: '70%',
        maxWidth: spacing(125),
        transform: 'translateX(10%)',
    }),
);

export const Logo = styled(Box)<BoxProps<'img'>>(({ theme: { spacing } }) => ({
    width: '40%',
    maxWidth: spacing(75),
}));
