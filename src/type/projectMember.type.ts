export interface ProjectMember {
    user_id: string;
    email: string;
    jira_id: string;
    first_name: string;
    last_name: string;
    about: string | null;
    role: 'owner' | 'admin' | 'member';
    dob: string | null;
    created_at: string;
}
