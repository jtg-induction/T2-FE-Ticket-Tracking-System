import { Container, Stack, StackProps, styled } from '@mui/material';

export const StyledSignupContainer = styled(Container)(
    ({ theme: { palette } }) => ({
        overflowY: 'auto',
        flex: 2,
        backgroundColor: palette.background.paper,
    }),
);

export const StyledSignupForm = styled(Stack)<StackProps<'form'>>(
    ({ theme: { spacing, typography } }) => ({
        padding: spacing(8),
        marginInline: 'auto',
        justifyItems: 'center',
        minHeight: '100%',
        maxWidth: typography.pxToRem(500),
        justifyContent: 'center',
        gap: spacing(2),
    }),
);
