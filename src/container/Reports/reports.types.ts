import { DonutChartDataItem } from '@component';
import { StackedItem } from '@type';

/**
 * Transformed ticket statistics prepared for dashboard visualization.
 * Contains formatted data for status and priority charts along with aggregated totals.
 */
export type TicketStatsData = {
    /** Formatted data for ticket status donut charts */
    statusData: DonutChartDataItem[];
    /** Formatted data for ticket priority donut charts */
    priorityData: DonutChartDataItem[];
    /** Time-series data for tracking ticket deadlines */
    deadlineData: StackedItem[];
    /** Comparative data for analyzing resolution efficiency */
    successFailureData: StackedItem[];
    /** The sum of all tickets categorized by status */
    totalStatus: number;
    /** The sum of all tickets categorized by priority */
    totalPriority: number;
    /** Mapping of priority levels to their respective colors */
    priorityColors: Record<string, string>;
    /** Mapping of ticket statuses to their respective colors */
    statusColors: Record<string, string>;
};

/**
 * Properties for the Reports container component.
 * Defines the scope and filtering capabilities of the insights view.
 */
export type ReportsProps = {
    /** Toggle to enable or disable the user-specific search and filter functionality */
    userFilter: boolean;
    /** Unique identifier for the project to fetch reports for */
    projectId?: string;
    /** Unique identifier for a specific user to scope the report data */
    userId?: string;
};
