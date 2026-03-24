import { useParams } from 'react-router';

import {
    ArrowBack as ArrowBackIcon,
    Edit as EditIcon,
    Save as SaveIcon,
    Unarchive as UnarchiveIcon,
} from '@mui/icons-material';
import {
    Box,
    Button,
    Checkbox,
    CircularProgress,
    Grid2 as Grid,
    Paper,
    Stack,
    TextField,
    Tooltip,
    Typography,
} from '@mui/material';

import { CustomIconButton, ErrorSnackbar } from '@component';
import { useProjectForm } from '@hook';

export const ProjectDetail = () => {
    const { projectId } = useParams<{ projectId: string }>();
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
        handleUnarchive,
        createError,
        updateError,
    } = useProjectForm(projectId ?? '');

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
        <Paper sx={{ p: 4 }}>
            <Stack
                direction="row"
                alignItems={{ xs: 'flex-start', sm: 'center' }}
                justifyContent="space-between"
                paddingBottom={4}
            >
                <Stack
                    direction="row"
                    alignItems="center"
                    sx={{ minWidth: 0, flex: 1 }}
                >
                    <CustomIconButton
                        variant="standard"
                        aria-label="Go back"
                        onClick={() => void navigate(-1)}
                        size="small"
                        sx={{ flexShrink: 0, mr: 1 }}
                    >
                        <ArrowBackIcon />
                    </CustomIconButton>

                    <Typography
                        title={pageTitle}
                        variant="h5"
                        fontWeight={600}
                        minWidth={0}
                        flex={1}
                    >
                        {pageTitle}
                        {project?.is_archived && (
                            <Typography
                                component="span"
                                color="error"
                                ml={2}
                                display="inline"
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
                                    onClick={() => handleToggleEdit(false)}
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

            <Box
                component="form"
                id="project-form"
                onSubmit={(e) => void handleSave(e)}
                noValidate
            >
                {!isNew && isEditing && (
                    <Stack
                        direction="row"
                        alignItems="center"
                        spacing={2}
                        py={2}
                    >
                        <Checkbox
                            {...register('is_archived')}
                            color="error"
                            size="small"
                        />
                        <Typography
                            variant="body2"
                            color={
                                formValues.is_archived ? 'error' : 'textPrimary'
                            }
                        >
                            {formValues.is_archived
                                ? 'This project will be archived on save'
                                : 'Archive this project'}
                        </Typography>
                    </Stack>
                )}
                <Grid container spacing={3}>
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
                            title={formValues.jira_project_key}
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
                            title={formValues.site_url}
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
            <ErrorSnackbar
                error={createError || updateError}
                onClose={() => {}}
                autoHideDuration={6000}
            />
        </Paper>
    );
};
