import { Box, Stack } from '@mui/material';

import { TicketComments, TicketDetail } from '@container';

export const TicketDetailPage = () => (
    <Stack
        direction={{ xs: 'column', md: 'row' }}
        padding={4}
        gap={4}
        height="100%"
    >
        <Box flex={5} width="100%" sx={{ minWidth: 0 }}>
            <TicketDetail />
        </Box>
        <Box flex={2} width="100%" sx={{ minWidth: 0 }}>
            <TicketComments />
        </Box>
    </Stack>
);
