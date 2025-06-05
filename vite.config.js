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
    // cssCodeSplit: false, // 禁用CSS代码分割
    // assetsInlineLimit: 100000000 // 设置非常大的限制值，使所有资源内联

 rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes('node_modules')) {
            // 第三方依赖打包为 vendor 文件夹下的不同 chunk
            if (id.includes('element-plus')) {
              return 'element-plus'
            }
            if (id.includes('axios')) {
              return 'axios'
            }
            if (id.includes('vue')) {
              return 'vue'
            }
            return 'vendor' // 其他第三方
          }
          // 根据路径进一步模块
          if (id.includes('src/components')) {
            return 'components'
          }
          if (id.includes('src/views')) {
            return 'views'
          }
        }
      }
    }





  },
})
