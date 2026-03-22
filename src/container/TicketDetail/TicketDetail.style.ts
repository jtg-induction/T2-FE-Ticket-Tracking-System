import { Paper, styled } from '@mui/material';

export const StyledTicketSurface = styled(Paper)(
    ({ theme: { breakpoints } }) => ({
        padding: 16,
        height: '100%',
        width: '100%',
        maxWidth: breakpoints.values.lg,
        overflow: 'auto',
    }),
);

export const StyledDescriptionContainer = styled(Paper)(
    ({ theme: { spacing, palette, shape } }) => ({
        maxHeight: 320,
        padding: spacing(4),
        borderRadius: shape.borderRadius * 4,
        border: '1px solid',
        borderColor: palette.divider,
        marginBlock: spacing(1),
        overflowY: 'auto',
    }),
);

export const StyledDetailView = styled(Paper)(
    ({ theme: { spacing, shape, palette } }) => ({
        padding: spacing(4),
        borderRadius: shape.borderRadius * 4,
        border: '1px solid',
        borderColor: palette.divider,
    }),
);
