import { Form, useNavigate } from 'react-router';

import {
    ArrowBack,
    Edit,
    Event,
    InfoOutlined,
    Notifications,
    NotificationsOff,
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
    useTheme,
} from '@mui/material';

import { ErrorSnackbar, UserDetailBlock } from '@component';
import { TicketPriority, TicketStatus } from '@constant';
import { useDocumentTitle, useTicketDetail } from '@hook';
import { ErrorPage, LoadingPage } from '@page';
import { Project } from '@type';
import { ErrorResponse } from '@type/standard.types';
import { getStatusColor, toDateTimeLocalValue } from '@util';

import {
    StyledDescriptionContainer,
    StyledDetailView,
    StyledTicketSurface,
} from './TicketDetail.style';

export const TicketDetail = () => {
    const { shadows, zIndex } = useTheme();
    const navigate = useNavigate();
    const {
        projects,
        isSearchingProjects,
        setProjectSearch,
        selectedProject,
        setSelectedProject,
        ticket,
        isEditing,
        setIsEditing,
        form,
        isDirty,
        isValid,
        isLoading,
        isUpdating,
        onSave,
        permissions,
        members,
        isSearching,
        setSearchTerm,
        fetchError,
        updateError,
        clearUpdateError,
        isSubscribed,
        isSubscribing,
        handleSubscriptionToggle,
    } = useTicketDetail();

    useDocumentTitle(
        ticket
            ? `${ticket.jira_id}: ${ticket.name} | ${ticket.project_details?.jira_project_key}`
            : 'Loading Ticket...',
    );

    const {
        register,
        formState: { errors },
        setValue,
        watch,
    } = form;

    const selectedAssigneeId = watch('assignee');
    const displayUser = isEditing
        ? members.find((m) => m.user_id === selectedAssigneeId) || null
        : ticket?.assignee;

    if (isLoading) return <LoadingPage />;

    if (fetchError) return <ErrorPage />;

    if (!ticket)
        return (
            <Typography color="text.secondary">Ticket not found.</Typography>
        );

    const statusOptions = Object.values(TicketStatus).filter(
        (s) =>
            s !== TicketStatus.Closed ||
            (s === TicketStatus.Closed && permissions.role === 'reporter'),
    );

    return (
        <StyledTicketSurface>
            {isUpdating && <LoadingPage />}
            <Stack
                position="sticky"
                top={0}
                direction="row"
                justifyContent="space-between"
                alignItems="center"
                py={3}
                px={4}
                mb={2}
                bgcolor="background.paper"
                boxShadow={shadows[2]}
                zIndex={zIndex.fab}
            >
                <Button
                    startIcon={<ArrowBack />}
                    onClick={() => void navigate(-1)}
                    sx={{ color: 'text.secondary' }}
                >
                    Back
                </Button>
                <Stack direction="row" gap={2}>
                    <Button
                        variant="outlined"
                        startIcon={
                            isSubscribing ? (
                                <CircularProgress size={16} />
                            ) : isSubscribed ? (
                                <NotificationsOff />
                            ) : (
                                <Notifications />
                            )
                        }
                        onClick={() => void handleSubscriptionToggle()}
                        disabled={isSubscribing}
                        color={isSubscribed ? 'error' : 'primary'}
                    >
                        {isSubscribed ? 'Unsubscribe' : 'Subscribe'}
                    </Button>

                    {isEditing && (
                        <Stack direction="row" spacing={2}>
                            <Button
                                fullWidth
                                variant="outlined"
                                color="error"
                                onClick={() => setIsEditing(false)}
                            >
                                Cancel
                            </Button>
                            <Button
                                fullWidth
                                type="submit"
                                form="ticket-detail-form"
                                variant="contained"
                                disabled={!isDirty || isUpdating || !isValid}
                            >
                                Save
                            </Button>
                        </Stack>
                    )}

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
            </Stack>

            <Stack pb={4}>
                <Box sx={{ mb: 4 }}>
                    <Stack
                        direction="row"
                        spacing={1}
                        alignItems="center"
                        mb={1}
                    >
                        <Typography variant="h6">
                            {`${ticket.project_details?.jira_project_key} / `}
                        </Typography>
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
                            {...register('name', {
                                setValueAs: (v: string) => v.trim(),
                            })}
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

                <StyledDescriptionContainer elevation={0}>
                    <Typography variant="subtitle1" fontWeight={700}>
                        Description
                    </Typography>
                    {isEditing && permissions.canEditFields ? (
                        <TextField
                            fullWidth
                            multiline
                            rows={6}
                            placeholder="Describe the task..."
                            {...register('description', {
                                setValueAs: (v: string) =>
                                    v == null ? v : v.trim(),
                            })}
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
                </StyledDescriptionContainer>
            </Stack>

            <StyledDetailView elevation={0}>
                <Form
                    id="ticket-detail-form"
                    onSubmit={(e) => void onSave(e)}
                    noValidate
                >
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
                        mb={3}
                    >
                        <Typography
                            variant="body2"
                            fontWeight={600}
                            color="textSecondary"
                        >
                            Project
                        </Typography>
                        {!isEditing ? (
                            <Stack
                                direction="row"
                                spacing={2}
                                alignItems="center"
                            >
                                <Chip
                                    label={
                                        ticket.project_details?.jira_project_key
                                    }
                                    size="small"
                                    variant="outlined"
                                />
                            </Stack>
                        ) : (
                            <Autocomplete<Project>
                                sx={{ width: 400 }}
                                size="small"
                                options={projects}
                                loading={isSearchingProjects}
                                value={selectedProject}
                                isOptionEqualToValue={(option, value) =>
                                    option.id === value?.id
                                }
                                getOptionLabel={(option) =>
                                    option
                                        ? `[${option.jira_project_key}] ${option.title}`
                                        : ''
                                }
                                onInputChange={(_, val) =>
                                    setProjectSearch(val)
                                }
                                onChange={(_, val) => {
                                    const fallbackProject =
                                        val || ticket.project_details;

                                    setValue(
                                        'project',
                                        fallbackProject?.id ?? '',
                                        {
                                            shouldDirty: true,
                                            shouldValidate: true,
                                        },
                                    );
                                    setSelectedProject(fallbackProject);
                                }}
                                renderInput={(params) => (
                                    <TextField
                                        {...params}
                                        placeholder="Move to project..."
                                    />
                                )}
                                renderOption={(props, option) => {
                                    const { key, ...optionProps } = props;
                                    return (
                                        <MenuItem key={key} {...optionProps}>
                                            <Stack>
                                                <Typography
                                                    variant="body2"
                                                    fontWeight={600}
                                                >
                                                    {option.title}
                                                </Typography>
                                                <Typography
                                                    variant="caption"
                                                    color="text.secondary"
                                                >
                                                    {option.jira_project_key} •{' '}
                                                    {option.site_url}
                                                </Typography>
                                            </Stack>
                                        </MenuItem>
                                    );
                                }}
                            />
                        )}
                    </Stack>

                    <Stack
                        direction="row"
                        justifyContent="space-between"
                        alignItems="center"
                        mb={2}
                    >
                        <Typography
                            variant="body2"
                            fontWeight={600}
                            color="text.secondary"
                        >
                            Status
                        </Typography>
                        {isEditing && permissions.canEditStatus ? (
                            <TextField
                                select
                                size="small"
                                {...register('status')}
                                defaultValue={ticket.status}
                                sx={{ minWidth: 140 }}
                                error={!!errors.status}
                                helperText={errors.status?.message}
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
                                    {...getStatusColor(ticket.status)}
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
                        <Typography
                            variant="body2"
                            fontWeight={600}
                            color="text.secondary"
                        >
                            Priority
                        </Typography>
                        {isEditing && permissions.canEditFields ? (
                            <TextField
                                select
                                size="small"
                                {...register('priority')}
                                defaultValue={ticket.priority}
                                error={!!errors.priority}
                                helperText={errors.priority?.message}
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
                        user={displayUser ?? null}
                        icon={<Person fontSize="inherit" />}
                    />

                    {isEditing && permissions.canEditFields && (
                        <Autocomplete
                            fullWidth
                            options={members}
                            value={
                                members.find(
                                    (m) => m.user_id === selectedAssigneeId,
                                ) || null
                            }
                            isOptionEqualToValue={(option, value) =>
                                option.user_id === value.user_id
                            }
                            getOptionLabel={(option) =>
                                `${option.first_name} ${option.last_name}`
                            }
                            loading={isSearching}
                            onInputChange={(_, value) => setSearchTerm(value)}
                            onChange={(_, value) => {
                                setValue('assignee', value?.user_id ?? '', {
                                    shouldDirty: true,
                                    shouldValidate: true,
                                });
                            }}
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
                    {!!errors.assignee && (
                        <Typography variant="caption" color="error">
                            {errors.assignee?.message}
                        </Typography>
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
                                slotProps={{ inputLabel: { shrink: true } }}
                                {...register('deadline')}
                                defaultValue={
                                    ticket.deadline
                                        ? toDateTimeLocalValue(ticket.deadline)
                                        : ''
                                }
                                error={!!errors.deadline}
                                helperText={errors.deadline?.message}
                            />
                        ) : (
                            <Typography variant="body2" fontWeight={600}>
                                {ticket.deadline
                                    ? new Date(ticket.deadline).toLocaleString()
                                    : 'No deadline set'}
                            </Typography>
                        )}
                    </Box>
                </Form>
            </StyledDetailView>
            <ErrorSnackbar
                error={updateError as ErrorResponse}
                onClose={clearUpdateError}
                autoHideDuration={6000}
            />
        </StyledTicketSurface>
    );
};
