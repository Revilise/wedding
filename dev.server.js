import { Server } from './server.js';
import { createRsbuild } from '@rsbuild/core';
import rsbuildConfig from './rsbuild.config.js';
import { PortalServer } from '@openagenda/react-portal-ssr/server';
import { PortalContext } from '@openagenda/react-portal-ssr';
import { resolve } from 'node:path';

/**
 * Development server for Rsbuild + React SSR application using OpenAgenda Portal SSR.
 *
 * This class provides:
 * - Hot Module Replacement (HMR) via Rsbuild dev server
 * - Dynamic SSR rendering during development
 * - WebSocket support for fast refresh
 * - Express middleware integration
 *
 * @example
 * // Start development server with HMR
 * new DevServer();
 */
export class DevServer extends Server {
    cfg = {
        backend: process.env.BACKEND_URL || 'http://localhost:4000',
        port: Number(process.env.APP_PORT || process.env.PORT || 3000),
        rewrite: {
            '^/': process.env.API_REWRITE || 'v1/',
        },
    };

    /**
     * @typedef {Object} RsbuildServer
     * @property {import('express').RequestHandler[]} middlewares - Rsbuild Express middlewares.
     * @property {number} port - Server port.
     * @property {() => Promise<void>} afterListen - Callback after server starts.
     * @property {(options: {server: import('http').Server}) => void} connectWebSocket - WebSocket connector.
     * @property {Object} environments - Rsbuild environments (web/node).
     */

    /**
     * Creates a development server instance and starts it.
     * @constructor
     */
    constructor() {
        super();
        this.start();
    }

    /**
     * Initializes routes and starts the development server with Rsbuild HMR.
     * @async
     */
    async start() {
        this.app.get('/', this.handleHomePage.bind(this));

        this.app.use('/api', this.proxy());

        const { middlewares, port, afterListen, connectWebSocket } = await this.getRsBuildServer();
        this.app.use(middlewares);

        /** @type {import('http').Server} */
        this.server = this.app.listen(port, async () => await afterListen());
        connectWebSocket({ server: this.server });
    }

    /**
     * Renders the SSR template using Rsbuild's development environments.
     * Loads bundles and templates dynamically with HMR support.
     * @async
     * @returns {Promise<string>} The fully rendered HTML document.
     */
    async renderTemplate() {
        const { environments } = await this.getRsBuildServer();

        const bundle = await environments.node.loadBundle('index');
        const template = await environments.web.getTransformedHtml('index');

        const portal = new PortalServer(PortalContext);
        const { content } = bundle.render(portal);

        const html = template.replace('<!--app-content-->', content);

        return portal.appendPortals(html);
    }

    /**
     * Creates or returns cached Rsbuild dev server instance.
     * @async
     * @returns {Promise<RsbuildServer>} Rsbuild development server configuration.
     */
    async getRsBuildServer() {
        /** @type {RsbuildServer | null} */
        if (this.rsbuild) {
            return this.rsbuild;
        }

        const rsbuild = await createRsbuild({ rsbuildConfig });
        this.rsbuild = await rsbuild.createDevServer();

        return this.rsbuild;
    }

    /**
     * Express route handler for the home page (`/`).
     * Performs SSR rendering during development with HMR support.
     *
     * @param {import('express').Request} req - Express request object.
     * @param {import('express').Response} res - Express response object.
     * @param {import('express').NextFunction} next - Express next middleware function.
     */
    async handleHomePage(req, res, next) {
        try {
            const html = this.injectSiteOriginIntoHtml(await this.renderTemplate(), req);
            res.writeHead(200, { 'Content-Type': 'text/html' });
            res.end(html);
        } catch (err) {
            console.error('SSR failed.');
            console.error(err);
            next();
        }
    }
}

// Start development server
new DevServer();
