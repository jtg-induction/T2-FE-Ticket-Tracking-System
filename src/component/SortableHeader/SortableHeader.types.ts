/**
 * Database fields available for sorting ticket collections.
 */
export type SortField =
    | 'jira_id'
    | 'name'
    | 'status'
    | 'priority'
    | 'created_at'
    | 'deadline';

/**
 * Configuration properties for a sortable table header component.
 */
export type SortableHeaderProps = {
    /** The specific data field this header represents. */
    field: SortField;
    /** The display text for the header. */
    label: string;
    /** The field currently being used to sort the data set. */
    sortField: SortField;
    /** The current order of sorting (ascending or descending). */
    sortDirection: 'asc' | 'desc';
    /** Callback function triggered when the header is clicked to change sort. */
    onSort: (field: SortField) => void;
    /** Visual alignment of the header text. */
    align?: 'left' | 'center' | 'right';
    /** Optional fixed width for the table column. */
    width?: string;
};
