import { LinkProps } from 'react-router';

import {
    Box,
    PaperProps,
    styled,
    TableCell,
    TableContainer,
    TableRow,
    TableRowProps,
    Typography,
} from '@mui/material';

export const StyledPageRoot = styled(Box)(({ theme }) => ({
    padding: theme.spacing(2),
    [theme.breakpoints.up('md')]: {
        padding: theme.spacing(4),
    },
    width: '100%',
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
}));

export const StyledTableContainer = styled(TableContainer)<PaperProps>(
    ({ theme }) => ({
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        borderRadius: theme.shape.borderRadius * 1.5,
        border: '1px solid',
        borderColor: theme.palette.divider,
        overflow: 'hidden',
    }),
);

export const StyledTableScrollArea = styled(Box)({
    flex: 1,
    overflowY: 'auto',
});

export const StyledPriorityIndicator = styled(Box, {
    shouldForwardProp: (prop) => prop !== 'priorityColor',
})<{ priorityColor: string }>(({ priorityColor }) => ({
    width: 8,
    height: 8,
    borderRadius: '50%',
    backgroundColor: priorityColor,
}));

export const StyledTableRow = styled(TableRow)<LinkProps & TableRowProps>({
    cursor: 'pointer',
    textDecoration: 'none',
});

export const StyledHeaderCell = styled(TableCell)({
    fontWeight: 700,
});

export const StyledTicketKey = styled(Typography)(({ theme }) => ({
    fontWeight: 800,
    color: theme.palette.primary.main,
}));
