import { styled } from '@mui/material';
import { Container, Stack } from '@mui/system';

export const RegisterContainer = styled(Container)(
    ({ theme: { palette, spacing } }) => ({
        width: '100%',
        overflowY: 'auto',
        flex: 2,
        padding: spacing(7),
        backgroundColor: palette.background.paper,
    }),
);

export const RegisterInner = styled(Stack)(({ theme: { spacing } }) => ({
    maxWidth: spacing(125),
    marginInline: 'auto',
    minHeight: '100%',
    gap: spacing(2),
    padding: spacing(7),
    justifyContent: 'center',
})) as typeof Stack;
