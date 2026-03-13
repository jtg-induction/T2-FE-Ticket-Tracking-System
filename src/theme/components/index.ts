import type { Components } from '@mui/material/styles';

import interVariableWoff from '@assets/fonts/inter/inter-variable.woff';
import interVariableWoff2 from '@assets/fonts/inter/inter-variable.woff2';

const globalCss = `
       html {
        font-size: 62.5%;
      } 
       @font-face {
        font-display: swap; 
        font-family: 'Inter';
        font-style: normal;
        font-weight: 100 900;
        src: url(${interVariableWoff2}) format('woff2'), 
        url(${interVariableWoff}) format('woff');
      }
    `;

export const components: Components = {
    MuiFormControl: {
        styleOverrides: {
            root: {
                gap: 8,
            },
        },
    },
    MuiCssBaseline: {
        styleOverrides: globalCss,
    },
};
