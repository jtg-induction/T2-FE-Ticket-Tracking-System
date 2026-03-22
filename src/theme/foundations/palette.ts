import {
    blue,
    blueGrey,
    grey,
    lightGreen,
    orange,
    red,
    yellow,
} from '@mui/material/colors';
import type { PaletteOptions } from '@mui/material/styles';

import { PRIMARY } from '@constant';

/* Custom Palette */
export const palette: PaletteOptions = {
    primary: {
        main: PRIMARY,
        light: blue[500],
        dark: blue[900],
    },
    secondary: {
        main: yellow[500],
        light: yellow[300],
        dark: yellow[700],
    },
    text: {
        primary: blueGrey[900],
        secondary: blueGrey[800],
        disabled: blueGrey[600],
    },
    background: {
        default: grey[50],
    },
    error: {
        main: red[700],
        light: red[400],
        dark: red[900],
    },
    warning: {
        main: orange[400],
        light: orange[200],
        dark: orange[600],
    },
    success: {
        main: lightGreen[400],
        light: lightGreen[200],
        dark: lightGreen[600],
    },
    grey: {
        A100: blueGrey[400],
        A200: blueGrey[700],
        A400: blueGrey[900],
    },
};
