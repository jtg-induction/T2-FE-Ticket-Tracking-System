import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';

import { Provider } from 'react-redux';
import { RouterProvider } from 'react-router';
import { router } from 'routes';

import { CssBaseline, ThemeProvider } from '@mui/material';

import { AuthProvider } from '@context';
import { store } from '@store';
import { theme } from '@theme';

const rootElement = document.getElementById('root') as HTMLElement;

createRoot(rootElement).render(
    <StrictMode>
        <Provider store={store}>
            <ThemeProvider theme={theme}>
                <CssBaseline />
                <AuthProvider>
                    <RouterProvider router={router} />
                </AuthProvider>
            </ThemeProvider>
        </Provider>
    </StrictMode>,
);
