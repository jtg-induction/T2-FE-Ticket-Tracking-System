import { Container, Stack, styled } from '@mui/material';

export const SignupRoot = styled(Container)(({ theme }) => ({
    width: '100%',
    overflowY: 'auto',
    flex: 3,
    backgroundColor: theme.palette.background.paper,
    [theme.breakpoints.up('lg')]: {
        flex: 2,
    },
}));

export const SignupInner = styled(Stack)(() => ({
    padding: 32,
    marginInline: 'auto',
    minHeight: '100%',
    maxWidth: 420,
    justifyContent: 'center',
    gap: 10,
})) as typeof Stack;
