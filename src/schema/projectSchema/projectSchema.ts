import { z } from 'zod';

export const projectSchema = z.object({
    id: z.uuid().optional(),
    jira_id: z.string().trim().optional(),
    site_url: z
        .url({
            error: (issue) =>
                issue.input === ''
                    ? 'Site URL is required'
                    : 'Invalid Url (Include http:// or https://)',
        })
        .regex(/\.atlassian\.net\/?$/, 'Must end with .atlassian.net')
        .trim(),
    jira_project_key: z
        .string()
        .trim()
        .nonempty('Project Key is required')
        .min(2, 'At least 2 characters')
        .max(10, 'Max 10 characters')
        .regex(/^[A-Z]/, 'Must start with an uppercase letter')
        .regex(/^[A-Z0-9]+$/, 'Only uppercase letters & numbers'),
    title: z
        .string()
        .trim()
        .nonempty('Title is required')
        .max(255, 'Maximum of 255 characters'),
    description: z
        .string()
        .trim()
        .max(255, 'Maximum of 255 characters')
        .default(''),
    owner_id: z.uuid().optional(),
    can_edit: z.boolean().optional(),
    is_archived: z.boolean().default(false),
    created_at: z.string().optional(),
    updated_at: z.string().optional(),
});
