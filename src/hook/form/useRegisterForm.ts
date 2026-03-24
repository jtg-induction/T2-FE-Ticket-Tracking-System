import { useState } from 'react';

import { useForm } from 'react-hook-form';

import { useAppDispatch } from '@hook';
import { zodResolver } from '@hookform/resolvers/zod';
import { registerSchema } from '@schema';
import { useRegisterMutation } from '@service';
import { setCredentials } from '@store';
import { ErrorResponse, RegisterFormValues } from '@type';

export const useRegisterForm = (tokenFromUrl: string) => {
    const dispatch = useAppDispatch();
    const [registerTrigger, { isLoading }] = useRegisterMutation();
    const [formError, setFormError] = useState('');

    const {
        watch,
        register,
        handleSubmit,
        setError,
        formState: { errors, isValid },
    } = useForm<RegisterFormValues>({
        resolver: zodResolver(registerSchema),
        mode: 'onChange',
        defaultValues: {
            first_name: '',
            last_name: '',
            jira_id: '',
            jira_api_token: '',
            password: '',
            confirm_password: '',
        },
    });

    const onSubmit = async (values: RegisterFormValues) => {
        setFormError('');
        try {
            const response = await registerTrigger({
                ...values,
                token: tokenFromUrl,
            }).unwrap();

            if (response.data.access) {
                dispatch(setCredentials(response.data.access));
            }
        } catch (err) {
            const apiError = err as ErrorResponse;

            const firstErrorMessage = apiError.errors
                ? Object.values(apiError.errors).flat()[0]
                : null;

            setFormError(
                firstErrorMessage || apiError.message || 'Registration failed',
            );

            if (apiError.errors) {
                const fieldMapping: Record<string, keyof RegisterFormValues> = {
                    first_name: 'first_name',
                    last_name: 'last_name',
                    jira_id: 'jira_id',
                    jira_api_token: 'jira_api_token',
                    password: 'password',
                };

                Object.entries(apiError.errors).forEach(
                    ([backendKey, messages]) => {
                        const frontendKey =
                            fieldMapping[backendKey] || backendKey;

                        setError(frontendKey, {
                            type: 'server',
                            message: Array.isArray(messages)
                                ? messages[0]
                                : messages,
                        });
                    },
                );
            }
        }
    };

    return {
        watch,
        register,
        handleSubmit: handleSubmit(onSubmit),
        errors,
        isValid,
        formError,
        isLoading,
    };
};
