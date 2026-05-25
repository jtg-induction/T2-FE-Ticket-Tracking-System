import { LinkProps } from 'react-router';

import { styled, TableCell, TableRow, TableRowProps } from '@mui/material';

export const StyledHeaderCell = styled(TableCell)({
    fontWeight: 700,
});

export const StyledTableRow = styled(TableRow)<LinkProps & TableRowProps>({
    cursor: 'pointer',
    textDecoration: 'none',
});
