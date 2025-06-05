# AME Project

私密仓库 - 基于 Vue 3 + Vite + Element Plus 的前端项目

## 技术栈

- Vue 3
- Vite
- Element Plus (UI 组件库)
- Axios (HTTP 客户端)

## 推荐开发环境

[VSCode](https://code.visualstudio.com/) + [Volar](https://marketplace.visualstudio.com/items?itemName=Vue.volar) (请禁用 Vetur)

## 项目配置

查看 [Vite 配置参考](https://vite.dev/config/).

## 项目设置

### 安装依赖
```sh
npm install
```

### 开发模式 (热更新)
```sh
npm run dev
```

### 生产环境构建
```sh
npm run build
```
运行 build 后，会产生 dist 文件夹，里面是打包好的静态文件

### 预览生产构建
```sh
npm run preview
```

## 主要依赖说明

### Axios 配置示例
在 `src/utils/request.js` 中创建 axios 实例：
```javascript
import axios from 'axios'

const service = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  timeout: 5000
})

// 请求拦截器
service.interceptors.request.use(
  config => {
    // 可在此处添加 token 等
    return config
  },
  error => {
    return Promise.reject(error)
  }
)

// 响应拦截器
service.interceptors.response.use(
  response => {
    return response.data
  },
  error => {
    return Promise.reject(error)
  }
)

export default service
```

### Element Plus 使用
在 `main.js` 中引入：
```javascript
import { createApp } from 'vue'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import App from './App.vue'

const app = createApp(App)
app.use(ElementPlus)
app.mount('#app')
```

## 项目结构

```
src/
├── assets/            # 静态资源
├── components/        # 公共组件
├── views/             # 页面组件
├── App.vue            # 根组件
└── main.js            # 入口文件
```



## 代码规范

- 使用 ESLint + Prettier 保持代码风格一致
- 组件使用 PascalCase 命名
- 单文件组件结构顺序：template -> script -> style

## 部署说明

1. 运行 `npm run build`
2. 将 dist 文件夹内容部署到静态服务器
3. 配置服务器路由重定向到 index.html (SPA 需要)
