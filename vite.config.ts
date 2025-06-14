import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 3015,
    host: true,
    open: true
  },
  preview: {
    port: 3015,
    host: true
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  build: {
    outDir: 'dist',
    sourcemap: true,
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom'],
          router: ['react-router-dom'],
          ui: ['@headlessui/react', '@heroicons/react'],
          forms: ['react-hook-form', '@hookform/resolvers', 'zod'],
          charts: ['recharts'],
          utils: ['clsx', 'date-fns', 'axios'],
          auth: ['@supabase/supabase-js']
        }
      }
    }
  },
  optimizeDeps: {
    include: [
      'react',
      'react-dom',
      'react-router-dom',
      'react-query',
      '@supabase/supabase-js',
      '@heroicons/react/24/outline',
      '@headlessui/react',
      'clsx',
      'date-fns',
      'recharts',
      'react-hook-form',
      'zod',
      '@hookform/resolvers',
      'framer-motion',
      'react-hot-toast',
      'axios'
    ]
  },
  define: {
    // Canadian-specific build constants
    __APP_REGION__: JSON.stringify('canada'),
    __APP_TYPE__: JSON.stringify('family_support'),
    __BUILD_TIME__: JSON.stringify(new Date().toISOString()),
  },
  css: {
    postcss: './postcss.config.js'
  }
})