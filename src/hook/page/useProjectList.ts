import { useEffect, useState } from 'react';

import { useSearchParams } from 'react-router';

import { useGetProjectsQuery } from '@service';

export const useProjectList = () => {
    const [searchParams, setSearchParams] = useSearchParams();
    const [activeQueryPage, setActiveQueryPage] = useState(
        Number(searchParams.get('page')) || 1,
    );
    const [archivedQueryPage, setArchivedQueryPage] = useState(
        Number(searchParams.get('archived_page')) || 1,
    );

    const {
        data: activeResponse,
        isFetching: isActiveLoading,
        refetch: refetchActive,
        error: activeError,
    } = useGetProjectsQuery({ page: activeQueryPage, archived: false });

    const {
        data: archivedResponse,
        isFetching: isArchivedLoading,
        refetch: refetchArchived,
        error: archivedError,
    } = useGetProjectsQuery({ page: archivedQueryPage, archived: true });

    useEffect(() => {
        const newParams = new URLSearchParams(searchParams);
        if (activeResponse?.meta?.page)
            newParams.set('page', String(activeResponse.meta.page));
        if (archivedResponse?.meta?.page)
            newParams.set('archived_page', String(archivedResponse.meta.page));
        setSearchParams(newParams, { replace: true });
    }, [activeResponse, archivedResponse]);

    const setActivePage = (page: number) => {
        setActiveQueryPage(page);
        const newParams = new URLSearchParams(searchParams);
        newParams.set('page', String(page));
        setSearchParams(newParams);
    };

    const setArchivedPage = (page: number) => {
        setArchivedQueryPage(page);
        const newParams = new URLSearchParams(searchParams);
        newParams.set('archived_page', String(page));
        setSearchParams(newParams);
    };

    return {
        activeProjects: activeResponse?.data ?? [],
        activeMeta: activeResponse?.meta,
        activePage: activeResponse?.meta?.page ?? activeQueryPage,
        setActivePage,
        isLoading: isActiveLoading || isArchivedLoading,
        archivedProjects: archivedResponse?.data ?? [],
        archivedMeta: archivedResponse?.meta,
        archivedPage: archivedResponse?.meta?.page ?? archivedQueryPage,
        setArchivedPage,
        activeError,
        archivedError,
        refetchActive,
        refetchArchived,
    };
};
