export interface User {
    user_id: string;
    email: string;
    first_name: string;
    role: 'SD' | 'Admin' | 'User';
    jira_id: string;
}

export interface UserResponse {
    user_id: string;
    email: string;
    jira_id: string;
    first_name: string;
    last_name: string;
    about: string | null;
    role: string;
    dob: string | null;
    created_at: string;
    canEdit: boolean;
}

export interface EditProfileRequest {
    first_name: string;
    last_name: string;
    about: string | null;
    role: string;
    dob: string | null;
    jira_api_token?: string;
}
