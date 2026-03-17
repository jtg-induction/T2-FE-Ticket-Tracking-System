import { Drawer, drawerClasses, styled } from '@mui/material';

import { DIMENSIONS } from '@constant';

export const StyledDrawer = styled(Drawer)(({ theme }) => ({
    [`& .${drawerClasses.paper}`]: {
        boxSizing: 'border-box',
        marginTop: theme.typography.pxToRem(DIMENSIONS.HEADER_HEIGHT),

        width: theme.typography.pxToRem(DIMENSIONS.DRAWER_WIDTH.MOBILE),

        [theme.breakpoints.up('md')]: {
            width: theme.typography.pxToRem(DIMENSIONS.DRAWER_WIDTH.DESKTOP),
        },
    },
}));
