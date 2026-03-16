import { useNavigate } from 'react-router';

import { Menu as MenuIcon } from '@mui/icons-material';
import { Avatar, Box, IconButton } from '@mui/material';

import Logo from '@assets/logo/logo-light.webp';
import { PATHS } from '@constant';

import { StyledAppBar, StyledLogo, StyledToolbar } from './Header.style';
import { HeaderProps } from './Header.types';

export const Header = ({ userInitial, onSidebarToggle }: HeaderProps) => {
    const navigator = useNavigate();
    return (
        <StyledAppBar>
            <StyledToolbar>
                <Box display="flex" alignItems="center">
                    <IconButton
                        aria-label="Toggle sidebar"
                        onClick={onSidebarToggle}
                    >
                        <MenuIcon />
                    </IconButton>
                    <StyledLogo
                        component="img"
                        paddingX={4}
                        src={Logo}
                        alt="Logo"
                    />
                </Box>
                <IconButton
                    onClick={() => void navigator(PATHS.PROFILE)}
                    aria-label="Go to profile"
                >
                    <Avatar aria-label="User avatar">{userInitial}</Avatar>
                </IconButton>
            </StyledToolbar>
        </StyledAppBar>
    );
};
