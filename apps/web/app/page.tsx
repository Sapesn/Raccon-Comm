import Link from 'next/link'

export default function HomePage() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-8">
      <main className="flex flex-col gap-8 items-center max-w-2xl">
        <h1 className="text-5xl font-bold text-center">
          🦝 小浣熊知识库
        </h1>
        <p className="text-xl text-center text-gray-600">
          商汤科技小浣熊家族的知识库社区平台 MVP
        </p>

        <div className="flex gap-4 mt-8">
          <Link
            href="/login"
            className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
          >
            登录
          </Link>
          <Link
            href="/register"
            className="px-6 py-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition"
          >
            注册
          </Link>
        </div>

        <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6 w-full">
          <div className="p-6 border rounded-lg">
            <h3 className="font-bold mb-2">📝 富文本编辑</h3>
            <p className="text-sm text-gray-600">
              基于 TipTap 的强大富文本编辑器，支持 Markdown
            </p>
          </div>
          <div className="p-6 border rounded-lg">
            <h3 className="font-bold mb-2">👥 团队协作</h3>
            <p className="text-sm text-gray-600">
              知识库权限管理，支持多人协作编辑
            </p>
          </div>
          <div className="p-6 border rounded-lg">
            <h3 className="font-bold mb-2">🔍 全文搜索</h3>
            <p className="text-sm text-gray-600">
              快速搜索文档内容，智能高亮显示
            </p>
          </div>
        </div>

        <footer className="mt-12 text-sm text-gray-500">
          技术栈: Next.js 14 + Fastify + PostgreSQL + Drizzle ORM
        </footer>
      </main>
    </div>
  )
}
