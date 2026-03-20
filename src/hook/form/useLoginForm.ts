import { useState } from 'react';

import { useForm } from 'react-hook-form';

import { useAppDispatch } from '@hook';
import { zodResolver } from '@hookform/resolvers/zod';
import { loginSchema } from '@schema';
import { useLoginMutation } from '@service';
import { setCredentials } from '@store';
import { ErrorResponse, LoginRequest } from '@type';

export function useLoginForm() {
    const dispatch = useAppDispatch();
    const [loginTrigger, { isLoading }] = useLoginMutation();
    const [formError, setFormError] = useState<string>('');

    const {
        register,
        handleSubmit,
        setError,
        formState: { errors },
    } = useForm<LoginRequest>({
        resolver: zodResolver(loginSchema),
        defaultValues: { email: '', password: '' },
    });

    const onSubmit = async (values: LoginRequest) => {
        setFormError('');
        try {
            const response = await loginTrigger(values).unwrap();
            dispatch(setCredentials(response.data.access));
        } catch (err) {
            const apiError = err as ErrorResponse;

            if (apiError.errors) {
                const allErrorMessages = Object.values(apiError.errors).flat();

                if (allErrorMessages.length > 0) {
                    setFormError(allErrorMessages[0]);
                }
            } else {
                setFormError(apiError.message || 'Login failed');
            }

            if (apiError.errors) {
                Object.entries(apiError.errors).forEach(([key, messages]) => {
                    setError(key as keyof LoginRequest, {
                        type: 'server',
                        message: messages[0],
                    });
                });
            }
        }
    };

    return {
        register,
        handleSubmit: handleSubmit(onSubmit),
        errors,
        formError,
        isLoading,
    };
}
