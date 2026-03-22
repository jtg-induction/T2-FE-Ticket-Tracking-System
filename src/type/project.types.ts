import { z } from 'zod';

import { inviteMemberSchema, projectSchema } from '@schema';

/** Data structure representing a Project, inferred from the project schema. */
export type Project = z.infer<typeof projectSchema>;

/**
 * Specific access levels or permissions assigned within the context of a project.
 */
export const enum ProjectRole {
    Owner = 'owner',
    Admin = 'admin',
    Member = 'member',
}

/** Input data required for the member invitation form. */
export type InviteMemberInput = z.infer<typeof inviteMemberSchema>;
