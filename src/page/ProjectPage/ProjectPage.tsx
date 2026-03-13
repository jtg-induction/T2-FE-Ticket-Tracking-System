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
    IconButton,
    Pagination,
    Stack,
    ToggleButton,
    ToggleButtonGroup,
    Tooltip,
    Typography,
} from '@mui/material';

import { ProjectItem } from '@component';
import { PAGE_SIZE, PATHS } from '@constant';
import { useProjectList } from '@hook';

export const ProjectPage = () => {
    const navigate = useNavigate();

    const [view, setView] = useState<'active' | 'archived'>('active');

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
        nextView: 'active' | 'archived',
    ) => {
        if (nextView !== null) {
            setView(nextView);
        }
    };

    const isShowingActive = view === 'active';
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
            minHeight={'100%'}
            maxWidth="md"
            marginInline={'auto'}
            paddingBlock={4}
            boxSizing={'border-box'}
            direction={'column'}
            gap={2}
        >
            <Stack
                direction={'row'}
                justifyContent="space-between"
                alignItems="center"
            >
                <Typography variant="h4" fontWeight="bold">
                    Projects
                </Typography>

                <Tooltip title="Create Project">
                    <IconButton
                        onClick={() => void navigate(PATHS.PROJECTS + '/new')}
                        sx={{
                            bgcolor: 'primary.main',
                            color: 'white',
                            '&:hover': { bgcolor: 'primary.dark' },
                        }}
                    >
                        <AddIcon />
                    </IconButton>
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

            <Stack gap={2}>
                {currentProjects.length > 0
                    ? currentProjects.map((project) => (
                          <ProjectItem
                              key={project.id}
                              onClick={() =>
                                  void navigate(
                                      `${PATHS.PROJECTS}/${project.id}`,
                                  )
                              }
                              name={project.title}
                              description={project.description}
                              lastUpdated={project.updated_at}
                          />
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
                <Box marginTop={'auto'} marginLeft={'auto'}>
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
