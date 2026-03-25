import { Link } from 'react-router';

import {
    Avatar,
    Box,
    Chip,
    Paper,
    Stack,
    Table,
    TableBody,
    TableCell,
    TableHead,
    TablePagination,
    TableRow,
    Typography,
    useTheme,
} from '@mui/material';

import { LoadingOverlay } from '@component';
import { useMyTicketsPage } from '@hook';
import {
    convertIsoToDateYear,
    getPriorityColor,
    getStatusColor,
    stringToColor,
} from '@util';

import {
    StyledHeaderCell,
    StyledPageRoot,
    StyledPriorityIndicator,
    StyledTableContainer,
    StyledTableRow,
    StyledTableScrollArea,
    StyledTicketKey,
} from './MyTickets.style';

export const MyTickets = () => {
    const theme = useTheme();
    const {
        tickets,
        totalCount,
        page,
        setPage,
        rowsPerPage,
        setRowsPerPage,
        isLoading,
    } = useMyTicketsPage();

    return (
        <StyledPageRoot>
            <Stack mb={4}>
                <Box>
                    <Typography variant="h5" fontWeight={800}>
                        My Tickets
                    </Typography>
                    <Typography variant="body1" color="textSecondary">
                        Manage and track tasks assigned to you or reported by
                        you across all projects.
                    </Typography>
                </Box>
            </Stack>

            <StyledTableContainer component={Paper} elevation={4}>
                {isLoading && <LoadingOverlay />}
                <StyledTableScrollArea>
                    <Table
                        stickyHeader
                        sx={{ tableLayout: 'fixed', minWidth: 900 }}
                    >
                        <TableHead>
                            <TableRow>
                                <StyledHeaderCell
                                    align="center"
                                    sx={{ width: '8%' }}
                                >
                                    KEY
                                </StyledHeaderCell>
                                <StyledHeaderCell sx={{ width: '20%' }}>
                                    TITLE
                                </StyledHeaderCell>
                                <StyledHeaderCell
                                    align="center"
                                    sx={{ width: '10%' }}
                                >
                                    STATUS
                                </StyledHeaderCell>
                                <StyledHeaderCell sx={{ width: '10%' }}>
                                    PRIORITY
                                </StyledHeaderCell>
                                <StyledHeaderCell
                                    align="center"
                                    sx={{ width: '12%' }}
                                >
                                    CREATED
                                </StyledHeaderCell>
                                <StyledHeaderCell
                                    align="center"
                                    sx={{ width: '12%' }}
                                >
                                    DEADLINE
                                </StyledHeaderCell>
                                <StyledHeaderCell
                                    align="center"
                                    sx={{ width: '13%' }}
                                >
                                    REPORTER
                                </StyledHeaderCell>
                                <StyledHeaderCell
                                    align="center"
                                    sx={{ width: '13%' }}
                                >
                                    ASSIGNEE
                                </StyledHeaderCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {tickets.length === 0 ? (
                                <TableRow>
                                    <TableCell
                                        colSpan={8}
                                        align="center"
                                        sx={{ py: 10 }}
                                    >
                                        No tickets found.
                                    </TableCell>
                                </TableRow>
                            ) : (
                                tickets.map((ticket) => (
                                    <StyledTableRow
                                        component={Link}
                                        to={`/projects/${ticket.project}/tickets/${ticket.id}`}
                                        key={ticket.id}
                                        hover
                                    >
                                        <TableCell align="center">
                                            <StyledTicketKey variant="body2">
                                                {ticket.jira_id}
                                            </StyledTicketKey>
                                        </TableCell>

                                        <TableCell>
                                            <Typography
                                                variant="body2"
                                                fontWeight={600}
                                                sx={{
                                                    overflow: 'hidden',
                                                    textOverflow: 'ellipsis',
                                                    whiteSpace: 'nowrap',
                                                }}
                                                title={ticket.name}
                                            >
                                                {ticket.name}
                                            </Typography>
                                        </TableCell>

                                        <TableCell align="center">
                                            <Chip
                                                label={ticket.status}
                                                size="small"
                                                {...getStatusColor(
                                                    ticket.status,
                                                )}
                                            />
                                        </TableCell>

                                        <TableCell align="center">
                                            <Stack
                                                direction="row"
                                                alignItems="center"
                                                spacing={2}
                                            >
                                                <StyledPriorityIndicator
                                                    priorityColor={getPriorityColor(
                                                        ticket.priority,
                                                        theme,
                                                    )}
                                                />
                                                <Typography variant="body2">
                                                    {ticket.priority}
                                                </Typography>
                                            </Stack>
                                        </TableCell>

                                        <TableCell align="center">
                                            <Typography variant="body2">
                                                {ticket.created_at
                                                    ? convertIsoToDateYear(
                                                          ticket.created_at,
                                                      )
                                                    : 'Not found'}
                                            </Typography>
                                        </TableCell>

                                        <TableCell align="center">
                                            <Typography variant="body2">
                                                {ticket.deadline
                                                    ? convertIsoToDateYear(
                                                          ticket.deadline,
                                                      )
                                                    : 'Not set'}
                                            </Typography>
                                        </TableCell>

                                        <TableCell align="center">
                                            <Stack
                                                direction="row"
                                                spacing={1}
                                                alignItems="center"
                                                justifyContent="center"
                                            >
                                                <Avatar
                                                    sx={{
                                                        bgcolor: stringToColor(
                                                            ticket.reporter
                                                                ?.email ?? '',
                                                        ),
                                                    }}
                                                >
                                                    {
                                                        ticket.reporter
                                                            ?.first_name?.[0]
                                                    }
                                                    {
                                                        ticket.reporter
                                                            ?.last_name?.[0]
                                                    }
                                                </Avatar>
                                                <Typography
                                                    variant="body2"
                                                    noWrap
                                                >
                                                    {
                                                        ticket.reporter
                                                            ?.first_name
                                                    }
                                                </Typography>
                                            </Stack>
                                        </TableCell>

                                        <TableCell align="center">
                                            <Stack
                                                direction="row"
                                                spacing={1}
                                                alignItems="center"
                                                justifyContent="center"
                                            >
                                                {ticket.assignee ? (
                                                    <>
                                                        <Avatar
                                                            sx={{
                                                                bgcolor:
                                                                    stringToColor(
                                                                        ticket
                                                                            .assignee
                                                                            ?.email ??
                                                                            '',
                                                                    ),
                                                            }}
                                                        >
                                                            {
                                                                ticket.assignee
                                                                    ?.first_name?.[0]
                                                            }
                                                            {
                                                                ticket.assignee
                                                                    ?.last_name?.[0]
                                                            }
                                                        </Avatar>
                                                        <Typography
                                                            variant="body2"
                                                            noWrap
                                                        >
                                                            {
                                                                ticket.assignee
                                                                    ?.first_name
                                                            }
                                                        </Typography>
                                                    </>
                                                ) : (
                                                    <Typography
                                                        variant="body2"
                                                        color="textDisabled"
                                                    >
                                                        Unassigned
                                                    </Typography>
                                                )}
                                            </Stack>
                                        </TableCell>
                                    </StyledTableRow>
                                ))
                            )}
                        </TableBody>
                    </Table>
                </StyledTableScrollArea>
                <TablePagination
                    component="div"
                    count={totalCount}
                    page={page}
                    onPageChange={(_, newPage) => setPage(newPage)}
                    rowsPerPage={rowsPerPage}
                    onRowsPerPageChange={(e) =>
                        setRowsPerPage(parseInt(e.target.value, 10))
                    }
                />
            </StyledTableContainer>
        </StyledPageRoot>
    );
};
