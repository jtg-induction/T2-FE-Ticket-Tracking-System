import { useState } from 'react';

import { useGetMyTicketsQuery } from '@service';

export const useMyTicketsPage = () => {
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);

    const {
        data: myTickets,
        isLoading,
        isFetching,
        isError,
    } = useGetMyTicketsQuery({
        page: page + 1,
        pageSize: rowsPerPage,
    });

    return {
        tickets: myTickets?.data || [],
        totalCount: myTickets?.meta.count ?? 0,
        page,
        setPage,
        rowsPerPage,
        setRowsPerPage,
        isLoading: isLoading || isFetching,
        isError,
    };
};
