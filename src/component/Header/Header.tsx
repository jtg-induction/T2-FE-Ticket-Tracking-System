import MenuIcon from '@mui/icons-material/Menu';
import { Avatar, Box, IconButton } from '@mui/material';

import logo from '@assets/logo/logo-light.webp';
import { theme } from '@theme';

import { HeaderLeft, HeaderRoot } from './Header.style';
import { HeaderProps } from './Header.type';

export const Header = ({ userInitial, onSidebarToggle }: HeaderProps) => (
    <HeaderRoot>
        <HeaderLeft direction="row">
            <IconButton aria-label="Toggle sidebar" onClick={onSidebarToggle}>
                <MenuIcon
                    sx={{
                        color: theme.palette.background.paper,
                        height: 32,
                        width: 32,
                    }}
                />
            </IconButton>
            <Box
                component={'img'}
                src={logo}
                alt="Logo"
                sx={{
                    height: '80%',
                }}
            />
        </HeaderLeft>
        {/* TODO: Add actual logic for avatar click */}
        <IconButton>
            <Avatar aria-label="User avatar">{userInitial}</Avatar>
        </IconButton>
    </HeaderRoot>
);
