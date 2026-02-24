import globals from 'globals';
import tseslint from 'typescript-eslint';

// Plugins
import hooksPlugin from 'eslint-plugin-react-hooks';
import refreshPlugin from 'eslint-plugin-react-refresh';
import prettierConfig from 'eslint-config-prettier';
import reactPlugin from 'eslint-plugin-react';
import jsxA11yPlugin from 'eslint-plugin-jsx-a11y';
import importSortPlugin from 'eslint-plugin-simple-import-sort';

export default tseslint.config(
    { ignores: ['dist'] },
    {
        /*
    Rules from `ts.configs.recommended` are included by default. For a full list of these rules,
    please refer to the ESLint recommended configuration:
    https://github.com/typescript-eslint/typescript-eslint/blob/main/packages/eslint-plugin/src/configs/recommended.ts
    */
        extends: [...tseslint.configs.recommendedTypeChecked, prettierConfig],
        files: ['**/*.{ts,tsx}'],
        languageOptions: {
            ecmaVersion: 2020,
            globals: globals.browser,
            /* Specify JSX parsing option for ESLint */
            parserOptions: {
                project: ['./tsconfig.node.json', './tsconfig.app.json'],
                tsconfigRootDir: import.meta.dirname,
                ecmaFeatures: {
                    jsx: true,
                },
            },
        },
        plugins: {
            react: reactPlugin,
            'react-hooks': hooksPlugin,
            'react-refresh': refreshPlugin,
            'jsx-a11y': jsxA11yPlugin,
            'simple-import-sort': importSortPlugin,
        },
        rules: {
            ...hooksPlugin.configs.recommended.rules,
            ...reactPlugin.configs.recommended.rules,
            ...reactPlugin.configs['jsx-runtime'].rules,
            ...jsxA11yPlugin.configs.recommended.rules,
            'react/react-in-jsx-scope': 'off',
            'no-console': 'error',
            'no-shadow': 'error',
            'react-refresh/only-export-components': [
                'warn',
                { allowConstantExport: true },
            ],
            'simple-import-sort/imports': [
                'error',
                {
                    groups: [
                        ['^react$', '^react-dom'],
                        ['^\\w'],
                        ['^@mui'],
                        [
                            '^@(?:|assets|components|constant|layout|routes|theme)',
                        ],
                        ['^\\./', '^\\.\\./'],
                    ],
                },
            ],
            '@typescript-eslint/naming-convention': [
                'error',
                {
                    selector: 'variable',
                    format: ['camelCase', 'UPPER_CASE', 'PascalCase'],
                },
                {
                    selector: 'function',
                    format: ['camelCase'],
                },
                {
                    selector: 'typeLike',
                    format: ['PascalCase'],
                },
            ],
            'arrow-body-style': ['error', 'as-needed'],
        },
        /* Specify React version for eslint-plugin-react */
        settings: {
            react: {
                version: 'detect',
            },
        },
    },
);
