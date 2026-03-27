import { useSearchParams } from 'react-router';
import { useGetProjectsQuery } from '@service';

export const useProjectList = () => {
    const [searchParams, setSearchParams] = useSearchParams();

    const activePage = Number(searchParams.get('page')) || 1;
    const archivedPage = Number(searchParams.get('archived_page')) || 1;

    const { data: activeResponse, isFetching: isActiveLoading } =
        useGetProjectsQuery({ page: activePage, archived: false });

    const { data: archivedResponse, isFetching: isArchivedLoading } =
        useGetProjectsQuery({ page: archivedPage, archived: true });

    const setActivePage = (page: number) => {
        const newParams = new URLSearchParams(searchParams);
        newParams.set('page', page.toString());
        setSearchParams(newParams);
    };

    const setArchivedPage = (page: number) => {
        const newParams = new URLSearchParams(searchParams);
        newParams.set('archived_page', page.toString());
        setSearchParams(newParams);
    };

    return {
        activeProjects: activeResponse?.data ?? [],
        activeMeta: activeResponse?.meta,
        activePage,
        setActivePage,
        isLoading: isActiveLoading || isArchivedLoading,
        archivedProjects: archivedResponse?.data ?? [],
        archivedMeta: archivedResponse?.meta,
        archivedPage,
        setArchivedPage,
    };
};
