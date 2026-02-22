import { styled } from '@mui/material';
import { Container, Stack } from '@mui/system';

export const RegisterContainer = styled(Container)(({ theme }) => ({
    display: 'flex',
    flex: 3,
    justifyContent: 'center',
    backgroundColor: theme.palette.background.paper,
}));

export const RegisterInner = styled(Stack)(() => ({
    maxWidth: '500px',
    height: '100%',
    width: '100%',
    gap: '24px',
    padding: '28px',
    justifyContent: 'center',
})) as typeof Stack;
