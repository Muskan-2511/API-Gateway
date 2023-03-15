import { createProxyMiddleware } from 'http-proxy-middleware';

// Proxy middleware
const apiProxy = createProxyMiddleware('/', {
  target: 'http://localhost:3000',
  changeOrigin: true,
});

export default apiProxy;
