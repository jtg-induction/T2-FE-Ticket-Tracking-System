import { ChangeEvent, FormEvent, useState } from 'react';

import { useSignupMutation } from '@service';
import { resolveApiError } from '@util';

export const useSignupForm = () => {
    const [signupTrigger, { isLoading, isSuccess }] = useSignupMutation();

    const [values, setValues] = useState({ email: '' });
    const [errors, setErrors] = useState({ email: '' });
    const [touched, setTouched] = useState({ email: false });
    const [formError, setFormError] = useState('');

    const validate = (currentValues = values) => {
        const newErrors = { email: '' };
        let isValid = true;

        if (!currentValues.email) {
            newErrors.email = 'Email is required';
            isValid = false;
        } else if (currentValues.email.length > 255) {
            newErrors.email = 'Email must be 255 characters or less';
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

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        if (success) setSuccess(false);
        if (formError) setFormError('');
        if (!loading) {
            const { name, value } = e.target;
            const newValues = { ...values, [name]: value };

            setValues(newValues);

            if (touched.email) {
                validate(newValues);
            }
        }
    };

    const handleBlur = () => {
        setTouched({ email: true });
        validate();
    };

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        setFormError('');

        if (!validate()) return;

        try {
            await signupTrigger({ email: values.email }).unwrap();
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
        success: isSuccess,
        loading: isLoading,
        handleChange,
        handleBlur,
        handleSubmit,
    };
};
