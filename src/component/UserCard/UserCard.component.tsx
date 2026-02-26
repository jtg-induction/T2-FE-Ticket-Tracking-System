import { useState } from 'react';

import { generatePath, useNavigate } from 'react-router';

import {
    AdminPanelSettings as AdminPanelSettingsIcon,
    MoreVert as MoreVertIcon,
    PersonRemove as PersonRemoveIcon,
    VerifiedUser as VerifiedUserIcon,
} from '@mui/icons-material';
import {
    Avatar,
    Box,
    IconButton,
    ListItemIcon,
    ListItemText,
    Menu,
    MenuItem,
    Typography,
    useTheme,
} from '@mui/material';

import { PATHS } from '@constant';

import { ROLE_HIERARCHY, UserCardProps } from './UserCard.types';

export const UserCard = ({
    userId,
    firstName,
    lastName,
    role,
    myRole,
    onAction,
}: UserCardProps) => {
    const navigate = useNavigate();
    const theme = useTheme();
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);

    const normalizedRole = role.toLowerCase();
    const normalizedMyRole = myRole.toLowerCase();

    const myRoleValue = ROLE_HIERARCHY[normalizedMyRole] || 0;
    const userRoleValue = ROLE_HIERARCHY[normalizedRole] || 0;

    const showMenu = myRoleValue > userRoleValue;

    const initials =
        `${firstName?.charAt(0) || ''}${lastName?.charAt(0) || ''}`.toUpperCase();

    const handleCardClick = () => {
        void navigate(generatePath(PATHS.PROFILE + '/' + userId));
    };

    const handleMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
        event.stopPropagation();
        setAnchorEl(event.currentTarget);
    };

    const handleMenuClose = (event: React.MouseEvent<HTMLElement>) => {
        event.stopPropagation();
        setAnchorEl(null);
    };

    const handleActionClick = (
        action: string,
        event: React.MouseEvent<HTMLElement>,
    ) => {
        event.stopPropagation();
        setAnchorEl(null);
        onAction(action, userId);
    };

    return (
        <Box
            onClick={handleCardClick}
            sx={{
                display: 'flex',
                alignItems: 'center',
                p: 1.5,
                borderRadius: 1,
                cursor: 'pointer',
                transition: 'background-color 0.2s',
                '&:hover': {
                    bgcolor: 'action.hover',
                },
                borderBottom: `1px solid ${theme.palette.divider}`,
                '&:last-child': {
                    borderBottom: 'none',
                },
            }}
        >
            <Avatar
                sx={{
                    bgcolor: 'primary.light',
                    color: 'primary.dark',
                    width: 32,
                    height: 32,
                    fontSize: '1.5rem',
                    fontWeight: 'bold',
                    mr: 2,
                    ml: 2,
                }}
            >
                {initials}
            </Avatar>

            <Box sx={{ flexGrow: 1, minWidth: 0 }}>
                <Typography variant="subtitle2" noWrap fontWeight="600">
                    {firstName} {lastName}
                </Typography>
                <Typography
                    variant="caption"
                    sx={{
                        color: 'text.secondary',
                        textTransform: 'capitalize',
                        display: 'block',
                        lineHeight: 1,
                    }}
                >
                    {role}
                </Typography>
            </Box>

            {showMenu && (
                <Box>
                    <IconButton
                        size="small"
                        onClick={handleMenuOpen}
                        aria-label="settings"
                        sx={{ ml: 1 }}
                    >
                        <MoreVertIcon fontSize="small" />
                    </IconButton>

                    <Menu
                        anchorEl={anchorEl}
                        open={open}
                        onClose={handleMenuClose}
                        onClick={(e) => e.stopPropagation()}
                        transformOrigin={{
                            horizontal: 'right',
                            vertical: 'top',
                        }}
                        anchorOrigin={{
                            horizontal: 'right',
                            vertical: 'bottom',
                        }}
                    >
                        {normalizedMyRole === 'owner' && (
                            <MenuItem
                                onClick={(e) =>
                                    handleActionClick('make_owner', e)
                                }
                            >
                                <ListItemIcon>
                                    <VerifiedUserIcon fontSize="small" />
                                </ListItemIcon>
                                <ListItemText>Make Owner</ListItemText>
                            </MenuItem>
                        )}

                        {((normalizedMyRole === 'owner' &&
                            normalizedRole !== 'admin') ||
                            (normalizedMyRole === 'admin' &&
                                normalizedRole === 'member')) && (
                            <MenuItem
                                onClick={(e) =>
                                    handleActionClick('make_admin', e)
                                }
                            >
                                <ListItemIcon>
                                    <AdminPanelSettingsIcon fontSize="small" />
                                </ListItemIcon>
                                <ListItemText>Make Admin</ListItemText>
                            </MenuItem>
                        )}

                        {normalizedMyRole === 'owner' &&
                            normalizedRole === 'admin' && (
                                <MenuItem
                                    sx={{ color: 'error.main' }}
                                    onClick={(e) =>
                                        handleActionClick('revoke_admin', e)
                                    }
                                >
                                    <ListItemIcon>
                                        <AdminPanelSettingsIcon
                                            fontSize="small"
                                            color="error"
                                        />
                                    </ListItemIcon>
                                    <ListItemText>Revoke Admin</ListItemText>
                                </MenuItem>
                            )}

                        <MenuItem
                            onClick={(e) => handleActionClick('remove_user', e)}
                            sx={{ color: 'error.main' }}
                        >
                            <ListItemIcon>
                                <PersonRemoveIcon
                                    fontSize="small"
                                    color="error"
                                />
                            </ListItemIcon>
                            <ListItemText>Remove User</ListItemText>
                        </MenuItem>
                    </Menu>
                </Box>
            )}
        </Box>
    );
};
