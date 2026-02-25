import { useNavigate } from 'react-router';

import MenuIcon from '@mui/icons-material/Menu';
import { Avatar, Box, IconButton } from '@mui/material';

import Logo from '@assets/logo/logo-light.webp';
import { PATHS } from '@constant';

import { StyledAppBar, StyledToolbar } from './Header.style';
import { HeaderProps } from './Header.type';

export const Header = ({ userInitial, onSidebarToggle }: HeaderProps) => {
    const navigator = useNavigate();
    return (
        <StyledAppBar>
            <StyledToolbar>
                <Box display={'flex'} alignItems={'center'}>
                    <IconButton
                        aria-label="Toggle sidebar"
                        onClick={onSidebarToggle}
                    >
                        <MenuIcon />
                    </IconButton>
                    <Box
                        component={'img'}
                        paddingX={4}
                        src={Logo}
                        alt="Logo"
                        sx={{
                            height: 32,
                            width: 'auto',
                        }}
                    />
                </Box>
                <IconButton onClick={() => void navigator(PATHS.PROFILE)}>
                    <Avatar
                        aria-label="User avatar"
                        sx={{
                            width: 40,
                            height: 40,
                            fontSize: '2rem',
                        }}
                    >
                        {userInitial}
                    </Avatar>
                </IconButton>
            </StyledToolbar>
        </StyledAppBar>
    );
};
