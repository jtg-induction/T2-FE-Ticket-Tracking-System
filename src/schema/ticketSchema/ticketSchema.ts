import z from 'zod';

import { TicketPriority, TicketStatus } from '@constant';

export const TicketBaseSchema = z.object({
    name: z
        .string()
        .trim()
        .nonempty("This field can't be empty")
        .max(100, "Name can't be more than 100 characters long"),
    description: z
        .string()
        .trim()
        .max(255, 'Description must be less than 255 characters')
        .optional(),
    priority: z.enum(TicketPriority),
    category: z.enum(['Development', 'Design', 'QA', 'Research']),
    status: z.enum(TicketStatus).optional(),
    deadline: z.string().nullish().or(z.literal('')),
});

export const CreateTicketSchema = TicketBaseSchema.extend({
    assignee: z.uuid().nullish(),
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
