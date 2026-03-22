import { Box, Stack } from '@mui/material';

import { TicketComments, TicketDetail } from '@container';

export const TicketDetailPage = () => (
    <Stack
        flexWrap="wrap"
        justifyItems="center"
        direction={{ xs: 'column', md: 'row' }}
        padding={4}
        gap={4}
        height="100%"
        overflow="hidden"
    >
        <Box flex={5} height="100%">
            <TicketDetail />
        </Box>
        <Box flex={2} height="100%">
            <TicketComments />
        </Box>
    </Stack>
);
