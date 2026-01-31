import type { Preview } from 'storybook-react-rsbuild'
import "../src/app/styles/index.pcss";

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
       color: /(background|color)$/i,
       date: /Date$/i,
      },
    },
  },
};

export default preview;
