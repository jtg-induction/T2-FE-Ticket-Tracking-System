import { Stack } from '@mui/material';

import { TicketDetail } from '@container';

export const TicketDetailPage = () => (
    <Stack
        height="100%"
        direction="row"
        padding={4}
        gap={4}
        justifyContent="center"
    >
        <TicketDetail />
    </Stack>
);
