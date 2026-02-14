export default function DashboardPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">我的知识库</h1>
        <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition">
          + 新建知识库
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* 知识库卡片占位 */}
        <div className="border rounded-lg p-6 hover:shadow-lg transition">
          <div className="flex items-center gap-3 mb-3">
            <div className="text-3xl">📚</div>
            <h3 className="font-bold text-lg">示例知识库</h3>
          </div>
          <p className="text-sm text-gray-600 mb-4">
            这是一个示例知识库，展示知识库的基本信息
          </p>
          <div className="flex justify-between text-xs text-gray-500">
            <span>5 篇文档</span>
            <span>更新于 2 小时前</span>
          </div>
        </div>
      </div>
    </div>
  )
}
