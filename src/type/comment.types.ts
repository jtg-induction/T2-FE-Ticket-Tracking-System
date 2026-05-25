import { z } from 'zod';

import { CommentInputSchema } from '@schema';

import { UserResponse } from './user.types';

/**
 * Input type for creating or updating a comment inferred from CommentInputSchema.
 */
export type CommentInput = z.infer<typeof CommentInputSchema>;

/**
 * Represents a single comment entity attached to a ticket.
 */
export interface Comment {
    id: string;
    /** The content of the comment in Markdown format. */
    message: string;
    /** Indicates if the authenticated user has permission to modify this comment. */
    can_edit: boolean;
    /** Indicates if the parent project is archived. */
    is_project_archived: boolean;
    /** ISO 8601 formatted creation timestamp. */
    created_at: string;
    ticket: string;
    /** The display name of an author if the comment originated from an external system (JIRA). */
    external_author_name: string | null;
    /** The profile data of the user who authored the comment. */
    commentator: UserResponse;
}
