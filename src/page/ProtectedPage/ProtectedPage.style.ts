import { Box, BoxProps, styled } from '@mui/material';

export const StyledMainContent = styled(Box)<BoxProps>(() => ({
    flexGrow: 1,
    height: '100%',
    overflowY: 'auto',
}));
