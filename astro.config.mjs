import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';
import cloudflare from '@astrojs/cloudflare';

// https://astro.build/config
export default defineConfig({
  site: 'https://alegre.engineering',
  output: 'server',
  adapter: cloudflare(),
  vite: {
    plugins: [tailwindcss()]
  }
});