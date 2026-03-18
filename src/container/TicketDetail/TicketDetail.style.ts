import { Paper, styled } from '@mui/material';

export const StyledDescriptonContainer = styled(Paper)(
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
        borderRadius: shape.borderRadius * 2,
        border: '1px solid',
        borderColor: palette.divider,
    }),
);
