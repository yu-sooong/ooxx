// vite.config.ts
import { defineConfig } from 'vite'

export default defineConfig({
  root: 'src',
  base: '/ooxx/', // ⚠️ 你的 repo 名稱！
  build: {
    outDir: '../dist',
    emptyOutDir: true
  },
});
