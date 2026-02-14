# 🦝 商汤小浣熊知识库社区平台 MVP

一个现代化的知识库/文档协作平台，类似语雀、Notion，专为商汤科技小浣熊家族打造。

## 技术栈

- **前端**: Next.js 14 (App Router) + React + TypeScript + Tailwind CSS
- **后端**: Fastify + Node.js + TypeScript
- **数据库**: PostgreSQL + Drizzle ORM
- **缓存**: Redis
- **编辑器**: TipTap v2
- **构建工具**: Turborepo + pnpm

## 快速开始

### 环境要求

- Node.js >= 20.0.0
- pnpm >= 9.0.0
- Docker & Docker Compose

### 安装依赖

```bash
pnpm install
```

### 启动数据库

```bash
docker-compose up -d
```

### 数据库迁移

```bash
pnpm db:push
```

### 启动开发服务器

```bash
pnpm dev
```

访问:
- 前端: http://localhost:3000
- API: http://localhost:3001

## 项目结构

```
raccoon-kb-mvp/
├── apps/
│   ├── web/                    # Next.js 前端应用
│   └── api/                    # Fastify 后端服务
├── packages/
│   ├── db/                     # Drizzle ORM Schema
│   └── shared/                 # 共享类型和工具
├── docker/                     # Docker 配置
└── .github/                    # GitHub Actions
```

## 开发指南

### 可用命令

```bash
pnpm dev          # 启动开发服务器
pnpm build        # 构建生产版本
pnpm test         # 运行测试
pnpm lint         # 代码检查
pnpm type-check   # 类型检查
pnpm db:migrate   # 运行数据库迁移
pnpm db:studio    # 打开 Drizzle Studio
```

## MVP 功能清单

- ✅ 用户认证系统（注册、登录、JWT）
- ✅ 知识库管理（创建、编辑、删除、权限控制）
- ✅ 文档管理（CRUD、树形结构）
- ✅ 富文本编辑器（TipTap）
- ✅ 评论和互动系统
- ✅ 全文搜索功能

## License

MIT
