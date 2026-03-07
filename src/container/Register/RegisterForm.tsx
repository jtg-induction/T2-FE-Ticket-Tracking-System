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
        isLoading,
        handleChange,
        handleBlur,
        handleSubmit,
    } = useRegisterForm(tokenFromUrl, () => {
        void navigate(PATHS.LOGIN, {
            state: { message: 'Registration complete! Please log in.' },
            replace: true,
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
            <RegisterInner
                component="form"
                onSubmit={(e) => {
                    void handleSubmit(e);
                }}
                noValidate
            >
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
                        <FormLabel>Jira API Token</FormLabel>
                        <TextField
                            placeholder="Jira API Token"
                            name="jiraApiToken"
                            type="password"
                            autoComplete="new-password"
                            value={values.jiraApiToken}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            error={
                                touched.jiraApiToken && !!errors.jiraApiToken
                            }
                            helperText={
                                touched.jiraApiToken && errors.jiraApiToken
                            }
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
                    disabled={isLoading}
                    sx={{ mt: 3 }}
                >
                    {isLoading ? 'Processing...' : 'Complete Registration'}
                </Button>
            </RegisterInner>
        </RegisterContainer>
    );
};
