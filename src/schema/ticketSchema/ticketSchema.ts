import z from 'zod';

import { TicketCategory, TicketPriority, TicketStatus } from '@constant';

export const TicketBaseSchema = z.object({
    name: z
        .string()
        .trim()
        .nonempty('Name is required')
        .max(100, 'Max 100 characters'),
    description: z.string().trim().max(255, 'Max 255 characters').nullish(),
    priority: z.enum(TicketPriority, 'Invalid priority option'),
    category: z.enum(TicketCategory, 'Invalid category option'),
    status: z.enum(TicketStatus).optional(),
    deadline: z.string().nullish().or(z.literal('')),
    project: z
        .uuid('Invalid project ID format')
        .nonempty('A ticket must belong to a project'),
});

export const CreateTicketSchema = TicketBaseSchema.extend({
    assignee: z.string().nullish(),
});

export const JQLSearchSchema = z.object({
    query: z.string().trim().nonempty('Write some query!'),
});

export const CommentInputSchema = z.object({
    message: z
        .string()
        .trim()
        .min(1, 'Comment cannot be empty')
        .max(5000, 'Comment exceeds maximum character limit'),
});
