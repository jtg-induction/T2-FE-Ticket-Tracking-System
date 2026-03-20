import { useNavigate } from 'react-router';

import { Menu as MenuIcon } from '@mui/icons-material';
import { Box } from '@mui/material';

import Logo from '@assets/logo/logo-light.webp';
import { CustomIconButton } from '@component';
import { PATHS } from '@constant';

import {
    StyledAppBar,
    StyledAvatar,
    StyledLogo,
    StyledToolbar,
} from './Header.style';
import { HeaderProps } from './Header.types';

export const Header = ({ userInitial, onSidebarToggle }: HeaderProps) => {
    const navigator = useNavigate();
    return (
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
                    <StyledLogo
                        component="img"
                        paddingX={4}
                        src={Logo}
                        alt="Logo"
                    />
                </Box>
                <CustomIconButton
                    variant="standard"
                    onClick={() => void navigator(PATHS.PROFILE)}
                    aria-label="Go to profile"
                >
                    <StyledAvatar aria-label="User avatar">
                        {userInitial}
                    </StyledAvatar>
                </CustomIconButton>
            </StyledToolbar>
        </StyledAppBar>
    );
};
