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
    MuiTypography: {
        styleOverrides: {
            root: {
                whiteSpace: 'nowrap',
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                display: 'block',
            },
        },
    },
    MuiFormControl: {
        styleOverrides: {
            root: {
                gap: 8,
            },
        },
    },
    MuiCard: {
        variants: [
            {
                props: { variant: 'outlined' },
                style: () => ({
                    marginBottom: 2,
                    borderRadius: 8,
                    boxShadow: '2px 1px 2px rgb(0, 0, 0, 0.2);',
                    cursor: 'pointer',
                    '&:hover': {
                        boxShadow: '2px 2px 4px rgb(0, 0, 0, 0.3);',
                    },
                }),
            },
        ],
    },
    MuiCssBaseline: {
        styleOverrides: globalCss,
    },
};
