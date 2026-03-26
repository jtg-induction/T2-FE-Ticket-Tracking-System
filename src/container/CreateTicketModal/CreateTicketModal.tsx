import { useEffect } from 'react';

import { Form } from 'react-router';

import {
    Autocomplete,
    Button,
    CircularProgress,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    MenuItem,
    Stack,
    TextField,
    Typography,
} from '@mui/material';

import { ErrorSnackbar } from '@component';
import { TicketPriority, TicketStatus } from '@constant';
import { useCreateTicket } from '@hook';

import { CreateTicketModalProps } from './createTickeModel.types';

export const CreateTicketModal = ({
    open,
    onClose,
    projectId,
    initialStatus,
}: CreateTicketModalProps) => {
    const {
        form,
        onSubmit,
        members,
        isSearching,
        isSubmitting,
        setSearchTerm,
        error,
        clearError,
    } = useCreateTicket(projectId, onClose, initialStatus ?? TicketStatus.ToDo);

    const {
        register,
        formState: { errors },
        setValue,
        watch,
        reset,
    } = form;

    useEffect(() => {
        if (open) {
            reset({
                priority: TicketPriority.Medium,
                category: 'Development',
                status: initialStatus ?? TicketStatus.ToDo,
                name: '',
                description: '',
                assignee: '',
                deadline: '',
            });
        }
    }, [open, initialStatus, reset]);

    const currentAssigneeId = watch('assignee');

    return (
        <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
            <DialogTitle>Create New Ticket</DialogTitle>
            <Form
                onSubmit={(e) => {
                    e.preventDefault();
                    void onSubmit();
                }}
            >
                <DialogContent>
                    <Stack spacing={3} sx={{ mt: 1 }}>
                        <TextField
                            fullWidth
                            label="Ticket Name"
                            {...register('name')}
                            error={!!errors.name}
                            helperText={errors.name?.message}
                        />

                        <TextField
                            fullWidth
                            multiline
                            rows={3}
                            label="Description"
                            {...register('description')}
                            error={!!errors.description}
                            helperText={errors.description?.message}
                        />

                        {!initialStatus && (
                            <TextField
                                select
                                fullWidth
                                label="Status"
                                {...register('status')}
                                error={!!errors.status}
                                helperText={errors.status?.message}
                            >
                                {Object.values(TicketStatus).map((status) => (
                                    <MenuItem key={status} value={status}>
                                        {status}
                                    </MenuItem>
                                ))}
                            </TextField>
                        )}

                        <Stack direction="row" spacing={2}>
                            <TextField
                                select
                                fullWidth
                                // style={{ width: '50%' }}
                                label="Category"
                                {...register('category')}
                                error={!!errors.category}
                                helperText={errors.category?.message}
                            >
                                {[
                                    'Development',
                                    'Design',
                                    'QA',
                                    'Research',
                                ].map((opt) => (
                                    <MenuItem key={opt} value={opt}>
                                        {opt}
                                    </MenuItem>
                                ))}
                            </TextField>

                            <TextField
                                select
                                fullWidth
                                label="Priority"
                                {...register('priority')}
                                error={!!errors.priority}
                                helperText={errors.priority?.message}
                            >
                                {Object.values(TicketPriority).map((opt) => (
                                    <MenuItem key={opt} value={opt}>
                                        {opt}
                                    </MenuItem>
                                ))}
                            </TextField>
                        </Stack>

                        <Stack direction="row" spacing={2}>
                            <TextField
                                fullWidth
                                label="Deadline"
                                type="datetime-local"
                                slotProps={{ inputLabel: { shrink: true } }}
                                {...register('deadline')}
                                error={!!errors.deadline}
                                helperText={errors.deadline?.message}
                            />
                            <Stack spacing={0.5} sx={{ width: '100%' }}>
                                <Autocomplete
                                    fullWidth
                                    options={members}
                                    value={
                                        members.find(
                                            (m) =>
                                                m.user_id === currentAssigneeId,
                                        ) || null
                                    }
                                    getOptionLabel={(option) =>
                                        `${option.first_name} ${option.last_name}`
                                    }
                                    isOptionEqualToValue={(opt, val) =>
                                        opt.user_id === val.user_id
                                    }
                                    loading={isSearching}
                                    onInputChange={(_, value) =>
                                        setSearchTerm(value)
                                    }
                                    onChange={(_, value) =>
                                        setValue(
                                            'assignee',
                                            value?.user_id || '',
                                            { shouldValidate: true },
                                        )
                                    }
                                    renderInput={(params) => (
                                        <TextField
                                            {...params}
                                            label="Assignee"
                                            error={!!errors.assignee}
                                            slotProps={{
                                                input: {
                                                    ...params.InputProps,
                                                    endAdornment: (
                                                        <>
                                                            {isSearching ? (
                                                                <CircularProgress
                                                                    color="inherit"
                                                                    size={20}
                                                                />
                                                            ) : null}
                                                            {
                                                                params
                                                                    .InputProps
                                                                    .endAdornment
                                                            }
                                                        </>
                                                    ),
                                                },
                                            }}
                                        />
                                    )}
                                />
                                {errors.assignee && (
                                    <Typography
                                        variant="caption"
                                        color="error"
                                        sx={{ ml: 1.5 }}
                                    >
                                        {errors.assignee.message}
                                    </Typography>
                                )}
                            </Stack>
                        </Stack>
                    </Stack>
                </DialogContent>
                <DialogActions sx={{ p: 3 }}>
                    <Button onClick={onClose}>Cancel</Button>
                    <Button
                        type="submit"
                        variant="contained"
                        disabled={isSubmitting}
                    >
                        {isSubmitting ? 'Creating...' : 'Create Ticket'}
                    </Button>
                </DialogActions>
            </Form>
            <ErrorSnackbar error={error} onClose={clearError} />
        </Dialog>
    );
};
