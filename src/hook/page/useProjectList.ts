import { useState } from 'react';

import { useGetProjectsQuery } from '@service';

export const useProjectList = () => {
    const [activePage, setActivePage] = useState(1);
    const [archivedPage, setArchivedPage] = useState(1);

    const { data: activeResponse, isFetching: isActiveLoading } =
        useGetProjectsQuery({ page: activePage, archived: false });

    const { data: archivedResponse, isFetching: isArchivedLoading } =
        useGetProjectsQuery({ page: archivedPage, archived: true });

    return {
        activeProjects: activeResponse?.data ?? [],
        activeMeta: activeResponse?.meta,
        activePage,
        setActivePage,
        isActiveLoading,

        archivedProjects: archivedResponse?.data ?? [],
        archivedMeta: archivedResponse?.meta,
        archivedPage,
        setArchivedPage,
        isArchivedLoading,
    };
};
