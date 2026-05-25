import { z } from 'zod';

import { TicketCategory, TicketStatus } from '@constant';
import { CreateTicketSchema, JQLSearchSchema, TicketBaseSchema } from '@schema';

import { Project } from './project.types';
import { UserResponse } from './user.types';

/**
 * User permissions/relationship relative to a specific ticket.
 */
export type TicketRole = 'reporter' | 'admin' | 'assignee' | 'member';

/**
 * Input type for creating a new ticket, inferred from Zod schema.
 */
export type CreateTicketInput = z.infer<typeof CreateTicketSchema>;

/**
 * Complete Ticket data structure including metadata and relations.
 */
export interface Ticket extends z.infer<typeof TicketBaseSchema> {
    id: string;
    jira_id: string;
    status: TicketStatus;
    category: TicketCategory;
    created_at?: string;
    updated_at?: string;
    ticket_role?: TicketRole;
    status_updated_at?: string | null;
    status_updated_from?: TicketStatus | null;
    completed_at?: string | null;
    updated_by?: string | null;
    reporter: UserResponse;
    assignee?: UserResponse | null;
    project: string;
    project_details: Project;
    is_subscribed?: boolean;
    is_imported?: boolean;
}

/**
 * Input type for JQL search query.
 */
export type JQLSearchInput = z.infer<typeof JQLSearchSchema>;

/** Filter state for the My Tickets page. */
export interface TicketFilters {
    status: string;
    priority: string;
    reporter: string;
    assignee: string;
    search: string;
}

/** Column fields that support server-side sorting. */
export type SortField =
    | 'jira_id'
    | 'name'
    | 'status'
    | 'priority'
    | 'created_at'
    | 'deadline';

/** Sort direction for table columns. */
export type SortDirection = 'asc' | 'desc';
