import { Box, filledInputClasses, inputBaseClasses } from '@mui/material';
import { styled, Theme } from '@mui/material/styles';

export const getTextFieldStyle = ({ palette, typography }: Theme) => ({
    [`&& .${inputBaseClasses.root}`]: {
        color: palette.common.black,
        borderRadius: 2,
    },
    [`&& .${filledInputClasses.root}`]: {
        backgroundColor: palette.grey[200],
    },
    [`&& .${inputBaseClasses.input}`]: {
        minHeight: typography.pxToRem(40),
        WebkitTextFillColor: palette.text.primary,
    },
    [`&& .${inputBaseClasses.disabled}:before`]: {
        borderBottomStyle: 'none',
    },
});

export const StyledFormGrid = styled(Box)(
    ({ theme: { spacing, breakpoints } }) => ({
        maxWidth: breakpoints.values.lg,
        display: 'grid',
        gridTemplateColumns: 'repeat(2, 1fr)',
        gap: spacing(4),
        marginTop: spacing(2),
        [breakpoints.down('sm')]: {
            gridTemplateColumns: '1fr',
        },
    }),
);

export const StyledFullWidthItem = styled(Box)(() => ({
    gridColumn: '1 / -1',
}));

export const StyledHeaderBox = styled(Box)(
    ({ theme: { spacing, breakpoints } }) => ({
        maxWidth: breakpoints.values.lg,
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: spacing(2),
    }),
);
