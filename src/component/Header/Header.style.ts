import { AppBar, Avatar, Box, BoxProps, styled, Toolbar } from '@mui/material';

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

export const StyledToolbar = styled(Toolbar)(({ theme: { typography } }) => ({
    justifyContent: 'space-between',
    height: typography.pxToRem(DIMENSIONS.HEADER_HEIGHT),
    alignItems: 'center',
}));

export const StyledLogo = styled(Box)<BoxProps<'img'>>(() => ({
    height: 32,
    width: 'auto',
}));

export const StyledAvatar = styled(Avatar)(() => ({
    width: 40,
    height: 40,
    fontSize: '2rem',
}));
