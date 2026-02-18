export default function MainLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="min-h-screen">
      <header className="border-b bg-white sticky top-0 z-10">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <h1 className="text-xl font-bold">🦝 小浣熊知识库</h1>
          </div>
          <nav className="flex items-center gap-4">
            <a href="/dashboard" className="text-gray-600 hover:text-gray-900">
              我的知识库
            </a>
            <a href="/community" className="text-blue-600 font-semibold hover:text-blue-700">
              社区
            </a>
            <a href="/community/profile" className="text-gray-600 hover:text-gray-900">
              个人中心
            </a>
          </nav>
        </div>
      </header>
      <main>{children}</main>
    </div>
  )
}
