import { styled } from '@mui/material';
import { Container, Stack, StackProps } from '@mui/system';

export const StyledRegisterContainer = styled(Container)(
    ({ theme: { palette, spacing } }) => ({
        overflowY: 'auto',
        flex: 2,
        padding: spacing(7),
        backgroundColor: palette.background.paper,
    }),
);

export const StyledRegistrationForm = styled(Stack)<StackProps<'form'>>(
    ({ theme: { spacing, typography } }) => ({
        maxWidth: typography.pxToRem(500),
        marginInline: 'auto',
        minHeight: '100%',
        gap: spacing(2),
        padding: spacing(7),
        justifyContent: 'center',
    }),
);
