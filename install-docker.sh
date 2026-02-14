#!/bin/bash

echo "🦝 小浣熊知识库 - Docker 自动安装脚本"
echo "=========================================="
echo ""

# 检查是否已下载 Docker.dmg
if [ -f ~/Downloads/Docker.dmg ]; then
    echo "✓ 找到 Docker.dmg 安装包"
else
    echo "❌ 未找到 Docker.dmg，请先下载"
    echo "下载地址：https://desktop.docker.com/mac/main/arm64/Docker.dmg"
    exit 1
fi

echo ""
echo "步骤 1/4: 挂载 DMG 文件..."
hdiutil attach ~/Downloads/Docker.dmg -quiet

echo "步骤 2/4: 复制 Docker 到应用程序文件夹..."
cp -R "/Volumes/Docker/Docker.app" /Applications/

echo "步骤 3/4: 卸载 DMG..."
hdiutil detach "/Volumes/Docker" -quiet

echo "步骤 4/4: 启动 Docker Desktop..."
open /Applications/Docker.app

echo ""
echo "✅ Docker Desktop 已启动！"
echo ""
echo "请等待 Docker Desktop 完全启动（菜单栏图标变绿），然后执行："
echo ""
echo "  cd /Users/asui/raccoon-kb-mvp"
echo "  docker compose up -d"
echo "  npx pnpm db:push"
echo ""
