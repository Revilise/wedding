import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { defineConfig } from '@rsbuild/core';
import { pluginReact } from '@rsbuild/plugin-react';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, 'src');

// Docs: https://rsbuild.rs/config/
export default defineConfig({
  plugins: [pluginReact()],
  resolve: {
    alias: {
      '@app': path.join(root, 'app'),
      '@widgets': path.join(root, 'widgets'),
      '@features': path.join(root, 'features'),
      '@entities': path.join(root, 'entities'),
      '@shared': path.join(root, 'shared'),
      '@ui': path.join(root, 'shared', 'ui'),
      '@lib': path.join(root, 'shared', 'lib'),
    },
  },
  tools: {
    rspack: (config) => {
      // Расширяем правило для CSS, чтобы обрабатывать и .pcss (PostCSS)
      const rules = config.module?.rules ?? [];
      for (const rule of rules) {
        if (rule && typeof rule === 'object' && rule.test instanceof RegExp && rule.test.source === '\\.css$') {
          rule.test = /\.(?:css|pcss)$/;
          break;
        }
      }
      return config;
    }
  },
});
