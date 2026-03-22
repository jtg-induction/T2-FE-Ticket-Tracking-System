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
