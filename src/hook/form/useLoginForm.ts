import { useState } from 'react';

import { useForm } from 'react-hook-form';

import { useAppDispatch } from '@hook';
import { zodResolver } from '@hookform/resolvers/zod';
import { loginSchema } from '@schema';
import { useLoginMutation, useRefreshMutation } from '@service';
import { setCredentials } from '@store';
import { ErrorResponse, LoginRequest } from '@type';

export function useLoginForm() {
    const dispatch = useAppDispatch();
    const [loginTrigger, { isLoading: isLoginLoading }] = useLoginMutation();
    const [refreshTrigger, { isLoading: isCheckingAuth }] =
        useRefreshMutation();
    const [formError, setFormError] = useState('');
    const [redirectMessage, setRedirectMessage] = useState<string | null>(null);

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
            const checkSession = await refreshTrigger().unwrap();

            if (checkSession.data?.access) {
                setTimeout(() => {
                    dispatch(setCredentials(checkSession.data.access));
                }, 3000);
                setRedirectMessage(
                    'Already logged in with other account. Redirecting to dashboard...',
                );
                return;
            }
        } catch {}

        try {
            const response = await loginTrigger({
                ...values,
                password: btoa(values.password),
            }).unwrap();

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

            setFormError(apiError.message || 'Login failed');
        }
    };

    return {
        redirectMessage,
        register,
        handleSubmit: handleSubmit(onSubmit),
        errors,
        formError,
        isLoading: isLoginLoading || isCheckingAuth,
    };
}
