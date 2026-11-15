import tailwindcss from '@tailwindcss/vite';
import fs from 'fs';
import path from 'path';
import {defineConfig, type Plugin} from 'vite';

// Skrip klasik (<script src>) dan data JSON tidak dibundel Vite, jadi salin apa adanya ke dist.
function copyStatic(dirs: string[]): Plugin {
  return {
    name: 'copy-static',
    apply: 'build',
    closeBundle() {
      for (const dir of dirs) {
        const from = path.resolve(__dirname, dir);
        if (fs.existsSync(from)) {
          fs.cpSync(from, path.resolve(__dirname, 'dist', dir), {recursive: true});
        }
      }
    },
  };
}

export default defineConfig(() => {
  return {
    // Path relatif agar situs jalan di sub-folder GitHub Pages (/siti-jilbab/) maupun domain sendiri.
    base: './',
    plugins: [tailwindcss(), copyStatic(['data', 'assets/js', 'assets/images'])],
    resolve: {
      alias: {
        '@': path.resolve(__dirname, '.'),
      },
    },
    build: {
      rollupOptions: {
        input: {
          main: path.resolve(__dirname, 'index.html'),
          katalog: path.resolve(__dirname, 'katalog.html'),
          detail: path.resolve(__dirname, 'produk/detail.html'),
          tentang: path.resolve(__dirname, 'tentang.html'),
          kontak: path.resolve(__dirname, 'kontak.html')
        }
      }
    },
    server: {
      // HMR is disabled in AI Studio via DISABLE_HMR env var.
      // Do not modify—file watching is disabled to prevent flickering during agent edits.
      hmr: process.env.DISABLE_HMR !== 'true',
      // Disable file watching when DISABLE_HMR is true to save CPU during agent edits.
      watch: process.env.DISABLE_HMR === 'true' ? null : {},
    },
  };
});
