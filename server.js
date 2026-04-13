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
