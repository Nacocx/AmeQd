import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueDevTools from 'vite-plugin-vue-devtools'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    vueDevTools(),
  ],

  base:"./",

  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    },
  }, build: {
    // minify: false, // 禁用压缩（JS/CSS 保持可读）
    // sourcemap: true, // 生成 sourcemap（方便调试）
    // cssMinify: false,
  },
})
