import { Box, filledInputClasses, inputBaseClasses } from '@mui/material';
import { styled } from '@mui/material/styles';

import { theme } from '@theme';

export const TextFieldStyle = {
    [`&& .${inputBaseClasses.root}`]: {
        color: theme.palette.common.black,
        borderRadius: 2,
    },
    [`&& .${filledInputClasses.root}`]: {
        backgroundColor: theme.palette.grey[300],
    },
    [`&& .${inputBaseClasses.input}`]: {
        minHeight: 40,
        WebkitTextFillColor: theme.palette.text.primary,
    },
    [`&& .${inputBaseClasses.disabled}:before`]: {
        borderBottomStyle: 'none',
        borderRadius: 2,
    },
};
export const StyledContainer = styled(Box)(() => ({
    height: '100%',
    width: '100%',
    paddingBlock: theme.spacing(10),
    paddingInline: theme.spacing(60),
    backgroundColor: theme.palette.background.paper,
    [theme.breakpoints.down('md')]: {
        padding: theme.spacing(10),
    },
    [theme.breakpoints.down('sm')]: {
        padding: theme.spacing(6),
    },
}));

export const FormGrid = styled(Box)(() => ({
    display: 'grid',
    gridTemplateColumns: 'repeat(2, 1fr)',
    gap: theme.spacing(8),
    marginTop: theme.spacing(8),
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
    marginBottom: theme.spacing(8),
}));
