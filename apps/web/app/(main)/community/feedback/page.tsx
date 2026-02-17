'use client'

import { useState } from 'react'

const STATUS_MAP = {
  pending: { label: '待处理', color: 'bg-gray-100 text-gray-600', icon: '⏳' },
  accepted: { label: '已受理', color: 'bg-blue-100 text-blue-600', icon: '✅' },
  planned: { label: '规划中', color: 'bg-purple-100 text-purple-600', icon: '📋' },
  shipped: { label: '已上线', color: 'bg-green-100 text-green-600', icon: '🚀' },
  rejected: { label: '已拒绝', color: 'bg-red-100 text-red-600', icon: '❌' },
}

type FeedbackStatus = keyof typeof STATUS_MAP

const FEEDBACK_LIST = [
  {
    id: '1',
    title: '希望支持批量上传文件功能',
    description: '目前每次只能上传一个文件比较麻烦，希望能支持一次选择多个文件进行批量上传。',
    author: '产品经理',
    avatar: 'P',
    category: '功能建议',
    status: 'planned' as FeedbackStatus,
    votes: 47,
    createdAt: '2天前',
    updatedAt: '1天前',
    replies: 8,
  },
  {
    id: '2',
    title: '链路执行过程中断后无法恢复',
    description: '在执行长链路时，如果中途网络断开或者浏览器崩溃，整个链路需要重新开始执行，希望能支持断点续传。',
    author: '开发者',
    avatar: 'D',
    category: 'Bug 反馈',
    status: 'accepted' as FeedbackStatus,
    votes: 62,
    createdAt: '3天前',
    updatedAt: '2天前',
    replies: 12,
  },
  {
    id: '3',
    title: '增加链路模板市场功能',
    description: '建议增加一个官方的链路模板市场，用户可以直接使用官方或社区提供的模板，降低使用门槛。',
    author: '新用户',
    avatar: 'N',
    category: '功能建议',
    status: 'shipped' as FeedbackStatus,
    votes: 89,
    createdAt: '1周前',
    updatedAt: '3天前',
    replies: 24,
  },
  {
    id: '4',
    title: '导出的 PDF 格式显示异常',
    description: '在 Mac 系统上导出的 PDF 文件，使用预览程序打开时中文字体显示异常，部分字符变成了方框。',
    author: 'Mac 用户',
    avatar: 'M',
    category: 'Bug 反馈',
    status: 'pending' as FeedbackStatus,
    votes: 18,
    createdAt: '5天前',
    updatedAt: '5天前',
    replies: 3,
  },
  {
    id: '5',
    title: '支持移动端 App',
    description: '希望能推出 iOS 和 Android 版本的移动应用，方便在移动设备上查看和使用小浣熊。',
    author: '移动用户',
    avatar: 'M',
    category: '功能建议',
    status: 'planned' as FeedbackStatus,
    votes: 134,
    createdAt: '1周前',
    updatedAt: '4天前',
    replies: 31,
  },
  {
    id: '6',
    title: '增加深色模式',
    description: '长时间使用浅色主题眼睛容易疲劳，希望能增加深色模式选项。',
    author: '夜猫子',
    avatar: 'Y',
    category: '体验优化',
    status: 'accepted' as FeedbackStatus,
    votes: 72,
    createdAt: '1周前',
    updatedAt: '5天前',
    replies: 15,
  },
  {
    id: '7',
    title: '代码块不支持语法高亮',
    description: '在查看包含代码的文档时，代码块没有语法高亮，阅读体验较差。',
    author: '程序员',
    avatar: 'C',
    category: '体验优化',
    status: 'shipped' as FeedbackStatus,
    votes: 41,
    createdAt: '2周前',
    updatedAt: '1周前',
    replies: 6,
  },
]

const CATEGORIES = ['全部', '功能建议', 'Bug 反馈', '体验优化']
const STATUS_FILTERS: (FeedbackStatus | 'all')[] = ['all', 'pending', 'accepted', 'planned', 'shipped', 'rejected']

export default function FeedbackPage() {
  const [category, setCategory] = useState('全部')
  const [statusFilter, setStatusFilter] = useState<FeedbackStatus | 'all'>('all')
  const [votedItems, setVotedItems] = useState<Set<string>>(new Set())
  const [showForm, setShowForm] = useState(false)

  const filtered = FEEDBACK_LIST.filter((f) => {
    const matchCategory = category === '全部' || f.category === category
    const matchStatus = statusFilter === 'all' || f.status === statusFilter
    return matchCategory && matchStatus
  }).sort((a, b) => b.votes - a.votes)

  const handleVote = (id: string) => {
    setVotedItems((prev) => {
      const next = new Set(prev)
      if (next.has(id)) {
        next.delete(id)
      } else {
        next.add(id)
      }
      return next
    })
  }

  return (
    <div className="container mx-auto px-4 py-6 max-w-6xl">
      <div className="flex flex-col lg:flex-row gap-6">
        {/* Main Content */}
        <div className="flex-1">
          {/* Header */}
          <div className="bg-white rounded-xl p-5 shadow-sm border mb-5">
            <div className="flex flex-wrap items-center gap-3 justify-between mb-4">
              <div>
                <h2 className="text-xl font-bold text-gray-900">产品反馈</h2>
                <p className="text-sm text-gray-500 mt-1">帮助我们改进小浣熊，您的每一条反馈都很重要</p>
              </div>
              <button
                onClick={() => setShowForm(!showForm)}
                className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors font-medium"
              >
                {showForm ? '取消提交' : '+ 提交反馈'}
              </button>
            </div>

            {/* Feedback Form */}
            {showForm && (
              <div className="border-t pt-4 space-y-3">
                <div>
                  <label className="text-sm font-medium text-gray-700 block mb-1">反馈类型</label>
                  <select className="w-full border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-300">
                    <option>功能建议</option>
                    <option>Bug 反馈</option>
                    <option>体验优化</option>
                  </select>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-700 block mb-1">标题</label>
                  <input
                    type="text"
                    placeholder="用一句话描述您的反馈..."
                    className="w-full border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-300"
                  />
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-700 block mb-1">详细描述</label>
                  <textarea
                    rows={4}
                    placeholder="请详细描述您遇到的问题或建议..."
                    className="w-full border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-300 resize-none"
                  />
                </div>
                <div className="flex gap-2">
                  <button className="flex-1 bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition-colors font-medium">
                    提交反馈
                  </button>
                  <button
                    onClick={() => setShowForm(false)}
                    className="flex-1 border text-gray-600 py-2 rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    取消
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Filters */}
          <div className="bg-white rounded-xl p-4 shadow-sm border mb-4">
            <div className="flex flex-wrap items-center gap-2 mb-3">
              <span className="text-sm font-medium text-gray-700">分类:</span>
              <div className="flex gap-2">
                {CATEGORIES.map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setCategory(cat)}
                    className={`px-3 py-1 rounded-full text-sm font-medium transition-colors ${category === cat ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-sm font-medium text-gray-700">状态:</span>
              <div className="flex flex-wrap gap-2">
                <button
                  onClick={() => setStatusFilter('all')}
                  className={`px-3 py-1 rounded-full text-sm font-medium transition-colors ${statusFilter === 'all' ? 'bg-gray-900 text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}
                >
                  全部
                </button>
                {STATUS_FILTERS.filter((s) => s !== 'all').map((st) => {
                  const status = STATUS_MAP[st as FeedbackStatus]
                  return (
                    <button
                      key={st}
                      onClick={() => setStatusFilter(st as FeedbackStatus)}
                      className={`px-3 py-1 rounded-full text-sm font-medium transition-colors ${statusFilter === st ? status.color : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}
                    >
                      {status.icon} {status.label}
                    </button>
                  )
                })}
              </div>
            </div>
          </div>

          {/* Stats */}
          <div className="text-sm text-gray-500 mb-3">
            共 <strong className="text-gray-900">{filtered.length}</strong> 条反馈
          </div>

          {/* Feedback List */}
          <div className="space-y-3">
            {filtered.map((feedback) => {
              const status = STATUS_MAP[feedback.status]
              const isVoted = votedItems.has(feedback.id)
              const totalVotes = feedback.votes + (isVoted ? 1 : 0)
              const maxVotes = Math.max(...FEEDBACK_LIST.map((f) => f.votes)) + 1
              const heatPct = Math.round((totalVotes / maxVotes) * 100)
              const isHot = totalVotes >= 80
              const isWarm = totalVotes >= 40 && totalVotes < 80

              const heatBarColor = isHot
                ? 'from-orange-400 to-red-500'
                : isWarm
                  ? 'from-amber-300 to-orange-400'
                  : totalVotes >= 20
                    ? 'from-blue-300 to-blue-500'
                    : 'from-gray-200 to-gray-300'

              const borderAccent = isHot
                ? 'border-l-4 border-l-orange-400'
                : isWarm
                  ? 'border-l-4 border-l-amber-400'
                  : ''

              return (
                <div
                  key={feedback.id}
                  className={`bg-white rounded-xl shadow-sm border overflow-hidden hover:shadow-md transition-shadow ${borderAccent}`}
                >
                  {/* Heat bar at top */}
                  <div className="h-1 bg-gray-100">
                    <div
                      className={`h-full bg-gradient-to-r ${heatBarColor} transition-all duration-500`}
                      style={{ width: `${heatPct}%` }}
                    />
                  </div>

                  <div className="p-5">
                    <div className="flex gap-4">
                      {/* Vote Button */}
                      <div className="flex flex-col items-center gap-1 flex-shrink-0">
                        <button
                          onClick={() => handleVote(feedback.id)}
                          className={`w-12 h-12 rounded-xl flex flex-col items-center justify-center transition-all ${isVoted ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}
                        >
                          <span className="text-lg">▲</span>
                        </button>
                        <span className={`text-sm font-bold ${isVoted ? 'text-blue-600' : 'text-gray-600'}`}>
                          {totalVotes}
                        </span>
                      </div>

                      {/* Content */}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between gap-3 mb-2">
                          <div className="flex items-center gap-2 flex-wrap">
                            <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${status.color}`}>
                              {status.icon} {status.label}
                            </span>
                            <span className="text-xs bg-gray-100 text-gray-600 px-2 py-0.5 rounded-full">
                              {feedback.category}
                            </span>
                            {isHot && (
                              <span className="text-xs bg-orange-50 text-orange-600 border border-orange-200 px-2 py-0.5 rounded-full font-medium animate-pulse">
                                🔥 热门
                              </span>
                            )}
                            <span className="text-xs text-gray-400">{feedback.createdAt}</span>
                          </div>
                        </div>

                        <h3 className={`font-semibold mb-2 cursor-pointer hover:text-blue-600 transition-colors ${isHot ? 'text-lg text-gray-900' : 'text-base text-gray-900'}`}>
                          {feedback.title}
                        </h3>

                        <p className="text-sm text-gray-600 mb-3 line-clamp-2">{feedback.description}</p>

                        {/* Vote heat bar (inline) */}
                        <div className="mb-3">
                          <div className="flex items-center gap-2">
                            <div className="flex-1 h-1.5 bg-gray-100 rounded-full overflow-hidden">
                              <div
                                className={`h-full bg-gradient-to-r ${heatBarColor} rounded-full transition-all duration-500`}
                                style={{ width: `${heatPct}%` }}
                              />
                            </div>
                            <span className="text-xs text-gray-400 whitespace-nowrap">{heatPct}% 热度</span>
                          </div>
                        </div>

                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            <div className="flex items-center gap-2">
                              <div className="w-6 h-6 rounded-full bg-gradient-to-br from-blue-400 to-violet-400 flex items-center justify-center text-white text-xs font-bold">
                                {feedback.avatar}
                              </div>
                              <span className="text-sm text-gray-600">{feedback.author}</span>
                            </div>
                            <div className="flex items-center gap-3 text-sm text-gray-400">
                              <span>💬 {feedback.replies} 回复</span>
                            </div>
                          </div>
                          {feedback.status === 'shipped' && (
                            <span className="text-xs text-green-600 font-medium">✓ 已在 {feedback.updatedAt} 上线</span>
                          )}
                          {feedback.status === 'planned' && (
                            <span className="text-xs text-purple-600 font-medium">📅 预计下个版本上线</span>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </div>

        {/* Sidebar */}
        <div className="w-full lg:w-72 lg:flex-shrink-0 space-y-4 hidden lg:block">
          {/* Stats Card */}
          <div className="bg-white rounded-xl p-5 shadow-sm border">
            <h3 className="font-semibold text-gray-900 mb-4">反馈统计</h3>
            <div className="space-y-3">
              {STATUS_FILTERS.filter((s) => s !== 'all').map((st) => {
                const status = STATUS_MAP[st as FeedbackStatus]
                const count = FEEDBACK_LIST.filter((f) => f.status === st).length
                return (
                  <div key={st} className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="text-lg">{status.icon}</span>
                      <span className="text-sm text-gray-600">{status.label}</span>
                    </div>
                    <span className="text-sm font-bold text-gray-900">{count}</span>
                  </div>
                )
              })}
            </div>
          </div>

          {/* Popular Feedback */}
          <div className="bg-white rounded-xl p-5 shadow-sm border">
            <h3 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
              <span>🔥</span> 热门反馈
            </h3>
            <div className="space-y-3">
              {FEEDBACK_LIST.sort((a, b) => b.votes - a.votes)
                .slice(0, 5)
                .map((f, i) => {
                  const maxV = FEEDBACK_LIST[0]?.votes || 1
                  const pct = Math.round((f.votes / maxV) * 100)
                  const barColor = f.votes >= 80 ? 'bg-orange-400' : f.votes >= 40 ? 'bg-amber-400' : 'bg-blue-400'
                  return (
                    <div key={f.id} className="cursor-pointer hover:bg-gray-50 p-2 rounded-lg transition-colors">
                      <div className="flex items-start gap-2 mb-1.5">
                        <span className="text-xs font-bold text-gray-400 mt-0.5 w-4">{i + 1}</span>
                        <div className="flex-1">
                          <p className="text-sm text-gray-700 line-clamp-2 mb-1">{f.title}</p>
                          <div className="flex items-center gap-2 text-xs text-gray-400">
                            <span className="font-semibold text-gray-700">▲ {f.votes}</span>
                            <span className={`px-1.5 py-0.5 rounded-full ${STATUS_MAP[f.status].color}`}>
                              {STATUS_MAP[f.status].label}
                            </span>
                          </div>
                        </div>
                      </div>
                      <div className="pl-6">
                        <div className="h-1 bg-gray-100 rounded-full overflow-hidden">
                          <div className={`h-full ${barColor} rounded-full transition-all`} style={{ width: `${pct}%` }} />
                        </div>
                      </div>
                    </div>
                  )
                })}
            </div>
          </div>

          {/* Tips */}
          <div className="bg-gradient-to-br from-blue-50 to-violet-50 rounded-xl p-5 border border-blue-100">
            <h3 className="font-semibold text-gray-900 mb-2 flex items-center gap-2">
              <span>💡</span> 提交建议
            </h3>
            <ul className="text-xs text-gray-600 space-y-1.5">
              <li>• 清晰描述问题或建议</li>
              <li>• 提供必要的截图或日志</li>
              <li>• 遇到 Bug 请说明复现步骤</li>
              <li>• 功能建议说明使用场景</li>
              <li>• 支持好的建议可以 +1 投票</li>
            </ul>
          </div>

          {/* Rewards */}
          <div className="bg-gradient-to-br from-amber-50 to-orange-50 rounded-xl p-5 border border-amber-100">
            <h3 className="font-semibold text-gray-900 mb-2 flex items-center gap-2">
              <span>🎁</span> 反馈奖励
            </h3>
            <div className="space-y-2 text-sm">
              <div className="flex items-center justify-between">
                <span className="text-gray-600">提交反馈</span>
                <span className="font-semibold text-amber-600">+50</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-600">反馈被采纳</span>
                <span className="font-semibold text-amber-600">+200</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-600">功能已上线</span>
                <span className="font-semibold text-amber-600">+500</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
