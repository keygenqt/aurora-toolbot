import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    chunkSizeWarningLimit: 5000,
  },
  server: {
    port: 3025,
    proxy: {
        '/api': {
          target: 'http://0.0.0.0:3024/',
          changeOrigin: true,
          secure: false,
        },
      },
  },
})
