import { useState } from 'react';

import { projectApi } from '@service';
import { ApiResponse, PaginatedResponse, Project } from '@type';

export const useProjectList = () => {
    const [activePage, setActivePage] = useState(1);
    const [archivedPage, setArchivedPage] = useState(1);

    const { data: activeData, isLoading: isActiveLoading } =
        projectApi.useGetProjectsQuery({ page: activePage, archived: false });

    const { data: archivedData, isLoading: isArchivedLoading } =
        projectApi.useGetProjectsQuery({ page: archivedPage, archived: true });

    const isPaginated = (
        res: ApiResponse<Project> | undefined,
    ): res is PaginatedResponse<Project> =>
        !!res && res.success === true && 'meta' in res;

    return {
        activeProjects: isPaginated(activeData) ? activeData.data : [],
        activeMeta: isPaginated(activeData) ? activeData.meta : undefined,
        activePage,
        setActivePage,
        isActiveLoading,

        archivedProjects: isPaginated(archivedData) ? archivedData.data : [],
        archivedMeta: isPaginated(archivedData) ? archivedData.meta : undefined,
        archivedPage,
        setArchivedPage,
        isArchivedLoading,
    };
};
