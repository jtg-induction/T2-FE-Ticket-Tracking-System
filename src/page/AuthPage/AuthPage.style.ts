import { Stack, StackProps, styled } from '@mui/material';

export const StyledAuthLayout = styled(Stack)<StackProps>(() => ({
    height: '100%',
    width: '100%',
    display: 'flex',
    flexDirection: 'row',
    margin: 'auto',
}));
