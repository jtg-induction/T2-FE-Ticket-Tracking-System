import z from 'zod';

import { TicketPriority, TicketStatus } from '@type/ticket.types';

export const TicketBaseSchema = z.object({
    name: z.string().trim().min(3, 'Title must be at least 3 characters'),
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
    assignee: z.string().nullish(),
});
