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

    const data: RefreshResponse = await response.json();

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

    const data: LoginResponse = await response.json();

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

    const data = await response.json();

    if (!response.ok) {
        if (data.email && Array.isArray(data.email)) {
            throw new Error(data.email[0]);
        }
        throw new Error(data.message || 'Signup failed');
    }

    return data;
};

// Register API
export const registerApi = async (request: RegisterRequest) => {
    const url = `${API_CONSTANTS.BASE_URL}${API_CONSTANTS.ENDPOINTS.REGISTER}`;

    const response = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(request),
    });

    const data = await response.json();

    if (!response.ok) {
        const errorMsg =
            data.token?.[0] ||
            data.jira_id?.[0] ||
            data.password?.[0] ||
            data.message ||
            'Registration failed';
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
