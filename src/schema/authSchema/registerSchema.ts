import { z } from 'zod';

export const registerSchema = z
    .object({
        first_name: z
            .string()
            .trim()
            .nonempty('First name is required')
            .max(50, 'Max 50 characters'),
        last_name: z.string().trim().max(50, 'Max 50 characters').nullish(),
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
            .nonempty('Password is required')
            .min(6, 'Password too short')
            .max(50, 'Password too long')
            .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[^a-zA-Z0-9]).*$/, {
                message: 'Password too weak',
            }),
        confirm_password: z
            .string()
            .trim()
            .min(1, 'Please confirm your password'),
    })
    .refine((data) => data.password === data.confirm_password, {
        message: "Passwords don't match",
        path: ['confirm_password'],
    });
