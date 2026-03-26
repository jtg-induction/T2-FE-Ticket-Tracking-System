import { TicketFilters } from '@type/ticket.types';

/**
 * Configuration properties for the ticket filtering interface.
 */
export type FilterBarProps = {
    /** Controls the visibility of the filter drawer or panel. */
    open: boolean;
    /** The set of filter values currently applied to the data set. */
    committedFilters: TicketFilters;
    /** Callback triggered when the user confirms and applies new filter selections. */
    onApply: (filters: TicketFilters) => void;
    /** Callback to reset all filter fields to their initial empty state. */
    onClear: () => void;
    /** The total number of non-empty filter criteria currently in effect. */
    activeFilterCount: number;
};
