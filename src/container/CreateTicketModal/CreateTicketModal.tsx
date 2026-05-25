import { useEffect, useState } from 'react';

import {
    Autocomplete,
    Box,
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
import { TicketCategory, TicketPriority, TicketStatus } from '@constant';
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

    const [deadlineFocused, setDeadlineFocused] = useState(false);
    const deadlineValue = watch('deadline');

    useEffect(() => {
        if (open) {
            reset({
                project: projectId,
                priority: TicketPriority.Medium,
                category: TicketCategory.DEVELOPMENT,
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
            <DialogTitle variant="h4" color="primary" fontWeight={600}>
                Create Ticket
            </DialogTitle>
            <Box
                component="form"
                onSubmit={(e) => {
                    e.preventDefault();
                    void onSubmit();
                }}
                noValidate
            >
                <DialogContent>
                    <Typography
                        variant="caption"
                        color="text.secondary"
                        mb={2}
                        display="block"
                    >
                        * Required fields
                    </Typography>

                    <Stack spacing={3} mt={1}>
                        <TextField
                            fullWidth
                            label="Ticket Name"
                            {...register('name')}
                            error={!!errors.name}
                            helperText={errors.name?.message}
                            required
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
                                defaultValue={TicketStatus.ToDo}
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
                                label="Category"
                                defaultValue={TicketCategory.DEVELOPMENT}
                                {...register('category')}
                                error={!!errors.category}
                                helperText={errors.category?.message}
                            >
                                {Object.values(TicketCategory).map((opt) => (
                                    <MenuItem key={opt} value={opt}>
                                        {opt}
                                    </MenuItem>
                                ))}
                            </TextField>

                            <TextField
                                select
                                fullWidth
                                label="Priority"
                                defaultValue={TicketPriority.Medium}
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
                                {...register('deadline')}
                                error={!!errors.deadline}
                                helperText={errors.deadline?.message}
                                onFocus={() => setDeadlineFocused(true)}
                                onBlur={() => setDeadlineFocused(false)}
                                slotProps={{
                                    inputLabel: {
                                        shrink:
                                            deadlineFocused || !!deadlineValue,
                                    },
                                    htmlInput: {
                                        style: {
                                            colorScheme: 'light',
                                            color:
                                                deadlineFocused || deadlineValue
                                                    ? undefined
                                                    : 'transparent',
                                        },
                                    },
                                }}
                            />
                            <Stack gap={0.5} width="100%">
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
                                        ml={1.5}
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
            </Box>
            <ErrorSnackbar error={error} onClose={clearError} />
        </Dialog>
    );
};
