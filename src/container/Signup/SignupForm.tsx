import { Link as ReactLink } from 'react-router';

import { InfoOutlined } from '@mui/icons-material';
import {
    Alert,
    Button,
    FormLabel,
    Link,
    Stack,
    TextField,
    Tooltip,
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
                <Typography
                    variant="h4"
                    width="100%"
                    textAlign="center"
                    mb={4}
                    fontWeight={600}
                    color="primary"
                >
                    Welcome to Taskider
                </Typography>
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
                    <Typography>Email</Typography>
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
                    sx={{ mt: 2 }}
                >
                    {loading
                        ? 'Sending...'
                        : success
                          ? 'Verification Email sent'
                          : 'Send Verification Email'}
                </Button>
                <Stack direction="row" spacing={1} justifyContent="center">
                    <Typography color="textSecondary">
                        Already have an account?
                    </Typography>
                    <Link component={ReactLink} to={PATHS.LOGIN}>
                        Login
                    </Link>
                </Stack>
            </StyledSignupForm>
        </StyledSignupContainer>
    );
};
