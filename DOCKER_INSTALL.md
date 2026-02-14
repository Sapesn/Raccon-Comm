# Docker 安装指南 - macOS

## 方案 1：使用 Homebrew 安装（推荐）

### 步骤 1：安装 Homebrew

在终端中执行以下命令：

```bash
/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"
```

按照提示输入密码并等待安装完成（约 5-10 分钟）。

安装完成后，根据提示添加 Homebrew 到 PATH：

```bash
# 对于 Apple Silicon (M1/M2/M3)
echo 'eval "$(/opt/homebrew/bin/brew shellenv)"' >> ~/.zshrc
eval "$(/opt/homebrew/bin/brew shellenv)"

# 对于 Intel Mac
echo 'eval "$(/usr/local/bin/brew shellenv)"' >> ~/.zshrc
eval "$(/usr/local/bin/brew shellenv)"
```

### 步骤 2：使用 Homebrew 安装 Docker Desktop

```bash
brew install --cask docker
```

### 步骤 3：启动 Docker Desktop

```bash
open /Applications/Docker.app
```

第一次启动会要求授权，点击允许即可。

---

## 方案 2：直接下载安装包

### 步骤 1：下载 Docker Desktop

根据你的芯片类型选择：

**Apple Silicon (M1/M2/M3):**
- 下载链接：https://desktop.docker.com/mac/main/arm64/Docker.dmg

**Intel Mac:**
- 下载链接：https://desktop.docker.com/mac/main/amd64/Docker.dmg

### 步骤 2：安装

1. 双击下载的 `.dmg` 文件
2. 将 Docker 图标拖到 Applications 文件夹
3. 从 Applications 文件夹打开 Docker

### 步骤 3：完成设置

Docker Desktop 启动后：
1. 接受许可协议
2. 等待 Docker Engine 启动（状态栏图标会显示为绿色）

---

## 验证安装

安装完成后，在终端中执行：

```bash
docker --version
docker compose version
```

应该看到类似输出：
```
Docker version 24.0.x, build xxxxx
Docker Compose version v2.x.x
```

---

## 启动小浣熊项目的数据库

Docker 安装完成后，在项目目录执行：

```bash
cd /Users/asui/raccoon-kb-mvp

# 启动 PostgreSQL 和 Redis
docker compose up -d

# 查看容器状态
docker compose ps

# 推送数据库 Schema
npx pnpm db:push
```

---

## 常见问题

### Docker Desktop 无法启动
- 确保 macOS 版本在 11.0 以上
- 检查是否有足够的磁盘空间（至少 4GB）
- 尝试重启电脑

### 权限错误
如果出现权限错误，执行：
```bash
sudo chown -R $(whoami) ~/.docker
```

### 端口冲突
如果 5432 或 6379 端口已被占用：
```bash
# 查看占用端口的进程
lsof -i :5432
lsof -i :6379

# 停止占用进程（替换 <PID> 为实际进程 ID）
kill <PID>
```

---

## 下一步

数据库启动后，项目将具有完整功能：
- ✅ 用户注册/登录
- ✅ 知识库创建
- ✅ 文档管理
- ✅ 评论互动

继续开发请参考：[GETTING_STARTED.md](GETTING_STARTED.md)
