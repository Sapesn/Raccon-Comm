/**
 * 讨论帖详情页组件
 *
 * 功能概述:
 * - 展示社区讨论帖的完整内容，支持 Markdown 格式内联渲染
 * - 提供点赞、发布回复等互动功能
 * - 显示相关讨论推荐
 *
 * Markdown 渲染策略（轻量级内联解析）:
 * 1. 按双换行分割段落（模拟 Markdown 段落分隔逻辑）
 * 2. 检测 **content** 格式 → 渲染为 <h2> 标题
 * 3. 检测 ```code``` 格式 → 渲染为代码块
 * 4. 普通段落 → 进一步解析内联 **bold** 加粗语法
 *
 * 注: 这是一个轻量级自定义 Markdown 解析器，非完整规范实现
 */
'use client'

import { useState } from 'react'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { POSTS, REPLIES } from '../data'

/**
 * 讨论帖详情页主组件
 *
 * 页面布局：
 * - 左侧主内容区（2/3）：帖子正文、回复列表
 * - 右侧边栏（1/3）：作者卡片、相关讨论、返回按钮
 *
 * 状态管理:
 * - liked / likeCount: 帖子点赞状态与实时计数
 * - replyText: 回复输入框内容
 * - replies: 当前回复列表（支持实时追加）
 * - replyLikes: 各回复的点赞状态 { replyId: boolean }
 *
 * @param params - 路由参数，包含帖子 id
 */
export default function DiscussDetailPage({ params }: { params: { id: string } }) {
  // 根据 URL 参数查找帖子
  const post = POSTS.find((p) => p.id === params.id)

  // 帖子不存在时触发 404
  if (!post) {
    notFound()
  }

  // 筛选属于当前帖子的所有回复
  const postReplies = REPLIES.filter((r) => r.postId === params.id)

  // ========== 状态管理 ==========
  const [liked, setLiked] = useState(false)
  const [likeCount, setLikeCount] = useState(post.likes)
  const [replyText, setReplyText] = useState('')
  // 回复列表从静态数据初始化，支持用户新增
  const [replies, setReplies] = useState(postReplies)
  // 回复点赞状态字典：replyId -> 是否已点赞
  const [replyLikes, setReplyLikes] = useState<Record<string, boolean>>({})

  /**
   * 切换帖子点赞状态
   * 乐观更新：先更新本地状态，实际场景中应同步 API
   */
  const handleLike = () => {
    setLiked(!liked)
    setLikeCount(liked ? likeCount - 1 : likeCount + 1)
  }

  /**
   * 切换回复点赞状态
   *
   * @param replyId - 要操作的回复 ID
   */
  const handleReplyLike = (replyId: string) => {
    setReplyLikes((prev) => ({ ...prev, [replyId]: !prev[replyId] }))
  }

  /**
   * 发布新回复
   *
   * 流程:
   * 1. 校验输入非空（trim 后检查）
   * 2. 构建新回复对象，使用时间戳生成唯一 ID
   * 3. 追加到回复列表末尾（时间顺序）
   * 4. 清空输入框
   */
  const handleAddReply = () => {
    if (!replyText.trim()) return
    setReplies([
      ...replies,
      {
        id: `r-new-${Date.now()}`,
        postId: params.id,
        author: '小浣熊用户',
        avatar: 'A',
        avatarGrad: 'from-blue-400 to-violet-500',
        content: replyText,
        likes: 0,
        createdAt: '刚刚',
      },
    ])
    setReplyText('')
  }

  // ========== 相关内容计算 ==========
  // 同类别其他帖子，最多显示3个
  // Related posts: same category
  const relatedPosts = POSTS.filter((p) => p.category === post.category && p.id !== post.id).slice(0, 3)

  /**
   * 轻量级 Markdown 内联解析
   *
   * 解析逻辑:
   * 1. 按 \n\n 分割：得到段落数组（与 Markdown 标准规范一致）
   * 2. 过滤空段落（filter(Boolean)）
   * 3. 后续在渲染时对每段进行类型判断
   *
   * 注：选择手动分割而非使用 remark/marked 等库，
   * 是为了减少依赖并保持渲染逻辑自控
   */
  // Render content paragraphs (split by double newline for markdown-like sections)
  const paragraphs = post.content.split('\n\n').filter(Boolean)

  return (
    <div className="min-h-[calc(100vh-56px)] bg-[#f5f7fa]">
      <div className="container mx-auto px-4 py-6 max-w-6xl">
        {/* 面包屑导航 */}
        <nav className="text-xs text-gray-500 mb-4 flex items-center gap-1.5">
          <Link href="/community" className="hover:text-blue-600">社区</Link>
          <span>/</span>
          <Link href="/community/discuss" className="hover:text-blue-600">讨论区</Link>
          <span>/</span>
          <span className="text-gray-700 line-clamp-1">{post.title}</span>
        </nav>

        {/* 主体：左右分栏布局 */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* ===== 左侧主内容区（2列） ===== */}
          <div className="lg:col-span-2">
            {/* 帖子内容卡片 */}
            <div className="bg-white rounded-2xl border overflow-hidden">
              {/* 顶部彩色渐变装饰条 */}
              <div className="h-1.5 bg-gradient-to-r from-blue-500 via-violet-500 to-purple-500" />

              <div className="p-6">
                {/* 元信息：分类、发布时间、浏览量 */}
                <div className="flex items-center gap-2 mb-3 flex-wrap">
                  <span className="text-xs bg-gray-100 text-gray-600 px-2 py-0.5 rounded-full font-medium">{post.category}</span>
                  <span className="text-xs text-gray-400">{post.createdAt}</span>
                  <span className="text-xs text-gray-400">· 👁 {post.views} 浏览</span>
                </div>

                {/* 帖子标题 */}
                <h1 className="text-2xl font-black text-gray-900 mb-4 leading-snug">
                  {post.title}
                </h1>

                {/* 作者信息 */}
                <div className="flex items-center gap-3 pb-5 mb-5 border-b">
                  <div className={`w-10 h-10 rounded-full bg-gradient-to-br ${post.avatarGrad} flex items-center justify-center text-white text-sm font-bold`}>
                    {post.avatar}
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-gray-900">{post.author}</p>
                    <p className="text-xs text-gray-500">发布于 {post.createdAt}</p>
                  </div>
                </div>

                {/* ===== 正文内容渲染（Markdown 解析） ===== */}
                <article className="space-y-4 mb-6">
                  {paragraphs.map((para, i) => {
                    /**
                     * 段落类型检测逻辑（按优先级排序）:
                     *
                     * 1. 标题检测: 整个段落被 ** 包裹
                     *    格式: **标题内容**
                     *    渲染: <h2> 标签
                     *
                     * 2. 代码块检测: 段落以 ``` 开头
                     *    格式: ```lang\ncode\n```
                     *    处理: 使用正则 /```[\w]*/g 移除语言声明
                     *    渲染: <pre> + 等宽字体代码块
                     *
                     * 3. 普通段落: 内联 **bold** 语法解析
                     *    使用正则 /(\*\*[^*]+\*\*)/ 分割含加粗的文本
                     *    对每个片段判断是否为加粗格式并渲染对应元素
                     */

                    // Bold headings (lines starting with **)
                    if (para.startsWith('**') && para.endsWith('**')) {
                      return (
                        <h2 key={i} className="text-lg font-bold text-gray-900 mt-2">
                          {para.slice(2, -2)}
                        </h2>
                      )
                    }
                    // Code block
                    if (para.startsWith('```')) {
                      // 移除代码块标记（含可能的语言声明，如 ```python）
                      const codeContent = para.replace(/```[\w]*/g, '').trim()
                      return (
                        <div key={i} className="bg-gray-900 text-green-400 text-xs p-4 rounded-xl font-mono overflow-x-auto whitespace-pre">
                          {codeContent}
                        </div>
                      )
                    }
                    // Normal paragraph — render inline **bold**
                    // 按 **...** 边界分割字符串，得到交替的普通文本和加粗片段数组
                    const parts = para.split(/(\*\*[^*]+\*\*)/)
                    return (
                      <p key={i} className="text-sm text-gray-700 leading-relaxed">
                        {parts.map((part, j) =>
                          // 判断片段是否为加粗格式（首尾均为 **）
                          part.startsWith('**') && part.endsWith('**')
                            ? <strong key={j} className="font-semibold text-gray-900">{part.slice(2, -2)}</strong>
                            : part
                        )}
                      </p>
                    )
                  })}
                </article>

                {/* 标签区 */}
                <div className="flex flex-wrap gap-1.5 mb-5 pt-4 border-t">
                  {post.tags.map((tag) => (
                    <span key={tag} className="text-xs bg-blue-50 text-blue-600 px-2.5 py-1 rounded-full">
                      #{tag}
                    </span>
                  ))}
                </div>

                {/* 互动操作区：点赞 + 回复计数 */}
                <div className="flex items-center gap-3 pt-4 border-t">
                  {/* 点赞按钮：切换状态并同步更新计数 */}
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
                  {/* 回复计数（非交互，实时更新） */}
                  <div className="flex items-center gap-1.5 text-sm text-gray-500">
                    <span>💬</span>
                    <span>{replies.length} 条回复</span>
                  </div>
                </div>
              </div>
            </div>

            {/* ===== 回复区域 ===== */}
            <div className="bg-white rounded-2xl border p-5 mt-4">
              <h3 className="font-bold text-gray-900 mb-4 flex items-center gap-2">
                <span>💬</span>
                全部回复 ({replies.length})
              </h3>

              {/* 回复输入框 */}
              <div className="mb-5">
                <textarea
                  value={replyText}
                  onChange={(e) => setReplyText(e.target.value)}
                  placeholder="写下你的回复..."
                  className="w-full border rounded-xl p-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-300 resize-none"
                  rows={3}
                />
                <div className="flex justify-end mt-2">
                  <button
                    onClick={handleAddReply}
                    disabled={!replyText.trim()}
                    className="bg-blue-600 text-white text-sm px-4 py-1.5 rounded-full hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    发布回复
                  </button>
                </div>
              </div>

              {/* 回复列表 */}
              <div className="space-y-4">
                {replies.length === 0 ? (
                  // 空状态提示
                  <div className="text-center py-8 text-gray-400">
                    <div className="text-3xl mb-2">💭</div>
                    <p className="text-sm">暂无回复，来说两句吧</p>
                  </div>
                ) : (
                  replies.map((reply) => (
                    <div key={reply.id} className="flex gap-3 pb-4 border-b last:border-0">
                      {/* 回复者头像 */}
                      <div className={`w-9 h-9 rounded-full bg-gradient-to-br ${reply.avatarGrad} flex items-center justify-center text-white text-xs font-bold flex-shrink-0`}>
                        {reply.avatar}
                      </div>
                      <div className="flex-1 min-w-0">
                        {/* 回复者信息 + 时间 */}
                        <div className="flex items-center justify-between gap-2 mb-1">
                          <span className="text-sm font-semibold text-gray-900">{reply.author}</span>
                          <span className="text-xs text-gray-400">{reply.createdAt}</span>
                        </div>
                        {/* 回复内容 */}
                        <p className="text-sm text-gray-700 mb-2 leading-relaxed">{reply.content}</p>
                        {/* 回复点赞：实时计算展示值 */}
                        <button
                          onClick={() => handleReplyLike(reply.id)}
                          className={`text-xs flex items-center gap-1 transition-colors ${
                            replyLikes[reply.id] ? 'text-red-500' : 'text-gray-400 hover:text-red-400'
                          }`}
                        >
                          <span>{replyLikes[reply.id] ? '❤️' : '🤍'}</span>
                          {/* 当前用户点赞时加1（乐观更新） */}
                          <span>{reply.likes + (replyLikes[reply.id] ? 1 : 0)}</span>
                        </button>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          </div>

          {/* ===== 右侧边栏（1列） ===== */}
          <div className="space-y-4">
            {/* 作者卡片 */}
            <div className="bg-white rounded-2xl border p-5">
              <div className="flex items-center gap-3 mb-3">
                <div className={`w-12 h-12 rounded-full bg-gradient-to-br ${post.avatarGrad} flex items-center justify-center text-white font-bold`}>
                  {post.avatar}
                </div>
                <div>
                  <p className="font-semibold text-gray-900 text-sm">{post.author}</p>
                  <p className="text-xs text-gray-500">社区成员</p>
                </div>
              </div>
              <button className="w-full bg-blue-600 text-white text-sm py-2 rounded-lg hover:bg-blue-700 transition-colors font-medium">
                + 关注
              </button>
            </div>

            {/* 相关讨论推荐：同类别帖子 */}
            {relatedPosts.length > 0 && (
              <div className="bg-white rounded-2xl border p-4">
                <h3 className="font-semibold text-gray-900 mb-3 text-sm flex items-center gap-1.5">
                  <span>💬</span> 相关讨论
                </h3>
                <div className="space-y-3">
                  {relatedPosts.map((p) => (
                    <Link key={p.id} href={`/community/discuss/${p.id}`} className="block group">
                      {/* 帖子标题：hover 时变蓝，长文本省略 */}
                      <p className="text-sm text-gray-700 group-hover:text-blue-600 transition-colors line-clamp-2 leading-snug mb-1">
                        {p.title}
                      </p>
                      {/* 帖子统计：回复数、点赞数、浏览量 */}
                      <div className="flex items-center gap-2 text-xs text-gray-400">
                        <span>💬 {p.replies}</span>
                        <span>❤️ {p.likes}</span>
                        <span>👁 {p.views}</span>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            )}

            {/* 返回列表按钮 */}
            <Link
              href="/community/discuss"
              className="block text-center text-sm text-blue-600 bg-blue-50 border border-blue-100 rounded-xl py-2.5 hover:bg-blue-100 transition-colors"
            >
              ← 返回讨论列表
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
