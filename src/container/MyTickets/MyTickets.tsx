import { useState } from 'react';

import { useMyTicketsPage } from 'hook/page/useMyTickets';
import { Link } from 'react-router';

import { Clear, FilterList, Refresh } from '@mui/icons-material';
import {
    Avatar,
    Box,
    Button,
    Chip,
    Divider,
    IconButton,
    Paper,
    Stack,
    Table,
    TableBody,
    TableCell,
    TableHead,
    TablePagination,
    TableRow,
    Tooltip,
    Typography,
    useTheme,
} from '@mui/material';

import {
    ErrorOverlay,
    FilterBar,
    LoadingOverlay,
    SortableHeader,
} from '@component';
import { MY_TICKETS_DEFAULTS, PATHS } from '@constant';
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
    StyledTableScrollArea,
} from './MyTickets.style';

export const MyTickets = () => {
    const theme = useTheme();
    const [filtersOpen, setFiltersOpen] = useState(false);

    const {
        tickets,
        totalCount,
        page,
        rowsPerPage,
        handlePageChange,
        handleRowsPerPageChange,
        isLoading,
        error,
        refetch,
        filters,
        activeFilterCount,
        applyFilters,
        clearFilters,
        sortField,
        sortDirection,
        handleSort,
    } = useMyTicketsPage();

    const sortProps = { sortField, sortDirection, onSort: handleSort };
    return (
        <StyledPageRoot>
            {isLoading && <LoadingOverlay />}
            {error && (
                <ErrorOverlay
                    error={error?.message || 'Unable to load tickets'}
                    actionLabel="Retry"
                    action={refetch}
                />
            )}
            <Stack
                direction="row"
                justifyContent="space-between"
                mb={4}
                flexWrap="wrap"
                gap={2}
            >
                <Box>
                    <Typography variant="h5" fontWeight={800}>
                        My Tickets
                    </Typography>
                    <Typography variant="body1" color="textSecondary">
                        Manage and track tasks assigned to you or reported by
                        you across all projects.
                    </Typography>
                </Box>

                <Stack direction="row" spacing={1} alignItems="center">
                    <Tooltip title="Refresh">
                        <IconButton
                            size="small"
                            onClick={() => void refetch()}
                            disabled={isLoading}
                        >
                            <Refresh fontSize="small" />
                        </IconButton>
                    </Tooltip>

                    <Button
                        variant={
                            filtersOpen || activeFilterCount > 0
                                ? 'contained'
                                : 'outlined'
                        }
                        size="small"
                        startIcon={<FilterList />}
                        onClick={() => setFiltersOpen((p) => !p)}
                        endIcon={
                            activeFilterCount > 0 ? (
                                <Chip
                                    label={activeFilterCount}
                                    size="small"
                                    sx={{
                                        color: 'primary.contrastText',
                                    }}
                                />
                            ) : undefined
                        }
                    >
                        Filters
                    </Button>
                </Stack>
            </Stack>

            <StyledTableContainer component={Paper} elevation={4}>
                {!filtersOpen && activeFilterCount > 0 && (
                    <Box px={2} py={1.5} borderBottom="divider">
                        <Stack
                            direction="row"
                            spacing={1}
                            flexWrap="wrap"
                            alignItems="center"
                        >
                            <Typography
                                variant="caption"
                                color="textSecondary"
                                mr={0.5}
                            >
                                Active filters:
                            </Typography>
                            {filters.search && (
                                <Chip
                                    size="small"
                                    label={`"${filters.search}"`}
                                />
                            )}
                            {filters.status && (
                                <Chip
                                    size="small"
                                    label={`Status: ${filters.status}`}
                                />
                            )}
                            {filters.priority && (
                                <Chip
                                    size="small"
                                    label={`Priority: ${filters.priority}`}
                                />
                            )}
                            <Chip
                                size="small"
                                label="Clear all"
                                variant="outlined"
                                onClick={clearFilters}
                                onDelete={clearFilters}
                                deleteIcon={<Clear />}
                            />
                        </Stack>
                    </Box>
                )}

                <FilterBar
                    open={filtersOpen}
                    committedFilters={filters}
                    onApply={applyFilters}
                    onClear={clearFilters}
                    activeFilterCount={activeFilterCount}
                />

                <StyledTableScrollArea>
                    <Table
                        stickyHeader
                        sx={{ tableLayout: 'fixed', minWidth: 900 }}
                    >
                        <TableHead>
                            <TableRow>
                                <SortableHeader
                                    field="jira_id"
                                    label="KEY"
                                    align="center"
                                    width="8%"
                                    {...sortProps}
                                />
                                <SortableHeader
                                    field="name"
                                    label="TITLE"
                                    width="20%"
                                    {...sortProps}
                                />
                                <SortableHeader
                                    field="status"
                                    label="STATUS"
                                    align="center"
                                    width="10%"
                                    {...sortProps}
                                />
                                <SortableHeader
                                    field="priority"
                                    label="PRIORITY"
                                    width="10%"
                                    {...sortProps}
                                />
                                <SortableHeader
                                    field="created_at"
                                    label="CREATED"
                                    align="center"
                                    width="12%"
                                    {...sortProps}
                                />
                                <SortableHeader
                                    field="deadline"
                                    label="DEADLINE"
                                    align="center"
                                    width="12%"
                                    {...sortProps}
                                />
                                <StyledHeaderCell align="center" width="13%">
                                    REPORTER
                                </StyledHeaderCell>
                                <StyledHeaderCell align="center" width="13%">
                                    ASSIGNEE
                                </StyledHeaderCell>
                            </TableRow>
                        </TableHead>

                        <TableBody>
                            {!isLoading && tickets.length === 0 ? (
                                <TableRow>
                                    <TableCell
                                        colSpan={8}
                                        align="center"
                                        sx={{ py: 10 }}
                                    >
                                        <Stack alignItems="center" spacing={1}>
                                            <Typography
                                                variant="body1"
                                                fontWeight={600}
                                            >
                                                {activeFilterCount > 0
                                                    ? 'No tickets match your filters'
                                                    : 'No tickets found'}
                                            </Typography>
                                            {activeFilterCount > 0 && (
                                                <Button
                                                    size="small"
                                                    variant="text"
                                                    onClick={clearFilters}
                                                >
                                                    Clear filters
                                                </Button>
                                            )}
                                        </Stack>
                                    </TableCell>
                                </TableRow>
                            ) : (
                                tickets.map((ticket) => {
                                    const reporterName = `${ticket.reporter?.first_name} ${ticket.reporter?.last_name}`;
                                    const reporterInitials = `${ticket.reporter?.first_name?.[0]}${ticket.reporter?.last_name?.[0]}`;
                                    const reporterPath = `${PATHS.PROFILE}/${ticket.reporter?.user_id}`;

                                    const assigneeName = ticket.assignee
                                        ? `${ticket.assignee.first_name} ${ticket.assignee.last_name}`
                                        : 'Unassigned';
                                    const assigneeInitials = `${ticket.reporter?.first_name?.[0]}${ticket.reporter?.last_name?.[0]}`;
                                    const assigneePath = `${PATHS.PROFILE}/${ticket.assignee?.user_id}`;

                                    return (
                                        <TableRow key={ticket.id}>
                                            <TableCell align="center">
                                                <Typography
                                                    component={Link}
                                                    to={`${PATHS.PROJECTS}/${ticket.project}${PATHS.TICKET}/${ticket.id}`}
                                                    variant="body2"
                                                    color="primary"
                                                    fontWeight={800}
                                                >
                                                    {ticket.jira_id}
                                                </Typography>
                                            </TableCell>

                                            <TableCell>
                                                <Typography
                                                    variant="body2"
                                                    fontWeight={600}
                                                    noWrap
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

                                            <TableCell>
                                                <Stack
                                                    direction="row"
                                                    alignItems="center"
                                                    gap={1}
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
                                                <Typography
                                                    variant="body2"
                                                    color={
                                                        !ticket.deadline
                                                            ? 'textDisabled'
                                                            : undefined
                                                    }
                                                >
                                                    {ticket.deadline
                                                        ? convertIsoToDateYear(
                                                              ticket.deadline,
                                                          )
                                                        : 'Not set'}
                                                </Typography>
                                            </TableCell>

                                            <TableCell align="center">
                                                <Stack
                                                    component={Link}
                                                    to={reporterPath}
                                                    direction="row"
                                                    gap={1}
                                                    alignItems="center"
                                                    justifyContent="center"
                                                    sx={{
                                                        textDecoration: 'none',
                                                    }}
                                                >
                                                    <Avatar
                                                        sx={{
                                                            bgcolor:
                                                                stringToColor(
                                                                    ticket
                                                                        .reporter
                                                                        ?.email ??
                                                                        '',
                                                                ),
                                                        }}
                                                    >
                                                        {reporterInitials}
                                                    </Avatar>
                                                    <Typography
                                                        variant="body2"
                                                        noWrap
                                                        color="textPrimary"
                                                        sx={{
                                                            ':hover': {
                                                                textDecoration:
                                                                    'underline',
                                                            },
                                                        }}
                                                    >
                                                        {reporterName}
                                                    </Typography>
                                                </Stack>
                                            </TableCell>

                                            <TableCell align="center">
                                                <Stack
                                                    component={Link}
                                                    to={assigneePath}
                                                    direction="row"
                                                    spacing={1}
                                                    alignItems="center"
                                                    justifyContent="center"
                                                    sx={{
                                                        textDecoration: 'none',
                                                    }}
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
                                                                    assigneeInitials
                                                                }
                                                            </Avatar>
                                                            <Typography
                                                                variant="body2"
                                                                noWrap
                                                                color="textPrimary"
                                                                sx={{
                                                                    ':hover': {
                                                                        textDecoration:
                                                                            'underline',
                                                                    },
                                                                }}
                                                            >
                                                                {assigneeName}
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
                                        </TableRow>
                                    );
                                })
                            )}
                        </TableBody>
                    </Table>
                </StyledTableScrollArea>

                <Divider />
                <TablePagination
                    component="div"
                    count={totalCount}
                    page={page}
                    onPageChange={handlePageChange}
                    rowsPerPage={rowsPerPage}
                    onRowsPerPageChange={handleRowsPerPageChange}
                    rowsPerPageOptions={MY_TICKETS_DEFAULTS.PAGE_SIZE_OPTIONS}
                />
            </StyledTableContainer>
        </StyledPageRoot>
    );
};
