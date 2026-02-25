import { useState } from 'react';

import { useNavigate } from 'react-router';

import AddIcon from '@mui/icons-material/Add';
import ArchiveIcon from '@mui/icons-material/Archive';
import ListIcon from '@mui/icons-material/List';
import {
    Box,
    CircularProgress,
    Container,
    IconButton,
    Pagination,
    Stack,
    ToggleButton,
    ToggleButtonGroup,
    Tooltip,
    Typography,
    useTheme,
} from '@mui/material';

import { ProjectItem } from '@component';
import { PATHS } from '@constant';

import { useProjectList } from './useProjectList.hook';

export const ProjectPage = () => {
    const {
        palette,
        typography: { pxToRem },
    } = useTheme();
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
    } = useProjectList();

    const handleViewChange = (
        _event: React.MouseEvent<HTMLElement>,
        nextView: 'active' | 'archived',
    ) => {
        if (nextView !== null) {
            setView(nextView);
        }
    };

    if (isActiveLoading && activeProjects.length === 0) {
        return (
            <Box
                display="flex"
                justifyContent="center"
                alignItems="center"
                height="100vh"
            >
                <CircularProgress />
            </Box>
        );
    }

    const isShowingActive = view === 'active';
    const currentProjects = isShowingActive ? activeProjects : archivedProjects;
    const currentMeta = isShowingActive ? activeMeta : archivedMeta;
    const currentPage = isShowingActive ? activePage : archivedPage;
    const setCurrentPage = isShowingActive ? setActivePage : setArchivedPage;

    return (
        <Box
            sx={{
                height: '100vh',
                display: 'flex',
                flexDirection: 'column',
                overflow: 'hidden',
                backgroundColor: palette.background.default,
            }}
        >
            <Container
                maxWidth="md"
                sx={{
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    pt: pxToRem(32),
                }}
            >
                <Box
                    display="flex"
                    justifyContent="space-between"
                    alignItems="center"
                    sx={{ mb: pxToRem(24), flexShrink: 0 }}
                >
                    <Typography variant="h4" fontWeight="bold">
                        Projects
                    </Typography>

                    <Stack direction="row" spacing={2} alignItems="center">
                        <Tooltip title="Create Project">
                            <IconButton
                                onClick={() =>
                                    void navigate(PATHS.PROJECTS + '/new')
                                }
                                sx={{
                                    backgroundColor: 'primary.main',
                                    color: 'white',
                                    '&:hover': {
                                        backgroundColor: 'primary.dark',
                                    },
                                    width: pxToRem(40),
                                    height: pxToRem(40),
                                }}
                            >
                                <AddIcon />
                            </IconButton>
                        </Tooltip>
                    </Stack>
                </Box>

                <Box display={'flex'} justifyContent={'space-between'}>
                    <Box />
                    <ToggleButtonGroup
                        value={view}
                        exclusive
                        onChange={handleViewChange}
                        size="small"
                        color="primary"
                    >
                        <ToggleButton value="active" sx={{ px: 2 }}>
                            <ListIcon sx={{ mr: 1, fontSize: '1.2rem' }} />
                            Active
                        </ToggleButton>
                        <ToggleButton value="archived" sx={{ px: 2 }}>
                            <ArchiveIcon sx={{ mr: 1, fontSize: '1.2rem' }} />
                            Archived
                        </ToggleButton>
                    </ToggleButtonGroup>
                </Box>

                <Box
                    sx={{
                        flexGrow: 1,
                        overflowY: 'auto',
                        pr: pxToRem(8),
                        pb: pxToRem(120),
                        scrollbarWidth: 'thin',
                        scrollbarColor: `${palette.divider} transparent`,
                    }}
                >
                    <Box sx={{ mt: 2, opacity: isShowingActive ? 1 : 0.85 }}>
                        {currentProjects.length > 0 ? (
                            currentProjects.map((project) => (
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
                        ) : (
                            <Typography
                                variant="body1"
                                color="text.secondary"
                                textAlign="center"
                                sx={{ mt: 8 }}
                            >
                                No {view} projects found.
                            </Typography>
                        )}

                        {currentMeta && currentMeta.count > 5 && (
                            <Box
                                display="flex"
                                justifyContent="center"
                                mt={pxToRem(32)}
                            >
                                <Pagination
                                    count={Math.ceil(currentMeta.count / 5)}
                                    page={currentPage}
                                    onChange={(_, v) => setCurrentPage(v)}
                                    color="primary"
                                />
                            </Box>
                        )}
                    </Box>
                </Box>
            </Container>
        </Box>
    );
};
