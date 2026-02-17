import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'

export default function HomePage() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-b from-blue-50 via-white to-white dark:from-blue-950 dark:via-background dark:to-background">
        <div className="absolute inset-0 bg-grid-slate-100 [mask-image:linear-gradient(0deg,white,rgba(255,255,255,0.6))] dark:bg-grid-slate-700/25"></div>
        <div className="container relative mx-auto px-4 py-24 sm:px-6 lg:px-8">
          <div className="flex flex-col items-center gap-8 text-center">
            {/* Badge */}
            <div className="inline-flex items-center rounded-full border bg-background px-4 py-1.5 text-sm shadow-sm animate-fade-in">
              <span className="mr-2 text-2xl">🦝</span>
              <span className="text-muted-foreground">商汤小浣熊知识库社区</span>
            </div>

            {/* Headline */}
            <div className="max-w-3xl animate-slide-up">
              <h1 className="text-4xl font-bold tracking-tight sm:text-6xl lg:text-7xl">
                <span className="bg-gradient-to-r from-blue-600 to-violet-600 bg-clip-text text-transparent">
                  小浣熊知识库
                </span>
              </h1>
              <p className="mt-6 text-lg leading-8 text-muted-foreground sm:text-xl">
                基于 AI 驱动的下一代知识管理平台
                <br />
                让团队协作更高效，知识沉淀更简单
              </p>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-wrap items-center justify-center gap-4 animate-slide-up">
              <Button asChild size="lg" className="h-12 px-8 text-base">
                <Link href="/register">立即开始</Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="h-12 px-8 text-base">
                <Link href="/login">登录账户</Link>
              </Button>
            </div>

            {/* Stats */}
            <div className="mt-12 grid grid-cols-3 gap-8 animate-fade-in">
              <div className="flex flex-col">
                <div className="text-3xl font-bold">1000+</div>
                <div className="text-sm text-muted-foreground">活跃用户</div>
              </div>
              <div className="flex flex-col">
                <div className="text-3xl font-bold">5000+</div>
                <div className="text-sm text-muted-foreground">知识文档</div>
              </div>
              <div className="flex flex-col">
                <div className="text-3xl font-bold">99.9%</div>
                <div className="text-sm text-muted-foreground">服务可用性</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-16 text-center">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">核心功能</h2>
            <p className="mt-4 text-lg text-muted-foreground">
              强大的功能组合，打造卓越的知识管理体验
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            <Card className="transition-all hover:shadow-lg hover:-translate-y-1">
              <CardHeader>
                <div className="mb-2 text-4xl">✨</div>
                <CardTitle>AI 智能助手</CardTitle>
                <CardDescription>基于商汤小浣熊大模型，智能问答和内容生成</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li className="flex items-center gap-2">
                    <span className="text-primary">✓</span>
                    智能问答和知识检索
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-primary">✓</span>
                    自动文档摘要生成
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-primary">✓</span>
                    内容优化建议
                  </li>
                </ul>
              </CardContent>
            </Card>

            <Card className="transition-all hover:shadow-lg hover:-translate-y-1">
              <CardHeader>
                <div className="mb-2 text-4xl">📝</div>
                <CardTitle>富文本编辑</CardTitle>
                <CardDescription>基于 TipTap 的强大编辑器，支持 Markdown</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li className="flex items-center gap-2">
                    <span className="text-primary">✓</span>
                    所见即所得编辑
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-primary">✓</span>
                    Markdown 快捷输入
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-primary">✓</span>
                    代码高亮和表格支持
                  </li>
                </ul>
              </CardContent>
            </Card>

            <Card className="transition-all hover:shadow-lg hover:-translate-y-1">
              <CardHeader>
                <div className="mb-2 text-4xl">👥</div>
                <CardTitle>团队协作</CardTitle>
                <CardDescription>完善的权限管理，支持多人协作编辑</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li className="flex items-center gap-2">
                    <span className="text-primary">✓</span>
                    细粒度权限控制
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-primary">✓</span>
                    实时协同编辑
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-primary">✓</span>
                    评论和讨论功能
                  </li>
                </ul>
              </CardContent>
            </Card>

            <Card className="transition-all hover:shadow-lg hover:-translate-y-1">
              <CardHeader>
                <div className="mb-2 text-4xl">🔍</div>
                <CardTitle>全文搜索</CardTitle>
                <CardDescription>快速搜索文档内容，智能高亮显示</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li className="flex items-center gap-2">
                    <span className="text-primary">✓</span>
                    毫秒级全文检索
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-primary">✓</span>
                    智能关键词高亮
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-primary">✓</span>
                    多维度筛选排序
                  </li>
                </ul>
              </CardContent>
            </Card>

            <Card className="transition-all hover:shadow-lg hover:-translate-y-1">
              <CardHeader>
                <div className="mb-2 text-4xl">📊</div>
                <CardTitle>数据分析</CardTitle>
                <CardDescription>深入洞察知识库使用情况和团队协作效率</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li className="flex items-center gap-2">
                    <span className="text-primary">✓</span>
                    内容访问统计
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-primary">✓</span>
                    团队活跃度分析
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-primary">✓</span>
                    知识图谱可视化
                  </li>
                </ul>
              </CardContent>
            </Card>

            <Card className="transition-all hover:shadow-lg hover:-translate-y-1">
              <CardHeader>
                <div className="mb-2 text-4xl">🔒</div>
                <CardTitle>安全可靠</CardTitle>
                <CardDescription>企业级安全保障，数据加密存储</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li className="flex items-center gap-2">
                    <span className="text-primary">✓</span>
                    数据加密传输和存储
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-primary">✓</span>
                    定期数据备份
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-primary">✓</span>
                    操作日志审计
                  </li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Tech Stack Section */}
      <section className="border-t bg-muted/50 py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h3 className="mb-8 text-sm font-semibold uppercase tracking-wider text-muted-foreground">
              技术栈
            </h3>
            <div className="flex flex-wrap items-center justify-center gap-8 text-sm font-medium text-muted-foreground">
              <div className="flex items-center gap-2">
                <span className="font-mono">Next.js 15</span>
              </div>
              <div className="h-4 w-px bg-border"></div>
              <div className="flex items-center gap-2">
                <span className="font-mono">Fastify</span>
              </div>
              <div className="h-4 w-px bg-border"></div>
              <div className="flex items-center gap-2">
                <span className="font-mono">PostgreSQL</span>
              </div>
              <div className="h-4 w-px bg-border"></div>
              <div className="flex items-center gap-2">
                <span className="font-mono">Drizzle ORM</span>
              </div>
              <div className="h-4 w-px bg-border"></div>
              <div className="flex items-center gap-2">
                <span className="font-mono">TypeScript</span>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
