import z from 'zod';

import { projectSchema } from '@schema';

/**
 * Specific access levels or permissions assigned within the context of a project.
 */
export const enum ProjectRole {
    Owner = 'owner',
    Admin = 'admin',
    Member = 'member',
}

/**
 * Project class derived form the project schema.
 */
export type Project = z.infer<typeof projectSchema>;
