import { Box, BoxProps, Container, styled } from '@mui/material';

export const StyledLayoutRoot = styled(Container)(() => ({
    display: 'flex',
    flexDirection: 'column',
    overflowX: 'hidden',
    height: '100vh',
}));

export const StyledMainContent = styled(Box)<BoxProps>(() => ({
    flexGrow: 1,
    height: '100%',
    overflowY: 'auto',
}));
