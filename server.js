import express from 'express';
import { createProxyMiddleware } from 'http-proxy-middleware';

export class Server {
    cfg = {};

    constructor() {
        this.app = express();
    }

    /**
     * Публичный origin сайта (протокол + хост, без завершающего `/`).
     * Задаётся в `PUBLIC_SITE_URL`; если не задан — из заголовков запроса.
     *
     * @param {import('express').Request} req
     * @returns {string | undefined}
     */
    getPublicSiteOrigin(req) {
        const fromEnv = process.env.PUBLIC_SITE_URL?.trim().replace(/\/+$/, '');
        if (fromEnv) {
            return fromEnv;
        }
        const forwardedProto = req.get('x-forwarded-proto')?.split(',')[0]?.trim();
        const proto = forwardedProto || req.protocol || 'http';
        const host = req.get('x-forwarded-host') || req.get('host');
        if (!host) {
            return undefined;
        }
        return `${proto}://${host}`;
    }

    /**
     * Подставляет абсолютный origin в HTML (Open Graph, Twitter Card, canonical).
     * В шаблоне используйте плейсхолдер `__WEDDING_SITE_ORIGIN__` без слеша в конце.
     *
     * @param {string} html
     * @param {import('express').Request} req
     */
    injectSiteOriginIntoHtml(html, req) {
        const origin = this.getPublicSiteOrigin(req);
        if (!origin) {
            return html;
        }
        return html.replaceAll('__WEDDING_SITE_ORIGIN__', origin);
    }

    proxy(backendUrl = this.cfg.backend) {
        return createProxyMiddleware({
            target: backendUrl,
            changeOrigin: true,
            pathRewrite: this.cfg.rewrite,
            logger: console,
            on: {
                error: (err, req, res) => {
                    console.error(`Proxy error:`, err);
                    res.status(502).send('Backend service unavailable');
                },
            },
        });
    }
}
