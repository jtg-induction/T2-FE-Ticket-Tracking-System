import { Form, Link } from 'react-router';

import { HelpOutline } from '@mui/icons-material';
import {
    Button,
    CircularProgress,
    Snackbar,
    Stack,
    TextField,
    Tooltip,
    Typography,
} from '@mui/material';

import { ErrorSnackbar } from '@component';
import { JIRA_INFO } from '@constant';
import { useJQLSearch } from '@hook';

import {
    StyledJQLSearchWrapper,
    StyledResultsWrapper,
    StyledTicketItem,
} from './JQLSearch.style';

export const JQLSearch = () => {
    const {
        form,
        onSubmit,
        searchResult,
        searchError,
        isSearching,
        importingTicketId,
        onImport,
        importError,
        importSuccess,
        setImportError,
        setImportSuccess,
        errors,
        hasMore,
        searchParams,
        loadMore,
    } = useJQLSearch();

    return (
        <StyledJQLSearchWrapper>
            <ErrorSnackbar
                error={importError}
                onClose={() => setImportError(null)}
            />
            <Snackbar
                open={!!importSuccess}
                message={importSuccess}
                onClose={() => setImportSuccess(null)}
                autoHideDuration={4000}
            />

            <Typography variant="h6" gutterBottom fontWeight={700}>
                JQL Ticket Search
            </Typography>

            <Form onSubmit={(e) => void onSubmit(e)}>
                <Stack direction="row" gap={1} mb={1} alignItems="flex-start">
                    <TextField
                        fullWidth
                        size="small"
                        placeholder="e.g. status = 'Open'"
                        {...form.register('query')}
                        error={!!searchError}
                        helperText={
                            (searchError && 'message' in searchError
                                ? searchError.message
                                : undefined) ?? errors.query?.message
                        }
                        slotProps={{
                            input: {
                                endAdornment: (
                                    <Tooltip title="Online guide on JQL advanced search">
                                        <Link
                                            to={JIRA_INFO}
                                            target="blank"
                                            rel="noopener noreferrer"
                                            style={{
                                                textDecoration: 'none',
                                                color: 'inherit',
                                            }}
                                        >
                                            <HelpOutline
                                                color="action"
                                                sx={{
                                                    fontSize: '2rem',
                                                    '&:hover': {
                                                        cursor: 'pointer',
                                                        color: 'primary.main',
                                                    },
                                                }}
                                            />
                                        </Link>
                                    </Tooltip>
                                ),
                            },
                        }}
                    />

                    <Tooltip
                        title={
                            isSearching ? 'Searching...' : 'Execute JQL search'
                        }
                        placement="top"
                        arrow
                    >
                        <Button
                            type="submit"
                            variant="contained"
                            disabled={isSearching}
                            sx={{ height: 40, flexShrink: 0 }}
                        >
                            {isSearching ? 'Searching...' : 'Search'}
                        </Button>
                    </Tooltip>
                </Stack>
            </Form>

            <StyledResultsWrapper>
                {searchResult.map((ticket) => (
                    <StyledTicketItem key={ticket.jira_id}>
                        <Stack flex={1} minWidth={0}>
                            <Typography
                                variant="caption"
                                color="primary"
                                fontWeight={700}
                            >
                                {ticket.jira_id}
                            </Typography>
                            <Typography
                                title={ticket.name}
                                variant="body2"
                                fontWeight={500}
                            >
                                {ticket.name}
                            </Typography>
                        </Stack>

                        {!ticket.is_imported && (
                            <Button
                                size="small"
                                variant="outlined"
                                onClick={() => void onImport(ticket.jira_id)}
                                disabled={!!importingTicketId}
                                loading={importingTicketId === ticket.jira_id}
                                sx={{ flexShrink: 0 }}
                            >
                                Import
                            </Button>
                        )}
                    </StyledTicketItem>
                ))}

                {isSearching && (
                    <Stack alignItems="center" py="auto">
                        <CircularProgress size={28} />
                        <Typography variant="caption" mt={1}>
                            Loading results...
                        </Typography>
                    </Stack>
                )}

                {!isSearching && hasMore && (
                    <Button variant="outlined" fullWidth onClick={loadMore}>
                        Load More
                    </Button>
                )}

                {!isSearching &&
                    searchResult.length === 0 &&
                    searchParams == null && (
                        <Stack alignItems="center">
                            <Typography variant="body2" color="textSecondary">
                                Search tickets through JQL query.
                            </Typography>
                        </Stack>
                    )}

                {!isSearching &&
                    searchResult.length === 0 &&
                    searchParams !== null && (
                        <Stack alignItems="center">
                            <Typography variant="body2" color="textDisabled">
                                No tickets match your JQL query.
                            </Typography>
                        </Stack>
                    )}
            </StyledResultsWrapper>
        </StyledJQLSearchWrapper>
    );
};
