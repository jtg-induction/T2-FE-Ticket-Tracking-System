import { TicketComments, TicketDetail } from '@container';
import { DashboardLayout } from '@layout';

export const TicketDetailPage = () => (
    <DashboardLayout main={<TicketDetail />} sidebar={<TicketComments />} />
);
