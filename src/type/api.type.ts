import { User } from '@type/user.type';

export interface RefreshResponse {
    access: string;
}

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
    jira_api_token: string;
    token: string;
}

export type FieldErrors = Record<string, string[] | string>;

export interface ApiErrorData {
    [key: string]: unknown;
    detail?: string;
    message?: string;
    non_field_errors?: string[];
}

export interface ErrorResponse {
    status: number | string;
    data: ApiErrorData;
}
