import { SortDirection, SortField, TicketFilters } from '@type/ticket.types';

/**
 * Priority levels for sorting and categorizing ticket urgency.
 */
export enum TicketPriority {
    Highest = 'Highest',
    High = 'High',
    Medium = 'Medium',
    Low = 'Low',
    Lowest = 'Lowest',
}

/**
 * Current workflow state of a ticket.
 */
export enum TicketStatus {
    ToDo = 'To Do',
    InProgress = 'In Progress',
    Done = 'Done',
    Closed = 'Closed',
}

/**
 * Ordered list of available ticket statuses for UI selection.
 */
export const STATUS_OPTIONS: TicketStatus[] = [
    TicketStatus.ToDo,
    TicketStatus.InProgress,
    TicketStatus.Done,
    TicketStatus.Closed,
];

/**
 * Ordered list of priority options from lowest to highest urgency.
 */
export const TICKET_PRIORITY_OPTIONS: TicketPriority[] = [
    TicketPriority.Lowest,
    TicketPriority.Low,
    TicketPriority.Medium,
    TicketPriority.High,
    TicketPriority.Highest,
];

/**
 * URL query parameter keys used for filtering and pagination in the "My Tickets" view.
 */
export const MY_TICKETS_PARAMS = {
    PAGE: 'page',
    PAGE_SIZE: 'pageSize',
    SORT: 'sort',
    DIR: 'dir',
    STATUS: 'status',
    PRIORITY: 'priority',
    REPORTER: 'reporter',
    ASSIGNEE: 'assignee',
    SEARCH: 'search',
} as const;

/**
 * Default configuration values for ticket list initialization.
 */
export const MY_TICKETS_DEFAULTS = {
    PAGE: 0,
    PAGE_SIZE: 10,
    SORT: 'created_at' as SortField,
    DIR: 'desc' as SortDirection,
    PAGE_SIZE_OPTIONS: [10, 25, 50],
} as const;

/**
 * List of database fields that are permitted for sorting ticket data.
 */
export const VALID_SORT_FIELDS: SortField[] = [
    'jira_id',
    'name',
    'status',
    'priority',
    'created_at',
    'deadline',
];

/**
 * Initial state for ticket filter values.
 */
export const EMPTY_FILTERS: TicketFilters = {
    status: '',
    priority: '',
    reporter: '',
    assignee: '',
    search: '',
};
