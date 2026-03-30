import { Box, BoxProps, styled } from '@mui/material';

export const StyledErrorContainer = styled(Box)(
    ({ theme: { zIndex, palette } }) => ({
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,

        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',

        backgroundColor: palette.common.white,
        zIndex: zIndex.appBar - 1,
    }),
);

export const StyledIllustration = styled(Box)<BoxProps<'img'>>(
    ({ theme: { typography } }) => ({
        aspectRatio: 'auto',
        width: '70%',
        maxWidth: typography.pxToRem(500),
    }),
);
