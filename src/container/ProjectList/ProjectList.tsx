import { MouseEvent, useState } from 'react';

import { useNavigate } from 'react-router';

import {
    Add as AddIcon,
    Archive as ArchiveIcon,
    List as ListIcon,
} from '@mui/icons-material';
import {
    Box,
    CircularProgress,
    Pagination,
    Stack,
    ToggleButton,
    ToggleButtonGroup,
    Tooltip,
    Typography,
} from '@mui/material';

import { CustomIconButton } from '@component';
import { ProjectItem } from '@component';
import { PAGE_SIZE, PATHS } from '@constant';
import { useProjectList } from '@hook';

import { ProjectState } from './ProjectList.types';

export const ProjectList = () => {
    const navigate = useNavigate();

    const [view, setView] = useState<ProjectState>(ProjectState.ACTIVE);

    const {
        activeProjects,
        activeMeta,
        activePage,
        setActivePage,
        isActiveLoading,
        archivedProjects,
        archivedMeta,
        archivedPage,
        setArchivedPage,
        isArchivedLoading,
    } = useProjectList();

    const handleViewChange = (
        _event: MouseEvent<HTMLElement>,
        nextView: ProjectState,
    ) => {
        if (nextView !== null) {
            setView(nextView);
        }
    };

    const isShowingActive = view === ProjectState.ACTIVE;
    const currentProjects = isShowingActive ? activeProjects : archivedProjects;
    const currentMeta = isShowingActive ? activeMeta : archivedMeta;
    const currentPage = isShowingActive ? activePage : archivedPage;
    const setCurrentPage = isShowingActive ? setActivePage : setArchivedPage;
    const isLoading = isShowingActive ? isActiveLoading : isArchivedLoading;

    if (isLoading && currentProjects.length === 0) {
        return (
            <Box
                display="flex"
                justifyContent="center"
                alignItems="center"
                height="100%"
            >
                <CircularProgress />
            </Box>
        );
    }

    return (
        <Stack
            minHeight="100%"
            width="100%"
            maxWidth="md"
            marginInline="auto"
            padding={4}
            boxSizing="border-box"
            direction="column"
            gap={2}
            overflow="hidden"
        >
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
                        onClick={() =>
                            void navigate(PATHS.PROJECTS + '/new/detail')
                        }
                    >
                        <AddIcon />
                    </CustomIconButton>
                </Tooltip>
            </Stack>

            <Box>
                <ToggleButtonGroup
                    value={view}
                    exclusive
                    onChange={handleViewChange}
                    size="small"
                    color="primary"
                >
                    <ToggleButton value="active" sx={{ px: 2 }}>
                        <ListIcon sx={{ mr: 1, fontSize: '1.2rem' }} /> Active
                    </ToggleButton>
                    <ToggleButton value="archived" sx={{ px: 2 }}>
                        <ArchiveIcon sx={{ mr: 1, fontSize: '1.2rem' }} />{' '}
                        Archived
                    </ToggleButton>
                </ToggleButtonGroup>
            </Box>

            <Stack gap={2} flexGrow={1} overflow="auto" pr={1} minHeight={0}>
                {currentProjects.length > 0
                    ? currentProjects.map((project) => (
                          <Box key={project.id} flexShrink={0}>
                              <ProjectItem
                                  onClick={() =>
                                      void navigate(
                                          `${PATHS.PROJECTS}/${project.id}`,
                                      )
                                  }
                                  name={project.title}
                                  description={project.description}
                                  lastUpdated={project.updated_at}
                              />
                          </Box>
                      ))
                    : !isLoading && (
                          <Typography
                              variant="body1"
                              color="text.secondary"
                              textAlign="center"
                              sx={{ mt: 8 }}
                          >
                              No {view} projects found.
                          </Typography>
                      )}
            </Stack>

            {currentMeta && currentMeta.count > PAGE_SIZE && (
                <Box marginTop="auto" marginLeft="auto" flexShrink={0}>
                    <Pagination
                        count={Math.ceil(currentMeta.count / PAGE_SIZE)}
                        page={currentPage}
                        onChange={(_, v) => setCurrentPage(v)}
                        color="primary"
                    />
                </Box>
            )}
        </Stack>
    );
};
