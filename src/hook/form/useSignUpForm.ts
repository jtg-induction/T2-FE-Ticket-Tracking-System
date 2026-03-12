import { useState } from 'react';

import { useForm } from 'react-hook-form';

import { zodResolver } from '@hookform/resolvers/zod';
import { signupSchema } from '@schema';
import { useSignupMutation } from '@service';
import { ErrorResponse, SignupFormValues } from '@type';

export const useSignupForm = () => {
    const [signupTrigger, { isLoading, isSuccess }] = useSignupMutation();
    const [formError, setFormError] = useState('');

    const {
        register,
        handleSubmit,
        setError,
        watch,
        formState: { errors },
    } = useForm<SignupFormValues>({
        resolver: zodResolver(signupSchema),
        defaultValues: { email: '' },
    });

    const emailValue = watch('email');

    const onSubmit = async (values: SignupFormValues) => {
        setFormError('');
        try {
            await signupTrigger({ email: values.email }).unwrap();
        } catch (err) {
            const apiError = err as ErrorResponse;

            const fieldErrors = apiError.errors
                ? Object.values(apiError.errors).flat()
                : [];
            const bestMessage =
                fieldErrors[0] || apiError.message || 'Signup failed';

            setFormError(bestMessage);

            if (apiError.errors) {
                Object.entries(apiError.errors).forEach(([key, messages]) => {
                    setError(key as keyof SignupFormValues, {
                        type: 'server',
                        message: Array.isArray(messages)
                            ? messages[0]
                            : messages,
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
        emailValue,
        success: isSuccess,
        loading: isLoading,
    };
};
