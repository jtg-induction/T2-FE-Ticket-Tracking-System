import { Container, styled } from '@mui/material';

export const StyledLayoutRoot = styled(Container)(() => ({
    display: 'flex',
    flexDirection: 'column',
    overflowX: 'hidden',
    height: '100vh',
}));
