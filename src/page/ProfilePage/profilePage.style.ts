import { Box, filledInputClasses, inputBaseClasses } from '@mui/material';
import { styled, Theme } from '@mui/material/styles';

export const getTextFieldStyle = (theme: Theme) => ({
    [`&& .${inputBaseClasses.root}`]: {
        color: theme.palette.common.black,
        borderRadius: 2,
    },
    [`&& .${filledInputClasses.root}`]: {
        backgroundColor: theme.palette.grey[200],
    },
    [`&& .${inputBaseClasses.input}`]: {
        minHeight: 40,
        WebkitTextFillColor: theme.palette.text.primary,
    },
    [`&& .${inputBaseClasses.disabled}:before`]: {
        borderBottomStyle: 'none',
        borderRadius: 2,
    },
});

export const StyledContainer = styled(Box)(({ theme }) => ({
    height: '100%',
    width: '100%',
    paddingBlock: 10,
    paddingInline: 60,
    backgroundColor: theme.palette.background.paper,
    [theme.breakpoints.down('md')]: {
        padding: 10,
    },
    [theme.breakpoints.down('sm')]: {
        padding: 6,
    },
})) as typeof Box;

export const FormGrid = styled(Box)(({ theme }) => ({
    display: 'grid',
    gridTemplateColumns: 'repeat(2, 1fr)',
    gap: 8,
    marginTop: 8,
    [theme.breakpoints.down('sm')]: {
        gridTemplateColumns: '1fr',
    },
}));

export const FullWidthItem = styled(Box)(() => ({
    gridColumn: '1 / -1',
}));

export const HeadingBox = styled(Box)(() => ({
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
}));
