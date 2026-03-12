import { Box, styled } from '@mui/material';

import { LAYOUT } from '@constant';

export const RootContainer = styled(Box)(() => ({
    display: 'flex',
    flexDirection: 'column',
    overflowX: 'hidden',
    width: '100%',
    height: '100vh',
    paddingInline: 0,
    maxWidth: '2500px', // containerization
    margin: '0 auto',
}));

export const InnerContainer = styled(Box)(() => ({
    height: '100%',
    top: LAYOUT.HEADER,
    left: 0,
    right: 0,
    bottom: 0,
    overflowY: 'auto',
}));
