import { useState } from 'react';

import { useSearchParams } from 'react-router';

import {
    HelpOutlineOutlined,
    Visibility,
    VisibilityOff,
} from '@mui/icons-material';
import {
    Alert,
    Button,
    FormHelperText,
    Popover,
    Stack,
    TextField,
    Tooltip,
    Typography,
} from '@mui/material';

import { CustomIconButton, PasswordCheckBox } from '@component';
import { useRegisterForm } from '@hook';

import {
    StyledRegisterContainer,
    StyledRegistrationForm,
} from './RegisterForm.style';

export const RegisterForm = () => {
    const [searchParams] = useSearchParams();
    const tokenFromUrl = searchParams.get('token') || '';
    const { watch, register, handleSubmit, errors, formError, isLoading } =
        useRegisterForm(tokenFromUrl);

    const [passwordAnchor, setPasswordAnchor] = useState<HTMLElement | null>(
        null,
    );
    const [seePassword, setSeePassword] = useState<boolean>(false);

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
                <Typography variant="h3" fontWeight={600} color="primary">
                    Create Account
                </Typography>

                {formError && <Alert severity="error">{formError}</Alert>}

                <Stack gap={4}>
                    <Stack direction="row" gap={4} flexWrap="wrap">
                        <TextField
                            label="First Name"
                            {...register('first_name')}
                            error={!!errors.first_name}
                            required
                            sx={{ flex: '1 1 200px' }}
                        />
                        <TextField
                            label="Last Name"
                            {...register('last_name')}
                            error={!!errors.last_name}
                            sx={{ flex: '1 1 200px' }}
                        />
                    </Stack>
                    <FormHelperText error={true} sx={{ pl: 3, mt: -3 }}>
                        {errors.first_name?.message ||
                            errors.last_name?.message}
                    </FormHelperText>
                    <TextField
                        label="Jira ID"
                        {...register('jira_id')}
                        error={!!errors.jira_id}
                        helperText={errors.jira_id?.message}
                        fullWidth
                        required
                        slotProps={{
                            input: {
                                endAdornment: (
                                    <Tooltip title="You can get this Id from Jira application by going to profile section">
                                        <HelpOutlineOutlined
                                            color="action"
                                            sx={{
                                                fontSize: 24,
                                                cursor: 'help',
                                            }}
                                        />
                                    </Tooltip>
                                ),
                            },
                        }}
                    />
                    <TextField
                        label="Jira API Token"
                        type="password"
                        {...register('jira_api_token')}
                        error={!!errors.jira_api_token}
                        helperText={errors.jira_api_token?.message}
                        fullWidth
                        required
                        slotProps={{
                            input: {
                                endAdornment: (
                                    <Tooltip title="You can get or generate new token from Jira application by going to settings > security">
                                        <HelpOutlineOutlined
                                            color="action"
                                            sx={{
                                                fontSize: 24,
                                                cursor: 'help',
                                            }}
                                        />
                                    </Tooltip>
                                ),
                            },
                        }}
                    />
                    <Stack direction="row" gap={4} flexWrap="wrap">
                        <TextField
                            label="Password"
                            type={seePassword ? 'text' : 'password'}
                            {...register('password')}
                            error={!!errors.password}
                            required
                            onFocus={(e) => setPasswordAnchor(e.currentTarget)}
                            onBlur={() => setPasswordAnchor(null)}
                            helperText={errors.password?.message}
                            sx={{ flex: '1 1 200px' }}
                            slotProps={{
                                input: {
                                    endAdornment: (
                                        <CustomIconButton
                                            variant="standard"
                                            onClick={() =>
                                                setSeePassword(!seePassword)
                                            }
                                            edge="end"
                                            aria-label="toggle password visibility"
                                        >
                                            {seePassword ? (
                                                <Visibility
                                                    sx={{ fontSize: '2rem' }}
                                                />
                                            ) : (
                                                <VisibilityOff
                                                    sx={{ fontSize: '2rem' }}
                                                />
                                            )}
                                        </CustomIconButton>
                                    ),
                                },
                            }}
                        />

                        <Popover
                            open={!!passwordAnchor}
                            anchorEl={passwordAnchor}
                            anchorOrigin={{
                                vertical: 'bottom',
                                horizontal: 'left',
                            }}
                            transformOrigin={{
                                vertical: 'top',
                                horizontal: 'left',
                            }}
                            disableAutoFocus
                            disableEnforceFocus
                            sx={{
                                mt: !!errors.password ? 6 : 1,
                            }}
                        >
                            <PasswordCheckBox password={watch('password')} />
                        </Popover>

                        <TextField
                            label="Confirm Password"
                            type="password"
                            {...register('confirm_password')}
                            error={!!errors.confirm_password}
                            helperText={errors.confirm_password?.message}
                            required
                            sx={{ flex: '1 1 200px' }}
                        />
                    </Stack>
                </Stack>
                <Stack gap={1}>
                    <Typography
                        color="textSecondary"
                        textAlign="right"
                        variant="caption"
                    >
                        All fields marked with * are required
                    </Typography>
                    <Button
                        type="submit"
                        variant="contained"
                        size="large"
                        disabled={isLoading}
                    >
                        {isLoading ? 'Processing...' : 'Complete Registration'}
                    </Button>
                </Stack>
            </StyledRegistrationForm>
        </StyledRegisterContainer>
    );
};
