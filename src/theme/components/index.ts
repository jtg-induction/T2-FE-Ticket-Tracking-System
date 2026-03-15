import type { Components, Theme } from '@mui/material/styles';

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

export const components: Components<Theme> = {
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
                style: ({ theme: { shadows } }) => ({
                    marginBottom: 2,
                    borderRadius: 8,
                    boxShadow: shadows[2],
                    cursor: 'pointer',
                    '&:hover': {
                        boxShadow: shadows[4],
                    },
                }),
            },
        ],
    },
    MuiAvatar: {
        styleOverrides: {
            root: ({ theme: { palette } }) => ({
                width: 32,
                height: 32,
                margin: 4,
                fontSize: '1.5rem',
                backgroundColor: palette.primary.main,
                color: palette.primary.contrastText,
            }),
        },
    },
    MuiCssBaseline: {
        styleOverrides: globalCss,
    },
};
