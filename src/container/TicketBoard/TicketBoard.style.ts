import {
    Avatar,
    Box,
    Card,
    CardContent,
    Paper,
    Stack,
    styled,
    Typography,
} from '@mui/material';

export const StyledMainContent = styled(Paper)(({ theme: { spacing } }) => ({
    flex: '8 8 400px',
    display: 'flex',
    flexDirection: 'column',
    minWidth: 0,
    height: '100%',
    padding: spacing(2),
    overflow: 'hidden',
}));

export const StyledScrollableArea = styled(Box)(({ theme: { spacing } }) => ({
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    gap: spacing(2),
    overflowY: 'auto',
    paddingRight: spacing(0.5),
}));

export const StyledTicketColumn = styled(Box)(
    ({ theme: { palette, shape, spacing } }) => ({
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        backgroundColor: palette.grey[200],
        borderRadius: shape.borderRadius * 2,
        padding: spacing(2),
        minHeight: '180px',
    }),
);

export const StyledTicketCard = styled(Card, {
    shouldForwardProp: (prop) => prop !== 'priorityColor',
})<{ priorityColor: string }>(({ priorityColor }) => ({
    minWidth: 220,
    maxWidth: 220,
    height: '100%',
    cursor: 'pointer',
    borderTop: `4px solid ${priorityColor}`,
    transition: 'all 0.2s',
    '&:hover': {
        border: `1px solid ${priorityColor}`,
    },
}));

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

export const StyledAssigneeAvatar = styled(Avatar)(
    ({ theme: { spacing } }) => ({
        width: 22,
        height: 22,
        fontSize: spacing(2),
    }),
);

export const StyledColumnHeader = styled(Stack)(({ theme: { spacing } }) => ({
    marginBottom: spacing(1.5),
}));
