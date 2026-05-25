import { useState } from 'react';

import { useNavigate, useParams } from 'react-router';

import {
    Add,
    AddCircle as AddCircleIcon,
    ArrowBack,
    BarChart,
    ChevronLeft,
    ChevronRight,
    Circle,
    HelpOutlined,
    Settings,
} from '@mui/icons-material';
import {
    Box,
    Chip,
    CircularProgress,
    IconButton,
    List,
    ListItem,
    ListItemIcon,
    ListItemText,
    Stack,
    Tooltip,
    Typography,
    useTheme,
} from '@mui/material';

import {
    CustomIconButton,
    ErrorOverlay,
    LoadingOverlay,
    TicketCard,
} from '@component';
import {
    PAGE_SIZE,
    PATHS,
    TICKET_PRIORITY_OPTIONS,
    TicketStatus,
} from '@constant';
import { CreateTicketModal } from '@container';
import { useDocumentTitle, useProjectDashboard } from '@hook';
import { ErrorPage } from '@page';
import { getPriorityColor } from '@util';

import {
    StyledColumnHeader,
    StyledFab,
    StyledMainContent,
    StyledScrollableArea,
    StyledTicketColumn,
} from './TicketBoard.style';

export const TicketBoard = () => {
    const theme = useTheme();
    const statuses: TicketStatus[] = [
        TicketStatus.ToDo,
        TicketStatus.InProgress,
        TicketStatus.Done,
        TicketStatus.Closed,
    ];
    const navigate = useNavigate();
    const { projectId } = useParams<{ projectId: string }>();
    const [selectedStatus, setSelectedStatus] = useState<TicketStatus | null>(
        TicketStatus.ToDo,
    );

    const {
        project,
        statusData,
        isModalOpen,
        setModalOpen,
        pageSize,
        isLoading,
        projectFetchError,
        error,
        refetch,
        isFetchingTicket,
    } = useProjectDashboard(projectId ?? '');

    useDocumentTitle(project ? `${project.title} Board` : 'Kanban Board');

    const handleOpenModal = (status: TicketStatus) => {
        setSelectedStatus(status);
        setModalOpen(true);
    };

    if (!projectId)
        return (
            <ErrorPage
                error="Project not found"
                actionLabel="Go back home"
                action={() => void navigate('/')}
            />
        );

    if (projectFetchError)
        return (
            <ErrorPage
                error={projectFetchError?.message || 'Unable to load project'}
                actionLabel="Go back home"
                action={() => void navigate('/')}
            />
        );

    return (
        <StyledMainContent>
            {(isLoading || isFetchingTicket) && <LoadingOverlay size={120} />}
            {error && (
                <ErrorOverlay
                    error={error?.message || 'Unable to load tickets'}
                    actionLabel="Retry"
                    action={refetch}
                />
            )}
            <Stack
                direction="row"
                alignItems="center"
                justifyContent="space-between"
                mb={2}
            >
                <Stack direction="row" alignItems="center">
                    <IconButton
                        onClick={() => void navigate(-1)}
                        sx={{ ml: -1 }}
                    >
                        <ArrowBack />
                    </IconButton>
                    <Tooltip title={project?.title}>
                        <Typography variant="h5" fontWeight={700} noWrap ml={1}>
                            {project?.title || 'Loading...'}
                        </Typography>
                    </Tooltip>
                </Stack>
                <Stack direction="row" alignItems="center">
                    <Tooltip
                        title={
                            <List disablePadding>
                                <ListItem disablePadding disableGutters>
                                    <ListItemText
                                        primary="Colors map to priority as:"
                                        disableTypography
                                    />
                                </ListItem>
                                {TICKET_PRIORITY_OPTIONS.map((p) => (
                                    <ListItem
                                        key={p}
                                        disablePadding
                                        disableGutters
                                    >
                                        <ListItemIcon
                                            sx={{
                                                minWidth: 24,
                                            }}
                                        >
                                            <Circle
                                                sx={{
                                                    color: getPriorityColor(
                                                        p,
                                                        theme,
                                                    ),
                                                    fontSize: '1.2rem',
                                                }}
                                            />
                                        </ListItemIcon>
                                        <ListItemText
                                            primary={p}
                                            disableTypography
                                        />
                                    </ListItem>
                                ))}
                            </List>
                        }
                    >
                        <HelpOutlined
                            color="action"
                            sx={{
                                mr: 2,
                                transform: 'scale(0.8)',
                            }}
                        />
                    </Tooltip>
                    <Tooltip title="Project Report">
                        <CustomIconButton
                            variant="standard"
                            onClick={() => void navigate(`insights`)}
                        >
                            <BarChart />
                        </CustomIconButton>
                    </Tooltip>
                    <Tooltip title="Project settings">
                        <CustomIconButton
                            variant="standard"
                            onClick={() => void navigate(`detail`)}
                        >
                            <Settings />
                        </CustomIconButton>
                    </Tooltip>
                </Stack>
            </Stack>

            <StyledScrollableArea>
                {statuses.map((status) => {
                    const { tickets, total, page, setPage, loading } =
                        statusData[status];
                    const totalPages = Math.ceil(total / pageSize);

                    return (
                        <StyledTicketColumn key={status}>
                            <StyledColumnHeader
                                direction="row"
                                alignItems="center"
                                justifyContent="space-between"
                            >
                                <Stack
                                    direction="row"
                                    alignItems="center"
                                    spacing={1}
                                >
                                    <Typography
                                        variant="subtitle2"
                                        fontWeight="bold"
                                        color="text.secondary"
                                    >
                                        {status}
                                    </Typography>
                                    <Tooltip
                                        title={`Total tickets in ${status}: ${total}`}
                                    >
                                        <Chip
                                            label={total}
                                            size="small"
                                            sx={{
                                                height: 20,
                                                fontSize: 10,
                                            }}
                                        />
                                    </Tooltip>
                                    {project?.can_edit && (
                                        <Tooltip
                                            title={`Create ticket in ${status} status`}
                                        >
                                            <IconButton
                                                size="small"
                                                color="primary"
                                                onClick={() =>
                                                    handleOpenModal(status)
                                                }
                                            >
                                                <AddCircleIcon fontSize="small" />
                                            </IconButton>
                                        </Tooltip>
                                    )}
                                    {loading && <CircularProgress size={14} />}
                                </Stack>

                                {total > PAGE_SIZE && (
                                    <Stack
                                        direction="row"
                                        alignItems="center"
                                        spacing={0.5}
                                    >
                                        <Typography
                                            variant="caption"
                                            color="text.secondary"
                                        >
                                            {page + 1}/{totalPages || 1}
                                        </Typography>
                                        <IconButton
                                            size="small"
                                            disabled={page === 0}
                                            onClick={() => setPage(page - 1)}
                                        >
                                            <ChevronLeft fontSize="small" />
                                        </IconButton>
                                        <IconButton
                                            size="small"
                                            disabled={page + 1 >= totalPages}
                                            onClick={() => setPage(page + 1)}
                                        >
                                            <ChevronRight fontSize="small" />
                                        </IconButton>
                                    </Stack>
                                )}
                            </StyledColumnHeader>

                            <Box
                                display="flex"
                                gap={2}
                                overflow="auto"
                                pb={1}
                                alignItems="stretch"
                                flex={1}
                            >
                                {tickets.length > 0
                                    ? tickets.map((ticket) => (
                                          <TicketCard
                                              ticket={ticket}
                                              onClick={() =>
                                                  void navigate(
                                                      `${PATHS.PROJECTS}/${projectId}${PATHS.TICKET}/${ticket.id}`,
                                                  )
                                              }
                                              onAvatarClick={() =>
                                                  void navigate(
                                                      `${PATHS.PROFILE}/${ticket.assignee?.user_id}`,
                                                  )
                                              }
                                          />
                                      ))
                                    : !loading && (
                                          <Box
                                              flex={1}
                                              display="flex"
                                              alignItems="center"
                                              justifyContent="center"
                                          >
                                              <Typography
                                                  variant="caption"
                                                  fontStyle="italic"
                                                  py={2}
                                                  color="textSecondary"
                                              >
                                                  No tickets in {status}
                                              </Typography>
                                          </Box>
                                      )}
                            </Box>
                        </StyledTicketColumn>
                    );
                })}
            </StyledScrollableArea>
            {project?.can_edit && (
                <Tooltip title="Create New Ticket" placement="left">
                    <StyledFab
                        color="primary"
                        aria-label="add"
                        onClick={() => {
                            setSelectedStatus(null);
                            setModalOpen(true);
                        }}
                    >
                        <Add />
                    </StyledFab>
                </Tooltip>
            )}
            <CreateTicketModal
                key={selectedStatus}
                open={isModalOpen}
                onClose={() => setModalOpen(false)}
                projectId={projectId}
                initialStatus={selectedStatus}
            />
        </StyledMainContent>
    );
};
