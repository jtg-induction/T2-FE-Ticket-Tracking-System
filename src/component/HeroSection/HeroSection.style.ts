import { Box, BoxProps, Stack, StackProps, styled } from '@mui/material';

export const StyledBrandingSection = styled(Stack)<StackProps>(
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

export const StyledIllustration = styled(Box)<BoxProps<'img'>>(
    ({ theme: { typography } }) => ({
        aspectRatio: 'auto',
        width: '70%',
        maxWidth: typography.pxToRem(500),
        transform: 'translateX(10%)',
    }),
);

export const StyledLogo = styled(Box)<BoxProps<'img'>>(() => ({
    width: '40%',
    maxWidth: 300,
}));
