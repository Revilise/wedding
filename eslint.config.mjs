// For more info, see https://github.com/storybookjs/eslint-plugin-storybook#configuration-flat-config-format
import storybook from 'eslint-plugin-storybook';

import js from '@eslint/js';
import { defineConfig, globalIgnores } from 'eslint/config';
import reactHooks from 'eslint-plugin-react-hooks';
import reactRefresh from 'eslint-plugin-react-refresh';
import globals from 'globals';
import tseslint from 'typescript-eslint';

export default defineConfig([
    globalIgnores(['dist']),
    {
        files: ['**/*.{ts,tsx}'],
        extends: [
            js.configs.recommended,
            tseslint.configs.recommended,
            reactHooks.configs.flat['recommended-latest'],
            reactRefresh.configs.recommended,
        ],
        languageOptions: {
            ecmaVersion: 2020,
            globals: globals.browser,
        },
    },
    // Keep domain dependencies directed toward lower layers and use public APIs.
    ...[
        ['src/shared/**/*.{ts,tsx}', ['@entities/*', '@features/*', '@widgets/*', '@app/*']],
        ['src/entities/**/*.{ts,tsx}', ['@features/*', '@widgets/*', '@app/*']],
        ['src/features/**/*.{ts,tsx}', ['@features/*', '@widgets/*', '@app/*']],
        ['src/widgets/**/*.{ts,tsx}', ['@widgets/*', '@app/*']],
        ['src/pages/**/*.{ts,tsx}', ['@app/*']],
    ].map(([files, forbidden]) => ({
        files: [files],
        rules: {
            'no-restricted-imports': [
                'error',
                {
                    patterns: [
                        {
                            group: [...forbidden, '@ui/*/*', '@entities/*/*', '@features/*/*', '@widgets/*/*'],
                            message:
                                'Use a lower layer through its public API; use relative imports inside the current slice.',
                        },
                    ],
                },
            ],
        },
    })),
    ...storybook.configs['flat/recommended'],
]);
