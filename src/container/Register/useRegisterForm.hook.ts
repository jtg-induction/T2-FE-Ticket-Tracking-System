import { ChangeEvent, FocusEvent, FormEvent, useState } from 'react';

import { useRegisterMutation } from '@service';
import { resolveApiError } from '@util';

export const useRegisterForm = (
    tokenFromUrl: string,
    onSuccess: () => void,
) => {
    const [registerTrigger, { isLoading }] = useRegisterMutation();

    const [values, setValues] = useState({
        firstName: '',
        lastName: '',
        jiraId: '',
        jiraApiToken: '',
        password: '',
        confirmPassword: '',
    });

    const [errors, setErrors] = useState<Record<string, string>>({});
    const [touched, setTouched] = useState<Record<string, boolean>>({});
    const [formError, setFormError] = useState('');

    const validate = (currentValues = values) => {
        const newErrors: Record<string, string> = {};

        if (!currentValues.firstName.trim())
            newErrors.firstName = 'First name is required';
        if (!currentValues.lastName.trim())
            newErrors.lastName = 'Last name is required';
        if (!currentValues.jiraId.trim())
            newErrors.jiraId = 'Jira ID is required';
        if (!currentValues.jiraApiToken.trim())
            newErrors.jiraApiToken = 'Jira API Token is required';
        if (!currentValues.password) {
            newErrors.password = 'Password is required';
        } else if (currentValues.password.length < 6) {
            newErrors.password = 'Minimum 6 characters required';
        }
        if (currentValues.password !== currentValues.confirmPassword) {
            newErrors.confirmPassword = 'Passwords do not match';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        const nextValues = { ...values, [name]: value };
        setValues(nextValues);
        setFormError('');
        if (touched[name]) validate(nextValues);
    };

    const handleBlur = (e: FocusEvent<HTMLInputElement>) => {
        const { name } = e.target;
        setTouched((prev) => ({ ...prev, [name]: true }));
        validate();
    };

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        setTouched({
            firstName: true,
            lastName: true,
            jiraId: true,
            password: true,
            confirmPassword: true,
        });

        if (!validate()) return;

        try {
            setFormError('');
            await registerTrigger({
                first_name: values.firstName,
                last_name: values.lastName,
                jira_id: values.jiraId,
                jira_api_token: values.jiraApiToken,
                password: values.password,
                token: tokenFromUrl,
            }).unwrap();

            onSuccess();
        } catch (err) {
            const message = resolveApiError(err);
            setFormError(message);
        }
    };

    return {
        values,
        errors,
        touched,
        formError,
        isLoading,
        handleChange,
        handleBlur,
        handleSubmit,
    };
};
