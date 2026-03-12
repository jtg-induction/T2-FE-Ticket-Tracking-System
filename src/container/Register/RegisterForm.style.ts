import { styled } from '@mui/material';
import { Container, Stack } from '@mui/system';

export const RegisterContainer = styled(Container)(({ theme }) => ({
    width: '100%',
    overflowY: 'auto',
    flex: 2,
    padding: 28,
    backgroundColor: theme.palette.background.paper,
}));

export const RegisterInner = styled(Stack)(() => ({
    maxWidth: 500,
    marginInline: 'auto',
    minHeight: '100%',
    gap: 8,
    padding: 28,
    justifyContent: 'center',
})) as typeof Stack;
