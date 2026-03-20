import { Box, Stack, styled } from '@mui/material';

export const StyledUserCardItem = styled(Box)(
    ({ theme: { spacing, shape, palette } }) => ({
        display: 'flex',
        alignItems: 'center',
        padding: spacing(1.5),
        borderRadius: shape.borderRadius,
        cursor: 'pointer',
        transition: 'background-color 0.2s',
        borderBottom: `1px solid ${palette.divider}`,
        '&:hover': {
            backgroundColor: palette.action.hover,
        },
        '&:last-child': {
            borderBottom: 'none',
        },
    }),
);

export const StyledUserInfo = styled(Stack)({
    flexGrow: 1,
    minWidth: 0,
});
