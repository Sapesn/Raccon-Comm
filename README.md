# 🦝 小浣熊社区平台

> 面向 AI 工作流用户的垂直内容社区 —— 分享实践、共同成长、养成专属小浣熊

小浣熊社区是一个专为 AI 落地实践者打造的垂直社区平台。用户可以在这里发布真实 AI 工作流案例与深度博文、沉淀行业知识库、参与讨论与活动，并通过积分养成专属浣熊形象，与社区伙伴一起成长。

---

## ✨ 功能模块

### 🏠 社区首页 `/community`
- 精选案例卡片 + 热门讨论 + 行业圈子快速入口
- 平台数据统计看板（案例数 / 活跃成员 / 知识库 / 周复用量）
- 个人积分侧边栏、积分排行榜、快捷操作区

### 📂 案例广场 `/community/cases`
- 按行业分类筛选、按热度 / 最新 / 复用量多维排序 + 全文搜索
- 案例卡片：工作流摘要、标签云、作者信息、一键复用入口
- 案例详情 `/community/cases/[id]`：完整链路步骤、Prompt 示例、成效数据、评论区
- 发布案例 `/community/cases/publish`：5 步引导式发布表单

### 📚 知识库 `/community/knowledge`
- 系统化 AI 应用知识沉淀，支持 PAW 方法论标注
- 按行业 + 多维排序筛选，可展开文档预览
- 「Linked Chains」关联展示：知识库之间的引用关系
- 收藏功能 + 侧边栏个人收藏快速访问

### ✍️ 社区博客 `/community/blog`
- 深度文章发布，支持分类（AI 实践 / 行业洞察 / 工具技巧 / 案例复盘 / 产品思考）
- 文章列表：分类筛选、多维排序（最新 / 最多浏览 / 最多点赞 / 热门讨论）、全文搜索
- 文章详情 `/community/blog/[id]`：结构化内容渲染（标题 / 段落 / 引用 / 代码块 / 图片）、点赞 toggle、评论区
- 写作发布 `/community/blog/write`：4 步 Block 编辑器（基本信息 → 内容编辑 → 摘要与封面 → 预览发布）
- 热门文章 Top5、分类导航侧边栏

### 💬 讨论区 `/community/discuss`
- 话题分类筛选（经验分享 / 行业讨论 / 问题求助等）
- 支持展开查看内联回复线程、@提及、标签检索

### 📬 站内信 `/community/messages`
- 三类消息：用户消息 / 系统通知 / @提醒与动态
- 消息列表内联展开详情，自动标记已读
- 仅未读筛选 + 一键全部已读
- 顶部导航红点角标（未读数实时显示）

### 👥 用户榜单 `/community/members`
- 按积分 / 案例数 / 知识库数多维排行
- 身份标签：行业大 V / 优秀贡献者 / 认证专家 / 创作者
- 用户主页 `/community/members/[userId]`：详细资料与最近贡献

### 🌐 行业圈子 `/community/industry/[industry]`
- 圈子主理人卡片（联系方式 + 简介）
- 布道师网格（活跃分享者）
- **行业案例**：直接内嵌展示圈内案例卡片（最多 3 条 + 查看全部）
- **行业知识库**：直接内嵌展示圈内知识库（最多 3 条 + 查看全部）
- 热议话题标签、社群入口（微信 / QQ）

### 🗓️ 社区活动 `/community/events`
- 线上线下活动报名，含进度条与剩余名额可视化
- 活动类型：直播 / 工作坊 / 线下沙龙 / 挑战赛 / 马拉松
- 官方 / 第三方活动分类，状态筛选（即将开始 / 进行中 / 已结束）

### 🏆 荣誉室 `/community/honors`
- 动物园主题展示区，5 大展区（权威堂 / 媒体坊 / 用户园 / 技术据点 / 社区之墙）
- 奖项悬浮展示详情，等级色阶区分

### 🦝 浣熊园 `/community/raccoon`
- 每位用户拥有一只专属小浣熊，等级与积分联动
- **6 个进化阶段**：浣熊幼崽 → 探索小浣熊 → 知识浣熊 → 专家浣熊 → 大师浣熊 → 传说浣熊
- **AI 形象生成**：一键为浣熊生成专属形象图片
- **4 种场景切换**：🌲 竹林小院 / 🌅 落日草原 / 🌙 星夜营地 / 🌸 樱花庭院
- 浣熊自由漫步动画（随机移动，8s 平滑过渡）
- 点击任意浣熊查看档案，链接到用户主页

### 📖 使用指南 `/community/guide`
- 4 Tab：模块指南 / 积分体系 / 身份认证 / 徽章系统
- 积分获取规则与等级权益详解

### 📝 产品反馈 `/community/feedback`
- 在线提交（功能建议 / Bug 反馈 / 体验优化）
- 状态看板：待处理 / 已受理 / 规划中 / 已上线
- 投票热度可视化、可展开回复线程

### ⚙️ 个人中心 `/community/profile`
- 7 Tab：概览 / 我的案例 / 积分明细 / 我的反馈 / 我的评论 / 我的收藏 / 徽章墙
- 「我的小浣熊」卡片（进化进度 + 积分）
- 资料编辑（基本信息 + 社交账号可见性控制）
- 每日签到 +5 积分

---

## 🎮 积分与成长体系

| 等级 | 浣熊形态 | 积分区间 | 特殊能力 |
|------|---------|---------|---------|
| Lv.1 | 浣熊幼崽 | 0–499 | 好奇心·超强 |
| Lv.2 | 探索小浣熊 | 500–1,999 | 探索力·旺盛 |
| Lv.3 | 知识浣熊 | 2,000–4,999 | 学习力·满格 |
| Lv.4 | 专家浣熊 | 5,000–9,999 | 专业力·精通 |
| Lv.5 | 大师浣熊 | 10,000–19,999 | 影响力·强劲 |
| Lv.6 | 传说浣熊 | 20,000+ | 传奇力·无极 |

**积分来源：** 发布案例 +150、被官方推荐 +200、案例被复用 +30、发布知识库 +100、发布博客 +100、参与讨论 +10、每日签到 +5、反馈被采纳 +80…

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
- **样式**：Tailwind CSS
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
│   │       ├── layout.tsx            # 顶部导航（主标签 + 更多下拉 + 消息角标 + 头像菜单）
│   │       ├── page.tsx              # 社区首页
│   │       ├── cases/                # 案例广场（列表 / 详情 / 发布）
│   │       │   └── data.ts           # 案例数据（供行业圈子页复用）
│   │       ├── knowledge/            # 知识库（列表 / 详情）
│   │       │   └── data.ts           # 知识库数据（供行业圈子页复用）
│   │       ├── blog/                 # 社区博客
│   │       │   ├── data.ts           # 文章类型、分类、Mock 数据
│   │       │   ├── page.tsx          # 博客列表页
│   │       │   ├── [id]/page.tsx     # 文章详情页
│   │       │   └── write/page.tsx    # Block 编辑器（4 步发布）
│   │       ├── discuss/              # 讨论区
│   │       ├── messages/             # 站内信
│   │       │   ├── data.ts           # 消息类型 + Mock 数据（含未读数导出）
│   │       │   └── page.tsx          # 收件箱页面
│   │       ├── members/              # 用户榜单
│   │       │   ├── data.ts           # 用户数据、身份标签、行业圈子定义
│   │       │   └── [userId]/         # 用户主页
│   │       ├── industry/[industry]/  # 行业圈子（含内嵌案例 + 知识库）
│   │       ├── raccoon/              # 🦝 浣熊园
│   │       │   ├── data.ts           # 等级系统、浣熊数据、场景配置
│   │       │   └── page.tsx          # 浣熊园（漫步动画 + AI 形象生成）
│   │       ├── profile/              # 个人中心（7 Tab）
│   │       ├── events/               # 社区活动
│   │       ├── honors/               # 荣誉室（动物园主题）
│   │       ├── feedback/             # 产品反馈
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

**v0.5.0 - 2026-02-18**
- ✅ 社区博客：文章列表 + 详情（Block 渲染器）+ Block 编辑器（4 步发布）
- ✅ 站内信系统：三类消息、内联详情展开、未读角标、一键全部已读
- ✅ 行业圈子重构：内嵌展示行业案例与知识库（含空状态与「查看全部」链接）
- ✅ 数据层解耦：`cases/data.ts` 和 `knowledge/data.ts` 独立导出供跨页面复用
- ✅ 修复个人中心 404（`/profile` → `/community/profile`）

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
- ✅ 前端 UI 组件系统
- ✅ 数据库 Schema 设计
- ✅ 环境变量验证与代码规范配置

---

**由小浣熊团队用 ❤️ 打造**
