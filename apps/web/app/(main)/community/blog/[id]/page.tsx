'use client'

import { useState } from 'react'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { BLOG_ARTICLES, type ContentBlock } from '../data'

function detectLang(code: string): string {
  if (code.trimStart().startsWith('#')) return 'Shell / Prompt'
  if (code.includes('def ') || code.includes('import ') && code.includes(':')) return 'Python'
  if (code.includes('function ') || code.includes('const ') || code.includes('=>')) return 'JavaScript'
  if (code.includes('<') && code.includes('/>')) return 'JSX'
  if (code.includes('SELECT ') || code.includes('FROM ')) return 'SQL'
  if (code.includes('|') && code.includes('---')) return 'Markdown'
  return '代码'
}

function CodeBlock({ content }: { content: string }) {
  const [copied, setCopied] = useState(false)
  const lang = detectLang(content)

  const handleCopy = () => {
    navigator.clipboard.writeText(content).then(() => {
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    })
  }

  return (
    <div className="my-4 rounded-lg overflow-hidden border border-gray-800">
      <div className="flex items-center justify-between bg-gray-800 px-4 py-2">
        <span className="text-xs text-gray-400 font-medium">{lang}</span>
        <button
          onClick={handleCopy}
          className="flex items-center gap-1.5 text-xs text-gray-400 hover:text-white transition-colors"
        >
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
      <pre className="bg-gray-900 text-green-400 text-xs p-4 overflow-x-auto font-mono">
        <code>{content}</code>
      </pre>
    </div>
  )
}

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

export default function BlogDetailPage({ params }: { params: { id: string } }) {
  const article = BLOG_ARTICLES.find((a) => a.id === params.id)

  if (!article) {
    notFound()
  }

  const [liked, setLiked] = useState(false)
  const [likeCount, setLikeCount] = useState(article.likes)
  const [comments, setComments] = useState(article.comments)
  const [newComment, setNewComment] = useState('')
  const [commentLikes, setCommentLikes] = useState<Record<string, boolean>>({})

  const handleLike = () => {
    setLiked(!liked)
    setLikeCount(liked ? likeCount - 1 : likeCount + 1)
  }

  const handleCommentLike = (commentId: string) => {
    setCommentLikes((prev) => ({ ...prev, [commentId]: !prev[commentId] }))
  }

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

  // Related articles from same category
  const relatedArticles = BLOG_ARTICLES.filter(
    (a) => a.category === article.category && a.id !== article.id
  ).slice(0, 3)

  return (
    <div className="min-h-[calc(100vh-56px)] bg-[#f5f7fa]">
      <div className="container mx-auto px-4 py-6 max-w-6xl">

        {/* Breadcrumb */}
        <nav className="text-xs text-gray-500 mb-4 flex items-center gap-1.5">
          <Link href="/community" className="hover:text-blue-600">社区</Link>
          <span>/</span>
          <Link href="/community/blog" className="hover:text-blue-600">博客</Link>
          <span>/</span>
          <span className="text-gray-700 line-clamp-1">{article.title}</span>
        </nav>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Content */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-2xl border overflow-hidden">
              {/* Cover gradient */}
              <div className={`h-3 bg-gradient-to-r ${article.coverGrad}`} />

              <div className="p-6">
                {/* Category + Meta */}
                <div className="flex items-center gap-2 mb-3 flex-wrap">
                  <span className="text-xs bg-blue-50 text-blue-600 border border-blue-100 px-2 py-0.5 rounded-full font-medium">
                    {article.category}
                  </span>
                  <span className="text-xs text-gray-400">{article.createdAt}</span>
                  <span className="text-xs text-gray-400">· {article.readTime} 分钟阅读</span>
                  <span className="text-xs text-gray-400">· 👁 {article.views.toLocaleString()} 次浏览</span>
                </div>

                {/* Title */}
                <h1 className="text-2xl font-black text-gray-900 mb-4 leading-snug">
                  {article.title}
                </h1>

                {/* Author */}
                <div className="flex items-center gap-3 pb-5 mb-5 border-b">
                  <div className={`w-10 h-10 rounded-full bg-gradient-to-br ${article.avatarGrad} flex items-center justify-center text-white text-sm font-bold`}>
                    {article.avatar}
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-gray-900">{article.author}</p>
                    <p className="text-xs text-gray-500">{article.authorTitle}</p>
                  </div>
                </div>

                {/* Content */}
                <article className="prose prose-sm max-w-none">
                  {article.content.map((block) => (
                    <ContentBlockRenderer key={block.id} block={block} />
                  ))}
                </article>

                {/* Tags */}
                <div className="flex flex-wrap gap-1.5 mt-6 pt-5 border-t">
                  {article.tags.map((tag) => (
                    <span key={tag} className="text-xs bg-gray-100 text-gray-600 px-2.5 py-1 rounded-full">
                      #{tag}
                    </span>
                  ))}
                </div>

                {/* Like Button */}
                <div className="flex items-center gap-3 mt-5 pt-5 border-t">
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
                    <span>{comments.length} 条评论</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Comments Section */}
            <div className="bg-white rounded-2xl border p-5 mt-4">
              <h3 className="font-bold text-gray-900 mb-4 flex items-center gap-2">
                <span>💬</span>
                评论区 ({comments.length})
              </h3>

              {/* Comment Input */}
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

              {/* Comments List */}
              <div className="space-y-4">
                {comments.length === 0 ? (
                  <div className="text-center py-8 text-gray-400">
                    <div className="text-3xl mb-2">💭</div>
                    <p className="text-sm">暂无评论，来说两句吧</p>
                  </div>
                ) : (
                  comments.map((comment) => (
                    <div key={comment.id} className="flex gap-3 pb-4 border-b last:border-0">
                      <div className={`w-9 h-9 rounded-full bg-gradient-to-br ${comment.avatarGrad} flex items-center justify-center text-white text-xs font-bold flex-shrink-0`}>
                        {comment.avatar}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between gap-2 mb-1">
                          <span className="text-sm font-semibold text-gray-900">{comment.author}</span>
                          <span className="text-xs text-gray-400">{comment.createdAt}</span>
                        </div>
                        <p className="text-sm text-gray-700 mb-2 leading-relaxed">{comment.content}</p>
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

          {/* Sidebar */}
          <div className="space-y-4">
            {/* Author Card */}
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

            {/* Related Articles */}
            {relatedArticles.length > 0 && (
              <div className="bg-white rounded-2xl border p-4">
                <h3 className="font-semibold text-gray-900 mb-3 text-sm flex items-center gap-1.5">
                  <span>📖</span> 相关推荐
                </h3>
                <div className="space-y-3">
                  {relatedArticles.map((a) => (
                    <Link key={a.id} href={`/community/blog/${a.id}`} className="block group">
                      <div className={`h-1.5 bg-gradient-to-r ${a.coverGrad} rounded-full mb-2`} />
                      <p className="text-sm text-gray-700 group-hover:text-blue-600 transition-colors line-clamp-2 leading-snug mb-1">
                        {a.title}
                      </p>
                      <div className="flex items-center gap-2 text-xs text-gray-400">
                        <span>👁 {a.views.toLocaleString()}</span>
                        <span>❤️ {a.likes}</span>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            )}

            {/* Back to List */}
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
