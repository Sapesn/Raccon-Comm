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

interface Reply {
  id: string
  author: string
  avatar: string
  isOfficial: boolean
  content: string
  createdAt: string
  likes: number
}

const REPLIES: Record<string, Reply[]> = {
  '1': [
    { id: 'r1-1', author: '小浣熊官方', avatar: '🦝', isOfficial: true, content: '感谢反馈！批量上传已纳入 Q1 规划，预计 2.5 版本上线，届时支持最多同时选择 20 个文件上传。', createdAt: '1天前', likes: 24 },
    { id: 'r1-2', author: '产品经理小张', avatar: 'Z', isOfficial: false, content: '这个需求太迫切了！我们团队每天要上传几十个文件，一个个传非常费时间，+1！', createdAt: '2天前', likes: 11 },
    { id: 'r1-3', author: 'AI运营林', avatar: 'L', isOfficial: false, content: '希望上传后能自动解析文件名作为知识库的标题，省去手动填写的步骤。', createdAt: '1天前', likes: 7 },
    { id: 'r1-4', author: '电商小刘', avatar: 'L', isOfficial: false, content: '同期望也支持文件夹上传，整个项目文档可以一次性导入。', createdAt: '18小时前', likes: 5 },
  ],
  '2': [
    { id: 'r2-1', author: '小浣熊官方', avatar: '🦝', isOfficial: true, content: '该问题已确认，属于长链路执行状态持久化缺失导致的。工程团队正在设计断点续传方案，预计本月内发布修复版本。临时方案：执行前建议在链路末尾添加「结果保存」节点，可减少丢失影响。', createdAt: '2天前', likes: 31 },
    { id: 'r2-2', author: '开发者老王', avatar: 'W', isOfficial: false, content: '这个问题我也遇到过，特别是执行 100+ 步的数据处理链路时，断了就要重跑一两个小时，很崩溃。', createdAt: '3天前', likes: 18 },
    { id: 'r2-3', author: 'DevOps赵', avatar: 'Z', isOfficial: false, content: '能否在链路执行中间增加「检查点」机制？每完成 N 步自动保存一次进度。', createdAt: '2天前', likes: 14 },
    { id: 'r2-4', author: '数据工程师', avatar: 'D', isOfficial: false, content: '期待修复，最好也能支持多设备间同步进度，切换电脑继续执行。', createdAt: '1天前', likes: 9 },
  ],
  '3': [
    { id: 'r3-1', author: '小浣熊官方', avatar: '🦝', isOfficial: true, content: '🎉 链路模板市场已于 v2.3 正式上线！目前已收录 200+ 社区精选模板，覆盖电商、法律、金融等 12 个行业。感谢所有提出建议的用户！', createdAt: '3天前', likes: 89 },
    { id: 'r3-2', author: '新用户Tony', avatar: 'T', isOfficial: false, content: '刚看到上线公告，太棒了！立刻去用了电商选品模板，直接省了我大半天工作！', createdAt: '3天前', likes: 22 },
    { id: 'r3-3', author: '模板爱好者', avatar: 'M', isOfficial: false, content: '建议模板市场支持评分和评价功能，方便找到最适合自己行业的模板。', createdAt: '2天前', likes: 15 },
  ],
  '4': [
    { id: 'r4-1', author: '小浣熊官方', avatar: '🦝', isOfficial: true, content: '感谢反馈，已经复现了这个问题。原因是导出时字体子集化处理与部分 Mac 预览程序存在兼容性问题。已提交 Bug 单，工程师正在跟进。', createdAt: '4天前', likes: 8 },
    { id: 'r4-2', author: 'Mac用户A', avatar: 'A', isOfficial: false, content: '同款问题，MacOS 14.2 上复现，使用 PDF Expert 打开正常，用系统预览就乱码。', createdAt: '5天前', likes: 5 },
    { id: 'r4-3', author: '设计师小周', avatar: 'Z', isOfficial: false, content: '临时解决方案：用 Chrome 打开导出的 PDF 再另存为，字体显示正常。', createdAt: '3天前', likes: 12 },
  ],
  '5': [
    { id: 'r5-1', author: '小浣熊官方', avatar: '🦝', isOfficial: true, content: '移动端 App 已在规划中！目前 H5 移动适配已优化，iOS App 预计 Q3 上线，Android 版本随后跟进。可以先将网页添加到桌面使用。', createdAt: '4天前', likes: 76 },
    { id: 'r5-2', author: '移动用户小陈', avatar: 'C', isOfficial: false, content: '太期待了！现在用手机浏览器体验不是很流畅，希望 App 出来能有推送通知功能。', createdAt: '1周前', likes: 28 },
    { id: 'r5-3', author: '销售总监', avatar: 'S', isOfficial: false, content: '我们团队很多人在外出时需要用手机审核 AI 生成的文件，App 对我们太重要了。', createdAt: '5天前', likes: 19 },
    { id: 'r5-4', author: 'iOS用户小李', avatar: 'L', isOfficial: false, content: '建议 App 支持 Widget，可以快速启动常用链路。', createdAt: '3天前', likes: 11 },
    { id: 'r5-5', author: 'Android用户', avatar: 'A', isOfficial: false, content: 'Android 用户在线等！Android 的市场占有率更高，希望同步推出不要太晚。', createdAt: '2天前', likes: 8 },
  ],
  '6': [
    { id: 'r6-1', author: '小浣熊官方', avatar: '🦝', isOfficial: true, content: '深色模式已在研发中，设计稿已完成评审，预计本季度上线。届时将支持跟随系统切换和手动切换两种模式。', createdAt: '5天前', likes: 42 },
    { id: 'r6-2', author: '夜猫子程序员', avatar: 'Y', isOfficial: false, content: '终于！作为每天晚上加班使用的用户，这个功能真的太需要了，眼睛都快废了。', createdAt: '1周前', likes: 31 },
    { id: 'r6-3', author: 'UI设计师', avatar: 'U', isOfficial: false, content: '希望深色模式不只是背景变黑，颜色搭配也要好看，期待 OLED 友好的纯黑版本。', createdAt: '6天前', likes: 17 },
  ],
  '7': [
    { id: 'r7-1', author: '小浣熊官方', avatar: '🦝', isOfficial: true, content: '🎉 代码块语法高亮已于 v2.2 上线！支持 50+ 编程语言，包括 Python、JavaScript、SQL 等，可以在文档编辑器中直接使用。', createdAt: '1周前', likes: 38 },
    { id: 'r7-2', author: '程序员小赵', avatar: 'Z', isOfficial: false, content: '已经体验了，高亮效果很好！建议后续支持代码行号显示和复制按钮。', createdAt: '1周前', likes: 14 },
    { id: 'r7-3', author: 'Java工程师', avatar: 'J', isOfficial: false, content: '希望也支持 Diff 格式高亮，看代码对比时很有用。', createdAt: '6天前', likes: 9 },
  ],
}

const FEEDBACK_LIST = [
  { id: '1', title: '希望支持批量上传文件功能', description: '目前每次只能上传一个文件比较麻烦，希望能支持一次选择多个文件进行批量上传。', author: '产品经理', avatar: 'P', category: '功能建议', status: 'planned' as FeedbackStatus, votes: 47, createdAt: '2天前', updatedAt: '1天前', replies: 4 },
  { id: '2', title: '链路执行过程中断后无法恢复', description: '在执行长链路时，如果中途网络断开或者浏览器崩溃，整个链路需要重新开始执行，希望能支持断点续传。', author: '开发者', avatar: 'D', category: 'Bug 反馈', status: 'accepted' as FeedbackStatus, votes: 62, createdAt: '3天前', updatedAt: '2天前', replies: 4 },
  { id: '3', title: '增加链路模板市场功能', description: '建议增加一个官方的链路模板市场，用户可以直接使用官方或社区提供的模板，降低使用门槛。', author: '新用户', avatar: 'N', category: '功能建议', status: 'shipped' as FeedbackStatus, votes: 89, createdAt: '1周前', updatedAt: '3天前', replies: 3 },
  { id: '4', title: '导出的 PDF 格式显示异常', description: '在 Mac 系统上导出的 PDF 文件，使用预览程序打开时中文字体显示异常，部分字符变成了方框。', author: 'Mac 用户', avatar: 'M', category: 'Bug 反馈', status: 'pending' as FeedbackStatus, votes: 18, createdAt: '5天前', updatedAt: '5天前', replies: 3 },
  { id: '5', title: '支持移动端 App', description: '希望能推出 iOS 和 Android 版本的移动应用，方便在移动设备上查看和使用小浣熊。', author: '移动用户', avatar: 'M', category: '功能建议', status: 'planned' as FeedbackStatus, votes: 134, createdAt: '1周前', updatedAt: '4天前', replies: 5 },
  { id: '6', title: '增加深色模式', description: '长时间使用浅色主题眼睛容易疲劳，希望能增加深色模式选项。', author: '夜猫子', avatar: 'Y', category: '体验优化', status: 'accepted' as FeedbackStatus, votes: 72, createdAt: '1周前', updatedAt: '5天前', replies: 3 },
  { id: '7', title: '代码块不支持语法高亮', description: '在查看包含代码的文档时，代码块没有语法高亮，阅读体验较差。', author: '程序员', avatar: 'C', category: '体验优化', status: 'shipped' as FeedbackStatus, votes: 41, createdAt: '2周前', updatedAt: '1周前', replies: 3 },
]

const CATEGORIES = ['全部', '功能建议', 'Bug 反馈', '体验优化']
const STATUS_FILTERS: (FeedbackStatus | 'all')[] = ['all', 'pending', 'accepted', 'planned', 'shipped', 'rejected']

export default function FeedbackPage() {
  const [category, setCategory] = useState('全部')
  const [statusFilter, setStatusFilter] = useState<FeedbackStatus | 'all'>('all')
  const [votedItems, setVotedItems] = useState<Set<string>>(new Set())
  const [showForm, setShowForm] = useState(false)
  const [expandedIds, setExpandedIds] = useState<Set<string>>(new Set())
  const [replyTexts, setReplyTexts] = useState<Record<string, string>>({})
  const [likedReplies, setLikedReplies] = useState<Set<string>>(new Set())

  const toggleExpand = (id: string) => {
    setExpandedIds((prev) => {
      const next = new Set(prev)
      if (next.has(id)) { next.delete(id) } else { next.add(id) }
      return next
    })
  }

  const toggleReplyLike = (replyId: string) => {
    setLikedReplies((prev) => {
      const next = new Set(prev)
      if (next.has(replyId)) { next.delete(replyId) } else { next.add(replyId) }
      return next
    })
  }

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
                            <button
                              onClick={() => toggleExpand(feedback.id)}
                              className={`flex items-center gap-1 text-sm transition-colors ${expandedIds.has(feedback.id) ? 'text-blue-600 font-medium' : 'text-gray-400 hover:text-blue-600'}`}
                            >
                              <span>💬</span>
                              <span>{feedback.replies} 回复</span>
                              <svg
                                className={`w-3 h-3 transition-transform ${expandedIds.has(feedback.id) ? 'rotate-180' : ''}`}
                                fill="none" stroke="currentColor" viewBox="0 0 24 24"
                              >
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                              </svg>
                            </button>
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

                  {/* Reply section */}
                  {expandedIds.has(feedback.id) && (
                    <div className="border-t bg-gray-50 px-5 py-4">
                      {/* Official reply pinned first if exists */}
                      {(REPLIES[feedback.id] || []).map((reply) => (
                        <div
                          key={reply.id}
                          className={`flex gap-3 mb-4 ${reply.isOfficial ? 'bg-blue-50 border border-blue-100 rounded-xl p-3 -mx-1' : ''}`}
                        >
                          <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0 ${reply.isOfficial ? 'bg-blue-600 text-white' : 'bg-gradient-to-br from-gray-400 to-gray-500 text-white'}`}>
                            {reply.avatar}
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-2 mb-1 flex-wrap">
                              <span className={`text-sm font-semibold ${reply.isOfficial ? 'text-blue-700' : 'text-gray-800'}`}>
                                {reply.author}
                              </span>
                              {reply.isOfficial && (
                                <span className="text-xs bg-blue-600 text-white px-1.5 py-0.5 rounded-full font-medium">官方回复</span>
                              )}
                              <span className="text-xs text-gray-400">{reply.createdAt}</span>
                            </div>
                            <p className={`text-sm leading-relaxed ${reply.isOfficial ? 'text-blue-900' : 'text-gray-700'}`}>
                              {reply.content}
                            </p>
                            <button
                              onClick={() => toggleReplyLike(reply.id)}
                              className={`flex items-center gap-1 mt-1.5 text-xs transition-colors ${likedReplies.has(reply.id) ? 'text-red-500' : 'text-gray-400 hover:text-red-400'}`}
                            >
                              <span>{likedReplies.has(reply.id) ? '❤️' : '🤍'}</span>
                              <span>{reply.likes + (likedReplies.has(reply.id) ? 1 : 0)}</span>
                            </button>
                          </div>
                        </div>
                      ))}

                      {/* Reply input */}
                      <div className="flex gap-2 mt-2">
                        <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-400 to-violet-500 flex items-center justify-center text-white text-xs font-bold flex-shrink-0">
                          A
                        </div>
                        <div className="flex-1 flex gap-2">
                          <input
                            value={replyTexts[feedback.id] || ''}
                            onChange={(e) => setReplyTexts({ ...replyTexts, [feedback.id]: e.target.value })}
                            placeholder="写下你的回复..."
                            className="flex-1 border rounded-xl px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-300 bg-white"
                          />
                          <button
                            className={`text-sm px-3 py-2 rounded-xl font-medium transition-colors flex-shrink-0 ${replyTexts[feedback.id]?.trim() ? 'bg-blue-600 text-white hover:bg-blue-700' : 'bg-gray-100 text-gray-400 cursor-not-allowed'}`}
                            disabled={!replyTexts[feedback.id]?.trim()}
                            onClick={() => setReplyTexts({ ...replyTexts, [feedback.id]: '' })}
                          >
                            发送
                          </button>
                        </div>
                      </div>
                    </div>
                  )}
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
