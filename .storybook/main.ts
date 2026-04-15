import type { StorybookConfig } from 'storybook-react-rsbuild';
import { mergeRsbuildConfig } from '@rsbuild/core';

/** Расширяет правило для CSS, чтобы обрабатывать и .pcss (как в rsbuild.config.js) */
function extendCssRuleForPcss(config: import('@rsbuild/core').RsbuildConfig) {
    const rules = config.module?.rules ?? [];
    for (const rule of rules) {
        if (rule && typeof rule === 'object' && rule.test instanceof RegExp && rule.test.source === '\\.css$') {
            rule.test = /\.(?:css|pcss)$/;
            break;
        }
    }
}

const config: StorybookConfig = {
    stories: ['../src/**/*.mdx', '../src/**/*.stories.@(js|jsx|mjs|ts|tsx)'],
    addons: ['@storybook/addon-docs'],
    framework: 'storybook-react-rsbuild',
    async rsbuildFinal(config) {
        const existingRspack = config.tools?.rspack;
        return mergeRsbuildConfig(config, {
            tools: {
                rspack(config, ...args: unknown[]) {
                    const result =
                        typeof existingRspack === 'function'
                            ? (existingRspack as (...a: unknown[]) => unknown)(config, ...args)
                            : undefined;
                    extendCssRuleForPcss(config);
                    return result;
                },
            },
        });
    },
};
export default config;
