import { z } from 'zod';

import { projectSchema } from '@schema';

export type Project = z.infer<typeof projectSchema>;

/**
 * Specific access levels or permissions assigned within the context of a project.
 */
export const enum ProjectRole {
    Owner = 'owner',
    Admin = 'admin',
    Member = 'member',
}
