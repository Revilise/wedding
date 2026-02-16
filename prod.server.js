import express from "express";
import { dirname, resolve, join } from "node:path";
import { fileURLToPath } from "node:url";
import { readFileSync } from "node:fs";
import { pathToFileURL } from "url";

import { PortalServer } from "@openagenda/react-portal-ssr/server";
import { PortalContext } from "@openagenda/react-portal-ssr";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export class ProdServer {
  cfg = {
    port: process.env.PORT || 3000,
    client: {
      dir: resolve(__dirname, 'dist/client'),
      manifest: resolve(__dirname, 'dist/client/manifest.json'),
    },
    server: {
      dir: resolve(__dirname, 'dist/server'),
      manifest: resolve(__dirname, 'dist/server/manifest.json'),
    }
  }

  constructor() {
    this.app = express();
    this.start();
  }

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

  getManifest() {
    const client = JSON.parse(readFileSync(this.cfg.client.manifest, "utf-8"));
    const server = JSON.parse(readFileSync(this.cfg.server.manifest, "utf-8"));

    return { client, server }
  }

  async getEntries() {
    const { client, server } = this.getManifest();
    const templatePath = join(this.cfg.client.dir, client.entries.index.html[0]);
    const template = readFileSync(templatePath, 'utf-8');

    const bundlePath = pathToFileURL(join(this.cfg.server.dir, server.entries.index.initial.js[0])).href;
    const bundle = await import(bundlePath);

    return { template, bundle };
  }

  async renderTemplate() {
    const { bundle, template } = await this.getEntries();

    const portal = new PortalServer(PortalContext);
    const { content } = bundle.render(portal);
    const html = template.replace('<!--app-content-->', content);

    return portal.appendPortals(html);
  }

  async handleHomePage(req, res, next) {
    try {
      const html = await this.renderTemplate();
      res.writeHead(200, { 'Content-Type': 'text/html' });
      res.end(html);
    }
    catch (err) {
      console.error('SSR failed.');
      console.error(err);
      next();
    }
  }
}

new ProdServer()
