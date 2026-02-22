import { Container, Stack, styled } from '@mui/material';

export const LoginRoot = styled(Container)(({ theme }) => ({
    width: '100%',
    flex: 3,
    backgroundColor: theme.palette.background.paper,
    [theme.breakpoints.up('lg')]: {
        flex: 2,
    },
}));

export const LoginInner = styled(Stack)(() => ({
    padding: '32px',
    marginInline: 'auto',
    height: '100%',
    maxWidth: '420px',
    justifyContent: 'center',
    gap: '20px',
})) as typeof Stack;
