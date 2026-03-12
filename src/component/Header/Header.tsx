import MenuIcon from '@mui/icons-material/Menu';
import { Avatar, Box, IconButton } from '@mui/material';

import logo from '@assets/logo/logo-light.webp';

import { HeaderLeft, HeaderRoot } from './Header.style';
import { HeaderProps } from './Header.type';

export const Header = ({ userInitial, onSidebarToggle }: HeaderProps) => (
    <HeaderRoot>
        <HeaderLeft direction="row">
            <IconButton aria-label="Toggle sidebar" onClick={onSidebarToggle}>
                <MenuIcon />
            </IconButton>
            <Box component={'img'} src={logo} alt="Logo" />
        </HeaderLeft>
        {/* TODO: Add actual logic for avatar click */}
        <IconButton>
            <Avatar aria-label="User avatar">{userInitial}</Avatar>
        </IconButton>
    </HeaderRoot>
);
