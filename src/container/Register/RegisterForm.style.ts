import { styled } from '@mui/material';
import { Container, Stack, StackProps } from '@mui/system';

export const StyledRegisterContainer = styled(Container)(
    ({ theme: { palette } }) => ({
        overflowY: 'auto',
        flex: 2,
        backgroundColor: palette.background.paper,
    }),
);

export const StyledRegistrationForm = styled(Stack)<StackProps<'form'>>(
    ({ theme: { spacing, typography } }) => ({
        maxWidth: typography.pxToRem(500),
        marginInline: 'auto',
        minHeight: '100%',
        padding: spacing(4),
        gap: spacing(8),
        justifyContent: 'center',
    }),
);
