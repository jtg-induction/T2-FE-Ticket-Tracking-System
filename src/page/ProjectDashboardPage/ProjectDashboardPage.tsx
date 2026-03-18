import { useState } from 'react';

import { useNavigate, useParams } from 'react-router';
import { getPriorityColor } from '@util';

import {
    ArrowBack,
    ChevronLeft,
    ChevronRight,
    Settings,
} from '@mui/icons-material';
import { AddCircle as AddCircleIcon } from '@mui/icons-material';
import {
    Avatar,
    Box,
    CardContent,
    Chip,
    CircularProgress,
    IconButton,
    Stack,
    Typography,
    useTheme,
} from '@mui/material';

import { ProjectUsers } from '@container';
import { useProjectDashboard } from '@hook';
import { JQLSearch } from '@page';
import { TicketStatus } from '@type/ticket.types';

import { CreateTicketModal } from './CreateTicketModal';
import {
    StyledDashboardLayout,
    StyledMainContent,
    StyledScrollableArea,
    StyledSidebar,
    StyledTicketCard,
    StyledTicketColumn,
} from './ProjectDashboardPage.style';

export const ProjectDashboardPage = () => {
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

    const { project, statusData, isModalOpen, setModalOpen, pageSize } =
        useProjectDashboard(projectId!);

    const handleOpenModal = (status: TicketStatus) => {
        setSelectedStatus(status);
        setModalOpen(true);
    };

    return (
        <StyledDashboardLayout flexWrap="wrap" direction="row" gap={3}>
            <StyledMainContent>
                <Stack direction="row" alignItems="center" mb={2}>
                    <IconButton
                        onClick={() => void navigate(-1)}
                        sx={{ ml: -1 }}
                    >
                        <ArrowBack />
                    </IconButton>
                    <Typography
                        variant="h5"
                        fontWeight={700}
                        noWrap
                        flex={1}
                        ml={1}
                    >
                        {project?.title || 'Loading...'}
                    </Typography>
                    <IconButton onClick={() => void navigate(`detail`)}>
                        <Settings />
                    </IconButton>
                </Stack>

                <StyledScrollableArea>
                    {statuses.map((status) => {
                        const { tickets, total, page, setPage, loading } =
                            statusData[status];
                        const totalPages = Math.ceil(total / pageSize);

                        return (
                            <StyledTicketColumn key={status}>
                                <Stack
                                    direction="row"
                                    alignItems="center"
                                    justifyContent="space-between"
                                    mb={1.5}
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
                                            sx={{ height: 20, fontSize: 10 }}
                                        />
                                        <IconButton
                                            size="small"
                                            color="primary"
                                            onClick={() =>
                                                handleOpenModal(status)
                                            }
                                        >
                                            <AddCircleIcon fontSize="small" />
                                        </IconButton>
                                        {loading && (
                                            <CircularProgress size={14} />
                                        )}
                                    </Stack>

                                    {total > 0 && (
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
                                                onClick={() =>
                                                    setPage(page - 1)
                                                }
                                            >
                                                <ChevronLeft fontSize="small" />
                                            </IconButton>
                                            <IconButton
                                                size="small"
                                                disabled={
                                                    page + 1 >= totalPages
                                                }
                                                onClick={() =>
                                                    setPage(page + 1)
                                                }
                                            >
                                                <ChevronRight fontSize="small" />
                                            </IconButton>
                                        </Stack>
                                    )}
                                </Stack>

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
                                              >
                                                  <CardContent
                                                      sx={{
                                                          p: 1.5,
                                                          height: '100%',
                                                          display: 'flex',
                                                          flexDirection:
                                                              'column',
                                                          justifyContent:
                                                              'space-between',
                                                      }}
                                                  >
                                                      <Box mb={1}>
                                                          <Stack
                                                              direction="row"
                                                              justifyContent="space-between"
                                                              alignItems="start"
                                                          >
                                                              <Typography
                                                                  variant="caption"
                                                                  fontWeight="bold"
                                                                  color="primary"
                                                              >
                                                                  {
                                                                      ticket.jira_id
                                                                  }
                                                              </Typography>
                                                              <Box
                                                                  width={8}
                                                                  height={8}
                                                                  borderRadius="50%"
                                                                  bgcolor={getPriorityColor(
                                                                      ticket.priority,
                                                                      theme,
                                                                  )}
                                                                  mt={0.5}
                                                              />
                                                          </Stack>
                                                          <Typography
                                                              variant="body2"
                                                              fontWeight={600}
                                                              sx={{
                                                                  mt: 0.5,
                                                                  display:
                                                                      '-webkit-box',
                                                                  WebkitLineClamp: 2,
                                                                  WebkitBoxOrient:
                                                                      'vertical',
                                                                  overflow:
                                                                      'hidden',
                                                              }}
                                                          >
                                                              {ticket.name}
                                                          </Typography>
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
                                                              <Avatar
                                                                  sx={{
                                                                      width: 22,
                                                                      height: 22,
                                                                      fontSize:
                                                                          '0.65rem',
                                                                  }}
                                                              >
                                                                  {
                                                                      ticket
                                                                          .assignee
                                                                          .first_name[0]
                                                                  }
                                                              </Avatar>
                                                          )}
                                                      </Stack>
                                                  </CardContent>
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
            </StyledMainContent>

            <StyledSidebar spacing={3}>
                <ProjectUsers />
                <JQLSearch />
            </StyledSidebar>

            <CreateTicketModal
                key={selectedStatus}
                open={isModalOpen}
                onClose={() => setModalOpen(false)}
                projectId={projectId!}
                initialStatus={selectedStatus}
            />
        </StyledDashboardLayout>
    );
};
