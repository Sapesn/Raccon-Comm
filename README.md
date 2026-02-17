# 🦝 小浣熊社区平台

小浣熊社区是一个面向 AI 工作流用户的内容社区，支持案例展示与复用、讨论交流、产品反馈和个人成长体系，帮助用户更好地分享和发现 AI 应用实践。

## ✨ 功能模块

### 🏠 社区首页 `/community`
- Banner 展示与快速入口
- 平台数据统计（案例数、讨论数、活跃用户数）
- 行业分类入口（电商、金融、医疗、法律等）
- 精选案例卡片与热门讨论
- 个人信息侧边栏、积分排行榜

### 📂 案例展示 `/community/cases`
- 按行业分类筛选、多维度排序
- 案例卡片：工作流预览、标签、一键复用
- 详情页 `/community/cases/[id]`：完整链路步骤、Prompt 示例、成效数据、评论区
- 发布案例 `/community/cases/publish`：5 步引导式发布表单

### 💬 社区讨论 `/community/discuss`
- 话题分类筛选（经验分享、行业讨论、问题求助等）
- 帖子列表，支持展开查看回复
- 热门话题标签、社区公约、活跃用户

### 📝 产品反馈 `/community/feedback`
- 在线提交反馈（功能建议 / Bug 反馈 / 体验优化）
- 按分类和状态筛选（待处理 / 已受理 / 规划中 / 已上线）
- 投票 +1 支持反馈，反馈统计侧边栏

### 👤 个人中心 `/community/profile`
- 7 个 Tab 内容页：概览 / 我的案例 / 积分明细 / 我的反馈 / 我的评论 / 我的收藏 / 徽章墙
- 积分等级体系与进度条
- 活动时间线、徽章展示

## 🚀 快速开始

```bash
# 1. 安装依赖
pnpm install

# 2. 配置环境变量
cp .env.example .env

# 3. 启动数据库
docker-compose up -d

# 4. 初始化数据库
pnpm db:push

# 5. 启动开发服务器
pnpm dev
```

访问:
- 🌐 前端: http://localhost:3000
- 🦝 社区: http://localhost:3000/community
- 🔌 API: http://localhost:3001

## 🛠️ 技术栈

### 前端
- **Framework**: Next.js 15 (App Router) + React 19
- **样式**: Tailwind CSS + shadcn/ui 组件
- **语言**: TypeScript

### 后端
- **Framework**: Fastify + TypeScript
- **数据库**: PostgreSQL + Drizzle ORM
- **缓存**: Redis
- **认证**: JWT + NextAuth.js

### 工程化
- **Monorepo**: Turborepo + pnpm workspace
- **代码规范**: ESLint 9 + Prettier
- **Git Hooks**: Husky + lint-staged

## 📁 项目结构

```
Raccon-Comm/
├── apps/
│   ├── web/                        # Next.js 前端
│   │   ├── app/
│   │   │   ├── (auth)/             # 登录 / 注册
│   │   │   └── (main)/
│   │   │       ├── community/      # 社区模块
│   │   │       │   ├── page.tsx        # 社区首页
│   │   │       │   ├── layout.tsx      # 顶部导航
│   │   │       │   ├── cases/          # 案例展示
│   │   │       │   ├── discuss/        # 社区讨论
│   │   │       │   ├── feedback/       # 产品反馈
│   │   │       │   └── profile/        # 个人中心
│   │   │       └── dashboard/      # 控制台
│   │   ├── components/ui/          # shadcn/ui 组件
│   │   └── lib/                    # 工具函数
│   └── api/                        # Fastify 后端
├── packages/
│   ├── db/                         # Drizzle ORM Schema
│   └── shared/                     # 共享类型与工具
├── docker-compose.yml
└── .env.example
```

## 📋 常用命令

```bash
# 开发
pnpm dev           # 启动所有服务
pnpm build         # 构建生产版本
pnpm lint          # 代码检查
pnpm lint:fix      # 自动修复
pnpm format        # 格式化代码
pnpm type-check    # TypeScript 类型检查

# 数据库
pnpm db:push       # 推送 schema
pnpm db:migrate    # 运行迁移
pnpm db:studio     # Drizzle Studio 管理界面
```

## 🔐 环境变量

```env
DATABASE_URL="postgresql://..."
JWT_SECRET="your-secret-key-min-32-chars"
API_SECRET="your-api-secret-key-min-32-chars"
NEXTAUTH_SECRET="your-nextauth-secret-min-32-chars"
NODE_ENV="development"
PORT="3001"
```

> 生产环境所有密钥必须至少 32 字符，使用 `openssl rand -base64 48` 生成。

## 🚧 版本记录

**v0.2.0 - 2026-02-17**
- ✅ 社区模块全量开发（首页、案例、讨论、反馈、个人中心）
- ✅ 案例详情页 + 5 步发布引导
- ✅ 个人中心 7 Tab 内容页与积分徽章体系
- ✅ 全站移动端响应式适配

**v0.1.0 - 2026-02-14**
- ✅ 项目架构搭建（Monorepo）
- ✅ 前端 UI 组件系统（shadcn/ui）
- ✅ 数据库 Schema 设计
- ✅ 环境变量验证与代码规范配置

## 🐛 故障排除

```bash
# 端口冲突
lsof -ti:3000 | xargs kill -9

# 数据库连接失败
docker-compose restart postgres

# 构建缓存问题
rm -rf apps/web/.next && pnpm dev
```

## 📄 License

MIT

---

**由小浣熊团队用 ❤️ 打造**
