import { MouseEvent, useState } from 'react';

import { useNavigate } from 'react-router';

import {
    Add as AddIcon,
    Archive as ArchiveIcon,
    FolderOpen as FolderOpenIcon,
    List as ListIcon,
} from '@mui/icons-material';
import {
    Box,
    Button,
    Pagination,
    Stack,
    ToggleButton,
    ToggleButtonGroup,
    Tooltip,
    Typography,
} from '@mui/material';

import { CustomIconButton, LoadingOverlay } from '@component';
import { ProjectItem } from '@component';
import { PAGE_SIZE, PATHS } from '@constant';
import { useProjectList } from '@hook';

import { EmptyStateContainer, EmptyStateContent } from './ProjectList.style';
import { ProjectState } from './ProjectList.types';

export const ProjectList = () => {
    const navigate = useNavigate();
    const [view, setView] = useState<ProjectState>(ProjectState.ACTIVE);

    const {
        activeProjects,
        activeMeta,
        activePage,
        setActivePage,
        archivedProjects,
        archivedMeta,
        archivedPage,
        setArchivedPage,
        isLoading,
    } = useProjectList();

    const handleViewChange = (
        _: MouseEvent<HTMLElement>,
        nextView: ProjectState,
    ) => {
        if (nextView !== null) setView(nextView);
    };

    const isShowingActive = view === ProjectState.ACTIVE;
    const currentProjects = isShowingActive ? activeProjects : archivedProjects;
    const currentMeta = isShowingActive ? activeMeta : archivedMeta;
    const currentPage = isShowingActive ? activePage : archivedPage;
    const setCurrentPage = isShowingActive ? setActivePage : setArchivedPage;

    const handleCreateProject = () => navigate(PATHS.PROJECTS + '/new/detail');

    return (
        <Stack
            position="relative"
            minHeight="100%"
            width="100%"
            maxWidth="md"
            marginInline="auto"
            padding={4}
            boxSizing="border-box"
            direction="column"
            gap={3}
            overflow="hidden"
        >
            {isLoading && <LoadingOverlay />}
            {!isLoading && currentProjects.length === 0 ? (
                <EmptyStateContainer>
                    <EmptyStateContent>
                        <FolderOpenIcon
                            color="disabled"
                            style={{ fontSize: 100 }}
                        />
                        <Typography variant="h6" color="text.disabled">
                            Get started by creating your first project.
                        </Typography>
                    </EmptyStateContent>

                    <Button
                        variant="contained"
                        startIcon={<AddIcon />}
                        onClick={void handleCreateProject}
                        size="medium"
                    >
                        Create your first project
                    </Button>
                </EmptyStateContainer>
            ) : (
                <>
                    <Stack
                        direction="row"
                        justifyContent="space-between"
                        alignItems="center"
                        flexShrink={0}
                    >
                        <Typography variant="h4" fontWeight="bold">
                            Projects
                        </Typography>
                        <Tooltip title="Create Project">
                            <CustomIconButton
                                onClick={void handleCreateProject}
                            >
                                <AddIcon />
                            </CustomIconButton>
                        </Tooltip>
                    </Stack>

                    <Box flexShrink={0}>
                        <ToggleButtonGroup
                            value={view}
                            exclusive
                            onChange={handleViewChange}
                            size="small"
                            color="primary"
                        >
                            <ToggleButton value="active" sx={{ px: 2 }}>
                                <ListIcon sx={{ mr: 1, fontSize: '1.2rem' }} />{' '}
                                Active
                            </ToggleButton>
                            <ToggleButton value="archived" sx={{ px: 2 }}>
                                <ArchiveIcon
                                    sx={{ mr: 1, fontSize: '1.2rem' }}
                                />{' '}
                                Archived
                            </ToggleButton>
                        </ToggleButtonGroup>
                    </Box>

                    <Stack
                        gap={2}
                        flexGrow={1}
                        overflow="auto"
                        pr={1}
                        minHeight={0}
                    >
                        {currentProjects.map((project) => (
                            <Box key={project.id} flexShrink={0}>
                                <ProjectItem
                                    onClick={() =>
                                        void navigate(
                                            `${PATHS.PROJECTS}/${project.id}`,
                                        )
                                    }
                                    project={project}
                                />
                            </Box>
                        ))}
                    </Stack>

                    {currentMeta && currentMeta.count > PAGE_SIZE && (
                        <Box
                            marginTop="auto"
                            marginLeft="auto"
                            pt={2}
                            flexShrink={0}
                        >
                            <Pagination
                                count={Math.ceil(currentMeta.count / PAGE_SIZE)}
                                page={currentPage}
                                onChange={(_, v) => setCurrentPage(v)}
                                color="primary"
                            />
                        </Box>
                    )}
                </>
            )}
        </Stack>
    );
};
