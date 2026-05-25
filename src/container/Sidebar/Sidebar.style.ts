import { Drawer, drawerClasses, styled } from '@mui/material';

import { DIMENSIONS } from '@constant';

export const StyledDrawer = styled(Drawer)(
    ({ theme: { typography, breakpoints } }) => ({
        [`& .${drawerClasses.paper}`]: {
            boxSizing: 'border-box',
            marginTop: typography.pxToRem(DIMENSIONS.HEADER_HEIGHT),

            width: typography.pxToRem(DIMENSIONS.DRAWER_WIDTH.MOBILE),

            [breakpoints.up('md')]: {
                width: typography.pxToRem(DIMENSIONS.DRAWER_WIDTH.DESKTOP),
            },
        },
    }),
);
