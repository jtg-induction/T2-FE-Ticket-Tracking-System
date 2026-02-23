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

import { LoginInner, LoginRoot } from './loginForm.style';
import { useLoginForm } from './useLoginForm.hook';

export const LoginForm = () => {
    const {
        values,
        loading,
        handleChange,
        handleSubmit,
        formError,
        errors,
        handleBlur,
        touched,
    } = useLoginForm();

    return (
        <LoginRoot>
            <LoginInner
                component="form"
                onSubmit={(e) => {
                    void handleSubmit(e);
                }}
                noValidate
            >
                {formError && <Alert severity="error">{formError}</Alert>}

                {/* Email Field */}
                <FormControl>
                    <FormLabel htmlFor="email">Email</FormLabel>
                    <TextField
                        value={values.email}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        error={touched.email && !!errors.email}
                        helperText={
                            touched.email && errors.email ? errors.email : ''
                        }
                        id="email"
                        type="email"
                        name="email"
                        placeholder="Enter your email"
                        autoComplete="email"
                        required
                        fullWidth
                        variant="outlined"
                        color={false ? 'error' : 'primary'}
                    />
                </FormControl>

                {/* Password */}
                <FormControl>
                    <FormLabel htmlFor="password">Password</FormLabel>
                    <TextField
                        value={values.password}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        error={touched.password && !!errors.password}
                        helperText={
                            touched.password &&
                            errors.password &&
                            errors.password
                        }
                        name="password"
                        placeholder="Enter your password"
                        type="password"
                        id="password"
                        autoComplete="password"
                        required
                        fullWidth
                        variant="outlined"
                    />
                </FormControl>

                <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    onClick={(e) => {
                        void handleSubmit(e);
                    }}
                    disabled={loading}
                >
                    {loading ? 'Logging in...' : 'Login'}
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
