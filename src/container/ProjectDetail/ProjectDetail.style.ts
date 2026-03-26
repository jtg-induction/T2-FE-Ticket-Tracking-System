import { Paper, styled } from '@mui/material';

export const StyledMainContent = styled(Paper)(({ theme: { spacing } }) => ({
    padding: spacing(4),
    position: 'relative',
    flex: '8 8 500px',
}));
