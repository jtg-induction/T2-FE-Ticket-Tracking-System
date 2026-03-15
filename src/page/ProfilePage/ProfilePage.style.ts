import {
    Box,
    filledInputClasses,
    inputBaseClasses,
    Stack,
    StackProps,
} from '@mui/material';
import { styled, Theme } from '@mui/material/styles';

export const getTextFieldStyle = ({ palette }: Theme) => ({
    [`& .${inputBaseClasses.root}`]: {
        color: palette.common.black,
        borderRadius: 2,
    },
    [`& .${filledInputClasses.root}`]: {
        backgroundColor: palette.grey[200],
    },
    [`& .${inputBaseClasses.input}`]: {
        minHeight: 40,
        WebkitTextFillColor: palette.text.primary,
    },
    [`& .${inputBaseClasses.disabled}:before`]: {
        borderBottomStyle: 'none',
        borderRadius: 2,
    },
});

export const StyledProfileRoot = styled(Stack)<StackProps<'form'>>(
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
);

export const StyledFormGrid = styled(Box)(
    ({ theme: { spacing, breakpoints } }) => ({
        display: 'grid',
        gridTemplateColumns: 'repeat(2, 1fr)',
        gap: spacing(2),
        marginTop: spacing(2),
        [breakpoints.down('sm')]: {
            gridTemplateColumns: '1fr',
        },
    }),
);

export const StyledFullWidthItem = styled(Box)(() => ({
    gridColumn: '1 / -1',
}));

export const StyledHeaderBox = styled(Box)(({ theme: { spacing } }) => ({
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing(2),
}));
