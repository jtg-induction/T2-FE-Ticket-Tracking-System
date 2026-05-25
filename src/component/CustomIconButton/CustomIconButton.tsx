import { IconButton, styled } from '@mui/material';

import { CustomButtonProps } from './CustomIconButton.type';

export const CustomIconButton = styled(IconButton, {
    shouldForwardProp: (prop) => prop !== 'variant',
})<CustomButtonProps>(({ theme: { palette }, variant = 'contained' }) => ({
    ...(variant === 'contained' && {
        backgroundColor: palette.primary.main,
        color: palette.primary.contrastText,
        '&:hover': { backgroundColor: palette.primary.dark },
    }),
    ...(variant === 'outlined' && {
        border: `1px solid ${palette.primary.main}`,
        color: palette.primary.main,
    }),
    ...(variant === 'standard' && {
        backgroundColor: 'transparent',
        '&:hover': {
            backgroundColor: palette.action.hover,
        },
    }),
}));
