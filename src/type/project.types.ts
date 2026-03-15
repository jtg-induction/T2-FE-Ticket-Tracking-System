import { z } from 'zod';

import { projectSchema } from '@schema';

export type Project = z.infer<typeof projectSchema>;

/**
 * Specific access levels or permissions assigned within the context of a project.
 */
export type ProjectRole = 'admin' | 'owner' | 'member';
