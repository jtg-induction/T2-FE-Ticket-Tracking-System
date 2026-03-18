import { useState } from 'react';

import { useForm } from 'react-hook-form';
import { useParams } from 'react-router';
import { z } from 'zod';

import { zodResolver } from '@hookform/resolvers/zod';
import {
    useImportJiraTicketMutation,
    useSearchTicketsJqlQuery,
} from '@service';

const JQLSearchSchema = z.object({
    query: z.string().trim(),
});

type JQLSearchInput = z.infer<typeof JQLSearchSchema>;

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

    const {
        data: searchResult,
        isFetching,
        isLoading,
    } = useSearchTicketsJqlQuery(
        {
            projectId: projectId!,
            query: searchParams?.q || '',
            max_results: 10,
            cursor: searchParams?.cursor,
        },
        { skip: !searchParams?.q },
    );

    const [importTicket, { isLoading: isImporting }] =
        useImportJiraTicketMutation();

    const onSubmit = (data: JQLSearchInput) => {
        setSearchParams({ q: data.query });
    };

    const loadMore = () => {
        const nextCursor = searchResult?.meta?.next;
        if (nextCursor && !isFetching) {
            const url = new URL(nextCursor);
            const cursor = url.searchParams.get('cursor');
            if (cursor) {
                setSearchParams((prev) => ({ ...prev!, cursor }));
            }
        }
    };

    return {
        form,
        onSubmit: form.handleSubmit(onSubmit),
        searchResult: searchResult?.data || [],
        hasMore: !!searchResult?.meta?.next,
        loadMore,
        isSearching: isLoading || isFetching,
        isImporting,
        onImport: (jira_id: string) =>
            importTicket({ projectId: projectId!, jira_id }).unwrap(),
        errors: form.formState.errors,
    };
};
