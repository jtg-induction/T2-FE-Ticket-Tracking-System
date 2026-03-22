import { Link } from 'react-router';

import { OpenInNew } from '@mui/icons-material';
import {
    Avatar,
    Box,
    Chip,
    IconButton,
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

import { useMyTicketsPage } from '@hook';
import { getPriorityColor, getStatusColor } from '@util';

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
                <StyledTableScrollArea>
                    <Table stickyHeader>
                        <TableHead
                            sx={{ bgcolor: theme.palette.background.default }}
                        >
                            <TableRow>
                                <StyledHeaderCell>KEY</StyledHeaderCell>
                                <StyledHeaderCell>TITLE</StyledHeaderCell>
                                <StyledHeaderCell>STATUS</StyledHeaderCell>
                                <StyledHeaderCell>PRIORITY</StyledHeaderCell>
                                <StyledHeaderCell>REPORTER</StyledHeaderCell>
                                <StyledHeaderCell>ASSIGNEE</StyledHeaderCell>
                                <TableCell align="right" />
                            </TableRow>
                        </TableHead>
                        <TableBody sx={{ bgcolor: 'white' }}>
                            {isLoading ? (
                                <TableRow>
                                    <TableCell
                                        colSpan={7}
                                        align="center"
                                        sx={{ py: 10 }}
                                    >
                                        Loading tickets...
                                    </TableCell>
                                </TableRow>
                            ) : tickets.length === 0 ? (
                                <TableRow>
                                    <TableCell
                                        colSpan={7}
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
                                        <TableCell>
                                            <StyledTicketKey variant="body2">
                                                {ticket.jira_id}
                                            </StyledTicketKey>
                                        </TableCell>
                                        <TableCell>
                                            <Typography
                                                title={ticket.name}
                                                variant="body2"
                                                fontWeight={600}
                                            >
                                                {ticket.name}
                                            </Typography>
                                        </TableCell>
                                        <TableCell>
                                            <Chip
                                                label={ticket.status}
                                                size="small"
                                                {...getStatusColor(
                                                    ticket.status,
                                                )}
                                            />
                                        </TableCell>
                                        <TableCell>
                                            <Stack
                                                direction="row"
                                                alignItems="center"
                                                spacing={1}
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
                                        <TableCell
                                            title={`${
                                                ticket.reporter?.first_name ??
                                                ''
                                            } ${ticket.reporter?.last_name ?? ''}`}
                                        >
                                            <Stack
                                                direction="row"
                                                spacing={1}
                                                alignItems="center"
                                            >
                                                <Avatar
                                                    sx={{
                                                        width: 28,
                                                        height: 28,
                                                        fontSize: '1.5rem',
                                                    }}
                                                >
                                                    {ticket.reporter
                                                        .first_name?.[0] || '?'}
                                                </Avatar>
                                                <Typography
                                                    variant="body2"
                                                    fontWeight={600}
                                                >
                                                    {
                                                        ticket.reporter
                                                            ?.first_name
                                                    }{' '}
                                                    {ticket.reporter?.last_name}
                                                </Typography>
                                            </Stack>
                                        </TableCell>
                                        <TableCell
                                            title={`${
                                                ticket.assignee?.first_name ??
                                                ''
                                            } ${ticket.assignee?.last_name ?? ''}`}
                                        >
                                            <Stack
                                                direction="row"
                                                spacing={1}
                                                alignItems="center"
                                            >
                                                <Avatar
                                                    sx={{
                                                        width: 28,
                                                        height: 28,
                                                        fontSize: '1.5rem',
                                                    }}
                                                >
                                                    {ticket.assignee
                                                        ?.first_name?.[0] ||
                                                        '?'}
                                                </Avatar>
                                                <Typography
                                                    variant="body2"
                                                    fontWeight={600}
                                                >
                                                    {ticket.assignee
                                                        ?.first_name ||
                                                        'Unassigned'}{' '}
                                                    {ticket.assignee?.last_name}
                                                </Typography>
                                            </Stack>
                                        </TableCell>
                                        <TableCell align="right">
                                            <IconButton size="small">
                                                <OpenInNew fontSize="small" />
                                            </IconButton>
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
