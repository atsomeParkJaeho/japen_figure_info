import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { defineConfig, type Plugin } from 'vite'
import { createProxyMiddleware } from 'http-proxy-middleware'

const apiProxyPlugin = (): Plugin => ({
  name: 'api-proxy-middleware',
  configureServer(server) {
    server.middlewares.use(
      '/api',
      createProxyMiddleware({
        target: process.env.VITE_API_TARGET ?? 'http://localhost:3000',
        changeOrigin: true,
        pathRewrite: { '^/api': '' },
      }),
    )
  },
})

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss(), apiProxyPlugin()],
  server: {
    port: 5173,
  },
})
