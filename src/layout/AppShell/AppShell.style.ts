import { Box, BoxProps,Stack, StackProps, styled } from '@mui/material';

export const StyledAuthLayout = styled(Stack)<StackProps>(() => ({
    height: '100%',
    width: '100%',
    display: 'flex',
    flexDirection: 'row',
    margin: 'auto',
}));

export const StyledMainContent = styled(Box)<BoxProps>(() => ({
    flexGrow: 1,
    height: '100%',
    overflowY: 'auto',
}));
