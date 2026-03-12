import {
    Box,
    filledInputClasses,
    inputBaseClasses,
    Stack,
} from '@mui/material';
import { styled, Theme } from '@mui/material/styles';

export const getTextFieldStyle = ({ palette, spacing }: Theme) => ({
    [`&& .${inputBaseClasses.root}`]: {
        color: palette.common.black,
        borderRadius: 2,
    },
    [`&& .${filledInputClasses.root}`]: {
        backgroundColor: palette.grey[200],
    },
    [`&& .${inputBaseClasses.input}`]: {
        minHeight: spacing(10),
        WebkitTextFillColor: palette.text.primary,
    },
    [`&& .${inputBaseClasses.disabled}:before`]: {
        borderBottomStyle: 'none',
        borderRadius: 2,
    },
});

export const StyledContainer = styled(Stack)(
    ({ theme: { palette, breakpoints, spacing } }) => ({
        height: '100%',
        width: '100%',
        paddingBlock: spacing(2),
        paddingInline: spacing(15),
        backgroundColor: palette.background.paper,
        [breakpoints.down('md')]: {
            padding: spacing(2),
        },
        [breakpoints.down('sm')]: {
            padding: spacing(1),
        },
    }),
) as typeof Stack;

export const FormGrid = styled(Box)(({ theme: { spacing, breakpoints } }) => ({
    display: 'grid',
    gridTemplateColumns: 'repeat(2, 1fr)',
    gap: spacing(2),
    marginTop: spacing(2),
    [breakpoints.down('sm')]: {
        gridTemplateColumns: '1fr',
    },
}));

export const FullWidthItem = styled(Box)(() => ({
    gridColumn: '1 / -1',
}));

export const HeadingBox = styled(Box)(({ theme: { spacing } }) => ({
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing(2),
}));
