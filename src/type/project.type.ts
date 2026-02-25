export interface Project {
    id: string;
    jira_id: string;
    site_url: string;
    jira_project_key: string;
    title: string;
    description: string;
    owner_id: string;
    can_edit: boolean;
    is_archived: boolean;
    created_at: string;
    updated_at: string;
}

export interface ProjectRequest {
    title: string;
    description?: string;
    site_url?: string;
    jira_project_key?: string;
    is_archived?: boolean;
}
