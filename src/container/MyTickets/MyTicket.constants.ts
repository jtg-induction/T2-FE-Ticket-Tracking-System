import { SortDirection, SortField, TicketFilters } from '@type/ticket.types';

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

export const MY_TICKETS_DEFAULTS = {
    PAGE: 0,
    PAGE_SIZE: 10,
    SORT: 'created_at' as SortField,
    DIR: 'desc' as SortDirection,
    PAGE_SIZE_OPTIONS: [10, 25, 50],
} as const;

export const VALID_SORT_FIELDS: SortField[] = [
    'jira_id',
    'name',
    'status',
    'priority',
    'created_at',
    'deadline',
];

export const EMPTY_FILTERS: TicketFilters = {
    status: '',
    priority: '',
    reporter: '',
    assignee: '',
    search: '',
};
