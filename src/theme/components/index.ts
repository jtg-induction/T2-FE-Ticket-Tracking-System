import type { Components, Theme } from '@mui/material/styles';

import interVariableWoff from '@assets/fonts/inter/inter-variable.woff';
import interVariableWoff2 from '@assets/fonts/inter/inter-variable.woff2';

const globalCss = `
       html {
        font-size: 62.5%;
      } 

      * {
        transition: background-color 0.3s ease, border-color 0.3s ease, box-shadow 0.3s ease, opacity 0.3s ease;
      }

      *::-webkit-scrollbar {
        width: 4px;
        height: 4px;
      }

      *::-webkit-scrollbar-thumb {
        background-color: rgba(0, 0, 0, 0.1);
        border-radius: 4px;
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
    MuiPaper: {
        defaultProps: {
            elevation: 3,
        },
        styleOverrides: {
            root: {
                borderRadius: '8px',
                overflow: 'hidden',
            },
        },
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
    MuiFormHelperText: {
        styleOverrides: {
            root: {
                marginTop: '-4px',
            },
        },
    },
    MuiOutlinedInput: {
        styleOverrides: {
            root: {
                borderRadius: 8,
            },
        },
    },
    MuiPopover: {
        styleOverrides: {
            paper: ({ theme: { spacing, palette } }) => ({
                padding: spacing(2),
                borderRadius: spacing(2),
                border: '1px solid',
                borderColor: palette.divider,
            }),
        },
    },
    MuiCssBaseline: {
        styleOverrides: globalCss,
    },
};
