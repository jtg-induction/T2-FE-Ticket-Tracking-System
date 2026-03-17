import { IconButtonProps } from '@mui/material';

export interface CustomButtonProps extends IconButtonProps {
    variant?: 'contained' | 'outlined' | 'standard';
}
