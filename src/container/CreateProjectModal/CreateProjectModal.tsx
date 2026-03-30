import { HelpOutline } from '@mui/icons-material';
import {
    Alert,
    Box,
    Button,
    CircularProgress,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    Stack,
    TextField,
    Tooltip,
    Typography,
} from '@mui/material';

import { useProjectForm } from '@hook';

import { CreateProjectModalProps } from './CreateProjectModal.types';

export const CreateProjectModal = ({
    open,
    onClose,
}: CreateProjectModalProps) => {
    const {
        errors,
        handleSave,
        loading,
        createError,
        form: { register, reset },
    } = useProjectForm();

    return (
        <Dialog
            open={open}
            onClose={() => {
                onClose();
                reset(undefined, { keepValues: true });
            }}
            fullWidth
            maxWidth="sm"
        >
            <Box
                component="form"
                onSubmit={(e) => {
                    e.preventDefault();
                    void handleSave(e);
                }}
                noValidate
            >
                <DialogTitle variant="h4" color="primary" fontWeight={600}>
                    Create Project
                </DialogTitle>
                <DialogContent>
                    {!!createError && (
                        <Alert severity="error" sx={{ mb: 2 }}>
                            {createError.message}
                        </Alert>
                    )}
                    <Typography
                        variant="caption"
                        color="text.secondary"
                        mb={3}
                        display="block"
                    >
                        * Required fields
                    </Typography>

                    <Stack gap={4} mt={1}>
                        <Box display="flex" flexWrap="wrap" gap={4}>
                            <TextField
                                fullWidth
                                label="Project Title"
                                {...register('title')}
                                error={!!errors.title}
                                helperText={errors.title?.message}
                                required
                                sx={{ flex: '1 1 300px' }}
                            />
                            <TextField
                                fullWidth
                                label="Jira Project Key"
                                {...register('jira_project_key')}
                                error={!!errors.jira_project_key}
                                helperText={errors.jira_project_key?.message}
                                required
                                sx={{ flex: '1 1 300px' }}
                                slotProps={{
                                    input: {
                                        endAdornment: (
                                            <Tooltip
                                                title={
                                                    <Box textAlign="center">
                                                        Unique identifier for
                                                        your project.
                                                        <br />
                                                        Starts with A-Z (Letters
                                                        & Numbers only).
                                                    </Box>
                                                }
                                            >
                                                <HelpOutline
                                                    color="action"
                                                    sx={{
                                                        fontSize: '2rem',
                                                        cursor: 'help',
                                                    }}
                                                />
                                            </Tooltip>
                                        ),
                                    },
                                }}
                            />
                        </Box>

                        <TextField
                            fullWidth
                            label="Site URL"
                            {...register('site_url')}
                            error={!!errors.site_url}
                            helperText={errors.site_url?.message}
                            required
                            slotProps={{
                                input: {
                                    endAdornment: (
                                        <Tooltip
                                            title={
                                                <Box textAlign="center">
                                                    The full URL of your Jira
                                                    cloud or instance."
                                                    <br />
                                                    (Must end with
                                                    .atlassian.com)
                                                </Box>
                                            }
                                        >
                                            <HelpOutline
                                                color="action"
                                                sx={{
                                                    fontSize: '2rem',
                                                    cursor: 'help',
                                                }}
                                            />
                                        </Tooltip>
                                    ),
                                },
                            }}
                        />

                        <TextField
                            fullWidth
                            multiline
                            rows={4}
                            label="Description"
                            {...register('description')}
                            error={!!errors.description}
                            helperText={errors.description?.message}
                        />
                    </Stack>
                </DialogContent>
                <DialogActions sx={{ p: 3 }}>
                    <Button onClick={onClose}>Cancel</Button>
                    <Button
                        type="submit"
                        variant="contained"
                        disabled={loading}
                    >
                        {loading ? 'Creating...' : 'Create Project'}
                        {loading && (
                            <CircularProgress color="inherit" size={16} />
                        )}
                    </Button>
                </DialogActions>
            </Box>
        </Dialog>
    );
};
