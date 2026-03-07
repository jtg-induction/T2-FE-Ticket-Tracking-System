import { ROLES } from '@constant';

export type UserRole = (typeof ROLES)[number]['value'];

export interface User {
    user_id: string;
    email: string;
    first_name: string;
    role: UserRole;
    jira_id: string;
}

export interface UserResponse {
    user_id: string;
    email: string;
    jira_id: string;
    first_name: string;
    last_name: string;
    about: string | null;
    role: UserRole;
    dob: string | null;
    created_at: string;
    canEdit: boolean;
}

export interface EditProfileRequest {
    first_name: string;
    last_name: string;
    about: string | null;
    role: UserRole;
    dob: string | null;
    jira_api_token?: string;
}
