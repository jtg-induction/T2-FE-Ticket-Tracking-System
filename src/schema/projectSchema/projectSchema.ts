import { z } from 'zod';

export const projectSchema = z.object({
    id: z.uuid().optional(),
    jira_id: z.string().trim().optional(),
    site_url: z.url('Invalid site URL').trim().min(1, 'Required'),
    jira_project_key: z.string().trim().min(1, 'Required'),
    title: z.string().trim().min(3, 'Title must be at least 3 characters'),
    description: z.string().trim().default(''),
    owner_id: z.uuid().optional(),
    can_edit: z.boolean().optional(),
    is_archived: z.boolean().default(false),
    created_at: z.string().optional(),
    updated_at: z.string().optional(),
});
