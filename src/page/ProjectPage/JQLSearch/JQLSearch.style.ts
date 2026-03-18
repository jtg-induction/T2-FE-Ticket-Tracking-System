import { Paper, styled } from '@mui/material';

export const StyledJQLSearchWrapper = styled(Paper)(
    ({ theme: { spacing } }) => ({
        flex: 1,
        minHeight: 400,
        padding: spacing(3),
    }),
);

export const StyledResultsWrapper = styled('div')(({ theme: { spacing } }) => ({
    marginTop: spacing(3),
}));

export const StyledTicketItem = styled('div')(
    ({ theme: { spacing, palette, shape } }) => ({
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: spacing(2),
        border: `1px solid ${palette.divider}`,
        borderRadius: shape.borderRadius,
        marginBottom: spacing(2),
    }),
);
