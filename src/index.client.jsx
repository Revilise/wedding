import React from 'react';
import { createRoot, hydrateRoot } from 'react-dom/client';
import App from "./App.js";
import {prepareClientPortals} from "@openagenda/react-portal-ssr";

const container = document.getElementById("root")

if (!container) {
  throw new Error('Root element with id "root" not found');
}

prepareClientPortals()

if (process.env.NODE_ENV === "development") {
  const { worker } = await import("./app/msw/browser.js");
  worker.start({ onUnhandledRequest: "bypass" });
}

if (container.hasChildNodes()) {
  hydrateRoot(container, <App />);
} else {
  const root = createRoot(container);
  root.render(<App />);
}
