import { fileURLToPath, URL } from 'node:url'
import { defineConfig, loadEnv } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueDevTools from 'vite-plugin-vue-devtools'

export default ({ mode }) => {
  // 加载环境变量
  const env = loadEnv(mode, process.cwd())
  
  // 获取基础路径，如果未设置则使用默认值
  const basePath = env.VITE_JC_BASE_PATH;

  return defineConfig({
    plugins: [
      vue(),
      vueDevTools(),
    ],
    resolve: {
      alias: {
        '@': fileURLToPath(new URL('./src', import.meta.url))
      },
    },
    build: {
      rollupOptions: {
        output: {
          entryFileNames: `${basePath}js/[name].js`,
          chunkFileNames: `${basePath}js/[name].js`,
          assetFileNames: (assetInfo) => {
            if (/\.css$/i.test(assetInfo.name)) {
              return `${basePath}css/[name][extname]`
            }
            if (/\.(png|jpe?g|gif|svg|webp)$/i.test(assetInfo.name)) {
              return `${basePath}img/[name][extname]`
            }
            return `${basePath}assets/[name][extname]`
          },
          manualChunks(id) {
            if (id.includes('node_modules')) {
              if (id.includes('element-plus')) return 'element-plus'
              if (id.includes('axios')) return 'axios'
              if (id.includes('vue')) return 'vue'
              return 'vendor'
            }
            if (id.includes('src/components')) return 'components'
          }
        }
      }
    }
  })
}
