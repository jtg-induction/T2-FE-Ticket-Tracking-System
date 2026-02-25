import { AppBar, styled, Toolbar } from '@mui/material';

import { DIMENSIONS } from '@constant';

export const StyledAppBar = styled(AppBar)(
    ({ theme: { palette, zIndex } }) => ({
        position: 'sticky',
        zIndex: zIndex.drawer + 1,
        justifyContent: 'center',
        backgroundColor: palette.background.paper,
        color: palette.text.primary,
        boxShadow: 'none',
        borderBottom: `1px solid ${palette.divider}`,
    }),
);

export const StyledToolbar = styled(Toolbar)(({ theme: { typography } }) => {
    return {
        justifyContent: 'space-between',
        height: typography.pxToRem(DIMENSIONS.HEADER_HEIGHT),
        alignItems: 'center',
    };
});
