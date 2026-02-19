import type { Components } from '@mui/material/styles';

import InterVariableWOFF from '@assets/fonts/inter/inter-variable.woff';
import InterVariableWOFF2 from '@assets/fonts/inter/inter-variable.woff2';

const globalCss = `
       html {
        font-size: 62.5%;
      } 
       @font-face {
        font-display: swap; 
        font-family: 'Inter';
        font-style: normal;
        font-weight: 100 900;
        src: url(${InterVariableWOFF2}) format('woff2'), 
        url(${InterVariableWOFF}) format('woff');
      }
    `;

export const components: Components = {
    MuiCssBaseline: {
        styleOverrides: globalCss,
    },
};
