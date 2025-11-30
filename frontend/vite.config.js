import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [tailwindcss(), react()],
  publicDir: 'public',

  // This server proxy is critical for local development
  server: {
    proxy: {
      // Proxies all requests starting with /api
      '/api': {
        target: 'http://localhost:5001',
        changeOrigin: true,
      },
      // Proxies all requests starting with /auth
      '/auth': {
        target: 'http://localhost:5001',
        changeOrigin: true,
      },
      // Proxy for uploaded images
      '/uploads': {
        target: 'http://localhost:5001',
        changeOrigin: true,
      }
    }
  }
})