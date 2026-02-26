import { API_CONSTANTS } from '@constant';
import {
    LoginRequest,
    LoginResponse,
    RefreshResponse,
    RegisterRequest,
    SignupResponse,
} from '@type';

// Refresh access token API
export const refreshAccessTokenApi = async (): Promise<RefreshResponse> => {
    const url = `${API_CONSTANTS.BASE_URL}${API_CONSTANTS.ENDPOINTS.REFRESH}`;

    const response = await fetch(url, {
        method: 'POST',
        credentials: 'include',
    });

    const data = (await response.json()) as RefreshResponse;

    if (!response.ok) {
        throw new Error('Refresh failed');
    }

    return data;
};

// Login API
export const loginApi = async (
    request: LoginRequest,
): Promise<LoginResponse> => {
    const url = `${API_CONSTANTS.BASE_URL}${API_CONSTANTS.ENDPOINTS.LOGIN}`;

    const response = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(request),
        credentials: 'include',
    });

    const data = (await response.json()) as LoginResponse;

    if (!response.ok) {
        throw new Error('Login failed');
    }

    return data;
};

//Signup API
export const signupApi = async (email: string): Promise<SignupResponse> => {
    const url = `${API_CONSTANTS.BASE_URL}${API_CONSTANTS.ENDPOINTS.SIGNUP}`;

    const response = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
    });

    const data = (await response.json()) as SignupResponse;

    if (!response.ok) {
        if (
            data &&
            typeof data === 'object' &&
            data !== null &&
            'email' in data
        ) {
            const emailField = (data as { email: string }).email;
            if (Array.isArray(emailField)) {
                throw new Error(String(emailField[0]));
            }
        }
        const message = (data as { message?: string }).message;
        throw new Error(
            typeof message === 'string' ? message : 'Signup failed',
        );
    }

    return data;
};

// Register API
export const registerApi = async (
    request: RegisterRequest,
): Promise<unknown> => {
    const url = `${API_CONSTANTS.BASE_URL}${API_CONSTANTS.ENDPOINTS.REGISTER}`;

    const response = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(request),
    });

    // Using unknown because response body is not needed, only status matters (success/error)
    const data: unknown = await response.json();

    if (!response.ok) {
        const d = data as {
            token?: string[];
            jira_id?: string[];
            password?: string[];
            message?: string;
        };
        let errorMsg: string = 'Registration failed';
        if (d.token?.[0]) {
            const val = d.token[0];
            errorMsg = typeof val === 'string' ? val : 'Invalid token';
        } else if (d.jira_id?.[0]) {
            const val = d.jira_id[0];
            errorMsg = typeof val === 'string' ? val : 'Invalid jira_id';
        } else if (d.password?.[0]) {
            const val = d.password[0];
            errorMsg = typeof val === 'string' ? val : 'Invalid password';
        } else if (d.message) {
            const val = d.message;
            errorMsg = typeof val === 'string' ? val : 'Registration failed';
        }
        throw new Error(errorMsg);
    }

    return data;
};

// Logout API
export const logoutApi = async (): Promise<void> => {
    const url = `${API_CONSTANTS.BASE_URL}${API_CONSTANTS.ENDPOINTS.LOGOUT}`;

    const response = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
    });

    await response.json();

    if (!response.ok) {
        throw new Error('Logout Failed');
    }
};
