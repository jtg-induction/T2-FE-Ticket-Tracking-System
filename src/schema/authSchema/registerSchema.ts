import { z } from 'zod';

export const registerSchema = z
    .object({
        first_name: z
            .string()
            .trim()
            .nonempty('First name is required')
            .max(50, 'First name can not be more then 50 characters long'),
        last_name: z
            .string()
            .trim()
            .nonempty('Last name is required')
            .max(50, 'Last name can not be more than 50 characters long'),
        jira_id: z
            .string()
            .trim()
            .nonempty('Jira ID is required')
            .max(50, 'Enter a valid Jira ID'),
        jira_api_token: z
            .string()
            .trim()
            .nonempty('Jira API Token is required')
            .max(256, 'Enter a valid Jira API Token'),
        password: z
            .string()
            .trim()
            .min(6, 'Minimum 6 characters required')
            .max(50, 'Password too long')
            .regex(/[A-Z]/, {
                message: 'Password must contain at least one uppercase letter',
            })
            .regex(/[a-z]/, {
                message: 'Password must contain at least one lowercase letter',
            })
            .regex(/[0-9]/, {
                message: 'Password must contain at least one number',
            })
            .regex(/[^a-zA-Z0-9]/, {
                message: 'Password must contain at least one special character',
            }),
        confirm_password: z
            .string()
            .trim()
            .min(1, 'Please confirm your password'),
    })
    .refine((data) => data.password === data.confirm_password, {
        message: "Passwords don't match",
        path: ['confirmPassword'],
    });
