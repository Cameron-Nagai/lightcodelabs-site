import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import fs from 'fs';
import path from 'path';

// Generates docs/sitemap.xml after every build so GitHub Pages serves it.
function generateSitemap() {
  return {
    name: 'generate-sitemap',
    closeBundle() {
      const baseUrl = 'https://lightcodelabs.studio';
      const today = new Date().toISOString().split('T')[0];
      const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>${baseUrl}/</loc>
    <lastmod>${today}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>1.0</priority>
  </url>
</urlset>
`;
      const outPath = path.resolve(__dirname, 'docs/sitemap.xml');
      fs.mkdirSync(path.dirname(outPath), { recursive: true });
      fs.writeFileSync(outPath, sitemap);
    },
  };
}

// https://vitejs.dev/config/
export default defineConfig({
  base: '/', // Custom domain
  plugins: [react(), generateSitemap()],
  build: {
    outDir: 'docs', // Build directly to docs for GitHub Pages
  },
  optimizeDeps: {
    exclude: ['lucide-react'],
  },
});