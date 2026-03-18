import { Stack } from '@mui/material';

import { TicketComments, TicketDetail } from '@container';

export const TicketDetailPage = () => (
    <Stack
        justifyItems="center"
        direction={{ xs: 'column', md: 'row' }}
        padding={4}
        gap={4}
    >
        <TicketDetail />
        <TicketComments />
    </Stack>
);
