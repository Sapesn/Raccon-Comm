'use client'

import { useState } from 'react'
import Link from 'next/link'
import { MESSAGES, type Message, type MessageCategory } from './data'

const CATEGORY_TABS: { key: MessageCategory | 'all'; label: string; icon: string }[] = [
  { key: 'all', label: '全部', icon: '📬' },
  { key: 'user', label: '用户消息', icon: '👤' },
  { key: 'system', label: '系统通知', icon: '🔔' },
  { key: 'notification', label: '@提醒 & 动态', icon: '⚡' },
]

const CATEGORY_COLORS: Record<MessageCategory, string> = {
  user: 'bg-blue-100 text-blue-700',
  system: 'bg-violet-100 text-violet-700',
  notification: 'bg-amber-100 text-amber-700',
}

const CATEGORY_LABELS: Record<MessageCategory, string> = {
  user: '用户消息',
  system: '系统通知',
  notification: '动态',
}

function RelatedContentLink({ rel }: { rel: NonNullable<Message['relatedContent']> }) {
  const icons = { case: '📂', kb: '📚', discussion: '💬' }
  const paths = { case: '/community/cases', kb: '/community/knowledge', discussion: '/community/discuss' }
  return (
    <Link
      href={`${paths[rel.type]}/${rel.id}`}
      className="inline-flex items-center gap-1.5 text-xs text-blue-600 bg-blue-50 border border-blue-100 rounded-lg px-2.5 py-1 hover:bg-blue-100 transition-colors mt-2"
    >
      <span>{icons[rel.type]}</span>
      <span className="truncate max-w-[200px]">{rel.title}</span>
      <span>→</span>
    </Link>
  )
}

function MessageDetail({ msg, onClose, onMarkRead }: { msg: Message; onClose: () => void; onMarkRead: (id: string) => void }) {
  return (
    <div className="bg-white rounded-2xl border shadow-sm overflow-hidden">
      <div className={`h-1 bg-gradient-to-r ${msg.from.avatarGrad}`} />
      <div className="p-5">
        <div className="flex items-start justify-between gap-3 mb-4">
          <div className="flex items-start gap-3 flex-1 min-w-0">
            <div className={`w-10 h-10 rounded-full bg-gradient-to-br ${msg.from.avatarGrad} flex items-center justify-center text-white text-sm font-bold flex-shrink-0`}>
              {msg.from.avatar}
            </div>
            <div className="min-w-0">
              <div className="flex items-center gap-2 flex-wrap mb-0.5">
                <span className="font-semibold text-gray-900 text-sm">{msg.from.name}</span>
                <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${CATEGORY_COLORS[msg.category]}`}>
                  {CATEGORY_LABELS[msg.category]}
                </span>
              </div>
              <p className="text-xs text-gray-400">{msg.timestamp}</p>
            </div>
          </div>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600 transition-colors flex-shrink-0">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <h3 className="font-bold text-gray-900 mb-3">{msg.subject}</h3>
        <p className="text-sm text-gray-700 leading-relaxed">{msg.content}</p>

        {msg.relatedContent && <RelatedContentLink rel={msg.relatedContent} />}

        <div className="flex items-center gap-2 mt-4 pt-4 border-t">
          {msg.category === 'user' && (
            <button className="bg-blue-600 text-white text-xs px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors font-medium">
              回复
            </button>
          )}
          {msg.status === 'unread' && (
            <button
              onClick={() => onMarkRead(msg.id)}
              className="text-xs text-gray-500 border border-gray-200 px-3 py-2 rounded-lg hover:bg-gray-50 transition-colors"
            >
              标记已读
            </button>
          )}
        </div>
      </div>
    </div>
  )
}

export default function MessagesPage() {
  const [messages, setMessages] = useState(MESSAGES)
  const [activeCategory, setActiveCategory] = useState<MessageCategory | 'all'>('all')
  const [selectedId, setSelectedId] = useState<string | null>(null)
  const [showUnreadOnly, setShowUnreadOnly] = useState(false)

  const unreadCount = messages.filter((m) => m.status === 'unread').length

  const filtered = messages.filter((m) => {
    if (activeCategory !== 'all' && m.category !== activeCategory) return false
    if (showUnreadOnly && m.status !== 'unread') return false
    return true
  })

  const handleSelect = (id: string) => {
    setSelectedId(selectedId === id ? null : id)
    // Mark as read when opened
    setMessages((prev) => prev.map((m) => m.id === id ? { ...m, status: 'read' } : m))
  }

  const handleMarkAllRead = () => {
    setMessages((prev) => prev.map((m) => ({ ...m, status: 'read' })))
  }

  const handleMarkRead = (id: string) => {
    setMessages((prev) => prev.map((m) => m.id === id ? { ...m, status: 'read' } : m))
  }

  const selectedMsg = messages.find((m) => m.id === selectedId)

  return (
    <div className="min-h-[calc(100vh-56px)] bg-[#f5f7fa]">
      <div className="container mx-auto px-4 py-6 max-w-4xl">

        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl font-black text-gray-900">站内信</h1>
            <p className="text-sm text-gray-500 mt-0.5">
              {unreadCount > 0 ? `${unreadCount} 条未读消息` : '全部已读'}
            </p>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => setShowUnreadOnly(!showUnreadOnly)}
              className={`text-xs px-3 py-1.5 rounded-full border transition-colors ${
                showUnreadOnly
                  ? 'bg-blue-600 text-white border-blue-600'
                  : 'bg-white text-gray-600 border-gray-200 hover:border-gray-300'
              }`}
            >
              仅未读
            </button>
            {unreadCount > 0 && (
              <button
                onClick={handleMarkAllRead}
                className="text-xs px-3 py-1.5 rounded-full border bg-white text-gray-600 border-gray-200 hover:border-gray-300 transition-colors"
              >
                全部已读
              </button>
            )}
          </div>
        </div>

        {/* Category Tabs */}
        <div className="flex gap-1.5 mb-5 overflow-x-auto pb-1">
          {CATEGORY_TABS.map((tab) => {
            const tabUnread = tab.key === 'all'
              ? unreadCount
              : messages.filter((m) => m.category === tab.key && m.status === 'unread').length
            return (
              <button
                key={tab.key}
                onClick={() => { setActiveCategory(tab.key); setSelectedId(null) }}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-sm font-medium whitespace-nowrap transition-colors ${
                  activeCategory === tab.key
                    ? 'bg-blue-600 text-white'
                    : 'bg-white text-gray-600 hover:bg-gray-50 border border-gray-200'
                }`}
              >
                <span>{tab.icon}</span>
                <span>{tab.label}</span>
                {tabUnread > 0 && (
                  <span className={`text-xs px-1.5 py-0.5 rounded-full font-bold ${
                    activeCategory === tab.key ? 'bg-white/30 text-white' : 'bg-red-500 text-white'
                  }`}>
                    {tabUnread}
                  </span>
                )}
              </button>
            )
          })}
        </div>

        {/* Message List */}
        <div className="space-y-2">
          {filtered.length === 0 ? (
            <div className="text-center py-16 bg-white rounded-2xl border">
              <div className="text-5xl mb-3">📭</div>
              <p className="text-gray-500 font-medium">暂无消息</p>
              <p className="text-sm text-gray-400 mt-1">
                {showUnreadOnly ? '当前分类下没有未读消息' : '当前分类下没有消息'}
              </p>
            </div>
          ) : (
            filtered.map((msg) => {
              const isSelected = selectedId === msg.id
              return (
                <div key={msg.id}>
                  <button
                    onClick={() => handleSelect(msg.id)}
                    className={`w-full text-left rounded-2xl border transition-all ${
                      isSelected
                        ? 'bg-blue-50 border-blue-200 shadow-sm'
                        : msg.status === 'unread'
                        ? 'bg-white border-blue-100 hover:border-blue-200 hover:shadow-sm'
                        : 'bg-white border-gray-100 hover:border-gray-200 hover:shadow-sm'
                    }`}
                  >
                    <div className="p-4">
                      <div className="flex items-start gap-3">
                        {/* Avatar */}
                        <div className="relative flex-shrink-0">
                          <div className={`w-10 h-10 rounded-full bg-gradient-to-br ${msg.from.avatarGrad} flex items-center justify-center text-white text-sm font-bold`}>
                            {msg.from.avatar}
                          </div>
                          {msg.status === 'unread' && (
                            <span className="absolute -top-0.5 -right-0.5 w-3 h-3 bg-red-500 rounded-full border-2 border-white" />
                          )}
                        </div>

                        {/* Content */}
                        <div className="flex-1 min-w-0">
                          <div className="flex items-start justify-between gap-2">
                            <div className="min-w-0 flex-1">
                              <div className="flex items-center gap-1.5 mb-0.5 flex-wrap">
                                <span className={`text-sm font-semibold ${msg.status === 'unread' ? 'text-gray-900' : 'text-gray-700'}`}>
                                  {msg.from.name}
                                </span>
                                <span className={`text-xs px-1.5 py-0.5 rounded-full font-medium ${CATEGORY_COLORS[msg.category]}`}>
                                  {CATEGORY_LABELS[msg.category]}
                                </span>
                              </div>
                              <p className={`text-sm truncate ${msg.status === 'unread' ? 'text-gray-900 font-medium' : 'text-gray-600'}`}>
                                {msg.subject}
                              </p>
                              <p className="text-xs text-gray-400 mt-0.5 truncate">{msg.preview}</p>
                            </div>
                            <span className="text-xs text-gray-400 flex-shrink-0 mt-0.5">{msg.timestamp}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </button>

                  {/* Inline Detail Panel */}
                  {isSelected && selectedMsg && (
                    <div className="mt-1 ml-0">
                      <MessageDetail
                        msg={selectedMsg}
                        onClose={() => setSelectedId(null)}
                        onMarkRead={handleMarkRead}
                      />
                    </div>
                  )}
                </div>
              )
            })
          )}
        </div>

        {/* Empty state tip */}
        {filtered.length > 0 && (
          <p className="text-center text-xs text-gray-400 mt-6">
            共 {filtered.length} 条消息 · 点击消息展开详情
          </p>
        )}
      </div>
    </div>
  )
}
