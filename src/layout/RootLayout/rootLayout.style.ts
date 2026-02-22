import { Box, styled } from '@mui/material';

export const RootContainer = styled(Box)(() => ({
    minWidth: '100%',
    width: '100%',
    height: '100vh',
    paddingInline: 0,
    maxWidth: '2500px', // containerization
    margin: 0,
}));
