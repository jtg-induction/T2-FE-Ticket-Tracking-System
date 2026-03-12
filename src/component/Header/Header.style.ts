import { Box, Stack, styled } from '@mui/material';

import { LAYOUT } from '@constant';

export const HeaderRoot = styled(Box)(
    ({ theme: { zIndex, palette, spacing } }) => ({
        position: 'sticky',
        top: 0,
        height: LAYOUT.HEADER,
        maxHeight: LAYOUT.HEADER,
        boxSizing: 'border-box',
        width: '100%',
        zIndex: zIndex.appBar,
        display: 'flex',
        paddingInline: spacing(2),
        paddingBlock: spacing(1),
        alignItems: 'center',
        justifyContent: 'space-between',
        backgroundColor: palette.primary.dark,
    }),
);

export const HeaderLeft = styled(Stack)(({ theme: { spacing } }) => ({
    alignItems: 'center',
    gap: spacing(2),
    height: '100%',
}));
