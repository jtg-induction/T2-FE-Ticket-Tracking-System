import { useParams } from 'react-router';

import { ProjectDetail, ProjectUsers } from '@container';

import {
    StyledDashboardLayout,
    StyledSidebar,
} from './ProjectDetailPage.style';

export const ProjectDetailPage = () => {
    const { projectId } = useParams<{ projectId: string }>();
    return (
        <StyledDashboardLayout flexWrap="wrap" direction="row" gap={3}>
            <ProjectDetail />
            {projectId && (
                <StyledSidebar>
                    <ProjectUsers />
                </StyledSidebar>
            )}
        </StyledDashboardLayout>
    );
};
