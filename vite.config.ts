// vite.config.ts
import { defineConfig } from 'vite'

export default defineConfig({
  root: 'src',     // <== 加這行！
  base: './',
  build: {
    outDir: '../dist'
  }
});

