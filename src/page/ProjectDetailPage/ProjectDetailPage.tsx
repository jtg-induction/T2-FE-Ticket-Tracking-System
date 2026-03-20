import { useParams } from 'react-router';

import { Stack } from '@mui/material';

import { ProjectDetail, ProjectUsers } from '@container';

export const ProjectDetailPage = () => {
    const { projectId } = useParams<{ projectId: string }>();
    return (
        <Stack
            maxWidth="lg"
            minHeight="100%"
            minWidth="100%"
            justifyContent="center"
            p={4}
            gap={4}
            direction={{ md: 'row', sm: 'column' }}
        >
            <ProjectDetail />
            {projectId && projectId !== 'new' && <ProjectUsers />}
        </Stack>
    );
};
