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
} from '@mui/material';

import { TicketPriority, TicketStatus } from '@constant';
import { useCreateTicket } from '@hook';

interface Props {
    open: boolean;
    onClose: () => void;
    projectId: string;
    initialStatus: TicketStatus;
}

export const CreateTicketModal = ({
    open,
    onClose,
    projectId,
    initialStatus,
}: Props) => {
    const {
        form,
        onSubmit,
        members,
        isSearching,
        isSubmitting,
        setSearchTerm,
    } = useCreateTicket(projectId, onClose, initialStatus);

    const {
        register,
        formState: { errors },
        setValue,
    } = form;

    return (
        <Dialog
            open={open}
            onClose={() => {
                onClose();
            }}
            fullWidth
            maxWidth="sm"
        >
            <DialogTitle>Create New Ticket</DialogTitle>
            <Form onSubmit={() => void onSubmit()}>
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
                        <Stack direction="row" spacing={2}>
                            <TextField
                                select
                                fullWidth
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
                                slotProps={{
                                    inputLabel: {
                                        shrink: true,
                                    },
                                }}
                                {...register('deadline')}
                                error={!!errors.deadline}
                            />
                            <Autocomplete
                                fullWidth
                                options={members}
                                getOptionLabel={(option) =>
                                    `${option.first_name} ${option.last_name}`
                                }
                                loading={isSearching}
                                onInputChange={(_, value) =>
                                    setSearchTerm(value)
                                }
                                onChange={(_, value) =>
                                    setValue('assignee', value?.user_id || '')
                                }
                                renderInput={(params) => (
                                    <TextField
                                        {...params}
                                        label="Assignee"
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
                                                            params.InputProps
                                                                .endAdornment
                                                        }
                                                    </>
                                                ),
                                            },
                                        }}
                                    />
                                )}
                            />
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
        </Dialog>
    );
};
