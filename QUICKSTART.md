# 🚀 快速开始指南

## 前置要求

- Node.js >= 20.0.0
- pnpm >= 9.0.0
- Docker & Docker Compose (用于 PostgreSQL 和 Redis)
- Git

## 1️⃣ 克隆项目

```bash
git clone <repository-url>
cd Raccon-Comm
```

## 2️⃣ 安装依赖

```bash
pnpm install
```

## 3️⃣ 配置环境变量

```bash
# 复制环境变量模板
cp .env.example .env

# 生成安全的密钥 (需要至少 32 字符)
openssl rand -base64 48

# 编辑 .env 文件，填入生成的密钥
```

**.env 文件必填项**:
```env
# 数据库
DATABASE_URL="postgresql://postgres:password@localhost:5432/raccoon_kb"

# 安全密钥 (使用上面生成的密钥替换)
JWT_SECRET="your-generated-secret-here"
API_SECRET="your-generated-secret-here"
NEXTAUTH_SECRET="your-generated-secret-here"
```

## 4️⃣ 启动数据库

```bash
# 使用 Docker Compose 启动 PostgreSQL 和 Redis
docker-compose up -d

# 查看服务状态
docker-compose ps
```

## 5️⃣ 初始化数据库

```bash
# 推送数据库 schema
pnpm db:push

# 或使用迁移
pnpm db:migrate
```

## 6️⃣ 启动开发服务器

```bash
# 启动所有服务 (Web + API)
pnpm dev
```

或分别启动:

```bash
# 终端 1: 启动 Web (Next.js)
cd apps/web
pnpm dev

# 终端 2: 启动 API (Fastify)
cd apps/api
pnpm dev
```

## 7️⃣ 访问应用

- 🌐 前端: http://localhost:3000
- 🔌 API: http://localhost:3001
- 🗄️ 数据库管理: 运行 `pnpm db:studio`

## 📁 项目结构

```
Raccon-Comm/
├── apps/
│   ├── api/          # Fastify 后端
│   └── web/          # Next.js 前端
├── packages/
│   ├── db/           # 数据库 schema (Drizzle ORM)
│   └── shared/       # 共享代码 (类型、工具函数等)
├── docker-compose.yml
├── .env.example
└── package.json
```

## 🛠️ 常用命令

### 开发
```bash
pnpm dev           # 启动所有服务
pnpm build         # 构建所有应用
pnpm lint          # 检查代码规范
pnpm lint:fix      # 自动修复代码问题
pnpm format        # 格式化代码
```

### 数据库
```bash
pnpm db:push       # 推送 schema 到数据库
pnpm db:migrate    # 运行迁移
pnpm db:studio     # 打开数据库管理界面
```

### 清理
```bash
pnpm clean         # 清理构建产物和 node_modules
```

## 🎨 页面预览

项目已优化以下页面:

1. **首页** - http://localhost:3000
   - 现代化设计，带渐变背景
   - 核心功能展示
   - 数据统计

2. **登录页** - http://localhost:3000/login
   - 优雅的卡片设计
   - 表单验证

3. **注册页** - http://localhost:3000/register
   - 清晰的注册流程
   - 密码强度提示

4. **Dashboard** - http://localhost:3000/dashboard
   - 知识库管理
   - 搜索和筛选
   - 数据统计面板

## 🐛 故障排除

### 端口被占用
```bash
# 检查端口占用
lsof -ti:3000  # Web
lsof -ti:3001  # API

# 杀死进程
kill -9 <PID>
```

### 数据库连接失败
```bash
# 确保 Docker 容器正在运行
docker-compose ps

# 重启数据库
docker-compose restart postgres
```

### 依赖安装问题
```bash
# 清理缓存并重新安装
rm -rf node_modules
pnpm store prune
pnpm install
```

### 环境变量未加载
```bash
# 确保 .env 文件在项目根目录
ls -la .env

# 重启开发服务器
```

## 📖 更多文档

- 详细优化说明: [OPTIMIZATION.md](./OPTIMIZATION.md)
- API 文档: (待添加)
- 部署指南: (待添加)

## 💬 需要帮助?

如遇到问题，请:
1. 检查环境变量配置
2. 确认数据库服务正常运行
3. 查看控制台错误日志
4. 联系项目维护者

---

**Happy Coding! 🦝**
