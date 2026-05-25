import { Box, styled } from '@mui/material';

export const StyledLoadingOverlay = styled(Box)(({ theme: { zIndex } }) => ({
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100vh',
    width: '100vw',
    position: 'fixed',
    top: 0,
    left: 0,
    backgroundColor: 'rgba(255, 255, 255, 0.7)',
    zIndex: zIndex.modal,
}));
