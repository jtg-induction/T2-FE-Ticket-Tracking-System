import { useState } from 'react';

export const useRegisterForm = (
    tokenFromUrl: string,
    onSubmitApi: (data: any) => Promise<void>,
) => {
    const [values, setValues] = useState({
        firstName: '',
        lastName: '',
        jiraId: '',
        password: '',
        confirmPassword: '',
    });

    const [errors, setErrors] = useState<any>({});
    const [touched, setTouched] = useState<any>({});
    const [formError, setFormError] = useState('');
    const [loading, setLoading] = useState(false);

    const validate = (currentValues = values) => {
        const newErrors: any = {};
        let isValid = true;

        if (!currentValues.firstName) {
            newErrors.firstName = 'First name is required';
            isValid = false;
        }
        if (!currentValues.lastName) {
            newErrors.lastName = 'Last name is required';
            isValid = false;
        }
        if (!currentValues.jiraId) {
            newErrors.jiraId = 'Jira ID is required';
            isValid = false;
        }
        if (!currentValues.password) {
            newErrors.password = 'Password is required';
            isValid = false;
        } else if (currentValues.password.length < 6) {
            newErrors.password = 'Minimum 6 characters required';
            isValid = false;
        }
        if (currentValues.password !== currentValues.confirmPassword) {
            newErrors.confirmPassword = 'Passwords do not match';
            isValid = false;
        }

        setErrors(newErrors);
        return isValid;
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        const nextValues = { ...values, [name]: value };
        setValues(nextValues);
        setFormError('');

        if (touched[name]) {
            validate(nextValues);
        }
    };

    const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
        const { name } = e.target;
        setTouched((prev: any) => ({ ...prev, [name]: true }));
        validate();
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        setTouched({
            firstName: true,
            lastName: true,
            jiraId: true,
            password: true,
            confirmPassword: true,
        });

        // if (!validate()) return;

        try {
            setLoading(true);
            setFormError('');

            await onSubmitApi({
                first_name: values.firstName,
                last_name: values.lastName,
                jira_id: values.jiraId,
                password: values.password,
                token: tokenFromUrl,
            });
        } catch (err: any) {
            setFormError(err?.message || 'Registration failed');
        } finally {
            setLoading(false);
        }
    };

    return {
        values,
        errors,
        touched,
        formError,
        loading,
        handleChange,
        handleBlur,
        handleSubmit,
    };
};
