'use client'

import { useState } from 'react'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { POSTS, REPLIES } from '../data'

export default function DiscussDetailPage({ params }: { params: { id: string } }) {
  const post = POSTS.find((p) => p.id === params.id)

  if (!post) {
    notFound()
  }

  const postReplies = REPLIES.filter((r) => r.postId === params.id)

  const [liked, setLiked] = useState(false)
  const [likeCount, setLikeCount] = useState(post.likes)
  const [replyText, setReplyText] = useState('')
  const [replies, setReplies] = useState(postReplies)
  const [replyLikes, setReplyLikes] = useState<Record<string, boolean>>({})

  const handleLike = () => {
    setLiked(!liked)
    setLikeCount(liked ? likeCount - 1 : likeCount + 1)
  }

  const handleReplyLike = (replyId: string) => {
    setReplyLikes((prev) => ({ ...prev, [replyId]: !prev[replyId] }))
  }

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

  // Related posts: same category
  const relatedPosts = POSTS.filter((p) => p.category === post.category && p.id !== post.id).slice(0, 3)

  // Render content paragraphs (split by double newline for markdown-like sections)
  const paragraphs = post.content.split('\n\n').filter(Boolean)

  return (
    <div className="min-h-[calc(100vh-56px)] bg-[#f5f7fa]">
      <div className="container mx-auto px-4 py-6 max-w-6xl">
        {/* Breadcrumb */}
        <nav className="text-xs text-gray-500 mb-4 flex items-center gap-1.5">
          <Link href="/community" className="hover:text-blue-600">社区</Link>
          <span>/</span>
          <Link href="/community/discuss" className="hover:text-blue-600">讨论区</Link>
          <span>/</span>
          <span className="text-gray-700 line-clamp-1">{post.title}</span>
        </nav>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Content */}
          <div className="lg:col-span-2">
            {/* Post Card */}
            <div className="bg-white rounded-2xl border overflow-hidden">
              <div className="h-1.5 bg-gradient-to-r from-blue-500 via-violet-500 to-purple-500" />

              <div className="p-6">
                {/* Meta */}
                <div className="flex items-center gap-2 mb-3 flex-wrap">
                  <span className="text-xs bg-gray-100 text-gray-600 px-2 py-0.5 rounded-full font-medium">{post.category}</span>
                  <span className="text-xs text-gray-400">{post.createdAt}</span>
                  <span className="text-xs text-gray-400">· 👁 {post.views} 浏览</span>
                </div>

                {/* Title */}
                <h1 className="text-2xl font-black text-gray-900 mb-4 leading-snug">
                  {post.title}
                </h1>

                {/* Author */}
                <div className="flex items-center gap-3 pb-5 mb-5 border-b">
                  <div className={`w-10 h-10 rounded-full bg-gradient-to-br ${post.avatarGrad} flex items-center justify-center text-white text-sm font-bold`}>
                    {post.avatar}
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-gray-900">{post.author}</p>
                    <p className="text-xs text-gray-500">发布于 {post.createdAt}</p>
                  </div>
                </div>

                {/* Content */}
                <article className="space-y-4 mb-6">
                  {paragraphs.map((para, i) => {
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
                      const codeContent = para.replace(/```[\w]*/g, '').trim()
                      return (
                        <div key={i} className="bg-gray-900 text-green-400 text-xs p-4 rounded-xl font-mono overflow-x-auto whitespace-pre">
                          {codeContent}
                        </div>
                      )
                    }
                    // Normal paragraph — render inline **bold**
                    const parts = para.split(/(\*\*[^*]+\*\*)/)
                    return (
                      <p key={i} className="text-sm text-gray-700 leading-relaxed">
                        {parts.map((part, j) =>
                          part.startsWith('**') && part.endsWith('**')
                            ? <strong key={j} className="font-semibold text-gray-900">{part.slice(2, -2)}</strong>
                            : part
                        )}
                      </p>
                    )
                  })}
                </article>

                {/* Tags */}
                <div className="flex flex-wrap gap-1.5 mb-5 pt-4 border-t">
                  {post.tags.map((tag) => (
                    <span key={tag} className="text-xs bg-blue-50 text-blue-600 px-2.5 py-1 rounded-full">
                      #{tag}
                    </span>
                  ))}
                </div>

                {/* Like + Stats */}
                <div className="flex items-center gap-3 pt-4 border-t">
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
                  <div className="flex items-center gap-1.5 text-sm text-gray-500">
                    <span>💬</span>
                    <span>{replies.length} 条回复</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Replies Section */}
            <div className="bg-white rounded-2xl border p-5 mt-4">
              <h3 className="font-bold text-gray-900 mb-4 flex items-center gap-2">
                <span>💬</span>
                全部回复 ({replies.length})
              </h3>

              {/* Reply Input */}
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

              {/* Replies List */}
              <div className="space-y-4">
                {replies.length === 0 ? (
                  <div className="text-center py-8 text-gray-400">
                    <div className="text-3xl mb-2">💭</div>
                    <p className="text-sm">暂无回复，来说两句吧</p>
                  </div>
                ) : (
                  replies.map((reply) => (
                    <div key={reply.id} className="flex gap-3 pb-4 border-b last:border-0">
                      <div className={`w-9 h-9 rounded-full bg-gradient-to-br ${reply.avatarGrad} flex items-center justify-center text-white text-xs font-bold flex-shrink-0`}>
                        {reply.avatar}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between gap-2 mb-1">
                          <span className="text-sm font-semibold text-gray-900">{reply.author}</span>
                          <span className="text-xs text-gray-400">{reply.createdAt}</span>
                        </div>
                        <p className="text-sm text-gray-700 mb-2 leading-relaxed">{reply.content}</p>
                        <button
                          onClick={() => handleReplyLike(reply.id)}
                          className={`text-xs flex items-center gap-1 transition-colors ${
                            replyLikes[reply.id] ? 'text-red-500' : 'text-gray-400 hover:text-red-400'
                          }`}
                        >
                          <span>{replyLikes[reply.id] ? '❤️' : '🤍'}</span>
                          <span>{reply.likes + (replyLikes[reply.id] ? 1 : 0)}</span>
                        </button>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-4">
            {/* Author Card */}
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

            {/* Related Posts */}
            {relatedPosts.length > 0 && (
              <div className="bg-white rounded-2xl border p-4">
                <h3 className="font-semibold text-gray-900 mb-3 text-sm flex items-center gap-1.5">
                  <span>💬</span> 相关讨论
                </h3>
                <div className="space-y-3">
                  {relatedPosts.map((p) => (
                    <Link key={p.id} href={`/community/discuss/${p.id}`} className="block group">
                      <p className="text-sm text-gray-700 group-hover:text-blue-600 transition-colors line-clamp-2 leading-snug mb-1">
                        {p.title}
                      </p>
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

            {/* Back to List */}
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
