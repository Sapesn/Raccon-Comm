'use client'

import { useState } from 'react'
import Link from 'next/link'
import { POSTS } from './data'

const CATEGORIES = ['全部', '经验分享', '行业讨论', '问题求助', '使用心得', '技术交流']
const SORT_OPTIONS = ['最新回复', '最新发布', '热门']

export default function DiscussPage() {
  const [category, setCategory] = useState('全部')
  const [sort, setSort] = useState('最新回复')

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
          <div className="space-y-3">
            {filtered.map((post) => (
              <div key={post.id} className="bg-white rounded-xl shadow-sm border hover:shadow-md transition-shadow">
                <div className="p-5">
                  {/* Title */}
                  <Link href={`/community/discuss/${post.id}`} className="text-base font-bold text-gray-900 mb-2 hover:text-blue-600 transition-colors block leading-snug">
                    {post.title}
                  </Link>

                  {/* Content Preview */}
                  <p className="text-sm text-gray-600 mb-3 line-clamp-3 leading-relaxed">
                    {post.content.split('\n\n').find(p => p.trim() && !p.startsWith('**') && !p.startsWith('```'))?.replace(/\*\*/g, '') ?? ''}
                  </p>

                  {/* Tags */}
                  <div className="flex gap-1.5 mb-3 flex-wrap">
                    {post.tags.map((tag) => (
                      <span key={tag} className="text-xs bg-blue-50 text-blue-600 px-2 py-0.5 rounded-full">#{tag}</span>
                    ))}
                  </div>

                  {/* Footer: author + stats */}
                  <div className="flex items-center justify-between pt-3 border-t">
                    <div className="flex items-center gap-2">
                      <div className={`w-6 h-6 rounded-full bg-gradient-to-br ${post.avatarGrad} flex items-center justify-center text-white text-xs font-bold flex-shrink-0`}>
                        {post.avatar}
                      </div>
                      <span className="text-xs text-gray-500">{post.author}</span>
                      <span className="text-xs bg-gray-100 text-gray-400 px-1.5 py-0.5 rounded-full">{post.category}</span>
                      <span className="text-xs text-gray-400">{post.createdAt}</span>
                    </div>
                    <div className="flex items-center gap-3 text-xs text-gray-400">
                      <span>💬 {post.replies}</span>
                      <span>❤️ {post.likes}</span>
                      <span>👁 {post.views}</span>
                    </div>
                  </div>
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
