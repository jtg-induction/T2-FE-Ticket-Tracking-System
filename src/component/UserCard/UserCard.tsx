import { MouseEvent, useState } from 'react';

import { useNavigate } from 'react-router';

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
} from '@mui/material';

import { PATHS } from '@constant';

import { StyledUserCardItem, StyledUserInfo } from './UserCard.style';
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
        void navigate(`${PATHS.PROFILE}/${userId}`);
    };

    const handleMenuOpen = (event: MouseEvent<HTMLElement>) => {
        event.stopPropagation();
        setAnchorEl(event.currentTarget);
    };

    const handleMenuClose = (event: MouseEvent<HTMLElement>) => {
        event.stopPropagation();
        setAnchorEl(null);
    };

    const handleActionClick = (
        action: string,
        event: MouseEvent<HTMLElement>,
    ) => {
        event.stopPropagation();
        setAnchorEl(null);
        onAction(action, userId);
    };

    return (
        <StyledUserCardItem onClick={handleCardClick}>
            <Avatar>{initials}</Avatar>

            <StyledUserInfo spacing={-1}>
                <Typography variant="subtitle2" noWrap fontWeight="600">
                    {firstName} {lastName}
                </Typography>
                <Typography
                    variant="caption"
                    color="text.secondary"
                    sx={{ textTransform: 'capitalize' }}
                >
                    {role}
                </Typography>
            </StyledUserInfo>

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
                                    color="error"
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
                            color="error"
                            onClick={(e) => handleActionClick('remove_user', e)}
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
        </StyledUserCardItem>
    );
};
