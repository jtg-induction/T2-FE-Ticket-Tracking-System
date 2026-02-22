import { Container, Stack, styled } from '@mui/material';

export const SignupRoot = styled(Container)(({ theme }) => ({
    width: '100%',
    flex: 3,
    backgroundColor: theme.palette.background.paper,
    [theme.breakpoints.up('lg')]: {
        flex: 2,
    },
}));

export const SignupInner = styled(Stack)(() => ({
    padding: '32px',
    marginInline: 'auto',
    height: '100%',
    maxWidth: '420px',
    justifyContent: 'center',
    gap: '10px',
})) as typeof Stack;
