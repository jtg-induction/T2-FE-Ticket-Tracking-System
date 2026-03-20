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
import { useSignupForm } from '@hook';

import { StyledSignupContainer, StyledSignupForm } from './SignupForm.style';

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
        <StyledSignupContainer>
            <StyledSignupForm
                component="form"
                onSubmit={(e) => {
                    void handleSubmit(e);
                }}
                noValidate
            >
                {formError && <Alert severity="error">{formError}</Alert>}

                {success && (
                    <Alert severity="success">
                        Verification email sent to {emailValue}
                    </Alert>
                )}

                <FormControl fullWidth>
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

                <Typography textAlign="center">
                    Already have an account?{' '}
                    <Link
                        component={ReactLink}
                        to={PATHS.LOGIN}
                        variant="body2"
                    >
                        Sign in
                    </Link>
                </Typography>
            </StyledSignupForm>
        </StyledSignupContainer>
    );
};
