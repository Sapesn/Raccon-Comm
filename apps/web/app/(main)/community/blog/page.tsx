'use client'

import { useState } from 'react'
import Link from 'next/link'
import { BLOG_ARTICLES, BLOG_CATEGORIES } from './data'

const SORT_OPTIONS = ['最新发布', '最多浏览', '最多点赞', '热门讨论']

const COVER_STYLES: Record<string, string> = {
  'AI 实践': 'from-amber-400 via-orange-400 to-red-500',
  '行业洞察': 'from-pink-400 via-rose-400 to-red-400',
  '工具技巧': 'from-blue-500 via-violet-500 to-purple-600',
  '案例复盘': 'from-blue-500 via-cyan-500 to-teal-500',
  '产品思考': 'from-emerald-500 via-teal-500 to-cyan-600',
}

export default function BlogPage() {
  const [activeCategory, setActiveCategory] = useState('全部')
  const [sort, setSort] = useState('最新发布')
  const [search, setSearch] = useState('')

  const filtered = BLOG_ARTICLES.filter((a) => {
    if (activeCategory !== '全部' && a.category !== activeCategory) return false
    if (search && !a.title.includes(search) && !a.excerpt.includes(search)) return false
    return true
  }).sort((a, b) => {
    if (sort === '最多浏览') return b.views - a.views
    if (sort === '最多点赞') return b.likes - a.likes
    if (sort === '热门讨论') return b.comments.length - a.comments.length
    return b.createdAt.localeCompare(a.createdAt)
  })

  const topArticles = [...BLOG_ARTICLES].sort((a, b) => b.views - a.views).slice(0, 5)

  return (
    <div className="min-h-[calc(100vh-56px)] bg-[#f5f7fa]">
      <div className="container mx-auto px-4 py-6 max-w-7xl">

        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl font-black text-gray-900">社区博客</h1>
            <p className="text-sm text-gray-500 mt-0.5">
              {BLOG_ARTICLES.length} 篇文章 · AI 实践者的真实记录与深度思考
            </p>
          </div>
          <Link
            href="/community/blog/write"
            className="bg-blue-600 text-white text-sm px-4 py-2 rounded-full hover:bg-blue-700 transition-colors font-medium"
          >
            ✍️ 写文章
          </Link>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Main Content */}
          <div className="lg:col-span-3">

            {/* Filters */}
            <div className="flex items-center gap-3 mb-4 flex-wrap">
              {/* Category Tabs */}
              <div className="relative flex-1 min-w-0">
                <div className="flex gap-1.5 overflow-x-auto pb-0.5 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
                  {BLOG_CATEGORIES.map((cat) => (
                    <button
                      key={cat}
                      onClick={() => setActiveCategory(cat)}
                      className={`px-3 py-1.5 rounded-full text-sm font-medium whitespace-nowrap transition-colors ${
                        activeCategory === cat
                          ? 'bg-blue-600 text-white'
                          : 'bg-white text-gray-600 hover:bg-gray-50 border border-gray-200'
                      }`}
                    >
                      {cat}
                    </button>
                  ))}
                </div>
                <div className="pointer-events-none absolute right-0 top-0 bottom-0 w-8 bg-gradient-to-l from-[#f5f7fa] to-transparent" />
              </div>

              {/* Sort */}
              <select
                value={sort}
                onChange={(e) => setSort(e.target.value)}
                className="text-sm border rounded-lg px-3 py-1.5 bg-white text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-300 flex-shrink-0"
              >
                {SORT_OPTIONS.map((s) => <option key={s}>{s}</option>)}
              </select>

              {/* Search */}
              <div className="relative flex-shrink-0">
                <input
                  type="text"
                  placeholder="搜索文章..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="pl-8 pr-3 py-1.5 text-sm border rounded-full bg-white focus:outline-none focus:ring-2 focus:ring-blue-300 w-32"
                />
                <svg className="absolute left-2.5 top-2 w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
            </div>

            {/* Article List */}
            {filtered.length === 0 ? (
              <div className="text-center py-16 bg-white rounded-2xl border">
                <div className="text-5xl mb-3">📝</div>
                <p className="text-gray-500 font-medium">暂无匹配文章</p>
              </div>
            ) : (
              <div className="space-y-4">
                {filtered.map((article) => (
                  <Link key={article.id} href={`/community/blog/${article.id}`} className="block">
                    <div className="bg-white rounded-2xl border hover:shadow-md transition-shadow overflow-hidden">
                      {/* Cover */}
                      <div className={`h-2 bg-gradient-to-r ${COVER_STYLES[article.category] ?? article.coverGrad}`} />

                      <div className="p-5">
                        {/* Category + Date */}
                        <div className="flex items-center gap-2 mb-2">
                          <span className="text-xs bg-blue-50 text-blue-600 border border-blue-100 px-2 py-0.5 rounded-full font-medium">
                            {article.category}
                          </span>
                          <span className="text-xs text-gray-400">{article.createdAt}</span>
                          <span className="text-xs text-gray-400">· {article.readTime} 分钟阅读</span>
                        </div>

                        {/* Title */}
                        <h2 className="text-base font-bold text-gray-900 hover:text-blue-600 transition-colors mb-2 line-clamp-2">
                          {article.title}
                        </h2>

                        {/* Excerpt */}
                        <p className="text-sm text-gray-500 line-clamp-2 mb-3 leading-relaxed">
                          {article.excerpt}
                        </p>

                        {/* Tags */}
                        <div className="flex flex-wrap gap-1.5 mb-3">
                          {article.tags.slice(0, 4).map((tag) => (
                            <span key={tag} className="text-xs bg-gray-100 text-gray-500 px-2 py-0.5 rounded-full">
                              #{tag}
                            </span>
                          ))}
                        </div>

                        {/* Author + Stats */}
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <div className={`w-7 h-7 rounded-full bg-gradient-to-br ${article.avatarGrad} flex items-center justify-center text-white text-xs font-bold`}>
                              {article.avatar}
                            </div>
                            <div>
                              <span className="text-sm font-medium text-gray-800">{article.author}</span>
                            </div>
                          </div>
                          <div className="flex gap-3 text-xs text-gray-400">
                            <span>👁 {article.views.toLocaleString()}</span>
                            <span>❤️ {article.likes}</span>
                            <span>💬 {article.comments.length}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-4">
            {/* CTA */}
            <div className="bg-gradient-to-br from-blue-500 to-violet-600 rounded-2xl p-5 text-white">
              <div className="text-2xl mb-2">✍️</div>
              <h3 className="font-bold mb-1">写下你的实践</h3>
              <p className="text-sm text-white/80 mb-4">分享你的 AI 实践经验，帮助社区成长，同时获得积分奖励</p>
              <Link
                href="/community/blog/write"
                className="block w-full text-center bg-white text-blue-600 text-sm font-semibold py-2 rounded-xl hover:bg-blue-50 transition-colors"
              >
                开始写作
              </Link>
              <p className="text-xs text-white/60 text-center mt-2">发布文章 +100 积分</p>
            </div>

            {/* Hot Articles */}
            <div className="bg-white rounded-2xl border p-4">
              <h3 className="font-semibold text-gray-900 mb-3 text-sm flex items-center gap-1.5">
                <span>🔥</span> 热门文章
              </h3>
              <div className="space-y-3">
                {topArticles.map((a, i) => (
                  <Link key={a.id} href={`/community/blog/${a.id}`} className="flex gap-3 group">
                    <span className={`text-sm font-black flex-shrink-0 w-5 text-center ${i === 0 ? 'text-red-500' : i === 1 ? 'text-orange-500' : 'text-gray-400'}`}>
                      {i + 1}
                    </span>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm text-gray-700 group-hover:text-blue-600 transition-colors line-clamp-2 leading-snug">
                        {a.title}
                      </p>
                      <p className="text-xs text-gray-400 mt-0.5">👁 {a.views.toLocaleString()}</p>
                    </div>
                  </Link>
                ))}
              </div>
            </div>

            {/* Categories */}
            <div className="bg-white rounded-2xl border p-4">
              <h3 className="font-semibold text-gray-900 mb-3 text-sm">分类</h3>
              <div className="space-y-1">
                {BLOG_CATEGORIES.filter((c) => c !== '全部').map((cat) => {
                  const count = BLOG_ARTICLES.filter((a) => a.category === cat).length
                  return (
                    <button
                      key={cat}
                      onClick={() => setActiveCategory(cat)}
                      className={`w-full flex items-center justify-between px-3 py-2 rounded-lg text-sm transition-colors ${
                        activeCategory === cat
                          ? 'bg-blue-50 text-blue-600 font-medium'
                          : 'text-gray-600 hover:bg-gray-50'
                      }`}
                    >
                      <span>{cat}</span>
                      <span className="text-xs text-gray-400">{count}</span>
                    </button>
                  )
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
