import { Server } from "./server.js";
import { dirname, resolve, join } from "node:path";
import { fileURLToPath } from "node:url";
import { readFileSync } from "node:fs";

import { pathToFileURL } from "url";
import { PortalServer } from "@openagenda/react-portal-ssr/server";
import { PortalContext } from "@openagenda/react-portal-ssr";
import express from "express";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

/**
 * Production server for rendering a React SSR (Server-Side Rendered) app using OpenAgenda's Portal SSR system.
 *
 * This class:
 * - Serves static frontend files
 * - Loads Vite-generated manifests for client and server
 * - Dynamically imports the SSR bundle
 * - Renders the initial HTML via `PortalServer`
 *
 * @example
 * // Run the production server
 * new ProdServer();
 */
export class ProdServer extends Server {
  /**
   * @typedef {Object} ManifestConfig
   * @property {string} dir - Absolute path to the output directory.
   * @property {string} manifest - Path to the manifest JSON file.
   */

  /**
   * @typedef {Object} ServerConfig
   * @property {number|string} port - Port to run the server on.
   * @property {ManifestConfig} client - Configuration for client build files.
   * @property {ManifestConfig} server - Configuration for server build files.
   */

  /**
   * Server configuration with defaults based on environment variables and dist paths.
   * @type {ServerConfig}
   */
  cfg = {
    backend: "http://localhost:8000",
    port: process.env.PORT || 3000,
    client: {
      dir: resolve(__dirname, 'dist/client'),
      manifest: resolve(__dirname, 'dist/client/manifest.json'),
    },
    server: {
      dir: resolve(__dirname, 'dist/server'),
      manifest: resolve(__dirname, 'dist/server/manifest.json'),
    }
  };

  /**
   * Creates an instance of the production server and starts it.
   * @constructor
   */
  constructor() {
    super();
    this.start();
  }

  /**
   * Initializes routes and starts the Express server.
   */
  start() {
    try {
      this.app.get("/", this.handleHomePage.bind(this));
      this.app.use(express.static(this.cfg.client.dir));

      this.server = this.app.listen(this.cfg.port, () => {
        console.log(`Production server running at http://localhost:${this.cfg.port}`);
      });
    } catch (err) {
      console.error('Failed to start production server:', err);
      process.exit(1);
    }
  }

  /**
   * Loads and parses both client and server manifests from disk.
   * @returns {{ client: object, server: object }} Parsed manifest objects.
   */
  getManifest() {
    const client = JSON.parse(readFileSync(this.cfg.client.manifest, "utf-8"));
    const server = JSON.parse(readFileSync(this.cfg.server.manifest, "utf-8"));
    return { client, server };
  }

  /**
   * Retrieves the template HTML and server bundle for SSR rendering.
   * @async
   * @returns {Promise<{ template: string, bundle: any }>} The template HTML and SSR bundle module.
   */
  async getEntries() {
    const { client, server } = this.getManifest();

    const templatePath = join(this.cfg.client.dir, client.entries.index.html[0]);
    const template = readFileSync(templatePath, 'utf-8');

    const bundlePath = pathToFileURL(join(this.cfg.server.dir, server.entries.index.initial.js[0])).href;
    const bundle = await import(bundlePath);

    return { template, bundle };
  }

  /**
   * Executes the SSR render process and returns a complete HTML document.
   * @async
   * @returns {Promise<string>} The rendered HTML string.
   */
  async renderTemplate() {
    const { bundle, template } = await this.getEntries();

    const portal = new PortalServer(PortalContext);
    const { content } = bundle.render(portal);
    const html = template.replace('<!--app-content-->', content);

    return portal.appendPortals(html);
  }

  /**
   * Express route handler for the Home page (`/`).
   * Performs SSR and sends the rendered HTML response to the client.
   *
   * @param {import('express').Request} req Express request object.
   * @param {import('express').Response} res Express response object.
   * @param {import('express').NextFunction} next Express next function for error handling.
   */
  async handleHomePage(req, res, next) {
    try {
      const html = await this.renderTemplate();
      res.writeHead(200, { 'Content-Type': 'text/html' });
      res.end(html);
    } catch (err) {
      console.error('SSR failed.');
      console.error(err);
      next();
    }
  }
}

// Start the server
new ProdServer();
