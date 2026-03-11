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

import { SignupInner, SignupRoot } from './signupForm.style';
import { useSignupForm } from './useSignUpForm.hook';

export const SignupForm = () => {
    const {
        register,
        handleSubmit,
        errors,
        formError,
        emailValue,
        success,
        loading,
    } = useSignupForm();

    return (
        <SignupRoot>
            <SignupInner
                component="form"
                onSubmit={(e) => {
                    void handleSubmit(e);
                }}
                noValidate
            >
                {formError && (
                    <Alert severity="error" sx={{ mb: 2 }}>
                        {formError}
                    </Alert>
                )}

                {success && (
                    <Alert severity="success" sx={{ mb: 2 }}>
                        Verification email sent to {emailValue}
                    </Alert>
                )}

                <FormControl fullWidth sx={{ mb: 2 }}>
                    <FormLabel htmlFor="email">Email</FormLabel>
                    <TextField
                        {...register('email')}
                        id="email"
                        error={!!errors.email}
                        helperText={errors.email?.message}
                        placeholder="your@email.com"
                        fullWidth
                        required
                        disabled={loading || success}
                    />
                </FormControl>

                <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    disabled={loading || success}
                >
                    {loading
                        ? 'Sending...'
                        : success
                          ? 'Verification Email sent'
                          : 'Send Verification Email'}
                </Button>

                <Typography sx={{ textAlign: 'center', mt: 2 }}>
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
