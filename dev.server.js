import express from "express";
import {createRsbuild} from "@rsbuild/core";
import rsbuildConfig from "./rsbuild.config.ts";
import {PortalServer} from "@openagenda/react-portal-ssr/server";
import {PortalContext} from "@openagenda/react-portal-ssr";

export class DevServer {
  constructor() {
    this.app = express();
    this.start();
  }

  async start() {
    this.app.get("/", this.handleHomePage.bind(this));

    const { middlewares, port, afterListen, connectWebSocket } = await this.getRsBuildServer();
    this.app.use(middlewares);

    this.server = this.app.listen(port, async () => await afterListen());
    connectWebSocket({ server: this.server });
  }

  async renderTemplate() {
    const { environments } = await this.getRsBuildServer();

    const bundle = await environments.node.loadBundle('index');
    const template = await environments.web.getTransformedHtml('index');

    const portal = new PortalServer(PortalContext);
    const { content } = bundle.render(portal);

    const html = template.replace('<!--app-content-->', content);

    return portal.appendPortals(html);
  }

  async getRsBuildServer() {
    if (this.rsbuild) {
      return this.rsbuild;
    }

    const rsbuild = await createRsbuild({ rsbuildConfig });
    this.rsbuild = rsbuild.createDevServer();

    return this.rsbuild;
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

new DevServer();
