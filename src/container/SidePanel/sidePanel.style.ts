import { Box, Stack, styled } from '@mui/material';

export const SidePanelRoot = styled(Stack)(({ theme }) => ({
    height: '100%',
    flex: 5,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 20,

    [theme.breakpoints.down('md')]: {
        display: 'none',
    },
}));

export const Illustration = styled(Box)(() => ({
    width: 500,
    transform: 'translateX(10%)',
})) as typeof Box;

export const Logo = styled(Box)(() => ({
    width: 300,
})) as typeof Box;
