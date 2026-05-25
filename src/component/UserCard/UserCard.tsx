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

import { stringToColor } from '@util';

import { StyledUserCardItem, StyledUserInfo } from './UserCard.style';
import { UserAction, UserCardProps } from './UserCard.types';

export const UserCard = ({
    userId,
    firstName,
    lastName,
    email,
    role,
    showMenu,
    canMakeOwner,
    canMakeAdmin,
    canRevokeAdmin,
    anchorEl,
    onCardClick,
    onMenuOpen,
    onMenuClose,
    onActionClick,
}: UserCardProps) => {
    const open = Boolean(anchorEl);

    const initials =
        `${firstName?.charAt(0) || ''}${lastName?.charAt(0) || ''}`.toUpperCase();

    return (
        <StyledUserCardItem onClick={onCardClick}>
            <Avatar sx={{ bgcolor: stringToColor(email) }}>{initials}</Avatar>

            <StyledUserInfo spacing={-1}>
                <Typography
                    title={`${firstName} ${lastName}`}
                    variant="subtitle2"
                    noWrap
                    fontWeight="600"
                >
                    {firstName} {lastName}
                </Typography>
                <Typography
                    variant="caption"
                    color="text.secondary"
                    textTransform="capitalize"
                >
                    {role}
                </Typography>
            </StyledUserInfo>

            {showMenu && (
                <Box>
                    <IconButton
                        size="small"
                        onClick={(e) => {
                            e.stopPropagation();
                            onMenuOpen(e);
                        }}
                        aria-label="settings"
                        sx={{ ml: 1 }}
                    >
                        <MoreVertIcon fontSize="small" />
                    </IconButton>

                    <Menu
                        anchorEl={anchorEl}
                        open={open}
                        onClose={onMenuClose}
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
                        {canMakeOwner && (
                            <MenuItem
                                onClick={(e) => {
                                    e.stopPropagation();
                                    onActionClick(UserAction.MakeOwner, userId);
                                }}
                            >
                                <ListItemIcon>
                                    <VerifiedUserIcon fontSize="small" />
                                </ListItemIcon>
                                <ListItemText>Make Owner</ListItemText>
                            </MenuItem>
                        )}

                        {canMakeAdmin && (
                            <MenuItem
                                onClick={(e) => {
                                    e.stopPropagation();
                                    onActionClick(UserAction.MakeAdmin, userId);
                                }}
                            >
                                <ListItemIcon>
                                    <AdminPanelSettingsIcon fontSize="small" />
                                </ListItemIcon>
                                <ListItemText>Make Admin</ListItemText>
                            </MenuItem>
                        )}

                        {canRevokeAdmin && (
                            <MenuItem
                                onClick={(e) => {
                                    e.stopPropagation();
                                    onActionClick(
                                        UserAction.RevokeAdmin,
                                        userId,
                                    );
                                }}
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
                            onClick={(e) => {
                                e.stopPropagation();
                                onActionClick(UserAction.RemoveUser, userId);
                            }}
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
