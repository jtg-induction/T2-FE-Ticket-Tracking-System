import { ChangeEvent, FocusEvent, FormEvent, useState } from 'react';

import { useAppDispatch } from '@hook';
import { useLoginMutation } from '@service';
import { setCredentials } from '@store';
import { resolveApiError } from '@util';

export function useLoginForm() {
    const dispatch = useAppDispatch();

    const [loginTrigger, { isLoading }] = useLoginMutation();

    const [values, setValues] = useState({ email: '', password: '' });
    const [errors, setErrors] = useState({ email: '', password: '' });
    const [touched, setTouched] = useState({ email: false, password: false });
    const [formError, setFormError] = useState('');

    const validate = (currentValues = values) => {
        const newErrors = { email: '', password: '' };
        let isValid = true;
        if (!currentValues.email) {
            newErrors.email = 'Email is required';
            isValid = false;
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(currentValues.email)) {
            newErrors.email = 'Invalid email format';
            isValid = false;
        }
        if (!currentValues.password) {
            newErrors.password = 'Password is required';
            isValid = false;
        }
        setErrors(newErrors);
        return isValid;
    };

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        const newValues = { ...values, [name]: value };
        setValues(newValues);
        if (touched[name as 'email' | 'password']) validate(newValues);
    };

    const handleBlur = (e: FocusEvent<HTMLInputElement>) => {
        const { name } = e.target;
        setTouched((prev) => ({ ...prev, [name]: true }));
        validate();
    };

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        setFormError('');
        setTouched({ email: true, password: true });

        if (!validate()) return;

        try {
            const data = await loginTrigger(values).unwrap();

            dispatch(setCredentials(data.access));
        } catch (err) {
            const errorMessage = resolveApiError(err);
            setFormError(errorMessage);
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
}
