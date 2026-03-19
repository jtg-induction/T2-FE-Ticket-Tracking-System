import { useParams } from 'react-router';

import { Container, Grid2 as Grid, Stack } from '@mui/material';

import { ProjectDetail, ProjectUsers } from '@container';

export const ProjectDetailPage = () => {
    const { projectId } = useParams<{ projectId: string }>();
    return (
        <Container>
            <Stack maxWidth="lg">
                <Grid container spacing={4}>
                    <Grid size={{ xs: 12, md: 8 }}>
                        <ProjectDetail />
                    </Grid>

                    {projectId && projectId !== 'new' && (
                        <Grid size={{ xs: 12, md: 4 }}>
                            <ProjectUsers />
                        </Grid>
                    )}
                </Grid>
            </Stack>
        </Container>
    );
};
