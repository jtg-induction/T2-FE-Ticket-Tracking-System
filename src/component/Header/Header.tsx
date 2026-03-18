import { MouseEvent, useState } from 'react';

import { useNavigate } from 'react-router';

import {
    Logout as LogoutIcon,
    Menu as MenuIcon,
    Person as PersonIcon,
} from '@mui/icons-material';
import {
    Box,
    Divider,
    ListItemIcon,
    ListItemText,
    Menu,
    MenuItem,
    Stack,
    Typography,
} from '@mui/material';

import Logo from '@assets/logo/logo-light.webp';
import { CustomIconButton, ErrorSnackbar } from '@component';
import { PATHS, USER_ROLE_OPTIONS } from '@constant';
import { useAppDispatch } from '@hook';
import { useGetUserByIdQuery, useLogoutMutation } from '@service';
import { logOut } from '@store';
import { ErrorResponse } from '@type';

import {
    StyledAppBar,
    StyledAvatar,
    StyledLogo,
    StyledMenuLink,
    StyledToolbar,
} from './Header.style';
import { HeaderProps } from './Header.types';

export const Header = ({ onSidebarToggle }: HeaderProps) => {
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const [logoutApi] = useLogoutMutation();

    const { data: response } = useGetUserByIdQuery('');

    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const [error, setError] = useState<ErrorResponse | null>(null);
    const open = Boolean(anchorEl);

    const handleOpenMenu = (event: MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleCloseMenu = () => {
        setAnchorEl(null);
    };

    const handleLogout = async () => {
        try {
            await logoutApi().unwrap();
            dispatch(logOut());
            void navigate(PATHS.LOGIN);
        } catch (err) {
            setError(err as ErrorResponse);
        }
    };

    const initials = response?.data
        ? `${response.data.first_name?.[0] || ''}${response.data.last_name?.[0] || ''}`.toUpperCase()
        : '?';

    return (
        <>
            <StyledAppBar>
                <StyledToolbar>
                    <Box display="flex" alignItems="center">
                        <CustomIconButton
                            variant="standard"
                            aria-label="Toggle sidebar"
                            onClick={onSidebarToggle}
                        >
                            <MenuIcon />
                        </CustomIconButton>
                        <StyledMenuLink to="/">
                            <StyledLogo
                                component="img"
                                paddingX={4}
                                src={Logo}
                                alt="Logo"
                            />
                        </StyledMenuLink>
                    </Box>
                    <CustomIconButton
                        variant="standard"
                        onClick={handleOpenMenu}
                        aria-label="Go to profile"
                    >
                        <StyledAvatar aria-label="User avatar">
                            {initials}
                        </StyledAvatar>
                    </CustomIconButton>

                    <Menu
                        anchorEl={anchorEl}
                        open={open}
                        onClose={handleCloseMenu}
                        transformOrigin={{
                            horizontal: 'right',
                            vertical: 'top',
                        }}
                        anchorOrigin={{
                            horizontal: 'right',
                            vertical: 'bottom',
                        }}
                        slotProps={{
                            paper: { sx: { width: 260, borderRadius: 2 } },
                        }}
                    >
                        <Stack spacing={2}>
                            <Typography
                                variant="h6"
                                fontWeight={700}
                                color="primary"
                                noWrap
                            >
                                {response?.data
                                    ? `${response.data.first_name} ${response.data.last_name}`
                                    : 'Loading...'}
                            </Typography>
                            <Typography
                                variant="caption"
                                color="text.secondary"
                                noWrap
                            >
                                {response?.data.email}
                            </Typography>
                            <Typography fontWeight={600} variant="body2" noWrap>
                                {USER_ROLE_OPTIONS.find(
                                    (r) => r.value === response?.data.role,
                                )?.label || response?.data.role}
                            </Typography>
                        </Stack>

                        <Divider />

                        <MenuItem
                            onClick={() => {
                                void navigate(PATHS.PROFILE);
                                handleCloseMenu();
                            }}
                        >
                            <ListItemIcon>
                                <PersonIcon fontSize="small" />
                            </ListItemIcon>
                            <ListItemText>My Profile</ListItemText>
                        </MenuItem>

                        <MenuItem onClick={() => void handleLogout()}>
                            <ListItemIcon>
                                <LogoutIcon fontSize="small" color="error" />
                            </ListItemIcon>
                            <ListItemText sx={{ color: 'error.main' }}>
                                Logout
                            </ListItemText>
                        </MenuItem>
                    </Menu>
                </StyledToolbar>
            </StyledAppBar>

            <ErrorSnackbar error={error} onClose={() => setError(null)} />
        </>
    );
};
