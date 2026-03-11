import { z } from 'zod';

import { ROLES } from '@constant';

export const profileSchema = z.object({
    first_name: z
        .string()
        .trim()
        .nonempty('First name is required')
        .max(50, 'First name can not be more then 50 characters long'),
    last_name: z
        .string()
        .trim()
        .nonempty('Last name is required')
        .max(50, 'First name can not be more than 50 characters long'),
    role: z.enum(ROLES.map((r) => r.value)),
    dob: z.string().nullable().optional(),
    about: z.string().trim().nullable().optional(),
    jira_api_token: z
        .string()
        .trim()
        .max(256, 'Enter a valid Jira API Token')
        .optional(),
});
