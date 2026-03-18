import { Form, useNavigate } from 'react-router';

import {
    ArrowBack,
    Edit,
    Event,
    InfoOutlined,
    Person,
    Security,
} from '@mui/icons-material';
import {
    Autocomplete,
    Box,
    Button,
    Chip,
    CircularProgress,
    Divider,
    MenuItem,
    Stack,
    TextField,
    Tooltip,
    Typography,
} from '@mui/material';

import { UserDetailBlock } from '@component';
import { useTicketDetail } from '@hook';
import { LoadingPage } from '@page';
import { TicketPriority, TicketStatus } from '@type/ticket.types';

import {
    StyledDescriptonContainer,
    StyledDetailView,
} from './TicketDetail.style';

export const TicketDetail = () => {
    const navigate = useNavigate();
    const {
        ticket,
        isEditing,
        setIsEditing,
        form,
        isLoading,
        isUpdating,
        onSave,
        permissions,
        members,
        isSearching,
        setSearchTerm,
    } = useTicketDetail();

    const {
        register,
        formState: { errors },
        setValue,
        watch,
    } = form;

    if (isLoading || !ticket)
        return <Typography sx={{ p: 4 }}>Loading...</Typography>;

    const statusOptions = Object.values(TicketStatus).filter(
        (s) =>
            s !== TicketStatus.Closed ||
            (s === TicketStatus.Closed && permissions.role === 'reporter'),
    );

    return (
        <Stack width="100%">
            {isUpdating && <LoadingPage />}
            <Stack
                maxWidth="lg"
                direction="row"
                justifyContent="space-between"
                alignItems="center"
                mb={3}
            >
                <Button
                    startIcon={<ArrowBack />}
                    onClick={() => void navigate(-1)}
                    sx={{ color: 'text.secondary' }}
                >
                    Back
                </Button>

                {!isEditing && permissions.canViewEditButton && (
                    <Button
                        variant="contained"
                        startIcon={<Edit />}
                        onClick={() => setIsEditing(true)}
                        sx={{ borderRadius: 2, px: 3 }}
                    >
                        Edit Ticket
                    </Button>
                )}
            </Stack>

            <Stack>
                <Box sx={{ mb: 4 }}>
                    <Stack
                        direction="row"
                        spacing={1}
                        alignItems="center"
                        mb={1}
                    >
                        <Chip
                            label={ticket.jira_id}
                            size="small"
                            color="primary"
                            sx={{ fontWeight: 800, borderRadius: 1 }}
                        />
                        <Typography
                            variant="h6"
                            color="text.secondary"
                            fontWeight={400}
                        >
                            {`/ ${ticket.category}`}
                        </Typography>
                    </Stack>

                    {isEditing && permissions.canEditFields ? (
                        <TextField
                            fullWidth
                            variant="outlined"
                            label="Ticket Title"
                            {...register('name')}
                            error={!!errors.name}
                            helperText={errors.name?.message}
                            sx={{ mt: 2 }}
                        />
                    ) : (
                        <Typography variant="h4" fontWeight={700} mb={2}>
                            {ticket.name}
                        </Typography>
                    )}
                </Box>

                <StyledDescriptonContainer elevation={0}>
                    <Typography variant="subtitle1" fontWeight={700}>
                        Description
                    </Typography>
                    {isEditing && permissions.canEditFields ? (
                        <TextField
                            fullWidth
                            multiline
                            rows={6}
                            placeholder="Describe the task..."
                            {...register('description')}
                            error={!!errors.description}
                            helperText={errors.description?.message}
                        />
                    ) : (
                        <Typography
                            variant="body1"
                            sx={{ lineHeight: 1.7, whiteSpace: 'pre-wrap' }}
                        >
                            {ticket.description || 'No description provided.'}
                        </Typography>
                    )}
                </StyledDescriptonContainer>
            </Stack>

            <StyledDetailView elevation={0}>
                <Form onSubmit={(e) => void onSave(e)}>
                    <Typography
                        variant="subtitle2"
                        fontWeight={800}
                        mb={3}
                        color="text.secondary"
                    >
                        TICKET DETAILS
                    </Typography>

                    <Stack
                        direction="row"
                        justifyContent="space-between"
                        alignItems="center"
                        mb={2}
                    >
                        <Typography variant="body2" color="text.secondary">
                            Status
                        </Typography>
                        {isEditing && permissions.canEditStatus ? (
                            <TextField
                                select
                                size="small"
                                {...register('status')}
                                defaultValue={ticket.status}
                                sx={{ minWidth: 140 }}
                            >
                                {statusOptions.map((opt) => (
                                    <MenuItem key={opt} value={opt}>
                                        {opt}
                                    </MenuItem>
                                ))}
                            </TextField>
                        ) : (
                            <Stack
                                direction="row"
                                alignItems="center"
                                spacing={1}
                            >
                                <Chip
                                    label={ticket.status}
                                    color="primary"
                                    size="small"
                                    sx={{ fontWeight: 700 }}
                                />
                                {ticket.status !== TicketStatus.Closed &&
                                    permissions.role !== 'reporter' && (
                                        <Tooltip title="Only the Reporter can close this ticket">
                                            <InfoOutlined
                                                sx={{
                                                    fontSize: 16,
                                                    color: 'text.disabled',
                                                }}
                                            />
                                        </Tooltip>
                                    )}
                            </Stack>
                        )}
                    </Stack>

                    <Stack
                        direction="row"
                        justifyContent="space-between"
                        alignItems="center"
                        mb={3}
                    >
                        <Typography variant="body2" color="text.secondary">
                            Priority
                        </Typography>
                        {isEditing && permissions.canEditFields ? (
                            <TextField
                                select
                                size="small"
                                {...register('priority')}
                                defaultValue={ticket.priority}
                                sx={{ minWidth: 140 }}
                            >
                                {Object.values(TicketPriority).map((opt) => (
                                    <MenuItem key={opt} value={opt}>
                                        {opt}
                                    </MenuItem>
                                ))}
                            </TextField>
                        ) : (
                            <Typography variant="body2" fontWeight={700}>
                                {ticket.priority}
                            </Typography>
                        )}
                    </Stack>

                    <Divider sx={{ my: 3 }} />

                    <UserDetailBlock
                        label="Assignee"
                        user={
                            members.find(
                                (m) => m.user_id === watch('assignee'),
                            ) ||
                            ticket.assignee ||
                            null
                        }
                        icon={<Person fontSize="inherit" />}
                    />

                    {isEditing && permissions.canEditFields && (
                        <Autocomplete
                            fullWidth
                            options={members}
                            getOptionLabel={(option) =>
                                `${option.first_name} ${option.last_name}`
                            }
                            loading={isSearching}
                            onInputChange={(_, value) => setSearchTerm(value)}
                            onChange={(_, value) =>
                                setValue('assignee', value?.user_id || '')
                            }
                            defaultValue={ticket.assignee || null}
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
                    )}

                    <UserDetailBlock
                        label="Reporter"
                        user={ticket.reporter}
                        icon={<Security fontSize="inherit" />}
                    />

                    <Divider sx={{ my: 3 }} />

                    <Box sx={{ mb: 3 }}>
                        <Stack
                            direction="row"
                            alignItems="center"
                            spacing={1}
                            mb={1}
                        >
                            <Event fontSize="small" color="action" />
                            <Typography
                                variant="caption"
                                fontWeight={700}
                                color="text.secondary"
                            >
                                DEADLINE
                            </Typography>
                        </Stack>
                        {isEditing && permissions.canEditFields ? (
                            <TextField
                                type="datetime-local"
                                fullWidth
                                size="small"
                                slotProps={{
                                    inputLabel: {
                                        shrink: true,
                                    },
                                }}
                                {...register('deadline')}
                                defaultValue={
                                    ticket.deadline
                                        ? new Date(ticket.deadline)
                                              .toISOString()
                                              .slice(0, 16)
                                        : ''
                                }
                            />
                        ) : (
                            <Typography variant="body2" fontWeight={600}>
                                {ticket.deadline
                                    ? new Date(ticket.deadline).toLocaleString()
                                    : 'No deadline set'}
                            </Typography>
                        )}
                    </Box>

                    {isEditing && (
                        <Stack direction="row" spacing={2}>
                            <Button
                                fullWidth
                                variant="text"
                                onClick={() => setIsEditing(false)}
                                sx={{ color: 'text.secondary' }}
                            >
                                Cancel
                            </Button>
                            <Button
                                fullWidth
                                type="submit"
                                variant="contained"
                                disabled={isUpdating}
                            >
                                Save
                            </Button>
                        </Stack>
                    )}
                </Form>
            </StyledDetailView>
        </Stack>
    );
};
