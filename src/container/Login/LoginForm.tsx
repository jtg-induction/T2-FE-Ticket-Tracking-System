import { Link as ReactLink } from 'react-router';

import {
    Alert,
    Button,
    FormControl,
    FormLabel,
    Link,
    Snackbar,
    Stack,
    TextField,
    Typography,
} from '@mui/material';

import { PATHS } from '@constant';
import { useLoginForm } from '@hook';

import { StyledFormWrapper, StyledLoginContainer } from './LoginForm.style';

export const LoginForm = () => {
    const {
        redirectMessage,
        register,
        handleSubmit,
        formError,
        errors,
        isLoading,
    } = useLoginForm();

    return (
        <StyledLoginContainer>
            <Snackbar
                open={!!redirectMessage}
                autoHideDuration={6000}
                anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
            >
                <Alert severity="info" variant="filled" sx={{ width: '100%' }}>
                    {redirectMessage}
                </Alert>
            </Snackbar>
            <StyledFormWrapper
                component="form"
                onSubmit={(e) => {
                    void handleSubmit(e);
                }}
                noValidate
            >
                <Typography variant="h4" fontWeight={600} color="primary">
                    Welcome Back
                </Typography>
                {formError && <Alert severity="error">{formError}</Alert>}

                <FormControl fullWidth>
                    <FormLabel htmlFor="email">Email</FormLabel>
                    <TextField
                        {...register('email')}
                        error={!!errors.email}
                        helperText={errors.email?.message}
                        id="email"
                        type="email"
                        placeholder="Enter your email"
                        autoComplete="email"
                        fullWidth
                    />
                </FormControl>

                <FormControl>
                    <FormLabel htmlFor="password">Password</FormLabel>
                    <TextField
                        {...register('password')}
                        error={!!errors.password}
                        helperText={errors.password?.message}
                        id="password"
                        type="password"
                        placeholder="Enter your password"
                        autoComplete="password"
                        fullWidth
                        variant="outlined"
                    />
                </FormControl>

                <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    disabled={isLoading}
                >
                    {isLoading ? 'Logging in...' : 'Login'}
                </Button>
                <Stack direction="row" spacing={1} justifyContent="center">
                    <Typography color="textSecondary">
                        Don't have an account?
                    </Typography>
                    <Link component={ReactLink} to={PATHS.SIGNUP}>
                        Sign up
                    </Link>
                </Stack>
            </StyledFormWrapper>
        </StyledLoginContainer>
    );
};
