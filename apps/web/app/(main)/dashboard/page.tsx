'use client'

import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'

export default function DashboardPage() {
  // 示例知识库数据
  const knowledgeBases = [
    {
      id: '1',
      icon: '📚',
      name: '技术文档',
      description: '团队技术文档和最佳实践总结',
      documentCount: 24,
      visibility: '私有',
      updatedAt: '2 小时前',
    },
    {
      id: '2',
      icon: '💼',
      name: '产品设计',
      description: '产品需求文档和设计规范',
      documentCount: 18,
      visibility: '团队',
      updatedAt: '5 小时前',
    },
    {
      id: '3',
      icon: '📝',
      name: '会议记录',
      description: '日常会议记录和决策文档',
      documentCount: 42,
      visibility: '公开',
      updatedAt: '1 天前',
    },
  ]

  return (
    <div className="min-h-screen bg-muted/30">
      {/* Header */}
      <div className="border-b bg-background">
        <div className="container mx-auto flex items-center justify-between px-4 py-6">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">我的知识库</h1>
            <p className="mt-1 text-sm text-muted-foreground">
              管理和组织您的知识文档
            </p>
          </div>
          <Button size="lg" className="gap-2">
            <span className="text-lg">+</span>
            新建知识库
          </Button>
        </div>
      </div>

      {/* Content */}
      <div className="container mx-auto px-4 py-8">
        {/* Search and Filter */}
        <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex-1 sm:max-w-md">
            <Input
              type="search"
              placeholder="搜索知识库..."
              className="h-10"
            />
          </div>
          <div className="flex gap-2">
            <Button variant="outline" size="sm">
              全部
            </Button>
            <Button variant="ghost" size="sm">
              我创建的
            </Button>
            <Button variant="ghost" size="sm">
              共享的
            </Button>
          </div>
        </div>

        {/* Knowledge Base Grid */}
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {knowledgeBases.map((kb) => (
            <Card
              key={kb.id}
              className="group cursor-pointer transition-all hover:shadow-lg hover:-translate-y-1"
            >
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    <div className="text-4xl">{kb.icon}</div>
                    <div>
                      <CardTitle className="text-xl group-hover:text-primary transition-colors">
                        {kb.name}
                      </CardTitle>
                      <div className="mt-1 inline-flex items-center rounded-full bg-muted px-2 py-0.5 text-xs font-medium">
                        {kb.visibility}
                      </div>
                    </div>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <CardDescription className="line-clamp-2">
                  {kb.description}
                </CardDescription>
              </CardContent>
              <CardFooter className="flex items-center justify-between text-xs text-muted-foreground">
                <span className="flex items-center gap-1">
                  <span className="font-medium">{kb.documentCount}</span> 篇文档
                </span>
                <span>更新于 {kb.updatedAt}</span>
              </CardFooter>
            </Card>
          ))}

          {/* Empty State / Create New Card */}
          <Card className="flex cursor-pointer flex-col items-center justify-center border-dashed transition-all hover:border-primary hover:bg-muted/50 min-h-[240px]">
            <CardContent className="flex flex-col items-center gap-2 py-8 text-center">
              <div className="rounded-full bg-primary/10 p-4">
                <span className="text-3xl">➕</span>
              </div>
              <div className="space-y-1">
                <p className="font-semibold">创建新知识库</p>
                <p className="text-sm text-muted-foreground">
                  开始构建您的知识体系
                </p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Quick Stats */}
        <div className="mt-12 grid gap-4 sm:grid-cols-3">
          <Card>
            <CardHeader className="pb-3">
              <CardDescription>总文档数</CardDescription>
              <CardTitle className="text-3xl">84</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-xs text-muted-foreground">
                <span className="text-green-600">↑ 12%</span> 较上月
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-3">
              <CardDescription>本周新增</CardDescription>
              <CardTitle className="text-3xl">12</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-xs text-muted-foreground">
                平均每天 1.7 篇
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-3">
              <CardDescription>团队成员</CardDescription>
              <CardTitle className="text-3xl">8</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-xs text-muted-foreground">
                活跃协作者
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
