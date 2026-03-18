import { Avatar, Box, Paper, Stack, Tooltip, Typography } from '@mui/material';

import { ProjectMember } from '@type/user.types';

import { UserDetailProps } from './UserDetail.types';

export const UserDetailBlock = ({ label, user, icon }: UserDetailProps) => (
    <Box sx={{ mb: 3 }}>
        <Stack direction="row" alignItems="center" spacing={1} mb={1}>
            {icon}
            <Typography
                variant="caption"
                fontWeight={700}
                color="text.secondary"
                sx={{ textTransform: 'uppercase' }}
            >
                {label}
            </Typography>
        </Stack>
        <Tooltip
            title={user?.email || 'No email available'}
            arrow
            placement="left"
        >
            <Paper
                variant="outlined"
                sx={{ p: 1.5, bgcolor: 'grey.50', borderStyle: 'dashed' }}
            >
                <Stack direction="row" spacing={2} alignItems="center">
                    <Avatar>{user?.first_name?.[0]}</Avatar>
                    <Box>
                        <Typography variant="body2" fontWeight={600}>
                            {user
                                ? `${user.first_name} ${user.last_name}`
                                : 'Unassigned'}
                        </Typography>
                        <Typography variant="caption" color="text.secondary">
                            {(user as ProjectMember)?.role || 'Team Member'}
                        </Typography>
                    </Box>
                </Stack>
            </Paper>
        </Tooltip>
    </Box>
);
