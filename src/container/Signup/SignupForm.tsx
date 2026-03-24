import { useNavigate } from 'react-router';

import { InfoOutlined } from '@mui/icons-material';
import {
    Alert,
    Button,
    FormLabel,
    TextField,
    Tooltip,
    Typography,
} from '@mui/material';

import { PATHS } from '@constant';
import { useSignupForm } from '@hook';

import { StyledSignupContainer, StyledSignupForm } from './SignupForm.style';

export const SignupForm = () => {
    const navigate = useNavigate();
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

                <FormLabel
                    htmlFor="email"
                    sx={{ display: 'flex', alignItems: 'center', gap: 1 }}
                >
                    Email{' '}
                    <Tooltip title="Verification link will be sent on this email">
                        <InfoOutlined
                            sx={{
                                fontSize: 16,
                                color: 'text.disabled',
                            }}
                        />
                    </Tooltip>
                </FormLabel>
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
                    <Button onClick={() => void navigate(PATHS.LOGIN)}>
                        Login
                    </Button>
                </Typography>
            </StyledSignupForm>
        </StyledSignupContainer>
    );
};
