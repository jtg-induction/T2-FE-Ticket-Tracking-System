import { Box, Stack, styled } from '@mui/material';

import { LAYOUT } from '@constant';

export const HeaderRoot = styled(Box)(({ theme }) => ({
    position: 'sticky',
    top: 0,
    height: LAYOUT.HEADER,
    maxHeight: LAYOUT.HEADER,
    boxSizing: 'border-box',
    width: '100%',
    zIndex: theme.zIndex.appBar,
    display: 'flex',
    paddingInline: 8,
    paddingBlock: 4,
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: theme.palette.primary.dark,
}));

export const HeaderLeft = styled(Stack)(() => ({
    alignItems: 'center',
    gap: 8,
    height: '100%',
}));
