import { useLocation, useNavigate } from 'react-router';

import {
    List,
    ListItem,
    ListItemButton,
    ListItemIcon,
    ListItemText,
} from '@mui/material';

import { SIDEBAR_CONFIG } from './Sidebar.config';
import { StyledDrawer } from './Sidebar.style';
import type { SidebarProps } from './Sidebar.types';

export const Sidebar = (props: SidebarProps) => {
    const { open, onClose } = props;
    const navigate = useNavigate();
    const location = useLocation();

    const handleNavigation = (route: string) => {
        void navigate(route);
        onClose();
    };

    const drawerContent = (
        <List>
            {SIDEBAR_CONFIG.map((item) => {
                const Icon = item.icon;
                const isActive =
                    location.pathname === item.route ||
                    location.pathname.startsWith(item.route);

                return (
                    <ListItem key={item.id} disablePadding>
                        <ListItemButton
                            selected={isActive}
                            onClick={() => handleNavigation(item.route)}
                        >
                            <ListItemIcon>
                                <Icon
                                    color={isActive ? 'primary' : 'inherit'}
                                />
                            </ListItemIcon>
                            <ListItemText primary={item.title} />
                        </ListItemButton>
                    </ListItem>
                );
            })}
        </List>
    );

    return (
        <StyledDrawer
            variant="temporary"
            open={open}
            onClose={onClose}
            ModalProps={{
                keepMounted: true,
            }}
        >
            {drawerContent}
        </StyledDrawer>
    );
};
