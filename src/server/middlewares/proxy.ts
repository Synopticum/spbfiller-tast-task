import { createProxyMiddleware, RequestHandler } from 'http-proxy-middleware';

export default (target: string): RequestHandler =>
  createProxyMiddleware({
    target,
    changeOrigin: true,
    secure: false,
  });
