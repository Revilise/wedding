import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { defineConfig } from '@rsbuild/core';
import { pluginReact } from '@rsbuild/plugin-react';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, 'src');

// Docs: https://rsbuild.rs/config/
export default defineConfig({
  plugins: [pluginReact()],
  output: {
    manifest: true,
  },
  environments: {
    web: {
      source: {
        entry: {
          index: "./src/index.client.jsx"
        },
      },
      output: {
        target: "web",
        distPath: "dist/client",
      },
      html: { template: "./src/index.html" }
    },
    node: {
      source: {
        entry: {
          index: "./src/index.server.jsx"
        }
      },
      output: {
        target: "node",
        distPath: "dist/server",
        module: true,
        manifest: {
          generate: ({ files, manifestData  }) => {
            const indexEntry = files.find(f =>
               /^index\..*\.js$/.test(f.path.replace(/^.*\//, ''))
            )?.path || "";
            return {
              ...manifestData,
              entries: {
                ...manifestData.entries,
                index: {
                  ...manifestData.entries.index,
                  entry: indexEntry
                },
              }
            }
          }
        }
      },
    }
  },
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
