import { Dispatch, SetStateAction, useState } from 'react';

import { PAGE_SIZE, TicketStatus } from '@constant';
import { useGetProjectByIdQuery, useGetProjectTicketsQuery } from '@service';
import { Project } from '@type/project.types';
import { Ticket } from '@type/ticket.types';

interface StatusColumnData {
    tickets: Ticket[];
    total: number;
    page: number;
    setPage: Dispatch<SetStateAction<number>>;
    loading: boolean;
}

export const useProjectDashboard = (projectId: string) => {
    const [todoPage, setTodoPage] = useState(0);
    const [progressPage, setProgressPage] = useState(0);
    const [donePage, setDonePage] = useState(0);
    const [closedPage, setClosedPage] = useState(0);

    const [isModalOpen, setModalOpen] = useState(false);

    const {
        data: projectResponse,
        isLoading: isProjectLoading,
        error: projectFetchError,
    } = useGetProjectByIdQuery(projectId, { skip: !projectId });

    const ticketQueryOptions = { skip: !projectId };

    const todoQuery = useGetProjectTicketsQuery(
        {
            projectId,
            status: 'To Do',
            page: todoPage + 1,
            pageSize: PAGE_SIZE,
        },
        ticketQueryOptions,
    );
    const progressQuery = useGetProjectTicketsQuery(
        {
            projectId,
            status: 'In Progress',
            page: progressPage + 1,
            pageSize: PAGE_SIZE,
        },
        ticketQueryOptions,
    );
    const doneQuery = useGetProjectTicketsQuery(
        {
            projectId,
            status: 'Done',
            page: donePage + 1,
            pageSize: PAGE_SIZE,
        },
        ticketQueryOptions,
    );
    const closedQuery = useGetProjectTicketsQuery(
        {
            projectId,
            status: 'Closed',
            page: closedPage + 1,
            pageSize: PAGE_SIZE,
        },
        ticketQueryOptions,
    );

    const project = projectResponse?.data as Project;

    const statusData: Record<TicketStatus, StatusColumnData> = {
        'To Do': {
            tickets: todoQuery.data?.data || [],
            total: todoQuery.data?.meta.count || 0,
            page: todoPage,
            setPage: setTodoPage,
            loading: todoQuery.isLoading || todoQuery.isFetching,
        },
        'In Progress': {
            tickets: progressQuery.data?.data || [],
            total: progressQuery.data?.meta.count || 0,
            page: progressPage,
            setPage: setProgressPage,
            loading: progressQuery.isLoading || progressQuery.isFetching,
        },
        Done: {
            tickets: doneQuery.data?.data || [],
            total: doneQuery.data?.meta.count || 0,
            page: donePage,
            setPage: setDonePage,
            loading: doneQuery.isLoading || doneQuery.isFetching,
        },
        Closed: {
            tickets: closedQuery.data?.data || [],
            total: closedQuery.data?.meta.count || 0,
            page: closedPage,
            setPage: setClosedPage,
            loading: closedQuery.isLoading || closedQuery.isFetching,
        },
    };

    return {
        project,
        statusData,
        isModalOpen,
        isLoading: isProjectLoading,
        setModalOpen,
        pageSize: PAGE_SIZE,
        projectFetchError,
        error:
            todoQuery.error ||
            progressQuery.error ||
            doneQuery.error ||
            closedQuery.error,
        refetch: () => {
            if (todoQuery.error) todoQuery.refetch();
            if (progressQuery.error) progressQuery.refetch();
            if (doneQuery.error) doneQuery.refetch();
            if (closedQuery.error) closedQuery.refetch();
        },
        isFetchingTicket:
            todoQuery.isFetching ||
            progressQuery.isFetching ||
            doneQuery.isFetching ||
            closedQuery.isFetching,
    };
};
