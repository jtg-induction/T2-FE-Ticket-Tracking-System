import { useSearchParams } from 'react-router';

import { HelpOutlineOutlined } from '@mui/icons-material';
import {
    Alert,
    Button,
    FormLabel,
    Stack,
    TextField,
    Tooltip,
    Typography,
} from '@mui/material';

import { PasswordCheckBox } from '@component';
import { useRegisterForm } from '@hook';

import {
    StyledRegisterContainer,
    StyledRegistrationForm,
} from './RegisterForm.style';

export const RegisterForm = () => {
    const [searchParams] = useSearchParams();
    const tokenFromUrl = searchParams.get('token') || '';
    const {
        watch,
        register,
        handleSubmit,
        errors,
        formError,
        isLoading,
        isValid,
    } = useRegisterForm(tokenFromUrl);

    if (!tokenFromUrl) {
        return <Alert severity="error">Invalid Registration Link.</Alert>;
    }

    return (
        <StyledRegisterContainer>
            <StyledRegistrationForm
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

                <Stack spacing={1}>
                    <FormLabel htmlFor="email">Name *</FormLabel>
                    <Stack direction="row" gap={4}>
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
                    </Stack>
                    <FormLabel
                        htmlFor="Jira ID"
                        sx={{ display: 'flex', alignItems: 'center', gap: 1 }}
                    >
                        Jira Id *
                        <Tooltip title="You can get this Id from Jira application by going to profile section">
                            <HelpOutlineOutlined
                                color="action"
                                sx={{ fontSize: 20 }}
                            />
                        </Tooltip>
                    </FormLabel>
                    <TextField
                        label="Jira ID"
                        {...register('jira_id')}
                        error={!!errors.jira_id}
                        helperText={errors.jira_id?.message}
                        fullWidth
                    />
                    <FormLabel
                        htmlFor="Jira API Token"
                        sx={{ display: 'flex', alignItems: 'center', gap: 1 }}
                    >
                        Jira API Token *
                        <Tooltip title="You can get or generate new token from Jira application by going to settings > security">
                            <HelpOutlineOutlined
                                color="action"
                                sx={{ fontSize: 20 }}
                            />
                        </Tooltip>
                    </FormLabel>
                    <TextField
                        label="Jira API Token"
                        type="password"
                        {...register('jira_api_token')}
                        error={!!errors.jira_api_token}
                        helperText={errors.jira_api_token?.message}
                        fullWidth
                    />
                    <FormLabel htmlFor="password">Password *</FormLabel>
                    <Stack direction="row" gap={4}>
                        <TextField
                            label="Password"
                            type="password"
                            {...register('password')}
                            error={!!errors.password}
                            helperText={
                                !!errors.password ? (
                                    <PasswordCheckBox
                                        password={watch('password')}
                                    />
                                ) : (
                                    ''
                                )
                            }
                            fullWidth
                        />
                        <TextField
                            label="Confirm Password"
                            type="password"
                            {...register('confirm_password')}
                            error={!!errors.confirm_password}
                            helperText={errors.confirm_password?.message}
                            fullWidth
                            required
                        />
                    </Stack>
                </Stack>

                <Button
                    type="submit"
                    variant="contained"
                    size="large"
                    disabled={isLoading || !isValid}
                >
                    {isLoading ? 'Processing...' : 'Complete Registration'}
                </Button>
            </StyledRegistrationForm>
        </StyledRegisterContainer>
    );
};
