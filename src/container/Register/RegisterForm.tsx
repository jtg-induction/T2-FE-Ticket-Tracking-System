import { useNavigate, useSearchParams } from 'react-router';

import {
    Alert,
    Button,
    FormControl,
    FormLabel,
    Stack,
    TextField,
    Typography,
} from '@mui/material';

import { PATHS } from '@constant';
import { registerApi } from '@service';

import { RegisterContainer, RegisterInner } from './registerForm.style';
import { useRegisterForm } from './useRegisterForm.hook';

export const RegisterForm = () => {
    const [searchParams] = useSearchParams();
    const navigate = useNavigate();

    const tokenFromUrl = searchParams.get('token') || '';

    const {
        values,
        errors,
        touched,
        formError,
        loading,
        handleChange,
        handleBlur,
        handleSubmit,
    } = useRegisterForm(tokenFromUrl, async (data) => {
        await registerApi(data);
        navigate(PATHS.LOGIN, {
            state: { message: 'Registration complete! Please log in.' },
        });
    });

    if (!tokenFromUrl) {
        return (
            <Alert severity="error">
                Invalid Registration Link. Please check your email.
            </Alert>
        );
    }

    return (
        <RegisterContainer>
            <RegisterInner component="form" onSubmit={handleSubmit} noValidate>
                <Typography variant="h3" fontWeight={600} color="info">
                    Create Account
                </Typography>

                {formError && <Alert severity="error">{formError}</Alert>}

                <Stack spacing="20px">
                    <FormControl fullWidth>
                        <FormLabel>First Name</FormLabel>

                        <TextField
                            placeholder="First Name"
                            name="firstName"
                            value={values.firstName}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            error={touched.firstName && !!errors.firstName}
                            helperText={touched.firstName && errors.firstName}
                            fullWidth
                        />
                    </FormControl>

                    <FormControl fullWidth>
                        <FormLabel>Last Name</FormLabel>

                        <TextField
                            placeholder="Last Name"
                            name="lastName"
                            value={values.lastName}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            error={touched.lastName && !!errors.lastName}
                            helperText={touched.lastName && errors.lastName}
                            fullWidth
                        />
                    </FormControl>

                    <FormControl fullWidth>
                        <FormLabel>Jira ID</FormLabel>

                        <TextField
                            placeholder="Jira ID"
                            name="jiraId"
                            value={values.jiraId}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            error={touched.jiraId && !!errors.jiraId}
                            helperText={touched.jiraId && errors.jiraId}
                            fullWidth
                        />
                    </FormControl>

                    <FormControl fullWidth>
                        <FormLabel>Password</FormLabel>

                        <TextField
                            placeholder="Password"
                            name="password"
                            type="password"
                            value={values.password}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            error={touched.password && !!errors.password}
                            helperText={touched.password && errors.password}
                            fullWidth
                        />
                    </FormControl>

                    <FormControl fullWidth>
                        <FormLabel>Confirm Password</FormLabel>

                        <TextField
                            placeholder="Confirm Password"
                            name="confirmPassword"
                            type="password"
                            value={values.confirmPassword}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            error={
                                touched.confirmPassword &&
                                !!errors.confirmPassword
                            }
                            helperText={
                                touched.confirmPassword &&
                                errors.confirmPassword
                            }
                            fullWidth
                        />
                    </FormControl>
                </Stack>

                <Button
                    type="submit"
                    variant="contained"
                    size="large"
                    disabled={loading}
                    sx={{ mt: 3 }}
                >
                    {loading ? 'Processing...' : 'Complete Registration'}
                </Button>
            </RegisterInner>
        </RegisterContainer>
    );
};
