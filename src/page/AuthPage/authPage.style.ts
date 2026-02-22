import { Stack, styled } from '@mui/material';

export const AuthPageRoot = styled(Stack)(({ theme }) => ({
    height: '100%',
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    margin: 'auto',

    [theme.breakpoints.up('xs')]: {
        flexDirection: 'row',
    },
}));
