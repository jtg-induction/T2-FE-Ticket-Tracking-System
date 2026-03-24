import { Link } from 'react-router';

import { Avatar, Box, Paper, Stack, Tooltip, Typography } from '@mui/material';

import { PATHS, USER_ROLE_OPTIONS } from '@constant';
import { stringToColor } from '@util';

import { UserDetailProps } from './UserDetail.types';

export const UserDetailBlock = ({ label, user, icon }: UserDetailProps) => (
    <Box sx={{ my: 4 }}>
        <Stack direction="row" alignItems="center" spacing={1} mb={1}>
            {icon}
            <Typography
                variant="caption"
                fontWeight={700}
                color="textSecondary"
                sx={{ textTransform: 'uppercase' }}
            >
                {label}
            </Typography>
        </Stack>
        <Paper
            variant="outlined"
            sx={{
                p: 1.5,
                bgcolor: 'grey.50',
                borderStyle: 'dashed',
            }}
        >
            <Stack
                direction="row"
                component={!!user ? Link : Stack}
                to={`${PATHS.PROFILE}/${user?.user_id}`}
                sx={{ textDecoration: 'none' }}
            >
                {!!user && (
                    <Tooltip
                        title={user?.email || 'No email available'}
                        arrow
                        placement="left"
                    >
                        <Avatar
                            sx={{
                                bgcolor: `${stringToColor(user?.email ?? '')}`,
                            }}
                        >
                            {user?.first_name?.[0]}
                            {user?.last_name?.[0]}
                        </Avatar>
                    </Tooltip>
                )}
                <Box sx={{ minWidth: 0 }}>
                    <Typography
                        title={
                            user
                                ? `${user.first_name} ${user.last_name}`
                                : 'Unassigned'
                        }
                        color="text.primary"
                        variant="body2"
                        fontWeight={600}
                    >
                        {user
                            ? `${user.first_name} ${user.last_name}`
                            : 'Unassigned'}
                    </Typography>
                    <Typography
                        title={
                            USER_ROLE_OPTIONS.find(
                                (r) => r.value === user?.role,
                            )?.label || user?.role
                        }
                        variant="caption"
                        color="text.secondary"
                    >
                        {user?.role}
                    </Typography>
                </Box>
            </Stack>
        </Paper>
    </Box>
);
