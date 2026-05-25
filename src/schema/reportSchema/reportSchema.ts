import z from 'zod';

export const filterSchema = z
    .object({
        userIds: z.array(z.uuid()),
        startDate: z.string().optional().or(z.literal('')),
        endDate: z.string().optional().or(z.literal('')),
    })
    .refine(
        (data) => {
            if (data.startDate && data.endDate) {
                return data.endDate >= data.startDate;
            }
            return true;
        },
        {
            message: 'End date cannot be before start date',
            path: ['endDate'],
        },
    );

export type FilterFormValues = z.infer<typeof filterSchema>;
