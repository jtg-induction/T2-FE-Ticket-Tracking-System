import { Box, Paper, Stack, styled } from '@mui/material';

export const StyledInviteRoot = styled(Stack)(({ theme }) => ({
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: '100%',
    padding: theme.spacing(3),
}));

export const StyledInviteCard = styled(Paper)(({ theme }) => ({
    padding: theme.spacing(4),
    maxWidth: 400,
    width: '100%',
    textAlign: 'center',
    borderRadius: theme.shape.borderRadius * 2,
    backgroundColor: theme.palette.background.paper,
}));

export const StyledActionArea = styled(Box)(({ theme }) => ({
    paddingTop: theme.spacing(2),
    paddingBottom: theme.spacing(2),
}));
