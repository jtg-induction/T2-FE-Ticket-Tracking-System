import { Link, useParams } from 'react-router';

import {
    ArrowBack as ArrowBackIcon,
    Edit as EditIcon,
    InfoOutlined,
    LinkOutlined,
    Save as SaveIcon,
    Unarchive as UnarchiveIcon,
} from '@mui/icons-material';
import {
    Alert,
    Box,
    Button,
    Checkbox,
    Collapse,
    Grid2 as Grid,
    Stack,
    TextField,
    Tooltip,
    Typography,
} from '@mui/material';

import { CustomIconButton, ErrorSnackbar, LoadingOverlay } from '@component';
import { useDocumentTitle, useProjectForm } from '@hook';

import { StyledMainContent } from './ProjectDetail.style';

export const ProjectDetail = () => {
    const { projectId } = useParams<{ projectId: string }>();
    const {
        project,
        formValues,
        errors,
        isEditing,
        loading,
        handleToggleEdit,
        handleSave,
        navigate,
        handleUnarchive,
        createError,
        updateError,
        form: { register },
    } = useProjectForm(projectId);

    useDocumentTitle(
        !loading && project
            ? `${project.title} (${project.jira_project_key})`
            : 'Project',
    );

    if (loading) {
        return <LoadingOverlay />;
    }

    if (!project) {
        return <Alert severity="error">Project not found.</Alert>;
    }

    return (
        <StyledMainContent>
            <Stack
                direction="row"
                alignItems={{ xs: 'flex-start', sm: 'center' }}
                justifyContent="space-between"
                paddingBottom={4}
            >
                <Stack
                    direction="row"
                    alignItems="center"
                    minWidth={0}
                    flex={1}
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
                        title={isEditing ? formValues.title : project.title}
                        variant="h5"
                        fontWeight={600}
                        minWidth={0}
                        flex={1}
                    >
                        {isEditing ? formValues.title : project.title}
                        {project.is_archived && (
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

                <Stack
                    direction="row"
                    spacing={1}
                    minWidth={160}
                    justifyContent="flex-end"
                >
                    {!project.is_archived && (
                        <Tooltip title="Unarchive Project">
                            <CustomIconButton
                                variant="outlined"
                                aria-label="Unarchive project"
                                onClick={() => void handleUnarchive()}
                                sx={{
                                    visibility: project.is_archived
                                        ? 'visible'
                                        : 'hidden',
                                }}
                            >
                                <UnarchiveIcon fontSize="medium" />
                            </CustomIconButton>
                        </Tooltip>
                    )}

                    {isEditing ? (
                        <Stack direction="row" spacing={2}>
                            <Button
                                variant="outlined"
                                color="error"
                                size="medium"
                                onClick={() => handleToggleEdit(false)}
                            >
                                Cancel
                            </Button>
                            <Button
                                variant="contained"
                                color="primary"
                                size="medium"
                                startIcon={<SaveIcon />}
                                disabled={loading}
                                type="submit"
                                form="project-form"
                            >
                                Save
                            </Button>
                        </Stack>
                    ) : (
                        <Button
                            variant="contained"
                            startIcon={<EditIcon />}
                            onClick={() => handleToggleEdit(true)}
                            disabled={!project.can_edit || project.is_archived}
                            sx={{
                                visibility:
                                    project.can_edit && !project.is_archived
                                        ? 'visible'
                                        : 'hidden',
                            }}
                        >
                            Edit
                        </Button>
                    )}
                </Stack>
            </Stack>

            <Box
                component="form"
                id="project-form"
                onSubmit={(e) => void handleSave(e)}
                noValidate
            >
                <Collapse in={isEditing}>
                    <Stack
                        direction="row"
                        alignItems="center"
                        spacing={2}
                        pb={2}
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
                </Collapse>

                <Grid container spacing={3}>
                    <Grid size={{ xs: 12, md: 6 }}>
                        <TextField
                            fullWidth
                            label="Project Title"
                            {...register('title')}
                            disabled={!isEditing}
                            error={!!errors.title}
                            helperText={errors.title?.message ?? ' '}
                        />
                    </Grid>

                    <Grid size={{ xs: 12, md: 6 }}>
                        <TextField
                            fullWidth
                            label="Jira Project Key"
                            {...register('jira_project_key')}
                            disabled
                            error={!!errors.jira_project_key}
                            slotProps={{
                                input: {
                                    endAdornment: (
                                        <Tooltip title="Unique key of the project on external Jira site">
                                            <InfoOutlined
                                                sx={{ fontSize: '2rem' }}
                                            />
                                        </Tooltip>
                                    ),
                                },
                            }}
                        />
                    </Grid>

                    <Grid size={12}>
                        <TextField
                            fullWidth
                            label="Site URL"
                            {...register('site_url')}
                            disabled
                            error={!!errors.site_url}
                            helperText={errors.site_url?.message ?? ' '}
                            slotProps={{
                                input: {
                                    endAdornment: (
                                        <Link to={formValues.site_url}>
                                            <Tooltip title="External site URL of the project on Jira">
                                                <LinkOutlined
                                                    sx={{ fontSize: '2rem' }}
                                                />
                                            </Tooltip>
                                        </Link>
                                    ),
                                },
                            }}
                        />
                    </Grid>

                    <Grid size={12}>
                        <TextField
                            fullWidth
                            multiline
                            rows={15}
                            label="Description"
                            {...register('description')}
                            disabled={!isEditing}
                            error={!!errors.description}
                            helperText={errors.description?.message ?? ' '}
                        />
                    </Grid>
                </Grid>
            </Box>

            <ErrorSnackbar
                error={createError || updateError}
                onClose={() => {}}
                autoHideDuration={6000}
            />
        </StyledMainContent>
    );
};
