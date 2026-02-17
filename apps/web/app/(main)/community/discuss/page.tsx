'use client'

import { useState } from 'react'

const CATEGORIES = ['全部', '经验分享', '行业讨论', '问题求助', '使用心得', '技术交流']
const SORT_OPTIONS = ['最新回复', '最新发布', '热门']

const POSTS = [
  {
    id: '1',
    title: '如何设计一个高效的文档处理链路？分享我的最佳实践',
    author: '技术达人',
    avatar: 'T',
    category: '经验分享',
    content: '最近在使用小浣熊处理大量文档时，总结了一些经验分享给大家：1. 明确输入输出格式；2. 合理分段处理；3. 增加检查步骤...',
    replies: 24,
    views: 312,
    likes: 45,
    createdAt: '2小时前',
    lastReply: '10分钟前',
    tags: ['最佳实践', '文档处理', '工作流'],
  },
  {
    id: '2',
    title: '小浣熊在教育行业的应用场景探讨',
    author: '教育从业者',
    avatar: 'E',
    category: '行业讨论',
    content: '作为一名教育行业从业者，想和大家探讨小浣熊在教育场景的应用可能性。目前我已经尝试了作业批改自动化、教案生成等场景，欢迎讨论...',
    replies: 18,
    views: 256,
    likes: 32,
    createdAt: '5小时前',
    lastReply: '30分钟前',
    tags: ['教育', '场景探索'],
  },
  {
    id: '3',
    title: '【求助】多文件并行处理时如何避免上下文混淆？',
    author: '新手用户',
    avatar: 'N',
    category: '问题求助',
    content: '我在使用小浣熊处理多个文件时，发现有时候会出现上下文混淆的情况。比如处理 A 文件时会引用 B 文件的内容。有没有什么好的解决方案？',
    replies: 15,
    views: 198,
    likes: 12,
    createdAt: '8小时前',
    lastReply: '1小时前',
    tags: ['求助', '多文件处理'],
  },
  {
    id: '4',
    title: '使用小浣熊一个月总结：哪些场景最高效？',
    author: '资深用户',
    avatar: 'S',
    category: '使用心得',
    content: '用小浣熊一个月了，总结一下我觉得最高效的几个场景：数据清洗、报告生成、邮件自动回复、会议记录整理。分享一些使用心得...',
    replies: 31,
    views: 445,
    likes: 67,
    createdAt: '1天前',
    lastReply: '2小时前',
    tags: ['心得', '场景总结'],
  },
  {
    id: '5',
    title: 'AI 在金融风控中的应用思考',
    author: '金融从业者',
    avatar: 'J',
    category: '行业讨论',
    content: '最近在尝试用小浣熊做金融风控相关的工作，包括异常交易识别、风险评估报告生成等。想和大家交流一下金融行业使用 AI 的经验和注意事项...',
    replies: 22,
    views: 301,
    likes: 41,
    createdAt: '1天前',
    lastReply: '3小时前',
    tags: ['金融', '风控', '应用场景'],
  },
  {
    id: '6',
    title: '代码审查自动化实践 - 提升团队代码质量',
    author: '技术负责人',
    avatar: 'R',
    category: '技术交流',
    content: '我们团队最近使用小浣熊进行代码审查辅助，效果显著。分享一下我们的实践经验：设置代码规范检查链路、安全漏洞扫描、性能优化建议...',
    replies: 19,
    views: 268,
    likes: 38,
    createdAt: '2天前',
    lastReply: '5小时前',
    tags: ['代码审查', '自动化', '质量提升'],
  },
  {
    id: '7',
    title: '如何提高 Prompt 的准确性和稳定性？',
    author: 'Prompt 工程师',
    avatar: 'P',
    category: '经验分享',
    content: '经过大量实践，总结了一些提高 Prompt 准确性的技巧：1. 明确角色定位；2. 提供清晰的示例；3. 使用结构化输出；4. 设置检查机制...',
    replies: 42,
    views: 589,
    likes: 93,
    createdAt: '3天前',
    lastReply: '1小时前',
    tags: ['Prompt', '最佳实践', '提示工程'],
  },
]

const REPLIES = [
  {
    id: 'r1',
    postId: '1',
    author: '小白学习中',
    avatar: 'X',
    content: '太有帮助了！尤其是第2点，我之前就是没有合理分段导致处理大文件时效率很低。',
    likes: 8,
    createdAt: '10分钟前',
  },
  {
    id: 'r2',
    postId: '1',
    author: '开发老鸟',
    avatar: 'K',
    content: '同意楼主的观点，增加检查步骤非常关键。我一般会在每个关键环节设置验证逻辑，确保输出符合预期。',
    likes: 12,
    createdAt: '1小时前',
  },
]

export default function DiscussPage() {
  const [category, setCategory] = useState('全部')
  const [sort, setSort] = useState('最新回复')
  const [expandedPost, setExpandedPost] = useState<string | null>(null)

  const filtered = POSTS.filter((p) => category === '全部' || p.category === category).sort((a, b) => {
    if (sort === '最新回复') return new Date(b.lastReply).getTime() - new Date(a.lastReply).getTime()
    if (sort === '热门') return b.views - a.views
    return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  })

  return (
    <div className="container mx-auto px-4 py-6 max-w-6xl">
      <div className="flex flex-col lg:flex-row gap-6">
        {/* Main Content */}
        <div className="flex-1">
          {/* Header */}
          <div className="bg-white rounded-xl p-5 shadow-sm border mb-5 flex flex-wrap items-center gap-3">
            <div className="flex gap-2">
              {CATEGORIES.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setCategory(cat)}
                  className={`px-3 py-1.5 rounded-full text-sm font-medium transition-colors ${category === cat ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}
                >
                  {cat}
                </button>
              ))}
            </div>
            <button className="bg-blue-600 text-white text-sm px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors font-medium">
              + 发布讨论
            </button>
          </div>

          {/* Sort Options */}
          <div className="flex items-center justify-between mb-4">
            <div className="text-sm text-gray-500">
              共 <strong className="text-gray-900">{filtered.length}</strong> 个讨论
            </div>
            <div className="flex gap-2">
              {SORT_OPTIONS.map((s) => (
                <button
                  key={s}
                  onClick={() => setSort(s)}
                  className={`px-3 py-1 rounded-lg text-sm transition-colors ${sort === s ? 'bg-gray-900 text-white' : 'bg-white text-gray-600 hover:bg-gray-100 border'}`}
                >
                  {s}
                </button>
              ))}
            </div>
          </div>

          {/* Posts List */}
          <div className="space-y-4">
            {filtered.map((post) => (
              <div key={post.id} className="bg-white rounded-xl shadow-sm border overflow-hidden hover:shadow-md transition-shadow">
                <div className="p-5">
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-green-400 to-blue-400 flex items-center justify-center text-white font-bold flex-shrink-0">
                      {post.avatar}
                    </div>
                    <div className="flex-1 min-w-0">
                      {/* Header */}
                      <div className="flex items-center gap-2 mb-2">
                        <span className="font-medium text-gray-900">{post.author}</span>
                        <span className="text-xs bg-gray-100 text-gray-500 px-2 py-0.5 rounded-full">{post.category}</span>
                        <span className="text-xs text-gray-400">{post.createdAt}</span>
                      </div>

                      {/* Title */}
                      <h3 className="text-base font-semibold text-gray-900 mb-2 cursor-pointer hover:text-blue-600 transition-colors">
                        {post.title}
                      </h3>

                      {/* Content Preview */}
                      <p className="text-sm text-gray-600 mb-3 line-clamp-2">{post.content}</p>

                      {/* Tags */}
                      <div className="flex gap-2 mb-3 flex-wrap">
                        {post.tags.map((tag) => (
                          <span key={tag} className="text-xs bg-blue-50 text-blue-600 px-2 py-0.5 rounded-full">#{tag}</span>
                        ))}
                      </div>

                      {/* Stats & Actions */}
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4 text-sm text-gray-500">
                          <button className="hover:text-blue-600 transition-colors">💬 {post.replies} 回复</button>
                          <button className="hover:text-red-500 transition-colors">❤️ {post.likes} 点赞</button>
                          <span>👁 {post.views} 浏览</span>
                        </div>
                        <div className="flex items-center gap-2 text-xs text-gray-400">
                          <span>最新回复 {post.lastReply}</span>
                          <button
                            onClick={() => setExpandedPost(expandedPost === post.id ? null : post.id)}
                            className="text-blue-600 hover:underline"
                          >
                            {expandedPost === post.id ? '收起' : '查看回复'}
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Expanded Replies */}
                  {expandedPost === post.id && (
                    <div className="mt-4 pl-0 sm:pl-14 space-y-3 border-t pt-4">
                      {REPLIES.filter((r) => r.postId === post.id).map((reply) => (
                        <div key={reply.id} className="flex gap-3 bg-gray-50 rounded-lg p-3">
                          <div className="w-7 h-7 rounded-full bg-gradient-to-br from-purple-400 to-pink-400 flex items-center justify-center text-white text-xs font-bold flex-shrink-0">
                            {reply.avatar}
                          </div>
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-1">
                              <span className="text-sm font-medium text-gray-900">{reply.author}</span>
                              <span className="text-xs text-gray-400">{reply.createdAt}</span>
                            </div>
                            <p className="text-sm text-gray-700 mb-2">{reply.content}</p>
                            <button className="text-xs text-gray-500 hover:text-red-500 transition-colors">❤️ {reply.likes}</button>
                          </div>
                        </div>
                      ))}
                      <div className="flex gap-3">
                        <input
                          type="text"
                          placeholder="写下你的回复..."
                          className="flex-1 text-sm border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-300"
                        />
                        <button className="bg-blue-600 text-white text-sm px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors">发送</button>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Sidebar */}
        <div className="w-full lg:w-64 lg:flex-shrink-0 space-y-4 hidden lg:block">
          {/* Hot Topics */}
          <div className="bg-white rounded-xl p-4 shadow-sm border">
            <h3 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
              <span>🔥</span> 热门话题
            </h3>
            <div className="space-y-2.5">
              {[
                { tag: 'Prompt工程', count: 128 },
                { tag: '最佳实践', count: 96 },
                { tag: '场景探索', count: 84 },
                { tag: '自动化', count: 73 },
                { tag: '数据处理', count: 61 },
              ].map((topic, i) => (
                <div key={topic.tag} className="flex items-center justify-between cursor-pointer hover:bg-gray-50 p-1.5 rounded-lg transition-colors">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold text-gray-400">{i + 1}</span>
                    <span className="text-sm text-gray-700">#{topic.tag}</span>
                  </div>
                  <span className="text-xs text-gray-400">{topic.count}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Discussion Rules */}
          <div className="bg-blue-50 rounded-xl p-4 border border-blue-100">
            <h3 className="font-semibold text-gray-900 mb-2 flex items-center gap-2">
              <span>📋</span> 社区公约
            </h3>
            <ul className="text-xs text-gray-600 space-y-1.5">
              <li>• 友善交流，尊重他人</li>
              <li>• 分享有价值的内容</li>
              <li>• 禁止广告和垃圾信息</li>
              <li>• 保护隐私和商业机密</li>
              <li>• 鼓励原创和实践分享</li>
            </ul>
          </div>

          {/* Active Users */}
          <div className="bg-white rounded-xl p-4 shadow-sm border">
            <h3 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
              <span>👥</span> 活跃用户
            </h3>
            <div className="space-y-2">
              {['技术达人', '产品团队', 'Prompt工程师', '资深用户'].map((user, i) => (
                <div key={user} className="flex items-center gap-2 cursor-pointer hover:bg-gray-50 p-1.5 rounded-lg transition-colors">
                  <div className={`w-7 h-7 rounded-full bg-gradient-to-br ${i % 2 === 0 ? 'from-blue-400 to-violet-400' : 'from-green-400 to-blue-400'} flex items-center justify-center text-white text-xs font-bold`}>
                    {user[0]}
                  </div>
                  <span className="text-sm text-gray-700">{user}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
