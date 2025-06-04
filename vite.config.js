import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueDevTools from 'vite-plugin-vue-devtools'
import { viteSingleFile } from "vite-plugin-singlefile"
// https://vite.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    vueDevTools(),
    viteSingleFile(),
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
    cssCodeSplit: false, // 禁用CSS代码分割
    assetsInlineLimit: 100000000 // 设置非常大的限制值，使所有资源内联
  },
})
