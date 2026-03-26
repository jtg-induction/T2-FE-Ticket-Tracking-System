import { ChangeEvent, useCallback, useMemo } from 'react';

import { useSearchParams } from 'react-router';

import {
    MY_TICKETS_DEFAULTS,
    MY_TICKETS_PARAMS,
    VALID_SORT_FIELDS,
} from '@constant';
import { useGetMyTicketsQuery } from '@service';
import { SortDirection, SortField, TicketFilters } from '@type';

const parseSortField = (value: string | null): SortField => {
    if (value && (VALID_SORT_FIELDS as string[]).includes(value)) {
        return value as SortField;
    }
    return MY_TICKETS_DEFAULTS.SORT;
};

const parseSortDir = (value: string | null): SortDirection =>
    value === 'asc' ? 'asc' : MY_TICKETS_DEFAULTS.DIR;

const parsePageNum = (value: string | null): number => {
    const n = parseInt(value ?? '0', 10);
    return isNaN(n) || n < 0 ? MY_TICKETS_DEFAULTS.PAGE : n;
};

const parsePageSize = (value: string | null): number => {
    const n = parseInt(value ?? '10', 10);
    return (
        MY_TICKETS_DEFAULTS.PAGE_SIZE_OPTIONS as readonly number[]
    ).includes(n)
        ? n
        : MY_TICKETS_DEFAULTS.PAGE_SIZE;
};

export const useMyTicketsPage = () => {
    const [searchParams, setSearchParams] = useSearchParams();

    const page = parsePageNum(searchParams.get(MY_TICKETS_PARAMS.PAGE));
    const rowsPerPage = parsePageSize(
        searchParams.get(MY_TICKETS_PARAMS.PAGE_SIZE),
    );
    const sortField = parseSortField(searchParams.get(MY_TICKETS_PARAMS.SORT));
    const sortDirection = parseSortDir(searchParams.get(MY_TICKETS_PARAMS.DIR));

    const filters: TicketFilters = useMemo(
        () => ({
            status: searchParams.get(MY_TICKETS_PARAMS.STATUS) ?? '',
            priority: searchParams.get(MY_TICKETS_PARAMS.PRIORITY) ?? '',
            reporter: searchParams.get(MY_TICKETS_PARAMS.REPORTER) ?? '',
            assignee: searchParams.get(MY_TICKETS_PARAMS.ASSIGNEE) ?? '',
            search: searchParams.get(MY_TICKETS_PARAMS.SEARCH) ?? '',
        }),
        [searchParams],
    );

    const activeFilterCount = useMemo(
        () => Object.values(filters).filter((v) => v !== '').length,
        [filters],
    );

    const updateParams = useCallback(
        (updates: Record<string, string | number | null>) => {
            setSearchParams(
                (prev) => {
                    const next = new URLSearchParams(prev);
                    Object.entries(updates).forEach(([key, value]) => {
                        if (
                            value === '' ||
                            value === null ||
                            value === undefined
                        ) {
                            next.delete(key);
                        } else {
                            next.set(key, String(value));
                        }
                    });
                    return next;
                },
                { replace: true },
            );
        },
        [setSearchParams],
    );

    const handlePageChange = useCallback(
        (_: unknown, newPage: number) => {
            updateParams({
                [MY_TICKETS_PARAMS.PAGE]: newPage === 0 ? null : newPage,
            });
        },
        [updateParams],
    );

    const handleRowsPerPageChange = useCallback(
        (e: ChangeEvent<HTMLInputElement>) => {
            const size = parseInt(e.target.value, 10);
            updateParams({
                [MY_TICKETS_PARAMS.PAGE_SIZE]:
                    size === MY_TICKETS_DEFAULTS.PAGE_SIZE ? null : size,
                [MY_TICKETS_PARAMS.PAGE]: null,
            });
        },
        [updateParams],
    );

    const handleSort = useCallback(
        (field: SortField) => {
            const newDir: SortDirection =
                field === sortField
                    ? sortDirection === 'asc'
                        ? 'desc'
                        : 'asc'
                    : 'asc';

            updateParams({
                [MY_TICKETS_PARAMS.SORT]:
                    field === MY_TICKETS_DEFAULTS.SORT ? null : field,
                [MY_TICKETS_PARAMS.DIR]:
                    newDir === MY_TICKETS_DEFAULTS.DIR ? null : newDir,
                [MY_TICKETS_PARAMS.PAGE]: null,
            });
        },
        [sortField, sortDirection, updateParams],
    );

    const applyFilters = useCallback(
        (pending: TicketFilters) => {
            updateParams({
                [MY_TICKETS_PARAMS.STATUS]: pending.status,
                [MY_TICKETS_PARAMS.PRIORITY]: pending.priority,
                [MY_TICKETS_PARAMS.REPORTER]: pending.reporter,
                [MY_TICKETS_PARAMS.ASSIGNEE]: pending.assignee,
                [MY_TICKETS_PARAMS.SEARCH]: pending.search,
                [MY_TICKETS_PARAMS.PAGE]: null,
            });
        },
        [updateParams],
    );

    const clearFilters = useCallback(() => {
        updateParams({
            [MY_TICKETS_PARAMS.STATUS]: null,
            [MY_TICKETS_PARAMS.PRIORITY]: null,
            [MY_TICKETS_PARAMS.REPORTER]: null,
            [MY_TICKETS_PARAMS.ASSIGNEE]: null,
            [MY_TICKETS_PARAMS.SEARCH]: null,
            [MY_TICKETS_PARAMS.PAGE]: null,
        });
    }, [updateParams]);

    const {
        data: myTickets,
        isLoading,
        isFetching,
        isError,
        refetch,
    } = useGetMyTicketsQuery({
        page: page + 1,
        pageSize: rowsPerPage,
        ...(filters.status && { status: filters.status }),
        ...(filters.priority && { priority: filters.priority }),
        ...(filters.reporter && { reporter: filters.reporter }),
        ...(filters.assignee && { assignee: filters.assignee }),
        ...(filters.search && { search: filters.search }),
        ordering: sortDirection === 'desc' ? `-${sortField}` : sortField,
    });

    return {
        tickets: myTickets?.data ?? [],
        totalCount: myTickets?.meta.count ?? 0,
        page,
        rowsPerPage,
        handlePageChange,
        handleRowsPerPageChange,
        sortField,
        sortDirection,
        handleSort,
        filters,
        activeFilterCount,
        applyFilters,
        clearFilters,
        isLoading: isLoading || isFetching,
        isError,
        refetch,
    };
};
