# 🦝 小浣熊社区平台

> 面向 AI 工作流用户的内容社区 —— 分享实践、共同成长、养成专属小浣熊

小浣熊社区是一个专为 AI 落地实践者打造的垂直社区平台。用户可以在这里分享真实的 AI 工作流案例、交流行业应用经验、参与产品共建，并通过贡献积分养成自己的浣熊形象，与社区伙伴一起成长。

---

## ✨ 功能模块

### 🏠 社区首页 `/community`
- 精选案例卡片与热门讨论展示
- 行业圈子入口（电商、金融、医疗、法律、互联网）
- 平台数据统计实时看板
- 个人积分侧边栏与快捷操作

### 📂 案例广场 `/community/cases`
- 按行业分类筛选、按热度 / 最新 / 复用量多维排序
- 案例卡片：工作流描述、标签云、一键复用入口
- 案例详情页 `/community/cases/[id]`：完整链路步骤、Prompt 示例、成效数据、评论区
- 发布案例 `/community/cases/publish`：5 步引导式发布表单

### 📚 知识库 `/community/knowledge`
- 系统化 AI 应用知识沉淀
- 按分类浏览（基础教程、进阶技巧、行业方案）
- 收藏与贡献内容

### 💬 讨论区 `/community/discuss`
- 话题分类筛选（经验分享、行业讨论、问题求助等）
- 支持展开查看回复线程
- 热门话题标签、采纳最佳答案

### 📝 产品反馈 `/community/feedback`
- 在线提交（功能建议 / Bug 反馈 / 体验优化）
- 按分类与状态筛选（待处理 / 已受理 / 规划中 / 已上线）
- 可展开的回复线程、投票热度可视化

### 👥 用户榜单 `/community/members`
- 按积分、案例数、影响力分榜展示
- 身份认证标签（行业大 V / 优秀贡献者 / 认证专家 / 创作者）
- 行业圈子快速跳转入口

### 🌐 行业圈子 `/community/industry/[industry]`
- 垂直行业的专属交流社群入口
- **圈子主理人**卡片（带联系方式展示）
- **布道师**网格（活跃分享者）
- 圈内热议话题标签、行业案例库链接
- 加入微信/QQ 交流社群

### 🗓️ 社区活动 `/community/events`
- 线上线下活动报名
- 挑战赛与竞赛展示

### 🏆 荣誉室 `/community/honors`
- 月度 / 年度贡献排行榜
- 社区荣誉称号与特殊徽章

### 🦝 浣熊园 `/community/raccoon`
**社区核心养成玩法：**
- 每位用户拥有一只专属小浣熊，等级与积分联动
- **6 个进化阶段**：浣熊幼崽 → 探索小浣熊 → 知识浣熊 → 专家浣熊 → 大师浣熊 → 传说浣熊
- **AI 形象生成**：一键用 AI 为浣熊生成专属形象图片
- **4 种场景切换**：🌲 竹林小院 / 🌅 落日草原 / 🌙 星夜营地 / 🌸 樱花庭院
- **自由漫步**：所有浣熊在园子里随机移动，每只都有独特名字、心情和宣言
- 点击任意浣熊查看详情，链接到用户主页

### 📖 使用指南 `/community/guide`
- 4 Tab 完整社区说明：模块指南 / 积分体系 / 身份认证 / 徽章系统
- 积分获取规则与等级权益详解
- 徽章收集攻略

### ⚙️ 个人中心 `/community/profile`
- **我的小浣熊**卡片（概览页顶部，含进化进度）
- 7 个 Tab 内容页：概览 / 我的案例 / 积分明细 / 我的反馈 / 我的评论 / 我的收藏 / 徽章墙
- 资料编辑（基本信息 + 社交账号）
- 积分等级体系与进度可视化
- 每日签到 +5 积分

---

## 🎮 积分与成长体系

| 等级 | 浣熊形态 | 积分区间 | 特殊能力 |
|------|---------|---------|---------|
| Lv.1 | 浣熊幼崽 | 0 - 499 | 好奇心·超强 |
| Lv.2 | 探索小浣熊 | 500 - 1,999 | 探索力·旺盛 |
| Lv.3 | 知识浣熊 | 2,000 - 4,999 | 学习力·满格 |
| Lv.4 | 专家浣熊 | 5,000 - 9,999 | 专业力·精通 |
| Lv.5 | 大师浣熊 | 10,000 - 19,999 | 影响力·强劲 |
| Lv.6 | 传说浣熊 | 20,000+ | 传奇力·无极 |

**获取积分的方式：** 发布案例、被官方推荐、案例被复用、发布知识库、参与讨论、每日签到、提交反馈被采纳、参加活动...

---

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

访问：
- 🌐 前端：http://localhost:3000
- 🦝 社区：http://localhost:3000/community
- 🔌 API：http://localhost:3001

---

## 🛠️ 技术栈

### 前端
- **Framework**：Next.js 15 (App Router) + React 19
- **样式**：Tailwind CSS + shadcn/ui 组件
- **语言**：TypeScript

### 后端
- **Framework**：Fastify + TypeScript
- **数据库**：PostgreSQL + Drizzle ORM
- **缓存**：Redis
- **认证**：JWT + NextAuth.js

### 工程化
- **Monorepo**：Turborepo + pnpm workspace
- **代码规范**：ESLint 9 + Prettier
- **Git Hooks**：Husky + lint-staged

---

## 📁 项目结构

```
Raccon-Comm/
├── apps/
│   ├── web/                          # Next.js 前端
│   │   └── app/(main)/community/
│   │       ├── layout.tsx            # 顶部导航（主标签 + 更多下拉 + 头像菜单）
│   │       ├── page.tsx              # 社区首页
│   │       ├── cases/                # 案例广场
│   │       ├── knowledge/            # 知识库
│   │       ├── discuss/              # 讨论区
│   │       ├── feedback/             # 产品反馈
│   │       ├── members/              # 用户榜单
│   │       │   └── data.ts           # 用户数据、身份标签、行业圈子定义
│   │       ├── industry/[industry]/  # 行业圈子详情
│   │       ├── raccoon/              # 🦝 浣熊园
│   │       │   ├── data.ts           # 等级系统、浣熊数据、场景配置
│   │       │   └── page.tsx          # 浣熊园（自由漫步 + AI 形象）
│   │       ├── profile/              # 个人中心
│   │       ├── events/               # 社区活动
│   │       ├── honors/               # 荣誉室
│   │       └── guide/                # 使用指南
│   └── api/                          # Fastify 后端
├── packages/
│   ├── db/                           # Drizzle ORM Schema
│   └── shared/                       # 共享类型与工具
├── docker-compose.yml
└── .env.example
```

---

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
pnpm db:push       # 推送 Schema
pnpm db:migrate    # 运行迁移
pnpm db:studio     # Drizzle Studio 管理界面
```

---

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

---

## 🐛 故障排除

```bash
# 端口冲突
lsof -ti:3000 | xargs kill -9

# 数据库连接失败
docker-compose restart postgres

# 构建缓存问题
rm -rf apps/web/.next && pnpm dev
```

---

## 📋 版本记录

**v0.4.0 - 2026-02-17**
- ✅ 浣熊园：浣熊自由漫步动画（随机移动，8s 平滑过渡）
- ✅ AI 形象生成：用 AI 为浣熊生成专属形象图片
- ✅ 数据结构扩展：`RaccoonPersonality` 接口支持 `imageUrl`

**v0.3.0 - 2026-02-17**
- ✅ 🦝 浣熊养成系统：6 级进化、积分联动、个性宣言
- ✅ 浣熊园页面：4 种场景切换、浣熊档案、成长路线图
- ✅ 个人中心集成：概览页「我的小浣熊」卡片
- ✅ 导航优化：主标签栏精简 + 更多下拉 + 头像菜单
- ✅ 使用指南：4 Tab 社区说明（模块 / 积分 / 认证 / 徽章）

**v0.2.0 - 2026-02-17**
- ✅ 行业圈子：主理人 + 布道师体系、社群入口
- ✅ 用户榜单：身份标签、行业圈子快速入口
- ✅ 产品反馈：可展开回复线程、投票热度可视化
- ✅ 社区模块全量开发（首页、案例、讨论、反馈、个人中心）
- ✅ 全站移动端响应式适配

**v0.1.0 - 2026-02-14**
- ✅ 项目架构搭建（Monorepo + Turborepo）
- ✅ 前端 UI 组件系统（shadcn/ui）
- ✅ 数据库 Schema 设计
- ✅ 环境变量验证与代码规范配置

---

**由小浣熊团队用 ❤️ 打造**
