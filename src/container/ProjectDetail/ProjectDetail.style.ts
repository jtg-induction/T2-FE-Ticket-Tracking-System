import { Paper, styled } from '@mui/material';

export const StyledMainContent = styled(Paper)(
    ({ theme: { spacing, breakpoints } }) => ({
        height: '100%',
        width: '100%',
        maxWidth: breakpoints.values.lg,
        padding: spacing(4),
        marginInline: 'auto',
    }),
);
