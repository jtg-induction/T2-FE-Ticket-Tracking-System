import { UIEvent } from 'react';

import {
    Button,
    CircularProgress,
    Stack,
    TextField,
    Typography,
} from '@mui/material';

import { useJQLSearch } from '@hook';

import { Form } from 'react-router';
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
        isSearching,
        isImporting,
        onImport,
        errors,
        hasMore,
        loadMore,
    } = useJQLSearch();

    const typedSearchResults = searchResult;
    const { register } = form;

    return (
        <StyledJQLSearchWrapper>
            <Typography variant="h6" gutterBottom>
                JQL Ticket Search
            </Typography>

            <Form onSubmit={(e) => void onSubmit(e)}>
                <Stack direction="row" spacing={1}>
                    <TextField
                        fullWidth
                        size="small"
                        label="Enter JQL (e.g. created < '1d')"
                        {...register('query')}
                        error={!!errors.query}
                    />
                    <Button
                        type="submit"
                        variant="contained"
                        disabled={isSearching}
                    >
                        Search
                    </Button>
                </Stack>
            </Form>

            <StyledResultsWrapper
                sx={{
                    maxHeight: '400px',
                    overflowY: 'auto',
                    mt: 2,
                    p: 1,
                    border: '1px solid #eee',
                }}
                onScroll={(e: UIEvent<HTMLDivElement>) => {
                    const el = e.currentTarget;
                    if (
                        el.scrollHeight - el.scrollTop === el.clientHeight &&
                        hasMore
                    ) {
                        loadMore();
                    }
                }}
            >
                {typedSearchResults.map((ticket) => (
                    <StyledTicketItem
                        key={ticket.jira_id}
                        sx={{
                            display: 'flex',
                            justifyContent: 'space-between',
                            mb: 1,
                        }}
                    >
                        <Typography variant="body2">
                            <strong>{ticket.jira_id}</strong>: {ticket.name}
                        </Typography>
                        <Button
                            size="small"
                            variant="outlined"
                            onClick={() => void onImport(ticket.jira_id)}
                            disabled={isImporting}
                        >
                            Import
                        </Button>
                    </StyledTicketItem>
                ))}

                {isSearching && (
                    <Stack alignItems="center" py={2}>
                        <CircularProgress size={24} />
                    </Stack>
                )}

                {!isSearching && typedSearchResults.length === 0 && (
                    <Typography variant="caption" color="text.secondary">
                        No results found.
                    </Typography>
                )}
            </StyledResultsWrapper>
        </StyledJQLSearchWrapper>
    );
};
