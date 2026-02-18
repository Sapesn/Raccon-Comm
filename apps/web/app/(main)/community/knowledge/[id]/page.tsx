'use client'

import { useState } from 'react'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { ALL_KBS } from '../data'

export default function KnowledgeDetailPage({ params }: { params: { id: string } }) {
  const kb = ALL_KBS.find((k) => k.id === params.id)

  if (!kb) {
    notFound()
  }

  const [saved, setSaved] = useState(false)
  const [liked, setLiked] = useState(false)
  const [likeCount, setLikeCount] = useState(kb.likes)
  const [showSaveModal, setShowSaveModal] = useState(false)
  const [saveStep, setSaveStep] = useState(0)
  const [saveDone, setSaveDone] = useState(false)

  const handleSave = () => {
    if (!saved) {
      setShowSaveModal(true)
    }
  }

  const handleStartSave = () => {
    if (!saveDone) {
      const timer = setInterval(() => {
        setSaveStep((s) => {
          if (s >= 2) {
            clearInterval(timer)
            setSaveDone(true)
            setSaved(true)
            setTimeout(() => setShowSaveModal(false), 1200)
            return s
          }
          return s + 1
        })
      }, 800)
    }
  }

  const handleLike = () => {
    setLiked(!liked)
    setLikeCount(liked ? likeCount - 1 : likeCount + 1)
  }

  const saveSteps = [
    { icon: '📂', title: '读取知识库结构', desc: '正在解析知识库文档目录...' },
    { icon: '📋', title: '复制文档内容', desc: `正在复制 ${kb.docCount} 篇文档...` },
    { icon: '✅', title: '存入我的知识库', desc: '即将完成转存，稍等片刻...' },
  ]

  // Related knowledge bases
  const relatedKBs = ALL_KBS.filter((k) => k.industry === kb.industry && k.id !== kb.id).slice(0, 3)

  return (
    <>
      <div className="min-h-[calc(100vh-56px)] bg-[#f5f7fa]">
        <div className="container mx-auto px-4 py-6 max-w-6xl">
          {/* Breadcrumb */}
          <nav className="text-xs text-gray-500 mb-4 flex items-center gap-1.5">
            <Link href="/community" className="hover:text-emerald-600">社区</Link>
            <span>/</span>
            <Link href="/community/knowledge" className="hover:text-emerald-600">知识库</Link>
            <span>/</span>
            <span className="text-gray-700 line-clamp-1">{kb.title}</span>
          </nav>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Main Content */}
            <div className="lg:col-span-2">
              <div className="bg-white rounded-2xl border overflow-hidden">
                {/* Header */}
                <div className="bg-gradient-to-r from-emerald-500 to-teal-600 h-3" />

                <div className="p-6">
                  {/* Tags + Meta */}
                  <div className="flex items-center gap-2 mb-3 flex-wrap">
                    <span className="text-xs bg-emerald-50 text-emerald-600 border border-emerald-100 px-2 py-0.5 rounded-full font-medium">
                      {kb.industry}
                    </span>
                    {kb.isOfficial && (
                      <span className="text-xs bg-amber-50 text-amber-600 border border-amber-100 px-2 py-0.5 rounded-full font-medium">
                        官方推荐
                      </span>
                    )}
                    <span className="text-xs text-gray-400">{kb.updatedAt} 更新</span>
                    <span className="text-xs text-gray-400">· 👁 {kb.views.toLocaleString()} 次浏览</span>
                  </div>

                  {/* Title */}
                  <h1 className="text-2xl font-black text-gray-900 mb-4 leading-snug">
                    {kb.title}
                  </h1>

                  {/* Author */}
                  <div className="flex items-center gap-3 pb-5 mb-5 border-b">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-emerald-400 to-blue-400 flex items-center justify-center text-white text-sm font-bold">
                      {typeof kb.avatar === 'string' && kb.avatar.length > 1 ? kb.avatar : kb.avatar}
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-gray-900">{kb.author}</p>
                      <p className="text-xs text-gray-500">发布于 {kb.createdAt}</p>
                    </div>
                  </div>

                  {/* Description */}
                  <div className="mb-6">
                    <h2 className="text-lg font-bold text-gray-900 mb-3 flex items-center gap-2">
                      <span>📖</span> 知识库介绍
                    </h2>
                    <p className="text-sm text-gray-700 leading-relaxed">
                      {kb.desc}
                    </p>
                  </div>

                  {/* Meta Info */}
                  <div className="bg-emerald-50 rounded-xl p-4 mb-6 grid grid-cols-2 sm:grid-cols-3 gap-3">
                    <div>
                      <div className="text-xs text-emerald-600 mb-1">文档数量</div>
                      <div className="text-lg font-bold text-emerald-700">{kb.docCount} 篇</div>
                    </div>
                    <div>
                      <div className="text-xs text-emerald-600 mb-1">文件类型</div>
                      <div className="text-sm font-medium text-emerald-700">{kb.fileTypes.join(' / ')}</div>
                    </div>
                    <div>
                      <div className="text-xs text-emerald-600 mb-1">转存次数</div>
                      <div className="text-lg font-bold text-emerald-700">{kb.saves.toLocaleString()}</div>
                    </div>
                  </div>

                  {/* Usage Pattern */}
                  <div className="mb-6">
                    <h2 className="text-lg font-bold text-gray-900 mb-3 flex items-center gap-2">
                      <span>💡</span> 使用示例
                    </h2>
                    <div className="bg-blue-50 rounded-xl px-4 py-3">
                      <p className="text-xs font-medium text-blue-700 mb-1.5">小浣熊中这样使用：</p>
                      <p className="text-sm text-blue-600 font-mono break-all leading-relaxed">{kb.usagePattern}</p>
                    </div>
                  </div>

                  {/* PAW Steps */}
                  <div className="mb-6">
                    <h2 className="text-lg font-bold text-gray-900 mb-3 flex items-center gap-2">
                      <span>🐾</span> PAW 三步法使用指引
                    </h2>
                    <div className="flex flex-col sm:flex-row gap-2">
                      {kb.pawSteps.map((step, i) => (
                        <div
                          key={i}
                          className={`flex-1 rounded-xl px-4 py-3 text-sm ${
                            i === 0
                              ? 'bg-blue-50 text-blue-700 border border-blue-100'
                              : i === 1
                              ? 'bg-violet-50 text-violet-700 border border-violet-100'
                              : 'bg-emerald-50 text-emerald-700 border border-emerald-100'
                          }`}
                        >
                          {step}
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Document Preview */}
                  <div className="mb-6">
                    <h2 className="text-lg font-bold text-gray-900 mb-3 flex items-center gap-2">
                      <span>📄</span> 文档目录（部分）
                    </h2>
                    <div className="bg-gray-50 rounded-xl p-4">
                      <ul className="space-y-2">
                        {kb.preview.map((doc, i) => (
                          <li key={i} className="flex items-center gap-2.5 text-sm text-gray-700">
                            <span className="text-gray-400 text-base">📄</span>
                            {doc}
                          </li>
                        ))}
                        <li className="text-xs text-gray-400 pt-2 border-t">...共 {kb.docCount} 篇文档</li>
                      </ul>
                    </div>
                  </div>

                  {/* Linked Chains */}
                  <div className="mb-6">
                    <h2 className="text-lg font-bold text-gray-900 mb-3 flex items-center gap-2">
                      <span>⚡</span> 配套链路
                    </h2>
                    <div className="flex flex-wrap gap-2">
                      {kb.linkedChains.map((chain) => (
                        <div key={chain} className="bg-violet-50 text-violet-700 border border-violet-100 px-3 py-2 rounded-lg text-sm font-medium">
                          ⚡ {chain}
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-1.5 mb-5 pt-5 border-t">
                    {kb.tags.map((tag) => (
                      <span key={tag} className="text-xs bg-gray-100 text-gray-600 px-2.5 py-1 rounded-full">
                        #{tag}
                      </span>
                    ))}
                  </div>

                  {/* Action Buttons */}
                  <div className="flex items-center gap-3 pt-5 border-t">
                    <button
                      onClick={handleSave}
                      disabled={saved}
                      className={`flex items-center gap-2 px-5 py-2.5 rounded-full font-medium text-sm transition-all ${
                        saved
                          ? 'bg-green-50 text-green-600 border-2 border-green-200'
                          : 'bg-emerald-600 text-white hover:bg-emerald-700 shadow-md hover:shadow-lg'
                      }`}
                    >
                      <span className="text-base">{saved ? '✅' : '📥'}</span>
                      <span>{saved ? '已转存' : '一键转存'}</span>
                    </button>
                    <button
                      onClick={handleLike}
                      className={`flex items-center gap-2 px-4 py-2 rounded-full font-medium text-sm transition-all ${
                        liked
                          ? 'bg-red-50 text-red-600 border-2 border-red-200'
                          : 'bg-gray-100 text-gray-600 border-2 border-transparent hover:border-gray-300'
                      }`}
                    >
                      <span className="text-base">{liked ? '❤️' : '🤍'}</span>
                      <span>{likeCount}</span>
                    </button>
                    <div className="flex items-center gap-1.5 text-sm text-gray-500">
                      <span>📥</span>
                      <span>{kb.saves.toLocaleString()} 转存</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Sidebar */}
            <div className="space-y-4">
              {/* Author Card */}
              <div className="bg-white rounded-2xl border p-5">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-emerald-400 to-blue-400 flex items-center justify-center text-white font-bold">
                    {typeof kb.avatar === 'string' && kb.avatar.length > 1 ? kb.avatar : kb.avatar}
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900 text-sm">{kb.author}</p>
                    <p className="text-xs text-gray-500">知识库作者</p>
                  </div>
                </div>
                <button className="w-full bg-emerald-600 text-white text-sm py-2 rounded-lg hover:bg-emerald-700 transition-colors font-medium">
                  + 关注
                </button>
              </div>

              {/* Related KBs */}
              {relatedKBs.length > 0 && (
                <div className="bg-white rounded-2xl border p-4">
                  <h3 className="font-semibold text-gray-900 mb-3 text-sm flex items-center gap-1.5">
                    <span>📚</span> 相关推荐
                  </h3>
                  <div className="space-y-3">
                    {relatedKBs.map((k) => (
                      <Link key={k.id} href={`/community/knowledge/${k.id}`} className="block group">
                        <div className="bg-gradient-to-r from-emerald-500 to-teal-600 h-1.5 rounded-full mb-2" />
                        <p className="text-sm text-gray-700 group-hover:text-emerald-600 transition-colors line-clamp-2 leading-snug mb-1">
                          {k.title}
                        </p>
                        <div className="flex items-center gap-2 text-xs text-gray-400">
                          <span>👁 {k.views.toLocaleString()}</span>
                          <span>📥 {k.saves.toLocaleString()}</span>
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>
              )}

              {/* Back to List */}
              <Link
                href="/community/knowledge"
                className="block text-center text-sm text-emerald-600 bg-emerald-50 border border-emerald-100 rounded-xl py-2.5 hover:bg-emerald-100 transition-colors"
              >
                ← 返回知识库列表
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Save Modal */}
      {showSaveModal && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4" onClick={() => !saveDone && setShowSaveModal(false)}>
          <div className="bg-white rounded-2xl p-6 w-full max-w-md shadow-2xl" onClick={(e) => e.stopPropagation()}>
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-bold text-gray-900">📥 一键转存</h3>
              <button onClick={() => setShowSaveModal(false)} className="text-gray-400 hover:text-gray-600 text-xl">×</button>
            </div>

            <div className="bg-emerald-50 rounded-xl p-4 mb-4">
              <p className="text-sm font-semibold text-gray-800 mb-1">{kb.title}</p>
              <p className="text-xs text-gray-500 mb-2">{kb.docCount} 篇文档 · {kb.fileTypes.join('、')}</p>
              <div className="flex gap-2 flex-wrap">
                {kb.tags.map((tag) => (
                  <span key={tag} className="text-xs bg-emerald-100 text-emerald-700 px-2 py-0.5 rounded-full">#{tag}</span>
                ))}
              </div>
            </div>

            <div className="bg-blue-50 rounded-xl p-3 mb-4">
              <p className="text-xs font-medium text-blue-700 mb-1">💡 转存后在小浣熊中这样使用：</p>
              <p className="text-xs text-blue-600 font-mono break-all">{kb.usagePattern}</p>
            </div>

            <div className="space-y-3 mb-5">
              {saveSteps.map((s, i) => (
                <div
                  key={i}
                  className={`flex items-center gap-3 p-3 rounded-xl transition-all ${
                    i <= saveStep ? 'bg-emerald-50 border border-emerald-100' : 'bg-gray-50 border border-transparent'
                  }`}
                >
                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center text-lg flex-shrink-0 ${
                      saveDone && i <= saveStep ? 'bg-emerald-100' : i === saveStep && !saveDone ? 'bg-blue-100' : i < saveStep ? 'bg-emerald-100' : 'bg-gray-100'
                    }`}
                  >
                    {i < saveStep ? '✅' : s.icon}
                  </div>
                  <div>
                    <div className={`text-sm font-medium ${i <= saveStep ? 'text-gray-900' : 'text-gray-400'}`}>{s.title}</div>
                    <div className={`text-xs ${i <= saveStep ? 'text-gray-500' : 'text-gray-300'}`}>{s.desc}</div>
                  </div>
                </div>
              ))}
            </div>

            {saveStep === 0 && !saveDone ? (
              <button
                onClick={handleStartSave}
                className="w-full bg-emerald-600 text-white py-3 rounded-xl font-semibold hover:bg-emerald-700 transition-colors"
              >
                📥 立即转存到我的知识库
              </button>
            ) : saveDone ? (
              <div className="text-center">
                <div className="text-4xl mb-2">🎉</div>
                <p className="text-sm font-semibold text-emerald-600">转存成功！</p>
                <p className="text-xs text-gray-500 mt-1">可在"我的知识库"中查看</p>
              </div>
            ) : (
              <div className="flex items-center justify-center gap-2 text-sm text-gray-500">
                <div className="w-4 h-4 border-2 border-emerald-500 border-t-transparent rounded-full animate-spin" />
                正在转存...
              </div>
            )}
          </div>
        </div>
      )}
    </>
  )
}
