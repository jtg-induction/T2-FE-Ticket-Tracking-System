import { Box, Stack, styled } from '@mui/material';

import { LAYOUT } from '@constant';

export const HeaderRoot = styled(Box)(({ theme }) => ({
    position: 'fixed',
    top: 0,
    height: LAYOUT.HEADER,
    maxHeight: LAYOUT.HEADER,
    width: '100%',
    zIndex: theme.zIndex.appBar,
    display: 'flex',
    paddingInline: theme.spacing(8),
    paddingBlock: theme.spacing(4),
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: theme.palette.primary.dark,
}));

export const HeaderLeft = styled(Stack)(() => ({
    alignItems: 'center',
    gap: 8,
    height: '100%',
}));
