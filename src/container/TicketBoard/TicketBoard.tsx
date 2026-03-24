import { useState } from 'react';

import { useNavigate, useParams } from 'react-router';

import {
    AddCircle as AddCircleIcon,
    ArrowBack,
    BarChart,
    ChevronLeft,
    ChevronRight,
    Settings,
} from '@mui/icons-material';
import {
    Avatar,
    Box,
    Chip,
    CircularProgress,
    IconButton,
    Stack,
    Tooltip,
    Typography,
    useTheme,
} from '@mui/material';

import { CustomIconButton } from '@component';
import { PAGE_SIZE, TicketStatus } from '@constant';
import { CreateTicketModal } from '@container';
import { useProjectDashboard } from '@hook';
import { ErrorPage } from '@page';
import { convertIsoToDateYear, getPriorityColor, stringToColor } from '@util';

import {
    StyledColumnHeader,
    StyledMainContent,
    StyledScrollableArea,
    StyledTicketCard,
    StyledTicketCardContent,
    StyledTicketColumn,
    StyledTicketTitle,
} from './TicketBoard.style';

export const TicketBoard = () => {
    const statuses: TicketStatus[] = [
        TicketStatus.ToDo,
        TicketStatus.InProgress,
        TicketStatus.Done,
        TicketStatus.Closed,
    ];
    const theme = useTheme();
    const navigate = useNavigate();
    const { projectId } = useParams<{ projectId: string }>();
    const [selectedStatus, setSelectedStatus] = useState<TicketStatus>(
        TicketStatus.ToDo,
    );

    const handleOpenModal = (status: TicketStatus) => {
        setSelectedStatus(status);
        setModalOpen(true);
    };

    if (!projectId) {
        return <ErrorPage></ErrorPage>;
    }

    const {
        project,
        statusData,
        isModalOpen,
        setModalOpen,
        pageSize,
        fetchError,
    } = useProjectDashboard(projectId);

    if (fetchError) return <ErrorPage></ErrorPage>;

    return (
        <StyledMainContent>
            <Stack direction="row" alignItems="center" mb={2}>
                <IconButton onClick={() => void navigate(-1)} sx={{ ml: -1 }}>
                    <ArrowBack />
                </IconButton>
                <Typography
                    title={project?.title}
                    variant="h5"
                    fontWeight={700}
                    noWrap
                    flex={1}
                    ml={1}
                >
                    {project?.title || 'Loading...'}
                </Typography>
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
                                    <Chip
                                        label={total}
                                        size="small"
                                        sx={{
                                            height: 20,
                                            fontSize: 10,
                                        }}
                                    />
                                    <IconButton
                                        size="small"
                                        color="primary"
                                        onClick={() => handleOpenModal(status)}
                                    >
                                        <AddCircleIcon fontSize="small" />
                                    </IconButton>
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
                                          <StyledTicketCard
                                              key={ticket.id}
                                              onClick={() =>
                                                  void navigate(
                                                      `/projects/${projectId}/tickets/${ticket.id}`,
                                                  )
                                              }
                                              priorityColor={getPriorityColor(
                                                  ticket.priority,
                                                  theme,
                                              )}
                                          >
                                              <StyledTicketCardContent>
                                                  <Box mb={1}>
                                                      <Typography
                                                          title={ticket.jira_id}
                                                          variant="caption"
                                                          fontWeight="bold"
                                                          color="primary"
                                                      >
                                                          {ticket.jira_id}
                                                      </Typography>
                                                      <StyledTicketTitle
                                                          title={ticket.name}
                                                          variant="body2"
                                                          fontWeight={600}
                                                      >
                                                          {ticket.name}
                                                      </StyledTicketTitle>
                                                      {ticket.deadline && (
                                                          <Typography
                                                              title={convertIsoToDateYear(
                                                                  ticket.deadline,
                                                              )}
                                                              fontSize="1.2rem"
                                                              fontWeight={600}
                                                              color="primary"
                                                          >
                                                              {convertIsoToDateYear(
                                                                  ticket.deadline,
                                                              )}
                                                          </Typography>
                                                      )}
                                                  </Box>
                                                  <Stack
                                                      direction="row"
                                                      justifyContent="space-between"
                                                      alignItems="center"
                                                  >
                                                      <Typography
                                                          variant="caption"
                                                          color="text.secondary"
                                                      >
                                                          {ticket.category}
                                                      </Typography>
                                                      {ticket.assignee && (
                                                          <Tooltip
                                                              title={
                                                                  ticket
                                                                      .assignee
                                                                      .first_name +
                                                                  ' ' +
                                                                  ticket
                                                                      .assignee
                                                                      .last_name
                                                              }
                                                          >
                                                              <Avatar
                                                                  sx={{
                                                                      bgcolor:
                                                                          stringToColor(
                                                                              ticket
                                                                                  .assignee
                                                                                  .email,
                                                                          ),
                                                                      width: 24,
                                                                      height: 24,
                                                                      fontSize:
                                                                          '1rem',
                                                                  }}
                                                              >
                                                                  {
                                                                      ticket
                                                                          .assignee
                                                                          .first_name?.[0]
                                                                  }
                                                                  {
                                                                      ticket
                                                                          .assignee
                                                                          .last_name?.[0]
                                                                  }
                                                              </Avatar>
                                                          </Tooltip>
                                                      )}
                                                  </Stack>
                                              </StyledTicketCardContent>
                                          </StyledTicketCard>
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
