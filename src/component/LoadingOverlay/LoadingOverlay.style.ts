import { alpha, Box, styled } from '@mui/material';

export const StyledLoadingOverlay = styled(Box)(
    ({ theme: { zIndex, palette } }) => ({
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,

        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',

        backgroundColor: alpha(palette.common.white, 0.15),
        zIndex: zIndex.modal,
    }),
);
