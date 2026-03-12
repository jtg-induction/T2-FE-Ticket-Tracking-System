import { Box, Stack, styled } from '@mui/material';

export const SidePanelRoot = styled(Stack)(({ theme }) => ({
    height: '100%',
    flex: 3,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 20,
    backgroundColor: theme.palette.grey[300],

    [theme.breakpoints.down('md')]: {
        display: 'none',
    },
}));

export const Illustration = styled(Box)(() => ({
    aspectRatio: 'auto',
    width: '70%',
    maxWidth: 500,
    transform: 'translateX(10%)',
})) as typeof Box;

export const Logo = styled(Box)(() => ({
    width: '40%',
    maxWidth: 300,
})) as typeof Box;
