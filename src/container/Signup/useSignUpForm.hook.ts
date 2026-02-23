import { useState } from 'react';

export const useSignupForm = (
    onSubmitApi: (data: { email: string }) => Promise<void>,
) => {
    const [values, setValues] = useState({
        email: '',
    });

    const [errors, setErrors] = useState({
        email: '',
    });

    const [touched, setTouched] = useState({
        email: false,
    });

    const [formError, setFormError] = useState('');
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);

    const validate = (currentValues = values) => {
        const newErrors = { email: '' };
        let isValid = true;

        if (!currentValues.email) {
            newErrors.email = 'Email is required';
            isValid = false;
        } else if (
            !/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(
                currentValues.email,
            )
        ) {
            newErrors.email = 'Invalid email format';
            isValid = false;
        }

        setErrors(newErrors);
        return isValid;
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        const newValues = { ...values, [name]: value };

        setValues(newValues);

        if (touched.email) {
            validate(newValues);
        }
    };

    const handleBlur = () => {
        setTouched({ email: true });
        validate();
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setFormError('');
        setSuccess(false);

        const isValid = validate();
        if (!isValid) return;

        try {
            setLoading(true);
            await onSubmitApi(values);
            setSuccess(true);
        } catch (err: unknown) {
            const message =
                err instanceof Error
                    ? err.message
                    : 'Failed to send verification email';
            setFormError(message);
        } finally {
            setLoading(false);
        }
    };

    return {
        values,
        errors,
        touched,
        formError,
        success,
        loading,
        handleChange,
        handleBlur,
        handleSubmit,
    };
};
