import { ChangeEvent, FocusEvent, FormEvent, useState } from 'react';

import { useAuth } from '@context';
import { loginApi } from '@service';

export function useLoginForm() {
    const { login } = useAuth();
    const [values, setValues] = useState({
        email: '',
        password: '',
    });

    const [errors, setErrors] = useState({
        email: '',
        password: '',
    });

    const [touched, setTouched] = useState({
        email: false,
        password: false,
    });

    const [formError, setFormError] = useState('');
    const [loading, setLoading] = useState(false);

    const validate = (currentValues = values) => {
        const newErrors = { email: '', password: '' };
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

        if (touched[name as 'email' | 'password']) {
            validate(newValues);
        }
    };

    const handleBlur = (e: FocusEvent<HTMLInputElement>) => {
        const { name } = e.target;
        setTouched((prev) => ({
            ...prev,
            [name]: true,
        }));
        validate();
    };

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        setFormError('');

        setTouched({ email: true, password: true });
        const isValid = validate();

        if (!isValid) return;

        try {
            setLoading(true);
            const data = await loginApi({
                email: values.email,
                password: values.password,
            });
            login(data);
        } catch (err) {
            const message = err instanceof Error ? err.message : 'Login failed';
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
        loading,
        handleChange,
        handleBlur,
        handleSubmit,
    };
}
