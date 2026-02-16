import React from 'react';
import { createRoot, hydrateRoot } from 'react-dom/client';
import App from "./App.js";
import {prepareClientPortals} from "@openagenda/react-portal-ssr";

const container = document.getElementById("root")

if (!container) {
  throw new Error('Root element with id "root" not found');
}

prepareClientPortals()

if (container.hasChildNodes()) {
  hydrateRoot(container, <App />);
} else {
  const root = createRoot(container);
  root.render(<App />);
}
