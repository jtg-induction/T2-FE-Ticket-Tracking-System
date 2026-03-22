import { useSearchParams } from 'react-router';

import {
    Close as CloseIcon,
    Edit as EditIcon,
    Save as SaveIcon,
} from '@mui/icons-material';
import {
    Alert,
    Box,
    Button,
    Container,
    Divider,
    Fab,
    MenuItem,
    Snackbar,
    Stack,
    TextField,
    Tooltip,
    Typography,
    useTheme,
} from '@mui/material';

import { FORM, USER_ROLE_OPTIONS } from '@constant';
import { useProfileForm } from '@hook';
import { convertIsoToDateYear } from '@util';

import {
    getTextFieldStyle,
    StyledFormGrid,
    StyledFullWidthItem,
    StyledHeaderBox,
} from './ProfileDetail.style';

export const ProfileDetail = () => {
    const theme = useTheme();
    const [searchParams] = useSearchParams();
    const id = searchParams.get('id') || '';

    const {
        profile,
        isEditing,
        canUserEdit,
        loading,
        fetchError,
        saveError,
        handleToggleEdit,
        handleSave,
        register,
        errors,
        formValues,
        isDirty,
    } = useProfileForm(id);

    if (loading && !profile) return <Typography>Loading Profile...</Typography>;
    if (fetchError || !profile)
        return <Typography color="error">Error loading profile</Typography>;

    const fullName = `${profile.first_name} ${profile.last_name}`;
    const roleLabel =
        USER_ROLE_OPTIONS.find((r) => r.value === profile.role)?.label ||
        profile.role;

    return (
        <Container
            component="form"
            onSubmit={(e) => {
                void handleSave(e);
            }}
            noValidate
            sx={{ padding: 4 }}
        >
            <StyledHeaderBox>
                <Box overflow="hidden">
                    <Typography title={fullName} variant="h3" fontWeight={700}>
                        {fullName}
                    </Typography>
                    <Typography
                        title={roleLabel}
                        variant="h4"
                        color="textDisabled"
                    >
                        {roleLabel}
                    </Typography>
                </Box>
                {canUserEdit && (
                    <Stack direction="row" gap={2}>
                        {isEditing ? (
                            <>
                                <Button
                                    variant="outlined"
                                    startIcon={<CloseIcon />}
                                    onClick={handleToggleEdit}
                                    color="error"
                                >
                                    Cancel
                                </Button>
                                <Button
                                    variant="contained"
                                    type="submit"
                                    startIcon={<SaveIcon />}
                                    disabled={loading || !isDirty}
                                >
                                    {loading ? 'Saving...' : 'Save Changes'}
                                </Button>
                            </>
                        ) : (
                            <Tooltip title="Edit Profile">
                                <Fab
                                    color="primary"
                                    aria-label="edit"
                                    onClick={handleToggleEdit}
                                >
                                    <EditIcon />
                                </Fab>
                            </Tooltip>
                        )}
                    </Stack>
                )}
            </StyledHeaderBox>
            <Divider sx={{ my: 4 }} />
            <StyledFormGrid>
                <TextField
                    label="First Name"
                    {...register('first_name')}
                    error={!!errors.first_name}
                    helperText={errors.first_name?.message}
                    fullWidth
                    disabled={!isEditing}
                    variant={isEditing ? 'outlined' : 'filled'}
                    sx={getTextFieldStyle(theme)}
                />
                <TextField
                    label="Last Name"
                    {...register('last_name')}
                    error={!!errors.last_name}
                    helperText={errors.last_name?.message}
                    fullWidth
                    disabled={!isEditing}
                    variant={isEditing ? 'outlined' : 'filled'}
                    sx={getTextFieldStyle(theme)}
                />
                <TextField
                    label="Date of Birth"
                    {...(isEditing && register('dob'))}
                    {...(!isEditing && {
                        value: profile.dob
                            ? convertIsoToDateYear(profile.dob)
                            : 'Not set',
                    })}
                    type={isEditing ? 'date' : 'text'}
                    fullWidth
                    disabled={!isEditing}
                    variant={isEditing ? 'outlined' : 'filled'}
                    sx={getTextFieldStyle(theme)}
                    slotProps={{ inputLabel: { shrink: true } }}
                />

                <TextField
                    label="Role"
                    {...(isEditing && register('role'))}
                    select={isEditing}
                    fullWidth
                    disabled={!isEditing}
                    variant={isEditing ? 'outlined' : 'filled'}
                    sx={getTextFieldStyle(theme)}
                    value={!isEditing ? roleLabel : formValues.role || ''}
                >
                    {isEditing
                        ? USER_ROLE_OPTIONS.map((role) => (
                              <MenuItem key={role.value} value={role.value}>
                                  {role.label}
                              </MenuItem>
                          ))
                        : null}
                </TextField>
                <TextField
                    label="Email"
                    value={profile.email}
                    fullWidth
                    disabled
                    variant="filled"
                    sx={getTextFieldStyle(theme)}
                />
                <TextField
                    label="Jira ID"
                    value={profile.jira_id}
                    fullWidth
                    disabled
                    variant="filled"
                    sx={getTextFieldStyle(theme)}
                />

                {isEditing && (
                    <StyledFullWidthItem>
                        <TextField
                            label="Jira API Token"
                            {...register('jira_api_token')}
                            error={!!errors.jira_api_token}
                            helperText={errors.jira_api_token?.message}
                            type="password"
                            fullWidth
                            sx={getTextFieldStyle(theme)}
                            placeholder={FORM.MASK_PLACEHOLDER}
                            slotProps={{ inputLabel: { shrink: true } }}
                        />
                    </StyledFullWidthItem>
                )}

                <StyledFullWidthItem>
                    <TextField
                        label="About"
                        {...register('about')}
                        error={!!errors.about}
                        helperText={errors.about?.message}
                        fullWidth
                        multiline
                        rows={4}
                        disabled={!isEditing}
                        variant={isEditing ? 'outlined' : 'filled'}
                        sx={getTextFieldStyle(theme)}
                    />
                </StyledFullWidthItem>
            </StyledFormGrid>
            <Snackbar open={!!saveError}>
                <Alert severity="error">{saveError}</Alert>
            </Snackbar>
        </Container>
    );
};
