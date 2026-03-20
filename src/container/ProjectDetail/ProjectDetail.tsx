import { useParams } from 'react-router';

import {
    ArrowBack as ArrowBackIcon,
    Edit as EditIcon,
    Save as SaveIcon,
    Unarchive as UnarchiveIcon,
} from '@mui/icons-material';
import {
    Alert,
    Box,
    Button,
    Checkbox,
    CircularProgress,
    Container,
    Grid2 as Grid,
    Snackbar,
    Stack,
    TextField,
    Tooltip,
    Typography,
} from '@mui/material';

import { CustomIconButton } from '@component';
import { useProjectForm } from '@hook';

export const ProjectDetail = () => {
    const { id } = useParams<{ id: string }>();
    const {
        project,
        formValues,
        errors,
        register,
        isEditing,
        isNew,
        loading,
        handleToggleEdit,
        handleSave,
        navigate,
        snackbarOpen,
        setSnackbarOpen,
        errorMessages,
        handleUnarchive,
    } = useProjectForm(id ?? '');

    const pageTitle = isNew
        ? 'Create Project'
        : isEditing
          ? formValues.title
          : project?.title;

    if (loading) {
        return (
            <Box
                display="flex"
                justifyContent="center"
                alignItems="center"
                height="100%"
            >
                <CircularProgress />
            </Box>
        );
    }

    return (
        <Stack maxWidth="md" marginInline="auto" paddingBlock={4} gap={4}>
            <Box>
                <Container>
                    <Stack
                        direction="row"
                        alignItems={{ xs: 'flex-start', sm: 'center' }}
                        justifyContent="space-between"
                        spacing={2}
                    >
                        <Stack
                            direction="row"
                            alignItems="center"
                            spacing={1}
                            sx={{ minWidth: 0 }}
                        >
                            <CustomIconButton
                                variant="standard"
                                aria-label="Go back"
                                onClick={() => void navigate(-1)}
                                size="small"
                                sx={{ flexShrink: 0 }}
                            >
                                <ArrowBackIcon />
                            </CustomIconButton>

                            <Typography variant="h5" fontWeight={600} noWrap>
                                {pageTitle}
                                {project?.is_archived && (
                                    <Typography
                                        component="span"
                                        color="error"
                                        marginLeft={2}
                                    >
                                        (Archived)
                                    </Typography>
                                )}
                            </Typography>
                        </Stack>

                        <Stack direction="row" spacing={1}>
                            {!isNew && project?.is_archived && (
                                <Tooltip title="Unarchive Project">
                                    <CustomIconButton
                                        variant="outlined"
                                        aria-label="Unarchive project"
                                        onClick={() => void handleUnarchive()}
                                    >
                                        <UnarchiveIcon fontSize="medium" />
                                    </CustomIconButton>
                                </Tooltip>
                            )}
                            {!isNew && !project?.is_archived && !isEditing && (
                                <Button
                                    variant="contained"
                                    startIcon={<EditIcon />}
                                    onClick={() => handleToggleEdit(true)}
                                >
                                    Edit
                                </Button>
                            )}
                            {isEditing && (
                                <Stack direction="row" spacing={2}>
                                    {!isNew && (
                                        <Button
                                            variant="outlined"
                                            color="error"
                                            size="medium"
                                            onClick={() =>
                                                handleToggleEdit(false)
                                            }
                                        >
                                            Cancel
                                        </Button>
                                    )}
                                    <Button
                                        variant="contained"
                                        color="primary"
                                        size="medium"
                                        startIcon={<SaveIcon />}
                                        disabled={loading}
                                        type="submit"
                                        form="project-form"
                                    >
                                        {isNew ? 'Create' : 'Save'}
                                    </Button>
                                </Stack>
                            )}
                        </Stack>
                    </Stack>
                </Container>
            </Box>

            <Box>
                <Container>
                    <Box
                        component="form"
                        id="project-form"
                        onSubmit={(e) => void handleSave(e)}
                        noValidate
                    >
                        <Grid container spacing={3}>
                            {!isNew && isEditing && (
                                <Grid size={12}>
                                    <Stack
                                        direction="row"
                                        alignItems="center"
                                        spacing={2}
                                    >
                                        <Checkbox
                                            {...register('is_archived')}
                                            color="error"
                                            size="small"
                                        />
                                        <Typography
                                            variant="body2"
                                            color={
                                                formValues.is_archived
                                                    ? 'error'
                                                    : 'textPrimary'
                                            }
                                        >
                                            {formValues.is_archived
                                                ? 'This project will be archived on save'
                                                : 'Archive this project'}
                                        </Typography>
                                    </Stack>
                                </Grid>
                            )}

                            <Grid size={{ xs: 12, md: 6 }}>
                                <TextField
                                    fullWidth
                                    label="Project Title"
                                    {...register('title')}
                                    disabled={!isEditing && !isNew}
                                    error={!!errors.title}
                                    helperText={errors.title?.message}
                                />
                            </Grid>

                            <Grid size={{ xs: 12, md: 6 }}>
                                <TextField
                                    fullWidth
                                    label="Jira Project Key"
                                    {...register('jira_project_key')}
                                    disabled={!isNew}
                                    error={!!errors.jira_project_key}
                                    helperText={
                                        !isNew
                                            ? 'The key is locked for this project.'
                                            : errors.jira_project_key?.message
                                    }
                                />
                            </Grid>

                            <Grid size={12}>
                                <TextField
                                    fullWidth
                                    label="Site URL"
                                    {...register('site_url')}
                                    disabled={!isNew}
                                    error={!!errors.site_url}
                                    helperText={errors.site_url?.message}
                                />
                            </Grid>

                            <Grid size={12}>
                                <TextField
                                    fullWidth
                                    multiline
                                    rows={15}
                                    label="Description"
                                    {...register('description')}
                                    disabled={!isEditing && !isNew}
                                    error={!!errors.description}
                                    helperText={errors.description?.message}
                                />
                            </Grid>
                        </Grid>
                    </Box>
                </Container>
            </Box>
            <Snackbar
                open={snackbarOpen}
                autoHideDuration={6000}
                onClose={() => setSnackbarOpen(false)}
                anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
            >
                <Alert onClose={() => setSnackbarOpen(false)} severity="error">
                    {errorMessages.map((msg, index) => (
                        <li key={index}>
                            <Typography variant="caption">{msg}</Typography>
                        </li>
                    ))}
                </Alert>
            </Snackbar>
        </Stack>
    );
};
