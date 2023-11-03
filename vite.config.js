import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  },
  server: {
    proxy: {
      // string shorthand: http://localhost:5173/foo -> http://localhost:4567/foo
      '/works/glimpse': {
        target: 'http://fordatayouareandtodatayoushallreturn.online/works/',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/works/, ''),
      }
    }
  },
})
