import type { UserConfig } from 'vite';
import { defineConfig, loadEnv } from 'vite';
import { ViteImageOptimizer } from 'vite-plugin-image-optimizer';

import { commonConfig } from './vite.config.common';

export default defineConfig(({ mode }): UserConfig => {
    /* Load environment variables based on the mode */
    const env = loadEnv(mode, process.cwd(), '');
    const PORT = parseInt(env.PORT) || undefined;

    /* Production-specific configuration */
    if (mode === 'production') {
        return {
            ...commonConfig,
            plugins: [
                ...(commonConfig.plugins || []),
                /* Image optimization for production build */
                ViteImageOptimizer({
                    test: /\.(webp)$/i,
                    includePublic: false,
                    logStats: true,
                    webp: {
                        quality: 90,
                    },
                }),
            ],
            build: {
                ...commonConfig.build,
                sourcemap: 'hidden', // Do not expose sourcemaps
                minify: 'terser', // Terser for minification
                terserOptions: {
                    compress: {
                        drop_console: true,
                    },
                },
            },
            server: {
                strictPort: true,
                port: PORT,
            },
        };
        /* Development-specific configuration */
    } else if (mode === 'development') {
        return {
            ...commonConfig,
            build: {
                ...commonConfig.build,
                sourcemap: 'inline', // Include inline sourcemaps for easier debugging
            },
            server: {
                strictPort: true,
                port: PORT,
            },
        };
    }
    return commonConfig;
});
