import { useParams } from 'react-router';

import { ProjectDetail, ProjectUsers } from '@container';
import { DashboardLayout } from '@layout';

export const ProjectDetailPage = () => {
    const { projectId } = useParams<{ projectId: string }>();

    return (
        <DashboardLayout
            main={<ProjectDetail />}
            sidebar={projectId ? <ProjectUsers /> : undefined}
        />
    );
};
