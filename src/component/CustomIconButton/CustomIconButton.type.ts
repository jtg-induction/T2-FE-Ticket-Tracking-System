import { IconButtonProps } from '@mui/material';

/**
 * Props for the CustomIconButton component.
 * Extends standard MUI IconButton properties with custom styling variants.
 */
export interface CustomButtonProps extends IconButtonProps {
    /** * The visual style of the button.
     * @default 'standard'
     */
    variant?: 'contained' | 'outlined' | 'standard';
}
