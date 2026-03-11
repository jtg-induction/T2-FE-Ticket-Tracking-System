import * as z from 'zod';

import { loginSchema, registerSchema, signupSchema } from '@schema';
import { User } from '@type/user.type';

/**
 * Response returned after a successful token refresh.
 */
export interface RefreshResponse {
    /** The new access token. */
    access: string;
}

/**
 * The payload required to authenticate a user.
 * Derived from {@link loginSchema}.
 */
export type LoginRequest = z.infer<typeof loginSchema>;

/**
 * Response returned upon a successful login.
 */
export interface LoginResponse {
    /** The access token. */
    access: string;
    /** The profile data of the authenticated user. */
    user: User;
}

/**
 * Standard response message returned after a signup attempt.
 */
export interface SignupResponse {
    /** Feedback message from the server. */
    message: string;
}

/**
 * The data submitted through the registration form UI.
 * Derived from {@link registerSchema}.
 */
export type RegisterFormValues = z.infer<typeof registerSchema>;

/**
 * The final payload sent to the API for user registration.
 */
export type RegisterRequest = Omit<RegisterFormValues, 'confirm_password'> & {
    /** The registration token from the Email. */
    token: string;
};

/**
 * The data submitted through the signup form UI.
 * Derived from {@link signupSchema}.
 */
export type SignupFormValues = z.infer<typeof signupSchema>;
