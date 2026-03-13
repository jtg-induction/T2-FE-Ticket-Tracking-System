export interface User {
    user_id: string;
    email: string;
    first_name: string;
    role: 'SD' | 'Admin' | 'User';
    jira_id: string;
}
