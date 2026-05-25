import {
    Box,
    Paper,
    PaperProps,
    styled,
    TableCell,
    TableContainer,
} from '@mui/material';

export const StyledPageRoot = styled(Paper)(({ theme: { spacing } }) => ({
    padding: spacing(4),
    width: '100%',
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
}));

export const StyledTableContainer = styled(TableContainer)<PaperProps>(
    ({ theme: { shape, palette } }) => ({
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        boxShadow: 'none',
        borderRadius: shape.borderRadius * 4,
        border: '1px solid',
        borderColor: palette.divider,
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
    width: 10,
    height: 10,
    borderRadius: '50%',
    backgroundColor: priorityColor,
}));

export const StyledHeaderCell = styled(TableCell)({
    fontWeight: 700,
});
