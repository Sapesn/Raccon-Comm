# 🦝 商汤小浣熊知识库社区平台 MVP

一个现代化的知识库/文档协作平台，类似语雀、Notion，专为商汤科技小浣熊家族打造。

## ✨ 最新更新

**v0.1.0 - 2026-02-14**
- ✅ 完成前端 UI 优化，采用现代化设计
- ✅ 集成 shadcn/ui 风格组件系统
- ✅ 添加环境变量验证和类型安全
- ✅ 配置代码规范 (ESLint + Prettier)
- ✅ 优化数据库连接池
- 📖 详见 [OPTIMIZATION.md](./OPTIMIZATION.md)

## 🚀 快速开始

**新用户请查看**: [快速开始指南 (QUICKSTART.md)](./QUICKSTART.md)

### 最简步骤

```bash
# 1. 安装依赖
pnpm install

# 2. 配置环境变量
cp .env.example .env
# 编辑 .env 文件，设置密钥 (使用 openssl rand -base64 48 生成)

# 3. 启动数据库
docker-compose up -d

# 4. 初始化数据库
pnpm db:push

# 5. 启动开发服务器
pnpm dev
```

访问:
- 🌐 前端: http://localhost:3000
- 🔌 API: http://localhost:3001
- 🗄️ 数据库管理: 运行 `pnpm db:studio`

## 🛠️ 技术栈

### 前端
- **Framework**: Next.js 15 (App Router) + React 19
- **样式**: Tailwind CSS + shadcn/ui 风格组件
- **编辑器**: TipTap v2
- **状态管理**: Zustand
- **表单验证**: Zod

### 后端
- **Framework**: Fastify + TypeScript
- **数据库**: PostgreSQL + Drizzle ORM
- **缓存**: Redis
- **认证**: JWT + NextAuth.js

### 开发工具
- **Monorepo**: Turborepo + pnpm workspace
- **代码规范**: ESLint + Prettier
- **Git Hooks**: Husky + lint-staged
- **测试**: Vitest (计划中)

## 📁 项目结构

```
Raccon-Comm/
├── apps/
│   ├── web/                    # Next.js 前端应用
│   │   ├── app/               # App Router 页面
│   │   ├── components/        # React 组件
│   │   │   └── ui/           # shadcn/ui 风格组件
│   │   └── lib/              # 工具函数
│   └── api/                   # Fastify 后端服务
│       ├── src/
│       │   ├── routes/       # API 路由
│       │   └── middleware/   # 中间件
│       └── server.ts
├── packages/
│   ├── db/                    # Drizzle ORM Schema
│   │   └── src/schema/       # 数据库表定义
│   └── shared/                # 共享代码
│       ├── types/            # TypeScript 类型
│       ├── schemas/          # Zod 验证 schema
│       └── env/              # 环境变量验证
├── docker-compose.yml         # Docker 服务配置
├── .env.example              # 环境变量模板
├── OPTIMIZATION.md           # 优化详细说明
└── QUICKSTART.md             # 快速开始指南
```

## 🎯 开发指南

### 常用命令

```bash
# 开发
pnpm dev           # 启动所有服务 (Web + API)
pnpm build         # 构建生产版本
pnpm lint          # 检查代码规范
pnpm lint:fix      # 自动修复代码问题
pnpm format        # 格式化代码
pnpm format:check  # 检查代码格式
pnpm type-check    # TypeScript 类型检查

# 数据库
pnpm db:push       # 推送 schema 到数据库
pnpm db:migrate    # 运行迁移
pnpm db:studio     # 打开 Drizzle Studio 数据库管理界面

# 清理
pnpm clean         # 清理构建产物和 node_modules
```

### 代码规范

项目已配置自动代码检查和格式化:
- 提交代码前会自动运行 `lint` 和 `prettier`
- 使用 ESLint 9.x 扁平配置
- Prettier 自动格式化，包含 Tailwind CSS 类名排序

## 📱 页面展示

### 🏠 首页
- 现代化英雄区块，渐变背景
- 核心功能卡片展示
- 响应式设计，支持深色模式
- 流畅的动画效果

### 🔐 认证页面
- 登录 (`/login`)
- 注册 (`/register`)
- 优雅的卡片设计
- 表单验证提示

### 📊 Dashboard
- 知识库管理界面 (`/dashboard`)
- 搜索和筛选功能
- 数据统计面板
- 创建新知识库

## 🚧 MVP 功能清单

### ✅ 已完成
- ✅ 项目架构搭建 (Monorepo)
- ✅ 前端 UI 组件系统
- ✅ 页面设计优化
- ✅ 数据库 Schema 设计
- ✅ 环境变量验证
- ✅ 代码规范配置

### 🔄 进行中
- 🔄 用户认证系统（注册、登录、JWT）
- 🔄 API 路由实现

### 📋 待开发
- ⏳ 知识库管理（创建、编辑、删除、权限控制）
- ⏳ 文档管理（CRUD、树形结构）
- ⏳ 富文本编辑器集成
- ⏳ 评论和互动系统
- ⏳ 全文搜索功能
- ⏳ AI 智能助手（商汤小浣熊）

## 🔐 环境变量

关键环境变量（详见 `.env.example`）:

```env
# 数据库
DATABASE_URL="postgresql://..."

# 安全密钥 (生产环境必须更改!)
JWT_SECRET="your-secret-key-min-32-chars"
API_SECRET="your-api-secret-key-min-32-chars"
NEXTAUTH_SECRET="your-nextauth-secret-min-32-chars"

# 服务配置
NODE_ENV="development"
PORT="3001"
LOG_LEVEL="info"
```

**⚠️ 重要**:
- 所有密钥必须至少 32 字符
- 生产环境必须使用强密钥
- 使用 `openssl rand -base64 48` 生成安全密钥

## 📚 文档

## 📚 文档

- 📖 [快速开始指南](./QUICKSTART.md) - 5 分钟上手项目
- 🔧 [优化详细说明](./OPTIMIZATION.md) - 了解所有改进内容
- 🏗️ [架构设计](./docs/architecture.md) - (计划中)
- 📡 [API 文档](./docs/api.md) - (计划中)

## 🤝 贡献指南

欢迎贡献！请遵循以下步骤:

1. Fork 本仓库
2. 创建特性分支 (`git checkout -b feature/AmazingFeature`)
3. 提交更改 (`git commit -m 'Add some AmazingFeature'`)
4. 推送到分支 (`git push origin feature/AmazingFeature`)
5. 开启 Pull Request

**代码规范**:
- 提交前会自动运行 lint 和格式化
- 遵循 TypeScript 最佳实践
- 编写清晰的提交信息

## 🐛 故障排除

常见问题及解决方案:

### 端口被占用
```bash
# 检查并杀死占用端口的进程
lsof -ti:3000 | xargs kill -9  # Web
lsof -ti:3001 | xargs kill -9  # API
```

### 数据库连接失败
```bash
# 检查 Docker 容器状态
docker-compose ps

# 重启数据库
docker-compose restart postgres
```

### 依赖安装问题
```bash
# 清理并重新安装
rm -rf node_modules
pnpm store prune
pnpm install
```

更多问题请查看 [QUICKSTART.md](./QUICKSTART.md#故障排除)

## 📄 License

MIT

---

**由小浣熊团队用 ❤️ 打造**
