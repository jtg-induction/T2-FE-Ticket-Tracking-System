import { MouseEvent } from 'react';

import { useNavigate, useSearchParams } from 'react-router';

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

import { CustomIconButton, LoadingOverlay, ProjectItem } from '@component';
import { PATHS, PROJECT_PAGE_SIZE } from '@constant';
import { useDocumentTitle, useProjectList } from '@hook';

import { EmptyStateContainer, EmptyStateContent } from './ProjectList.style';
import { ProjectState } from './ProjectList.types';

export const ProjectList = () => {
    useDocumentTitle('All Projects');
    const navigate = useNavigate();
    const [searchParams, setSearchParams] = useSearchParams();
    const view =
        (searchParams.get('tab') as ProjectState) || ProjectState.ACTIVE;

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
        if (nextView !== null) {
            const newParams = new URLSearchParams(searchParams);
            newParams.set('tab', nextView);
            if (nextView === ProjectState.ACTIVE) newParams.set('page', '1');
            setSearchParams(newParams);
        }
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
            maxWidth="lg"
            marginInline="auto"
            padding={4}
            boxSizing="border-box"
            direction="column"
            gap={3}
            overflow="hidden"
        >
            {isLoading && <LoadingOverlay />}
            {!isLoading &&
            activeProjects.length + archivedProjects.length === 0 &&
            currentPage == 0 ? (
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
                        onClick={() => void handleCreateProject()}
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
                                onClick={() => void handleCreateProject()}
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
                            <ToggleButton
                                value={ProjectState.ACTIVE}
                                sx={{ px: 2 }}
                            >
                                <ListIcon sx={{ mr: 1, fontSize: '1.2rem' }} />
                                Active
                            </ToggleButton>
                            <ToggleButton
                                value={ProjectState.ARCHIVED}
                                sx={{ px: 2 }}
                            >
                                <ArchiveIcon
                                    sx={{ mr: 1, fontSize: '1.2rem' }}
                                />
                                Archived
                            </ToggleButton>
                        </ToggleButtonGroup>
                    </Box>

                    <Box
                        display="grid"
                        gridTemplateColumns={{
                            xs: '1fr',
                            sm: 'repeat(2, 1fr)',
                            md: 'repeat(3, 1fr)',
                        }}
                        gap={3}
                        flexGrow={1}
                        minHeight={0}
                        sx={{
                            overflowY: 'auto',
                            alignContent: 'start',
                            pr: 1,
                            gridAutoRows: 'max-content',
                        }}
                    >
                        {currentProjects.length > 0
                            ? currentProjects.map((project) => (
                                  <ProjectItem
                                      key={project.id}
                                      onClick={() =>
                                          void navigate(
                                              `${PATHS.PROJECTS}/${project.id}`,
                                          )
                                      }
                                      project={project}
                                  />
                              ))
                            : !isLoading && (
                                  <Box
                                      gridColumn="1 / -1"
                                      display="flex"
                                      justifyContent="center"
                                      alignItems="center"
                                      minHeight="200px"
                                  >
                                      <Typography
                                          variant="body1"
                                          color="text.secondary"
                                          textAlign="center"
                                      >
                                          No {view} projects found.
                                      </Typography>
                                  </Box>
                              )}
                    </Box>

                    {currentMeta && currentMeta.count > PROJECT_PAGE_SIZE && (
                        <Box
                            marginTop="auto"
                            marginLeft="auto"
                            pt={2}
                            flexShrink={0}
                        >
                            <Pagination
                                count={Math.ceil(
                                    currentMeta.count / PROJECT_PAGE_SIZE,
                                )}
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
