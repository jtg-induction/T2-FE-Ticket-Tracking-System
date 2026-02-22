import { User } from '@type';

export interface LoginRequest {
    email: string;
    password: string;
}

export interface LoginResponse {
    access: string;
    user: User;
}

export interface SignupResponse {
    message: string;
}

export interface RegisterRequest {
    first_name: string;
    last_name: string;
    password: string;
    jira_id: string;
    token: string;
}

export interface RefreshResponse {
    access: string;
}
