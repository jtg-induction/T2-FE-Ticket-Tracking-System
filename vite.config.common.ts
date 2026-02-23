import type { UserConfig } from "vite";
import tsconfigPaths from "vite-tsconfig-paths";

import react from "@vitejs/plugin-react";

/* Common Config for both PROD and DEV mode */
export const commonConfig: UserConfig = {
  plugins: [react(), tsconfigPaths()],
  build: {
    assetsInlineLimit: 0,
    rollupOptions: {
      output: {
        entryFileNames: "js/[name]-[hash].js",
        assetFileNames: ({ name }) => {
          if (/\.(webp|jpe?g|png)$/.test(name ?? "")) {
            return "assets/images/[name]-[hash][extname]";
          }
          if (/\.(woff2|ttf)$/.test(name ?? ""))
            return "assets/fonts/[name]-[hash][extname]";
          return "[name]-[hash][extname]";
        },
      },
    },
  },
};
