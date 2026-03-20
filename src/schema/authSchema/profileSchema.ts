import { z } from 'zod';

import { USER_ROLE_OPTIONS } from '@constant';

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
    role: z.enum(USER_ROLE_OPTIONS.map((r) => r.value)),
    dob: z.string().nullish(),
    about: z
        .string()
        .trim()
        .max(500, 'Ensure this field has no more than 500 characters')
        .nullable()
        .optional(),
    jira_api_token: z
        .string()
        .trim()
        .max(256, 'Enter a valid Jira API Token')
        .optional(),
});
