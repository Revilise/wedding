import express from "express";
import {createProxyMiddleware} from "http-proxy-middleware";

export class Server {
  cfg = {};

  constructor() {
    this.app = express()
  }

  proxy(backendUrl = this.cfg.backend) {
    return createProxyMiddleware({
      target: backendUrl,
      changeOrigin: true,
      pathRewrite: {
        '^/api': '/api',
      },
      onProxyReq(proxyReq, req, res) {
        // Forward all headers except host
        Object.keys(req.headers).forEach(key => {
          if (key !== 'host') {
            proxyReq.setHeader(key, req.headers[key]);
          }
        });
      },
      onError(err, req, res) {
        console.error(`Proxy error for ${req.url}:`, err);
        res.status(502).json({error: 'Backend service unavailable'});
      },
      // logLevel: 'warn' // Reduce noise in console
    });
  }
}
