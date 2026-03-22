import { useState } from 'react';

import { useForm } from 'react-hook-form';
import { useParams } from 'react-router';

import { zodResolver } from '@hookform/resolvers/zod';
import { JQLSearchSchema } from '@schema';
import {
    useImportJiraTicketMutation,
    useSearchTicketsJqlQuery,
} from '@service';
import { ErrorResponse } from '@type/standard.types';
import { JQLSearchInput } from '@type/ticket.types';

export const useJQLSearch = () => {
    const { projectId } = useParams<{ projectId: string }>();
    const [searchParams, setSearchParams] = useState<{
        q: string;
        cursor?: string;
    } | null>(null);

    const form = useForm<JQLSearchInput>({
        resolver: zodResolver(JQLSearchSchema),
        defaultValues: { query: '' },
    });

    const [importError, setImportError] = useState<ErrorResponse | null>(null);
    const [importSuccess, setImportSuccess] = useState<string | null>(null);
    const [importingTicketId, setImportingTicketId] = useState<string | null>(
        null,
    );
    const {
        data: searchResult,
        isFetching,
        isLoading,
        error: searchError,
    } = useSearchTicketsJqlQuery(
        {
            projectId: projectId!,
            query: searchParams?.q || '',
            max_results: 10,
            cursor: searchParams?.cursor,
        },
        { skip: !searchParams?.q },
    );

    const [importTicket] = useImportJiraTicketMutation();

    const onSubmit = (data: JQLSearchInput) => {
        setSearchParams({ q: data.query, cursor: undefined });
    };

    const onImport = async (jira_id: string) => {
        setImportingTicketId(jira_id);
        try {
            await importTicket({ projectId: projectId!, jira_id }).unwrap();
            setImportSuccess('Ticket imported successfully');
        } catch (err) {
            setImportError(
                (err as ErrorResponse) ?? {
                    success: false,
                    message: 'An unexpected error occurred',
                },
            );
        } finally {
            setImportingTicketId(null);
        }
    };

    const loadMore = () => {
        const nextValue = searchResult?.meta?.next;

        if (nextValue && !isFetching) {
            let cursor: string | null = null;

            try {
                const url = new URL(nextValue, window.location.origin);
                cursor = url.searchParams.get('cursor');

                if (!cursor) cursor = nextValue;
            } catch {
                cursor = nextValue;
            }

            if (cursor) {
                setSearchParams((prev) => ({ ...prev!, cursor }));
            }
        }
    };

    return {
        form,
        onSubmit: form.handleSubmit(onSubmit),
        searchResult: searchResult?.data || [],
        searchError,
        hasMore: !!searchResult?.meta?.next,
        loadMore,
        isSearching: isLoading || isFetching,
        importingTicketId,
        onImport,
        importError,
        importSuccess,
        setImportError,
        setImportSuccess,
        searchParams,
        errors: form.formState.errors,
    };
};
