import { TicketPriority, TicketStatus } from '@constant';

/**
 * Represents a single data point for Donut/Pie charts.
 * Used for aggregating ticket counts by status or priority.
 */
export interface DonutItem {
    /** The display name of the category */
    name: string;
    /** The numerical value or count for this category */
    count: number;
    /** Optional key to map specific TicketStatus styles or colors */
    statusKey?: TicketStatus;
    /** Optional key to map specific TicketPriority styles or colors */
    priorityKey?: TicketPriority;
}

/**
 * Represents a row of data for Stacked Bar charts.
 * Maps a label to ticket counts across all priority levels.
 */
export interface StackedItem {
    /** The X-Axis label */
    label: string;
    /** Count of tickets with 'Highest' priority */
    [TicketPriority.Highest]: number;
    /** Count of tickets with 'High' priority */
    [TicketPriority.High]: number;
    /** Count of tickets with 'Medium' priority */
    [TicketPriority.Medium]: number;
    /** Count of tickets with 'Low' priority */
    [TicketPriority.Low]: number;
    /** Count of tickets with 'Lowest' priority */
    [TicketPriority.Lowest]: number;
    /** Index signature to allow dynamic access during chart rendering */
    [key: string]: string | number;
}

/**
 * The structured data returned by the Ticket Reports API.
 * Contains pre-formatted statistics for dashboard visualizations.
 */
export interface TicketStatsResponseData {
    /** Data distributed by ticket status */
    statusStats: DonutItem[];
    /** Data distributed by ticket priority levels */
    priorityStats: DonutItem[];
    /** Metrics comparing resolution efficiency across priorities */
    efficiencyStats: StackedItem[];
    /** Time-series data showing ticket distribution over a specific deadline period */
    timelineStats: StackedItem[];
}

export interface TaskResponse {
    task_id: string;
    message: string;
}

export interface TaskStatusResponse {
    task_id: string;
    status: 'PENDING' | 'STARTED' | 'SUCCESS' | 'FAILURE';
    download_url?: string;
    error?: string;
}
