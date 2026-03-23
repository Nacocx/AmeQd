# AmeQd

一个基于 **Vue 3 + Vite + Element Plus** 的题目渲染与交互答题项目，适用于将结构化 JSON 题库渲染为可操作的练习页或轻量互动游戏。项目内置多种题型组件，支持答案提交、统计结果展示、音频播放，以及按课程/课时资源路径进行静态化部署。

## 项目定位

这个项目的核心目标不是“题库管理后台”，而是：

- 根据一份 JSON 配置快速渲染一套答题页面。
- 支持多种不同的交互题型。
- 支持课堂练习、视频配套练习、轻量游戏化题型。
- 支持将不同课程资源打包为静态文件，嵌入其他系统或部署到静态服务器。

从现有实现来看，项目更接近一个 **“题目播放/渲染引擎”**，而不是通用业务后台。

## 功能概览

### 常规题型

应用入口会根据 JSON 中存在的字段动态渲染不同题型，目前主流程已经接入以下类型：

- `xzt`：选择题
- `tkt`：填空题
- `tht`：涂画题
- `htt`：画图题
- `htt_tuo`：拖拽/画图组合题
- `lxt`：连线题
- `sst`：数数题
- `qst`：圈数/圈选题
- `lzt`：连字题
- `pyt`：拼音题
- `tyt`：听音题

### 游戏题型

当 JSON 中包含以下字段时，应用会进入游戏模式：

- `zww`：抓娃娃
- `dyt`：钓鱼题
- `qet`：企鹅题
- `qet_n`：企鹅题（无音乐版本）

### 运行特性

- 根据环境变量加载不同题库 JSON。
- 自动替换 JSON 中的 `VITE_RES_BASE_PATH` 占位符。
- 支持题目作答统计与提交后正确率展示。
- 视频配套资源场景下支持进入页面后自动播放提示音。
- 支持按不同课程配置批量构建多个 HTML 页面。

## 技术栈

### 前端基础

- Vue 3
- Vite
- Element Plus
- Axios

### 其他依赖

- Phaser：用于部分游戏化场景的能力扩展
- TensorFlow.js
- Tesseract.js

> 说明：从当前仓库结构看，核心答题流程主要使用 Vue + Element Plus + Axios；其余依赖更像是为特定能力或后续扩展准备。

## 目录结构

```text
.
├── public/
│   └── static2/
│       ├── json/                  # 题库 JSON 示例
│       ├── <lesson>/img/          # 课程图片资源
│       ├── <lesson>/audio/        # 课程音频资源
│       └── assets/                # 公共资源
├── src/
│   ├── components/                # 各题型组件
│   ├── App.vue                    # 题目分发、提交、统计入口
│   └── main.js                    # 应用入口
├── build.sh                       # 单配置构建后处理脚本
├── build2.sh                      # 多配置批量构建脚本
├── data.txt                       # 批量构建配置列表
├── vite.config.js                 # Vite 与产物路径配置
└── README.md
```

## 快速开始

### 1. 安装依赖

```bash
npm install
```

### 2. 配置开发环境变量

开发模式下主要依赖以下变量：

```env
VITE_RES_BASE_PATH=/static2/zw-01-u01-lesson01-1
VITE_JSON_BASE_PATH=/static2/json/zw-01-u01-lesson01-1-zwClassroomExercises
VITE_JC_BASE_PATH=static2/zw-01-u01-lesson01-1
```

含义说明：

- `VITE_RES_BASE_PATH`：题目图片、音频等资源的基础路径。
- `VITE_JSON_BASE_PATH`：题库 JSON 路径，不带 `.json` 后缀。
- `VITE_JC_BASE_PATH`：构建后 JS/CSS/资源输出路径前缀。

### 3. 启动开发服务器

```bash
npm run dev
```

### 4. 构建产物

```bash
npm run build
```

### 5. 预览构建结果

```bash
npm run preview
```

## 运行机制说明

### 题库加载

应用启动后会读取 `VITE_JSON_BASE_PATH` 对应的 JSON 文件，例如：

```text
../static/static2/json/zw-01-u01-lesson01-1-video2.json
```

入口组件会：

1. 请求 JSON 文件。
2. 深度遍历题目数据。
3. 将其中的 `VITE_RES_BASE_PATH` 替换为真实资源路径。
4. 根据 JSON 顶层字段决定渲染哪些题型组件。

这意味着：

- **同一套前端代码可以通过切换环境变量渲染不同课程内容。**
- **新增一套课程资源时，通常不需要改动业务代码，只需补充资源与 JSON。**

### 普通模式与游戏模式

- 如果 JSON 中是 `xzt / tkt / lxt ...` 等常规字段，则进入普通答题界面。
- 如果 JSON 中包含 `zww / dyt / qet / qet_n`，则进入游戏界面。

### 提交与统计

提交后会按照题型分别计算：

- 每种题型总题数
- 每种题型答对数量
- 每种题型正确率
- 全部题目的总体正确率

统计结果通过弹窗展示。

## 已接入题型与组件对应关系

| JSON 字段 | 组件 | 说明 |
| --- | --- | --- |
| `xzt` | `src/components/xzt.vue` | 选择题 |
| `tkt` | `src/components/tkt.vue` | 填空题 |
| `tht` | `src/components/tht.vue` | 涂画题 |
| `htt` | `src/components/htt.vue` | 画图题 |
| `htt_tuo` | `src/components/htt_tuo.vue` | 拖拽/画图题 |
| `lxt` | `src/components/lxt.vue` | 连线题 |
| `sst` | `src/components/sst.vue` | 数数题 |
| `qst` | `src/components/qst.vue` | 圈选题 |
| `lzt` | `src/components/lzt.vue` | 连字题 |
| `pyt` | `src/components/pyt.vue` | 拼音题 |
| `tyt` | `src/components/tyt.vue` | 听音题 |
| `zww` | `src/components/zww_game.vue` | 抓娃娃游戏 |
| `dyt` | `src/components/dyt_game.vue` | 钓鱼游戏 |
| `qet` | `src/components/qet_game.vue` | 企鹅游戏 |
| `qet_n` | `src/components/qet_game_nomusic.vue` | 无音乐企鹅游戏 |

## JSON 设计约定

项目不是通过固定路由去配置题目，而是通过 JSON 顶层 key 决定页面内容。建议遵守以下约定：

1. 顶层字段名直接对应题型。
2. 资源路径统一写成 `VITE_RES_BASE_PATH/...` 占位形式。
3. 用户作答状态字段（如 `userAnswer`、`changed`、`flag`、`isRight`）在组件内部会被修改，建议为每题初始化。
4. 尽量为每种题型保留清晰的 `answer` / `answers` / `result` 等判题字段。

仓库内可参考的 JSON 示例：

- `public/static2/json/test.json`：常规题型组合示例
- `public/static2/json/test_qet.json`：游戏题型示例
- `public/static2/json/*.json`：实际课程/课时示例

如果你需要生成题库，原 README 提到的 JSON 生成器项目也可以作为补充参考：

- [AmeQdJsonGenerator](https://github.com/Nacog/AmeQdJsonGenerator)

## 部署说明

### 方式一：普通静态部署

适合单个课程页面单独构建。

1. 修改 `.env.production` 中的三个路径变量。
2. 运行：

```bash
npm run build
```

3. 如需自动整理目录，可执行：

```bash
sh build.sh
```

`build.sh` 会在构建完成后：

- 检查 `dist/static/static2`
- 合并到 `dist/static2`
- 删除空的 `dist/static`

最终可将 `dist/` 部署到静态服务器。

### 方式二：批量构建多个课程页面

适合一次性生成多个课时页面。

1. 在 `data.txt` 中按 **三行一组 + 空行分隔** 维护配置：

```env
VITE_RES_BASE_PATH=../static/static2/sx-01-s-01-01-01
VITE_JSON_BASE_PATH=../static/static2/json/sx-01-s-01-01-01-sxClassroomExercises
VITE_JC_BASE_PATH=static/static2/sx-01-s-01-01-01/
```

2. 运行：

```bash
bash build2.sh
```

脚本会自动：

- 遍历 `data.txt` 中的每组配置
- 临时改写 `.env.production`
- 逐组执行 `npm run build`
- 将 `dist/index.html` 按 JSON 文件名重命名
- 合并资源到 `build-dist/`
- 构建结束后恢复原始 `.env.production`

### 方式三：嵌入 Spring Boot 项目

仓库现有脚本和原始说明显示，这个项目也可作为前端静态模板嵌入 Spring Boot：

1. 使用 `data.txt` 准备多组配置。
2. 执行 `build2.sh` 生成 `build-dist/`。
3. 将生成出的静态资源目录放入后端项目的静态资源目录。
4. 将 HTML 模板放入后端模板目录。
5. 在 Spring Boot 中增加对应控制器路由映射。

这套流程明显带有“课程资源打包到既有教学平台”的使用背景。

## 开发建议

### 新增题型

如果要新增一种题型，通常需要同步修改以下位置：

1. 在 `src/components/` 新增组件。
2. 在 `src/App.vue` 中引入组件并挂载渲染逻辑。
3. 在 `calTotalTm()` 中增加总题数统计规则。
4. 在 `willSubmit()` 中增加该题型判题分支。
5. 补充对应的 `getXxxBoolList()` 判题函数。
6. 如需结果展示，更新统计展示组件。
7. 设计对应 JSON 数据结构。

### 资源组织

建议每套课程资源维持如下结构：

```text
public/static2/<lesson>/
├── img/
├── audio/
└── ...
```

同时在 `public/static2/json/` 下维护与之对应的 JSON 文件，命名尽量统一，以便批量构建脚本自动推导 HTML 文件名。

### 代码风格现状

当前项目以：

- JavaScript
- Vue Options API
- 单文件组件（SFC）

为主。如果后续继续迭代，比较自然的演进方向会是：

- 渐进迁移到 Composition API
- 按题型抽离更清晰的共享逻辑
- 为 JSON 数据结构补充文档或 schema 校验
- 为判题逻辑增加自动化测试

## 常见问题

### 1. 页面空白或题目未加载

优先检查：

- `VITE_JSON_BASE_PATH` 是否正确
- JSON 文件是否真实存在
- JSON 是否带有 `.json` 后缀以外的命名问题
- 资源路径是否使用了 `VITE_RES_BASE_PATH` 占位符

### 2. 图片或音频 404

优先检查：

- `VITE_RES_BASE_PATH` 是否与资源目录匹配
- 生产环境相对路径是否和部署目录一致
- `VITE_JC_BASE_PATH` 是否影响了静态资源访问位置

### 3. 批量构建结果不完整

优先检查：

- `data.txt` 是否按照“3 行配置 + 空行分隔”编写
- `.env.production` 是否存在
- `build2.sh` 执行环境是否支持 bash
- 服务器是否提供 `rsync`（没有也能退化为 `cp`）

## 后续可改进方向

- 增加 README 中的题型数据结构示例，替代超长的内联 JSON 片段。
- 为各题型补充最小可运行示例。
- 增加 `.env.example`，降低新成员接手成本。
- 把构建脚本中的路径规则进一步参数化。
- 为题型判分逻辑增加单元测试。
- 对 JSON 做 schema 校验，减少运行时错误。

## 适合谁使用

这个项目比较适合：

- 需要快速交付教学互动练习页的前端开发者
- 需要把题库资源静态化部署到既有平台中的团队
- 需要将“题目数据”与“渲染引擎”解耦的教学内容项目

如果你接手的是一个“已有大量图片、音频、JSON 题库资源”的教学项目，这个仓库会比从零搭一个题目系统更省时间。
