import { useLocation, useNavigate } from 'react-router';

import {
    Drawer,
    drawerClasses,
    List,
    ListItem,
    ListItemButton,
    ListItemIcon,
    ListItemText,
    useMediaQuery,
    useTheme,
} from '@mui/material';

import { DIMENSIONS } from '@constant';

import { SIDEBAR_CONFIG } from './Sidebar.config';
import type { SidebarProps } from './Sidebar.types';

/**
 * Sidebar container
 */
export const Sidebar = (props: SidebarProps) => {
    const { open, onClose } = props;
    const {
        typography: { pxToRem },
        breakpoints,
    } = useTheme();
    const navigate = useNavigate();
    const location = useLocation();
    const isDesktop = useMediaQuery(breakpoints.up('md'));

    const handleNavigation = (route: string) => {
        void navigate(route);
        onClose();
    };

    const drawerContent = (
        <List>
            {SIDEBAR_CONFIG.map((item) => {
                const Icon = item.icon;
                const isActive = location.pathname === item.route;

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
        <Drawer
            variant="temporary"
            open={open}
            onClose={onClose}
            ModalProps={{
                keepMounted: true,
            }}
            sx={{
                [`& .${drawerClasses.paper}`]: {
                    width: isDesktop
                        ? pxToRem(DIMENSIONS.DRAWER_WIDTH.DESKTOP)
                        : pxToRem(DIMENSIONS.DRAWER_WIDTH.MOBILE),
                    boxSizing: 'border-box',
                    marginTop: pxToRem(DIMENSIONS.HEADER_HEIGHT),
                },
            }}
        >
            {drawerContent}
        </Drawer>
    );
};
