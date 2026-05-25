import { SortDirection, SortField, TicketFilters } from '@type';

/** Props for the collapsible filter bar. */
export interface FilterBarProps {
    open: boolean;
    /** Filters currently committed to the URL — used to seed local draft state. */
    committedFilters: TicketFilters;
    onApply: (filters: TicketFilters) => void;
    onClear: () => void;
    activeFilterCount: number;
}

/** Props for the sortable table column header. */
export interface SortableHeaderProps {
    field: SortField;
    label: string;
    sortField: SortField;
    sortDirection: SortDirection;
    onSort: (field: SortField) => void;
    align?: 'left' | 'center' | 'right';
    width?: string;
}

/** Props for the inline error state shown inside the table body. */
export interface ErrorStateProps {
    onRetry: () => void;
}
