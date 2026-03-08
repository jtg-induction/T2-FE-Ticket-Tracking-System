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
} from '@mui/material';

import { ROLES } from '@constant';
import { convertIsoToDateYear } from '@util';

import {
    FormGrid,
    FullWidthItem,
    HeadingBox,
    StyledContainer,
    TextFieldStyle,
} from './profilePage.style';
import { useProfileForm } from './useProfilePage.hook';

export const ProfilePage = () => {
    const {
        profile,
        tempProfile,
        isEditing,
        canUserEdit,
        loading,
        fetchError,
        saveError,
        handleToggleEdit,
        handleChange,
        handleSave,
    } = useProfileForm();

    if (loading && !profile) return <Typography>Loading Profile...</Typography>;
    if (fetchError) return <Typography color="error">{fetchError}</Typography>;
    if (!profile) return <Typography>No profile found.</Typography>;

    return (
        <StyledContainer>
            <HeadingBox>
                <Box>
                    <Typography variant="h3" fontWeight={700}>
                        {profile.first_name} {profile.last_name}
                    </Typography>
                    <Typography variant="h4" color="textDisabled">
                        {ROLES.find((r) => r.value === profile.role)?.label ||
                            profile.role ||
                            'Not set'}
                    </Typography>
                </Box>
                {canUserEdit && (
                    <>
                        {isEditing ? (
                            <Stack
                                direction={{ xs: 'column', sm: 'row' }}
                                gap={{ sm: 8 }}
                                mt={8}
                                flexWrap="wrap"
                            >
                                <Button
                                    startIcon={<CloseIcon />}
                                    onClick={handleToggleEdit}
                                    color="inherit"
                                >
                                    Cancel
                                </Button>
                                <Button
                                    variant="contained"
                                    startIcon={<SaveIcon />}
                                    onClick={() => {
                                        void handleSave();
                                    }}
                                >
                                    Save Changes
                                </Button>
                            </Stack>
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
                    </>
                )}
            </HeadingBox>
            <Divider sx={{ my: 10 }} />
            <FormGrid>
                <TextField
                    label="First Name"
                    name="firstName"
                    value={
                        isEditing ? tempProfile.firstName : profile.first_name
                    }
                    onChange={handleChange}
                    fullWidth
                    disabled={!isEditing}
                    variant={isEditing ? 'outlined' : 'filled'}
                    sx={TextFieldStyle}
                />
                <TextField
                    label="Last Name"
                    name="lastName"
                    type="text"
                    value={isEditing ? tempProfile.lastName : profile.last_name}
                    onChange={handleChange}
                    fullWidth
                    disabled={!isEditing}
                    variant={isEditing ? 'outlined' : 'filled'}
                    sx={TextFieldStyle}
                />
                <TextField
                    label="Date of Birth"
                    name="dob"
                    type={isEditing ? 'date' : 'text'}
                    value={
                        isEditing
                            ? tempProfile.dob
                            : convertIsoToDateYear(profile?.dob || '')
                    }
                    onChange={handleChange}
                    fullWidth
                    disabled={!isEditing}
                    variant={isEditing ? 'outlined' : 'filled'}
                    sx={TextFieldStyle}
                    slotProps={{
                        inputLabel: {
                            shrink: true,
                        },
                    }}
                />

                <TextField
                    label="Role"
                    name="role"
                    value={
                        isEditing
                            ? tempProfile.role
                            : ROLES.find((r) => r.value === profile.role)
                                  ?.label ||
                              profile.role ||
                              'Not set'
                    }
                    onChange={handleChange}
                    fullWidth
                    disabled={!isEditing}
                    variant={isEditing ? 'outlined' : 'filled'}
                    sx={TextFieldStyle}
                    select={isEditing}
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
                    name="email"
                    value={profile.email}
                    fullWidth
                    disabled
                    variant="filled"
                    sx={TextFieldStyle}
                />
                <TextField
                    label="Jira ID"
                    name="jiraId"
                    value={profile.jira_id}
                    fullWidth
                    disabled
                    variant="filled"
                    sx={TextFieldStyle}
                />
                {isEditing && (
                    <FullWidthItem>
                        <TextField
                            label="Jira API Token"
                            name="jiraApiToken"
                            type="password"
                            value={tempProfile.jiraApiToken}
                            onChange={handleChange}
                            fullWidth
                            variant="outlined"
                            sx={TextFieldStyle}
                            slotProps={{
                                inputLabel: {
                                    shrink: true,
                                },
                            }}
                            placeholder="••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••"
                        />
                    </FullWidthItem>
                )}
                <FullWidthItem>
                    <TextField
                        label="About"
                        name="about"
                        value={isEditing ? tempProfile.about : profile.about}
                        onChange={handleChange}
                        fullWidth
                        multiline
                        rows={4}
                        disabled={!isEditing}
                        variant={isEditing ? 'outlined' : 'filled'}
                        sx={TextFieldStyle}
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
                <Alert severity="error" variant="filled">
                    {saveError}
                </Alert>
            </Snackbar>
        </StyledContainer>
    );
};
