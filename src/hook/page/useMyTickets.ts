import { useState } from 'react';

import { useGetMyTicketsQuery } from '@service';

export const useMyTicketsPage = () => {
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);

    const {
        data: myTickets,
        isLoading,
        isError,
    } = useGetMyTicketsQuery({
        page: page + 1,
        pageSize: rowsPerPage,
    });

    return {
        tickets: myTickets?.data || [],
        totalCount: myTickets?.data.length || 0,
        page,
        setPage,
        rowsPerPage,
        setRowsPerPage,
        isLoading,
        isError,
    };
};
