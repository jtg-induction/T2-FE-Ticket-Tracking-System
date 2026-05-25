import { z } from 'zod';

export const loginSchema = z.object({
    email: z
        .email({
            error: (issue) =>
                issue.input === ''
                    ? 'Email is required'
                    : 'Enter a valid email',
        })
        .trim(),
    password: z.string().trim().nonempty('Password is required'),
});
