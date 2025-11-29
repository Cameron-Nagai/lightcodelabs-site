import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  base: '/', // Changed for custom domain
  plugins: [react()],
  build: {
    outDir: 'docs', // Build directly to docs directory for GitHub Pages
  },
  optimizeDeps: {
    exclude: ['lucide-react'],
  },
});
