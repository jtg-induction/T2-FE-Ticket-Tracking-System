import {
    ArrowBack as ArrowBackIcon,
    Edit as EditIcon,
    Save as SaveIcon,
    Unarchive as UnarchiveIcon,
} from '@mui/icons-material';
import {
    Alert,
    AlertTitle,
    Box,
    Button,
    Checkbox,
    CircularProgress,
    Container,
    Grid2 as Grid,
    IconButton,
    Snackbar,
    Stack,
    TextField,
    Tooltip,
    Typography,
    useTheme,
} from '@mui/material';

import { useProjectForm } from './useProjectDetail.hook';

export const ProjectDetailPage = () => {
    const {
        project,
        tempProject,
        isEditing,
        isNew,
        loading,
        handleToggleEdit,
        handleChange,
        handleSave,
        navigate,
        snackbarOpen,
        setSnackbarOpen,
        errorMessages,
        handleUnarchive,
    } = useProjectForm();

    const {
        palette,
        typography: { pxToRem },
    } = useTheme();

    if (loading) {
        return (
            <Box
                display="flex"
                justifyContent="center"
                alignItems="center"
                height="100vh"
            >
                <CircularProgress />
            </Box>
        );
    }

    const isInputDisabled = !isEditing || project?.is_archived;

    return (
        <Box
            sx={{
                height: '100vh',
                display: 'flex',
                flexDirection: 'column',
                overflow: 'hidden',
            }}
        >
            <Box
                sx={{
                    flexShrink: 0,
                    bgcolor: 'background.default',
                    pt: { xs: pxToRem(20), md: pxToRem(40) },
                    pb: pxToRem(20),
                    zIndex: 10,
                    borderBottom: '1px solid',
                    borderColor: 'divider',
                }}
            >
                <Container maxWidth="md">
                    <Stack
                        direction={{ xs: 'column', sm: 'row' }}
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
                            <IconButton
                                onClick={() => void navigate(-1)}
                                size="small"
                                sx={{ flexShrink: 0 }}
                            >
                                <ArrowBackIcon />
                            </IconButton>

                            <Typography
                                fontWeight="bold"
                                noWrap
                                sx={{
                                    fontSize: {
                                        xs: pxToRem(20),
                                        md: pxToRem(32),
                                    },
                                    overflow: 'hidden',
                                    textOverflow: 'ellipsis',
                                }}
                            >
                                {isNew
                                    ? 'Create Project'
                                    : isEditing
                                      ? tempProject.title
                                      : project?.title}
                                {project?.is_archived && (
                                    <Typography
                                        component="span"
                                        color="error.main"
                                        sx={{
                                            ml: 2,
                                            fontSize: {
                                                xs: pxToRem(14),
                                                md: pxToRem(20),
                                            },
                                        }}
                                    >
                                        (Archived)
                                    </Typography>
                                )}
                            </Typography>
                        </Stack>

                        <Stack
                            direction="row"
                            spacing={1}
                            sx={{ flexShrink: 0 }}
                        >
                            {!isNew && project?.is_archived && (
                                <Tooltip title="Unarchive Project">
                                    <IconButton
                                        color="warning"
                                        onClick={() => void handleUnarchive()}
                                        sx={{
                                            borderRadius: pxToRem(8),
                                            border: '1px solid',
                                            borderColor: 'warning.main',
                                            width: pxToRem(40),
                                            height: pxToRem(40),
                                        }}
                                    >
                                        <UnarchiveIcon fontSize="small" />
                                    </IconButton>
                                </Tooltip>
                            )}
                            {!isNew &&
                                !project?.is_archived &&
                                project?.can_edit &&
                                !isEditing && (
                                    <Button
                                        variant="contained"
                                        size="small"
                                        startIcon={<EditIcon />}
                                        onClick={() => handleToggleEdit(true)}
                                        sx={{ borderRadius: pxToRem(8), px: 3 }}
                                    >
                                        Edit
                                    </Button>
                                )}
                            {isEditing && (
                                <Stack direction="row" spacing={1}>
                                    {!isNew && (
                                        <Button
                                            variant="outlined"
                                            color="inherit"
                                            size="small"
                                            onClick={() =>
                                                handleToggleEdit(false)
                                            }
                                            sx={{ borderRadius: pxToRem(8) }}
                                        >
                                            Cancel
                                        </Button>
                                    )}
                                    <Button
                                        variant="contained"
                                        color="primary"
                                        size="small"
                                        startIcon={<SaveIcon />}
                                        onClick={() => {
                                            void handleSave();
                                        }}
                                        sx={{ borderRadius: pxToRem(8) }}
                                    >
                                        {isNew ? 'Create' : 'Save'}
                                    </Button>
                                </Stack>
                            )}
                        </Stack>
                    </Stack>
                </Container>
            </Box>

            <Box
                sx={{
                    flexGrow: 1,
                    overflowY: 'auto',
                    pt: pxToRem(30),
                    pb: pxToRem(100),
                    scrollbarWidth: 'thin',
                    scrollbarColor: `${palette.divider} transparent`,
                }}
            >
                <Container maxWidth="md">
                    <Grid container spacing={3}>
                        {!isNew && isEditing && (
                            <Grid size={12}>
                                <Stack
                                    direction="row"
                                    alignItems="center"
                                    spacing={1}
                                    sx={{
                                        p: 1,
                                        border: '1px solid',
                                        borderColor: 'divider',
                                        borderRadius: 1,
                                    }}
                                >
                                    <Checkbox
                                        name="is_archived"
                                        checked={tempProject.is_archived}
                                        onChange={handleChange}
                                        color="error"
                                        size="small"
                                    />
                                    <Typography
                                        variant="body2"
                                        color={
                                            tempProject.is_archived
                                                ? 'error'
                                                : 'textPrimary'
                                        }
                                    >
                                        {tempProject.is_archived
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
                                name="title"
                                value={
                                    isEditing
                                        ? tempProject.title
                                        : project?.title || ''
                                }
                                onChange={handleChange}
                                disabled={isInputDisabled}
                            />
                        </Grid>

                        <Grid size={{ xs: 12, md: 6 }}>
                            <TextField
                                fullWidth
                                label="Jira Project Key"
                                name="jira_project_key"
                                value={
                                    isEditing
                                        ? tempProject.jira_project_key
                                        : project?.jira_project_key || ''
                                }
                                onChange={handleChange}
                                disabled={!isNew}
                                helperText={
                                    !isNew
                                        ? 'The key is locked for this project.'
                                        : ''
                                }
                            />
                        </Grid>

                        <Grid size={12}>
                            <TextField
                                fullWidth
                                label="Site URL"
                                name="site_url"
                                value={
                                    isEditing
                                        ? tempProject.site_url
                                        : project?.site_url || ''
                                }
                                onChange={handleChange}
                                disabled={!isNew}
                            />
                        </Grid>

                        <Grid size={12}>
                            <TextField
                                fullWidth
                                multiline
                                rows={15}
                                label="Description"
                                name="description"
                                value={
                                    isEditing
                                        ? tempProject.description
                                        : project?.description || ''
                                }
                                onChange={handleChange}
                                disabled={isInputDisabled}
                            />
                        </Grid>
                    </Grid>
                </Container>
            </Box>

            <Snackbar
                open={snackbarOpen}
                autoHideDuration={6000}
                onClose={() => setSnackbarOpen(false)}
                anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
            >
                <Alert
                    onClose={() => setSnackbarOpen(false)}
                    severity="error"
                    variant="filled"
                    sx={{ width: '100%', boxShadow: 3 }}
                >
                    <AlertTitle>Validation Failed</AlertTitle>
                    <Box component="ul" sx={{ m: 0, pl: 2 }}>
                        {errorMessages.map((msg, index) => (
                            <li key={index}>
                                <Typography variant="caption">{msg}</Typography>
                            </li>
                        ))}
                    </Box>
                </Alert>
            </Snackbar>
        </Box>
    );
};
