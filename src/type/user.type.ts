import { z } from 'zod';

import { ROLES } from '@constant';
import { profileSchema } from '@schema';

/**
 * Valid string values for user roles extracted from the ROLES constant.
 */
export type UserRole = (typeof ROLES)[number]['value'];

/**
 * Complete user profile data returned by the API.
 */
export interface UserResponse {
    user_id: string;
    email: string;
    jira_id: string;
    first_name: string;
    last_name: string;
    /** Short bio or description. */
    about: string | null;
    /** Role of the user in their company. */
    role: UserRole;
    /** Date of birth in ISO format or null. */
    dob: string | null;
    created_at: string;
    /** Permissions flag indicating if the current requester can modify this profile. */
    can_edit: boolean;
}

/**
 * The data structure for updating a user profile.
 * Inferred directly from the {@link profileSchema} validation.
 */
export type EditProfileRequest = z.infer<typeof profileSchema>;
