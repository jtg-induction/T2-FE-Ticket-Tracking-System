import { Avatar, Card, CardContent, styled, Typography } from '@mui/material';

export const StyledTicketCard = styled(Card, {
    shouldForwardProp: (prop) => prop !== 'priorityColor',
})<{ priorityColor: string }>(({ priorityColor }) => ({
    position: 'relative',
    minWidth: 220,
    maxWidth: 220,
    height: '100%',
    cursor: 'pointer',
    borderTop: `4px solid ${priorityColor}`,
    transition: 'all 0.2s',
    '&:hover': {
        border: `1px solid ${priorityColor}`,
        [`& .priority-badge`]: {
            opacity: 1,
        },
    },
}));

export const StyledPriorityBadge = styled(Typography, {
    shouldForwardProp: (prop) => prop !== 'priorityColor',
})<{ priorityColor: string }>(
    ({ priorityColor, theme: { spacing, palette } }) => ({
        position: 'absolute',
        top: 0,
        right: 0,
        opacity: 0,
        pointerEvents: 'none',
        paddingBlock: spacing(1),
        paddingInline: spacing(1),
        fontSize: '1.2rem',
        color: palette.primary.contrastText,
        backgroundColor: priorityColor,
        borderBottomLeftRadius: spacing(2),
    }),
);

export const StyledTicketCardContent = styled(CardContent)(() => ({
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
}));

export const StyledTicketTitle = styled(Typography)(
    ({ theme: { spacing } }) => ({
        marginTop: spacing(0.5),
        display: '-webkit-box',
        WebkitLineClamp: 2,
        WebkitBoxOrient: 'vertical',
        overflow: 'hidden',
    }),
);

export const StyledTicketAvatar = styled(Avatar)(({ theme: { shadows } }) => ({
    width: 24,
    height: 24,
    fontSize: '1rem',
    '&:hover': {
        transform: 'scale(1.15)',
        boxShadow: shadows[3],
    },
}));
