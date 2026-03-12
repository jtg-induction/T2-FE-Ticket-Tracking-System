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
import { useLoginForm } from '@hook';

import { LoginInner, LoginRoot } from './LoginForm.style';

export const LoginForm = () => {
    const { register, handleSubmit, formError, errors, isLoading } =
        useLoginForm();

    return (
        <LoginRoot>
            <LoginInner
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

                <FormControl fullWidth sx={{ mb: 2 }}>
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

                {/* Password */}
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
                <Typography sx={{ textAlign: 'center' }}>
                    Don&apos;t have an account?{' '}
                    <Link
                        component={ReactLink}
                        to={PATHS.SIGNUP}
                        variant="body2"
                    >
                        Sign up
                    </Link>
                </Typography>
            </LoginInner>
        </LoginRoot>
    );
};
