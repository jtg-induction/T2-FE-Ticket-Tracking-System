import { useSearchParams } from 'react-router';

import { Alert, Button, Stack, TextField, Typography } from '@mui/material';

import { useRegisterForm } from '@hook';

import { RegisterContainer, RegisterInner } from './RegisterForm.style';

export const RegisterForm = () => {
    const [searchParams] = useSearchParams();
    const tokenFromUrl = searchParams.get('token') || '';
    const { register, handleSubmit, errors, formError, isLoading } =
        useRegisterForm(tokenFromUrl);

    if (!tokenFromUrl) {
        return <Alert severity="error">Invalid Registration Link.</Alert>;
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
                    <TextField
                        label="First Name"
                        {...register('first_name')}
                        error={!!errors.first_name}
                        helperText={errors.first_name?.message}
                        fullWidth
                    />
                    <TextField
                        label="Last Name"
                        {...register('last_name')}
                        error={!!errors.last_name}
                        helperText={errors.last_name?.message}
                        fullWidth
                    />
                    <TextField
                        label="Jira ID"
                        {...register('jira_id')}
                        error={!!errors.jira_id}
                        helperText={errors.jira_id?.message}
                        fullWidth
                    />
                    <TextField
                        label="Jira API Token"
                        type="password"
                        {...register('jira_api_token')}
                        error={!!errors.jira_api_token}
                        helperText={errors.jira_api_token?.message}
                        fullWidth
                    />
                    <TextField
                        label="Password"
                        type="password"
                        {...register('password')}
                        error={!!errors.password}
                        helperText={errors.password?.message}
                        fullWidth
                    />
                    <TextField
                        label="Confirm Password"
                        type="password"
                        {...register('confirm_password')}
                        error={!!errors.confirm_password}
                        helperText={errors.confirm_password?.message}
                        fullWidth
                    />
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
