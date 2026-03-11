import CloseIcon from '@mui/icons-material/Close';
import EditIcon from '@mui/icons-material/Edit';
import SaveIcon from '@mui/icons-material/Save';
import {
    Alert,
    Box,
    Button,
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

import { ROLES } from '@constant';
import { convertIsoToDateYear } from '@util';

import {
    FormGrid,
    FullWidthItem,
    getTextFieldStyle,
    HeadingBox,
    StyledContainer,
} from './profilePage.style';
import { useProfileForm } from './useProfilePage.hook';

export const ProfilePage = () => {
    const theme = useTheme();
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
    } = useProfileForm();

    if (loading && !profile) return <Typography>Loading Profile...</Typography>;
    if (fetchError || !profile)
        return <Typography color="error">Error loading profile</Typography>;

    return (
        <StyledContainer
            component="form"
            onSubmit={(e) => {
                void handleSave(e);
            }}
            noValidate
        >
            <HeadingBox>
                <Box>
                    <Typography variant="h3" fontWeight={700}>
                        {profile.first_name} {profile.last_name}
                    </Typography>
                    <Typography variant="h4" color="textDisabled">
                        {ROLES.find((r) => r.value === profile.role)?.label ||
                            profile.role}
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
            </HeadingBox>
            <Divider sx={{ my: 10 }} />
            <FormGrid>
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
                    value={
                        !isEditing
                            ? ROLES.find((r) => r.value === profile.role)
                                  ?.label || profile.role
                            : formValues.role || ''
                    }
                >
                    {isEditing
                        ? ROLES.map((role) => (
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
                    <FullWidthItem>
                        <TextField
                            label="Jira API Token"
                            {...register('jira_api_token')}
                            type="password"
                            fullWidth
                            sx={getTextFieldStyle(theme)}
                            placeholder="••••••••••••••••••••••••••••••••••••••••••••••••"
                            slotProps={{ inputLabel: { shrink: true } }}
                        />
                    </FullWidthItem>
                )}

                <FullWidthItem>
                    <TextField
                        label="About"
                        {...register('about')}
                        fullWidth
                        multiline
                        rows={4}
                        disabled={!isEditing}
                        variant={isEditing ? 'outlined' : 'filled'}
                        sx={getTextFieldStyle(theme)}
                    />
                </FullWidthItem>
            </FormGrid>
            <Snackbar
                open={!!saveError}
                sx={{
                    display: 'flex',
                    width: '100%',
                    justifyContent: 'center',
                }}
            >
                <Alert severity="error">{saveError}</Alert>
            </Snackbar>
        </StyledContainer>
    );
};
