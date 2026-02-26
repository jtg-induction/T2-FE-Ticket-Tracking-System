import { Stack, Grid2 as Grid, Container } from '@mui/material';

import { ProjectDetail } from '@container';
import { useParams } from 'react-router';
import { ProjectUsersContainer } from './ProjectUsers';

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
                            <ProjectUsersContainer />
                        </Grid>
                    )}
                </Grid>
            </Stack>
        </Container>
    );
};
