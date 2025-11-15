import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  base: '/',
  server: {
    port: 5173,
    // Proxy API calls to local backend during development
    // This allows: http://localhost:5173/api/* → http://localhost:5000/api/*
    proxy: {
      '/api': {
        target: 'http://localhost:5000',
        changeOrigin: true
      }
    }
  },
  build: {
    sourcemap: false, // Disable source maps in production
    outDir: 'dist',
    minify: 'terser', // Minify JS for smaller bundle
    rollupOptions: {
      output: {
        manualChunks: undefined // Let Vite handle code splitting
      }
    },
    chunkSizeWarningLimit: 1000 // Suppress chunk size warnings
  },
  preview: {
    port: 4173,
    strictPort: false
  }
})
