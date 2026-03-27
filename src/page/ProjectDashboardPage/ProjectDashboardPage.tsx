import { ProjectUsers, TicketBoard } from '@container';
import { DashboardLayout } from '@layout';
import { JQLSearch } from '@page';

export const ProjectDashboardPage = () => (
    <DashboardLayout
        main={<TicketBoard />}
        sidebar={
            <>
                <ProjectUsers />
                <JQLSearch />
            </>
        }
    />
);
