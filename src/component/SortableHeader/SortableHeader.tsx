import { TableSortLabel } from '@mui/material';

import { StyledHeaderCell } from './SortableHeader.style';
import { SortableHeaderProps } from './SortableHeader.types';

export const SortableHeader = ({
    field,
    label,
    sortField,
    sortDirection,
    onSort,
    align = 'left',
    width,
}: SortableHeaderProps) => (
    <StyledHeaderCell align={align} sx={{ width }}>
        <TableSortLabel
            active={sortField === field}
            direction={sortField === field ? sortDirection : 'asc'}
            onClick={() => onSort(field)}
            sx={{
                width: '100%',
                justifyContent: align === 'center' ? 'center' : 'flex-start',
                '& .MuiTableSortLabel-icon': {
                    opacity: sortField === field ? 1 : 0.3,
                },
            }}
        >
            {label}
        </TableSortLabel>
    </StyledHeaderCell>
);
