# 🚀 推送到 GitHub 指南

## ✅ 本地提交已完成

已成功创建初始提交：
- 📦 49 个文件
- 📝 9,726 行代码
- ✨ 完整的 MVP 基础架构

---

## 方法 1：使用 GitHub 网页创建仓库（推荐）

### 步骤 1：在 GitHub 上创建新仓库

1. 访问：https://github.com/new
2. 填写仓库信息：
   - Repository name: `raccoon-kb-mvp`
   - Description: `🦝 商汤小浣熊知识库社区平台 MVP - Next.js + Fastify + PostgreSQL`
   - 选择 **Public** 或 **Private**
   - ⚠️ **不要**勾选 "Add a README file"
   - ⚠️ **不要**勾选 "Add .gitignore"
   - ⚠️ **不要**勾选 "Choose a license"
3. 点击 **Create repository**

### 步骤 2：推送代码到 GitHub

复制 GitHub 显示的命令，或在项目目录执行：

```bash
cd /Users/asui/raccoon-kb-mvp

# 添加远程仓库（替换 YOUR_USERNAME 为你的 GitHub 用户名）
git remote add origin https://github.com/YOUR_USERNAME/raccoon-kb-mvp.git

# 推送代码
git branch -M main
git push -u origin main
```

---

## 方法 2：使用 GitHub CLI（需要安装）

### 安装 GitHub CLI

```bash
brew install gh
```

### 登录并创建仓库

```bash
# 登录 GitHub
gh auth login

# 创建并推送仓库
gh repo create raccoon-kb-mvp --public --source=. --remote=origin --push
```

---

## 验证推送成功

推送完成后，访问你的 GitHub 仓库查看代码：

```
https://github.com/YOUR_USERNAME/raccoon-kb-mvp
```

---

## 后续协作

### 克隆项目到其他电脑

```bash
git clone https://github.com/YOUR_USERNAME/raccoon-kb-mvp.git
cd raccoon-kb-mvp
pnpm install
pnpm dev
```

### 提交新代码

```bash
git add .
git commit -m "描述你的修改"
git push
```

---

## 项目概览

**🦝 小浣熊知识库社区平台 MVP**

一个现代化的知识库/文档协作平台，类似语雀、Notion。

**技术栈：**
- Frontend: Next.js 14, React 19, Tailwind CSS
- Backend: Fastify, TypeScript
- Database: PostgreSQL, Drizzle ORM, Redis
- Editor: TipTap v2
- Monorepo: Turborepo, pnpm

**MVP 功能：**
- ✅ 用户认证系统
- ✅ 知识库管理
- ✅ 文档CRUD
- ✅ 富文本编辑
- ✅ 评论互动
- ✅ 全文搜索

**开发周期：** 4-6 周

---

## 需要帮助？

查看完整文档：
- [快速开始](GETTING_STARTED.md)
- [README](README.md)
- [Docker 安装](DOCKER_INSTALL.md)
