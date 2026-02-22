import { Link as ReactLink } from 'react-router';

import {
    Alert,
    Button,
    FormControl,
    FormLabel,
    Link,
    TextField,
    Typography,
} from '@mui/material';

import { PATHS } from '@constant';
import { signupApi } from '@service';

import { SignupInner, SignupRoot } from './signupForm.style';
import { useSignupForm } from './useSignUpForm.hook';

export const SignupForm = () => {
    const {
        values,
        errors,
        touched,
        formError,
        success,
        loading,
        handleChange,
        handleBlur,
        handleSubmit,
    } = useSignupForm(async (data) => {
        await signupApi(data.email);
    });

    return (
        <SignupRoot>
            <SignupInner component="form" onSubmit={handleSubmit} noValidate>
                {/* Form error*/}
                {formError && <Alert severity="error">{formError}</Alert>}

                {/* Success message */}
                {success && (
                    <Alert severity="success">
                        Verification email sent to {values.email}
                    </Alert>
                )}

                {/* Email Field */}
                <FormControl sx={{ gap: 2 }}>
                    <FormLabel htmlFor="email">Email</FormLabel>
                    <TextField
                        name="email"
                        value={values.email}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        error={touched.email && !!errors.email}
                        helperText={touched.email && errors.email}
                        placeholder="your@email.com"
                        fullWidth
                        required
                    />
                </FormControl>

                <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    disabled={loading || success}
                >
                    {loading ? 'Sending...' : 'Send Verification Email'}
                </Button>
                <Typography sx={{ textAlign: 'center' }}>
                    Already have an account?{' '}
                    <Link
                        component={ReactLink}
                        to={PATHS.LOGIN}
                        variant="body2"
                    >
                        Sign in
                    </Link>
                </Typography>
            </SignupInner>
        </SignupRoot>
    );
};
