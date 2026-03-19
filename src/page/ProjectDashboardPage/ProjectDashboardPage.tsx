import { ProjectUsers, TicketBoard } from '@container';
import { JQLSearch } from '@page';

import {
    StyledDashboardLayout,
    StyledSidebar,
} from './ProjectDashboardPage.style';

export const ProjectDashboardPage = () => (
    <StyledDashboardLayout flexWrap="wrap" direction="row" gap={3}>
        <TicketBoard />
        <StyledSidebar>
            <ProjectUsers />
            <JQLSearch />
        </StyledSidebar>
    </StyledDashboardLayout>
);
