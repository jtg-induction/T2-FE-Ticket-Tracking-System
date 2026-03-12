import { Container, Stack, StackProps, styled } from '@mui/material';

export const LoginRoot = styled(Container)(({ theme: { palette } }) => ({
    width: '100%',
    overflowY: 'auto',
    flex: 2,
    backgroundColor: palette.background.paper,
}));

export const LoginInner = styled(Stack)<StackProps<'form'>>(
    ({ theme: { spacing } }) => ({
        padding: spacing(8),
        marginInline: 'auto',
        minHeight: '100%',
        maxWidth: spacing(125),
        justifyContent: 'center',
        gap: spacing(2),
    }),
);
