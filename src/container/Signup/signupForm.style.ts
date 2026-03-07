import { Container, Stack, styled } from '@mui/material';

export const SignupRoot = styled(Container)(({ theme }) => ({
    width: '100%',
    overflowY: 'auto',
    flex: 2,
    backgroundColor: theme.palette.background.paper,
}));

export const SignupInner = styled(Stack)(() => ({
    padding: 32,
    marginInline: 'auto',
    minHeight: '100%',
    maxWidth: 500,
    justifyContent: 'center',
    gap: 10,
})) as typeof Stack;
