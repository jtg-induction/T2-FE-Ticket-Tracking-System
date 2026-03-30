import { z } from 'zod';

import { USER_ROLE_OPTIONS } from '@constant';

export const profileSchema = z.object({
    first_name: z
        .string()
        .trim()
        .nonempty('First name is required')
        .max(50, 'Max 50 characters'),
    last_name: z.string().trim().max(50, 'Max 50 characters').nullish(),
    role: z.enum(
        USER_ROLE_OPTIONS.map((r) => r.value),
        'Invalid role option',
    ),
    dob: z.string().nullish(),
    about: z.string().trim().max(500, 'Max 500 characters').nullish(),
    jira_api_token: z.string().trim().max(256, 'Max 256 characters').optional(),
});
