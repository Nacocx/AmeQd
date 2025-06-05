import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueDevTools from 'vite-plugin-vue-devtools'
// https://vite.dev/config/

const mydirname = 'static2/sx-01-s-01-01-01';

export default defineConfig({
  plugins: [
    vue(),
    vueDevTools(),
    
  ],

  // base:"./",

  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    },
  }, build: {
    // minify: false, // 禁用压缩（JS/CSS 保持可读）
    // sourcemap: true, // 生成 sourcemap（方便调试）
    // cssMinify: false,
    // cssCodeSplit: false, // 禁用CSS代码分割
    // assetsInlineLimit: 100000000 // 设置非常大的限制值，使所有资源内联

 rollupOptions: {
      output: {
        entryFileNames: `${mydirname}/js/[name].js`,
        chunkFileNames: `${mydirname}/js/[name].js`,
        assetFileNames: (assetInfo) => {
          if (/\.css$/i.test(assetInfo.name)) {
            return `${mydirname}/css/[name][extname]`
          }
          if (/\.(png|jpe?g|gif|svg|webp)$/i.test(assetInfo.name)) {
            return `${mydirname}/img/[name][extname]`
          }
          return `${mydirname}/assets/[name][extname]`
        },
        manualChunks(id) {
          if (id.includes('node_modules')) {
            if (id.includes('element-plus')) return 'element-plus'
            if (id.includes('axios')) return 'axios'
            if (id.includes('vue')) return 'vue'
            return 'vendor'
          }
          if (id.includes('src/components')) return 'components'
          if (id.includes('src/views')) return 'views'
        }
      }
    
    
    
    }





  },
})
