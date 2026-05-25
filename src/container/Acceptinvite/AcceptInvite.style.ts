import { Box, Paper, Stack, styled } from '@mui/material';

export const StyledInviteRoot = styled(Stack)(({ theme: { spacing } }) => ({
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: '100%',
    padding: spacing(3),
}));

export const StyledInviteCard = styled(Paper)(
    ({ theme: { spacing, shape, palette } }) => ({
        padding: spacing(4),
        maxWidth: 400,
        width: '100%',
        textAlign: 'center',
        borderRadius: shape.borderRadius * 2,
        backgroundColor: palette.background.paper,
    }),
);

export const StyledActionArea = styled(Box)(({ theme: { spacing } }) => ({
    paddingTop: spacing(2),
    paddingBottom: spacing(2),
}));
