import { Box, styled } from '@mui/material';

export const StyledLoadingOverlay = styled(Box)(({ theme: { zIndex } }) => ({
    // 1. This makes it pop out of the flow and fill the parent
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,

    // 2. Centering logic
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',

    // 3. Visuals
    backgroundColor: 'rgba(255, 255, 255, 0.7)',
    zIndex: zIndex.modal,
}));
