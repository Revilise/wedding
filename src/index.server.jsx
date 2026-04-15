import { renderToString } from 'react-dom/server';
import App from './App.js';

export function render(portal) {
    const content = renderToString(portal.collectPortals(<App />));

    return {
        content,
    };
}
