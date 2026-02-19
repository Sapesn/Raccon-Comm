/**
 * 博客文章详情页组件
 *
 * 功能概述:
 * - 展示博客文章的完整内容，包括标题、作者信息、正文内容、标签等
 * - 支持多种类型的内容块渲染（标题、段落、代码、引用、图片）
 * - 提供点赞、评论等互动功能
 * - 展示相关推荐文章
 * - 自动检测代码语言并提供复制功能
 */
'use client'

import { useState } from 'react'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { BLOG_ARTICLES, type ContentBlock } from '../data'

/**
 * 代码语言自动检测函数
 *
 * 算法说明:
 * 采用基于特征关键词匹配的启发式检测算法，通过分析代码字符串中的
 * 特定语法标记来推断编程语言类型。检测顺序按照特征明显程度排列。
 *
 * 检测逻辑:
 * 1. Shell/Prompt: 检测开头是否为 # 符号（注释或命令提示符）
 * 2. Python: 检测 def 关键字、import 语句和冒号组合
 * 3. JavaScript: 检测 function、const 关键字或箭头函数语法
 * 4. JSX: 检测 HTML 标签语法（< 和 />）
 * 5. SQL: 检测 SELECT、FROM 等 SQL 关键字
 * 6. Markdown: 检测表格语法（| 和 ---）
 * 7. 默认: 无法识别时返回通用标识"代码"
 *
 * @param code - 待检测的代码字符串
 * @returns 检测到的语言名称
 */
function detectLang(code: string): string {
  if (code.trimStart().startsWith('#')) return 'Shell / Prompt'
  if (code.includes('def ') || code.includes('import ') && code.includes(':')) return 'Python'
  if (code.includes('function ') || code.includes('const ') || code.includes('=>')) return 'JavaScript'
  if (code.includes('<') && code.includes('/>')) return 'JSX'
  if (code.includes('SELECT ') || code.includes('FROM ')) return 'SQL'
  if (code.includes('|') && code.includes('---')) return 'Markdown'
  return '代码'
}

/**
 * 代码块渲染组件
 *
 * 功能说明:
 * - 渲染带语法高亮风格的代码块
 * - 自动检测并显示代码语言
 * - 提供一键复制功能，带2秒成功反馈
 * - 包含顶部工具栏（显示语言和复制按钮）
 *
 * 状态管理:
 * - copied: 跟踪复制状态，用于切换按钮图标和文字
 *
 * @param content - 要显示的代码内容
 */
function CodeBlock({ content }: { content: string }) {
  // 复制状态管理：用于显示"已复制"反馈
  const [copied, setCopied] = useState(false)

  // 自动检测代码语言
  const lang = detectLang(content)

  /**
   * 处理代码复制到剪贴板
   *
   * 流程:
   * 1. 使用 Clipboard API 复制代码内容
   * 2. 设置 copied 状态为 true，显示成功反馈
   * 3. 2秒后自动恢复到初始状态
   */
  const handleCopy = () => {
    navigator.clipboard.writeText(content).then(() => {
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    })
  }

  return (
    <div className="my-4 rounded-lg overflow-hidden border border-gray-800">
      {/* 代码块头部工具栏：显示语言和复制按钮 */}
      <div className="flex items-center justify-between bg-gray-800 px-4 py-2">
        <span className="text-xs text-gray-400 font-medium">{lang}</span>
        <button
          onClick={handleCopy}
          className="flex items-center gap-1.5 text-xs text-gray-400 hover:text-white transition-colors"
        >
          {/* 根据复制状态切换图标和文字 */}
          {copied ? (
            <>
              <svg className="w-3.5 h-3.5 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              <span className="text-green-400">已复制</span>
            </>
          ) : (
            <>
              <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
              </svg>
              复制
            </>
          )}
        </button>
      </div>
      {/* 代码内容区域：黑色背景 + 绿色文字，模拟终端风格 */}
      <pre className="bg-gray-900 text-green-400 text-xs p-4 overflow-x-auto font-mono">
        <code>{content}</code>
      </pre>
    </div>
  )
}

/**
 * 内容块渲染器组件
 *
 * 功能说明:
 * 根据内容块类型分发渲染，支持以下类型：
 * - heading: 二级标题（加粗，较大字号）
 * - paragraph: 普通段落文字
 * - quote: 引用块（左侧蓝色边框，浅蓝背景）
 * - code: 代码块（调用 CodeBlock 组件）
 * - image: 图片占位符（当前为灰色占位区域）
 *
 * 这是一个多态渲染组件，使用 switch 语句进行类型分发
 *
 * @param block - 包含 type 和 content 的内容块对象
 */
function ContentBlockRenderer({ block }: { block: ContentBlock }) {
  switch (block.type) {
    case 'heading':
      return <h2 className="text-xl font-bold text-gray-900 mt-6 mb-3">{block.content}</h2>
    case 'paragraph':
      return <p className="text-sm text-gray-700 leading-relaxed mb-4">{block.content}</p>
    case 'quote':
      return (
        <blockquote className="border-l-4 border-blue-500 bg-blue-50 pl-4 pr-3 py-3 my-4 italic text-sm text-gray-700">
          {block.content}
        </blockquote>
      )
    case 'code':
      return <CodeBlock content={block.content} />
    case 'image':
      // 图片占位符：实际应用中可替换为真实图片加载逻辑
      return (
        <div className="my-6 rounded-xl overflow-hidden bg-gray-100 flex items-center justify-center h-64">
          <div className="text-center text-gray-400">
            <div className="text-4xl mb-2">🖼️</div>
            <p className="text-xs">{block.content}</p>
          </div>
        </div>
      )
    default:
      return null
  }
}

/**
 * 博客详情页主组件
 *
 * 页面结构:
 * - 顶部面包屑导航
 * - 左侧主内容区（2/3宽度）：文章详情、评论区
 * - 右侧边栏（1/3宽度）：作者卡片、相关推荐、返回按钮
 *
 * 状态管理详解:
 * - liked: 当前用户是否已点赞（布尔值）
 * - likeCount: 点赞总数（基于初始值动态计算）
 * - comments: 评论列表（初始从数据加载，支持实时添加）
 * - newComment: 评论输入框内容
 * - commentLikes: 评论点赞状态映射表 { commentId: boolean }
 *
 * @param params - 路由参数，包含文章 id
 */
export default function BlogDetailPage({ params }: { params: { id: string } }) {
  // 根据 URL 参数查找对应文章
  const article = BLOG_ARTICLES.find((a) => a.id === params.id)

  // 文章不存在时显示 404 页面
  if (!article) {
    notFound()
  }

  // ========== 互动状态管理 ==========
  // 点赞状态：用户点赞后切换，同时更新计数
  const [liked, setLiked] = useState(false)
  const [likeCount, setLikeCount] = useState(article.likes)

  // 评论管理：支持查看和发布评论
  const [comments, setComments] = useState(article.comments)
  const [newComment, setNewComment] = useState('')

  // 评论点赞映射表：使用 Record 类型记录每条评论的点赞状态
  const [commentLikes, setCommentLikes] = useState<Record<string, boolean>>({})

  /**
   * 处理文章点赞/取消点赞
   *
   * 逻辑:
   * - 切换 liked 状态
   * - 同步更新 likeCount（+1 或 -1）
   */
  const handleLike = () => {
    setLiked(!liked)
    setLikeCount(liked ? likeCount - 1 : likeCount + 1)
  }

  /**
   * 处理评论点赞/取消点赞
   *
   * 逻辑:
   * - 使用函数式更新确保状态正确性
   * - 切换指定评论 ID 的点赞状态
   *
   * @param commentId - 要点赞的评论 ID
   */
  const handleCommentLike = (commentId: string) => {
    setCommentLikes((prev) => ({ ...prev, [commentId]: !prev[commentId] }))
  }

  /**
   * 处理添加新评论
   *
   * 逻辑:
   * 1. 验证评论内容非空（去除首尾空格后）
   * 2. 构造评论对象，自动生成 ID
   * 3. 插入到评论列表开头（最新评论在上）
   * 4. 清空输入框
   */
  const handleAddComment = () => {
    if (!newComment.trim()) return
    const comment = {
      id: `c${comments.length + 1}`,
      author: '小浣熊用户',
      avatar: 'A',
      avatarGrad: 'from-blue-400 to-violet-500',
      content: newComment,
      createdAt: '刚刚',
      likes: 0,
    }
    setComments([comment, ...comments])
    setNewComment('')
  }

  // ========== 相关内容计算 ==========
  // 从同类别文章中筛选，排除当前文章，最多显示3篇
  const relatedArticles = BLOG_ARTICLES.filter(
    (a) => a.category === article.category && a.id !== article.id
  ).slice(0, 3)

  return (
    <div className="min-h-[calc(100vh-56px)] bg-[#f5f7fa]">
      <div className="container mx-auto px-4 py-6 max-w-6xl">

        {/* ========== 面包屑导航 ========== */}
        <nav className="text-xs text-gray-500 mb-4 flex items-center gap-1.5">
          <Link href="/community" className="hover:text-blue-600">社区</Link>
          <span>/</span>
          <Link href="/community/blog" className="hover:text-blue-600">博客</Link>
          <span>/</span>
          <span className="text-gray-700 line-clamp-1">{article.title}</span>
        </nav>

        {/* ========== 主体布局：左右分栏 ========== */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* ===== 左侧主内容区（占2列） ===== */}
          <div className="lg:col-span-2">
            {/* === 文章卡片 === */}
            <div className="bg-white rounded-2xl border overflow-hidden">
              {/* 顶部装饰性渐变条 */}
              <div className={`h-3 bg-gradient-to-r ${article.coverGrad}`} />

              <div className="p-6">
                {/* 文章元信息：分类、发布时间、阅读时间、浏览量 */}
                <div className="flex items-center gap-2 mb-3 flex-wrap">
                  <span className="text-xs bg-blue-50 text-blue-600 border border-blue-100 px-2 py-0.5 rounded-full font-medium">
                    {article.category}
                  </span>
                  <span className="text-xs text-gray-400">{article.createdAt}</span>
                  <span className="text-xs text-gray-400">· {article.readTime} 分钟阅读</span>
                  <span className="text-xs text-gray-400">· 👁 {article.views.toLocaleString()} 次浏览</span>
                </div>

                {/* 文章标题 */}
                <h1 className="text-2xl font-black text-gray-900 mb-4 leading-snug">
                  {article.title}
                </h1>

                {/* 作者信息卡片 */}
                <div className="flex items-center gap-3 pb-5 mb-5 border-b">
                  <div className={`w-10 h-10 rounded-full bg-gradient-to-br ${article.avatarGrad} flex items-center justify-center text-white text-sm font-bold`}>
                    {article.avatar}
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-gray-900">{article.author}</p>
                    <p className="text-xs text-gray-500">{article.authorTitle}</p>
                  </div>
                </div>

                {/* ===== 文章正文内容渲染 ===== */}
                {/* 使用 prose 类提供排版样式 */}
                <article className="prose prose-sm max-w-none">
                  {/* 遍历所有内容块，根据类型渲染 */}
                  {article.content.map((block) => (
                    <ContentBlockRenderer key={block.id} block={block} />
                  ))}
                </article>

                {/* 标签列表 */}
                <div className="flex flex-wrap gap-1.5 mt-6 pt-5 border-t">
                  {article.tags.map((tag) => (
                    <span key={tag} className="text-xs bg-gray-100 text-gray-600 px-2.5 py-1 rounded-full">
                      #{tag}
                    </span>
                  ))}
                </div>

                {/* ===== 互动按钮区域 ===== */}
                <div className="flex items-center gap-3 mt-5 pt-5 border-t">
                  {/* 点赞按钮：根据点赞状态切换样式 */}
                  <button
                    onClick={handleLike}
                    className={`flex items-center gap-2 px-4 py-2 rounded-full font-medium text-sm transition-all ${
                      liked
                        ? 'bg-red-50 text-red-600 border-2 border-red-200'
                        : 'bg-gray-100 text-gray-600 border-2 border-transparent hover:border-gray-300'
                    }`}
                  >
                    <span className="text-base">{liked ? '❤️' : '🤍'}</span>
                    <span>{liked ? '已赞' : '点赞'} · {likeCount}</span>
                  </button>
                  {/* 评论数统计（非交互） */}
                  <div className="flex items-center gap-1.5 text-sm text-gray-500">
                    <span>💬</span>
                    <span>{comments.length} 条评论</span>
                  </div>
                </div>
              </div>
            </div>

            {/* ===== 评论区域 ===== */}
            <div className="bg-white rounded-2xl border p-5 mt-4">
              <h3 className="font-bold text-gray-900 mb-4 flex items-center gap-2">
                <span>💬</span>
                评论区 ({comments.length})
              </h3>

              {/* === 评论输入框 === */}
              <div className="mb-5">
                <textarea
                  value={newComment}
                  onChange={(e) => setNewComment(e.target.value)}
                  placeholder="写下你的想法..."
                  className="w-full border rounded-xl p-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-300 resize-none"
                  rows={3}
                />
                <div className="flex justify-end mt-2">
                  <button
                    onClick={handleAddComment}
                    className="bg-blue-600 text-white text-sm px-4 py-1.5 rounded-full hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                    disabled={!newComment.trim()}
                  >
                    发布评论
                  </button>
                </div>
              </div>

              {/* === 评论列表 === */}
              <div className="space-y-4">
                {comments.length === 0 ? (
                  // 空状态：暂无评论
                  <div className="text-center py-8 text-gray-400">
                    <div className="text-3xl mb-2">💭</div>
                    <p className="text-sm">暂无评论，来说两句吧</p>
                  </div>
                ) : (
                  // 评论项渲染
                  comments.map((comment) => (
                    <div key={comment.id} className="flex gap-3 pb-4 border-b last:border-0">
                      {/* 评论者头像 */}
                      <div className={`w-9 h-9 rounded-full bg-gradient-to-br ${comment.avatarGrad} flex items-center justify-center text-white text-xs font-bold flex-shrink-0`}>
                        {comment.avatar}
                      </div>
                      <div className="flex-1 min-w-0">
                        {/* 评论者信息和时间 */}
                        <div className="flex items-center justify-between gap-2 mb-1">
                          <span className="text-sm font-semibold text-gray-900">{comment.author}</span>
                          <span className="text-xs text-gray-400">{comment.createdAt}</span>
                        </div>
                        {/* 评论内容 */}
                        <p className="text-sm text-gray-700 mb-2 leading-relaxed">{comment.content}</p>
                        {/* 评论点赞按钮：计算实时点赞数（原始值 + 当前用户点赞） */}
                        <button
                          onClick={() => handleCommentLike(comment.id)}
                          className={`text-xs flex items-center gap-1 transition-colors ${
                            commentLikes[comment.id] ? 'text-red-500' : 'text-gray-400 hover:text-red-400'
                          }`}
                        >
                          <span>{commentLikes[comment.id] ? '❤️' : '🤍'}</span>
                          <span>{comment.likes + (commentLikes[comment.id] ? 1 : 0)}</span>
                        </button>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          </div>

          {/* ===== 右侧边栏（占1列） ===== */}
          <div className="space-y-4">
            {/* === 作者卡片：提供关注功能 === */}
            <div className="bg-white rounded-2xl border p-5">
              <div className="flex items-center gap-3 mb-3">
                <div className={`w-12 h-12 rounded-full bg-gradient-to-br ${article.avatarGrad} flex items-center justify-center text-white font-bold`}>
                  {article.avatar}
                </div>
                <div>
                  <p className="font-semibold text-gray-900 text-sm">{article.author}</p>
                  <p className="text-xs text-gray-500">{article.authorTitle}</p>
                </div>
              </div>
              <button className="w-full bg-blue-600 text-white text-sm py-2 rounded-lg hover:bg-blue-700 transition-colors font-medium">
                + 关注
              </button>
            </div>

            {/* === 相关推荐文章 === */}
            {relatedArticles.length > 0 && (
              <div className="bg-white rounded-2xl border p-4">
                <h3 className="font-semibold text-gray-900 mb-3 text-sm flex items-center gap-1.5">
                  <span>📖</span> 相关推荐
                </h3>
                <div className="space-y-3">
                  {relatedArticles.map((a) => (
                    <Link key={a.id} href={`/community/blog/${a.id}`} className="block group">
                      {/* 装饰性渐变条 */}
                      <div className={`h-1.5 bg-gradient-to-r ${a.coverGrad} rounded-full mb-2`} />
                      {/* 文章标题：hover 时变蓝 */}
                      <p className="text-sm text-gray-700 group-hover:text-blue-600 transition-colors line-clamp-2 leading-snug mb-1">
                        {a.title}
                      </p>
                      {/* 文章统计数据 */}
                      <div className="flex items-center gap-2 text-xs text-gray-400">
                        <span>👁 {a.views.toLocaleString()}</span>
                        <span>❤️ {a.likes}</span>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            )}

            {/* === 返回列表按钮 === */}
            <Link
              href="/community/blog"
              className="block text-center text-sm text-blue-600 bg-blue-50 border border-blue-100 rounded-xl py-2.5 hover:bg-blue-100 transition-colors"
            >
              ← 返回博客列表
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
