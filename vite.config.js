import { defineConfig } from 'vite'

// Vite will serve `index.html` at root. For local API testing, you can run
// `npm run dev:full` which starts both vite and `vercel dev`. The proxy below
// forwards /api requests from Vite (5173) to Vercel dev (3000).
export default defineConfig({
  server: {
    port: 5173,
    proxy: {
      '/api': {
        target: 'http://localhost:3000',
        changeOrigin: true,
      },
    },
  },
  preview: {
    port: 5173,
  },
})
