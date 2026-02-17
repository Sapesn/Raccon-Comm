'use client'

import { useState } from 'react'

type EventStatus = 'upcoming' | 'ongoing' | 'ended'
type EventType = 'self' | 'third'

const EVENTS = [
  {
    id: '1',
    title: '小浣熊 × 腾讯云 AI 应用实战黑客松',
    type: 'self' as EventType,
    status: 'upcoming' as EventStatus,
    category: '黑客松',
    date: '2026-03-15',
    dateDisplay: '3月15日 – 3月16日',
    location: '线上 + 上海线下同步',
    organizer: '小浣熊官方 × 腾讯云',
    organizerIcon: '🦝',
    desc: '以「AI 工作流自动化」为主题，参赛团队使用小浣熊链路能力在 24 小时内构建并演示一个解决真实场景的 AI 应用，设置总奖金池 50 万元。',
    tags: ['黑客松', 'AI 应用', '奖金 50 万'],
    seats: 200,
    registered: 134,
    price: '免费',
    highlight: true,
    icon: '⚡',
  },
  {
    id: '2',
    title: '2026 小浣熊用户大会',
    type: 'self' as EventType,
    status: 'upcoming' as EventStatus,
    category: '年度大会',
    date: '2026-04-20',
    dateDisplay: '4月20日（全天）',
    location: '上海·世博展览馆',
    organizer: '小浣熊官方',
    organizerIcon: '🦝',
    desc: '小浣熊年度旗舰峰会，汇聚 1000+ 企业用户、合作伙伴和行业专家，分享最新产品路线图、标杆客户案例和行业趋势洞察。',
    tags: ['年度峰会', '产品发布', '标杆案例'],
    seats: 1000,
    registered: 672,
    price: '免费（需报名）',
    highlight: true,
    icon: '🎯',
  },
  {
    id: '3',
    title: 'AI 工作流实战训练营（第五期）',
    type: 'self' as EventType,
    status: 'ongoing' as EventStatus,
    category: '线上训练营',
    date: '2026-02-10',
    dateDisplay: '2月10日 – 2月28日（持续报名）',
    location: '线上直播 + 录播回放',
    organizer: '小浣熊官方',
    organizerIcon: '🦝',
    desc: '8 节系统课程，从小浣熊链路基础到复杂多步骤工作流搭建，每节课配套实战练习题，结营后颁发社区认证证书。',
    tags: ['系统课程', '证书', '8节课'],
    seats: 500,
    registered: 381,
    price: '¥199',
    highlight: false,
    icon: '📚',
  },
  {
    id: '4',
    title: 'AIGC 应用开发者大会 2026',
    type: 'third' as EventType,
    status: 'upcoming' as EventStatus,
    category: '行业大会',
    date: '2026-03-28',
    dateDisplay: '3月28日 – 3月29日',
    location: '北京·国家会议中心',
    organizer: 'InfoQ 极客邦',
    organizerIcon: '🏛️',
    desc: '面向 AI 应用开发者的年度技术峰会，小浣熊将在「企业 AI 工作流」专题专场分享在金融、医疗、法律等行业的规模化落地实践。',
    tags: ['行业大会', 'AI开发', '企业实践'],
    seats: 2000,
    registered: 1240,
    price: '¥1,580 起',
    highlight: false,
    icon: '🌐',
  },
  {
    id: '5',
    title: '知识库搭建工作坊（企业版）',
    type: 'self' as EventType,
    status: 'upcoming' as EventStatus,
    category: '线下工作坊',
    date: '2026-03-05',
    dateDisplay: '3月5日（周三 14:00–17:00）',
    location: '上海·商汤科技总部',
    organizer: '小浣熊官方',
    organizerIcon: '🦝',
    desc: '面向企业管理员的实操工作坊，现场手把手指导如何搭建企业专属知识库、配置权限管理、与现有 OA 系统集成。名额有限，优先企业用户。',
    tags: ['线下工作坊', '企业版', '实操'],
    seats: 30,
    registered: 28,
    price: '免费（企业用户专属）',
    highlight: false,
    icon: '🛠️',
  },
  {
    id: '6',
    title: 'WAIC 2026 世界人工智能大会',
    type: 'third' as EventType,
    status: 'upcoming' as EventStatus,
    category: '顶级峰会',
    date: '2026-07-10',
    dateDisplay: '7月10日 – 7月12日',
    location: '上海·世博展览馆',
    organizer: '上海市政府主办',
    organizerIcon: '🏛️',
    desc: '全球最具影响力的人工智能峰会之一，小浣熊将携最新版产品亮相，并在「AI 工作自动化」主题论坛发表主旨演讲，欢迎用户领取社区专属参会名额。',
    tags: ['顶级峰会', '小浣熊参展', '名额有限'],
    seats: 50,
    registered: 43,
    price: '社区用户专属名额',
    highlight: true,
    icon: '🌟',
  },
  {
    id: '7',
    title: 'Prompt 工程师认证考试（Q1）',
    type: 'self' as EventType,
    status: 'ongoing' as EventStatus,
    category: '资格认证',
    date: '2026-02-01',
    dateDisplay: '常态化报名，每月一期',
    location: '线上',
    organizer: '小浣熊官方',
    organizerIcon: '🦝',
    desc: '通过小浣熊官方 Prompt 工程师认证考试，获得行业认可的技能证书，同时解锁社区「认证 Prompt 工程师」专属身份徽章。',
    tags: ['认证考试', '徽章', 'Prompt工程'],
    seats: 999,
    registered: 312,
    price: '¥99',
    highlight: false,
    icon: '📜',
  },
  {
    id: '8',
    title: '社区案例征集大赛（第二季）',
    type: 'self' as EventType,
    status: 'ended' as EventStatus,
    category: '社区赛事',
    date: '2026-01-15',
    dateDisplay: '1月15日 – 2月15日（已结束）',
    location: '线上',
    organizer: '小浣熊官方',
    organizerIcon: '🦝',
    desc: '征集真实场景下的小浣熊应用案例，获奖案例将收录官方精选库并获得积分奖励。本季共征集 312 份案例，47 份入选精选。',
    tags: ['征集大赛', '已结束', '积分奖励'],
    seats: 999,
    registered: 312,
    price: '免费',
    highlight: false,
    icon: '🎁',
  },
]

const STATUS_MAP = {
  upcoming: { label: '即将开始', color: 'bg-blue-100 text-blue-700', dot: 'bg-blue-500' },
  ongoing: { label: '进行中', color: 'bg-green-100 text-green-700', dot: 'bg-green-500' },
  ended: { label: '已结束', color: 'bg-gray-100 text-gray-500', dot: 'bg-gray-400' },
}

const TYPE_MAP = {
  self: { label: '官方自办', color: 'bg-violet-100 text-violet-700' },
  third: { label: '三方活动', color: 'bg-orange-100 text-orange-700' },
}

const CATEGORY_FILTERS = ['全部', '黑客松', '年度大会', '线上训练营', '行业大会', '线下工作坊', '顶级峰会', '资格认证', '社区赛事']
const STATUS_FILTERS: (EventStatus | 'all')[] = ['all', 'upcoming', 'ongoing', 'ended']

export default function EventsPage() {
  const [statusFilter, setStatusFilter] = useState<EventStatus | 'all'>('all')
  const [typeFilter, setTypeFilter] = useState<EventType | 'all'>('all')
  const [categoryFilter, setCategoryFilter] = useState('全部')
  const [registeredIds, setRegisteredIds] = useState<Set<string>>(new Set())

  const filtered = EVENTS.filter((e) => {
    const matchStatus = statusFilter === 'all' || e.status === statusFilter
    const matchType = typeFilter === 'all' || e.type === typeFilter
    const matchCat = categoryFilter === '全部' || e.category === categoryFilter
    return matchStatus && matchType && matchCat
  })

  const upcomingHighlights = EVENTS.filter((e) => e.highlight && e.status !== 'ended')

  const handleRegister = (id: string) => {
    setRegisteredIds((prev) => {
      const next = new Set(prev)
      next.add(id)
      return next
    })
  }

  return (
    <div className="container mx-auto px-4 py-6 max-w-6xl">
      <div className="flex flex-col lg:flex-row gap-6">
        {/* Main */}
        <div className="flex-1">
          {/* Hero */}
          <div className="bg-gradient-to-r from-violet-600 via-blue-600 to-cyan-500 rounded-2xl p-6 mb-5 text-white">
            <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm rounded-full px-3 py-1 text-sm mb-3">
              <span>🗓️</span>
              <span>2026 年 {EVENTS.filter((e) => e.status !== 'ended').length} 场活动等你参与</span>
            </div>
            <h2 className="text-2xl font-bold mb-1">社区活动</h2>
            <p className="text-blue-100 text-sm">官方举办的训练营、大会和黑客松，以及精选行业活动，掌握一手资讯并申请专属名额</p>
          </div>

          {/* Filters */}
          <div className="bg-white rounded-xl p-4 shadow-sm border mb-5 space-y-3">
            <div className="flex flex-wrap gap-2 items-center">
              <span className="text-sm text-gray-500 font-medium flex-shrink-0">状态：</span>
              <button
                onClick={() => setStatusFilter('all')}
                className={`px-3 py-1 rounded-full text-sm font-medium transition-colors ${statusFilter === 'all' ? 'bg-gray-900 text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}
              >
                全部
              </button>
              {STATUS_FILTERS.filter((s) => s !== 'all').map((s) => {
                const st = STATUS_MAP[s as EventStatus]
                return (
                  <button
                    key={s}
                    onClick={() => setStatusFilter(s as EventStatus)}
                    className={`px-3 py-1 rounded-full text-sm font-medium transition-colors ${statusFilter === s ? st.color : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}
                  >
                    {st.label}
                  </button>
                )
              })}
              <div className="flex gap-2 ml-2">
                <button
                  onClick={() => setTypeFilter('all')}
                  className={`px-3 py-1 rounded-full text-sm font-medium transition-colors ${typeFilter === 'all' ? 'bg-gray-900 text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}
                >
                  全部来源
                </button>
                <button
                  onClick={() => setTypeFilter('self')}
                  className={`px-3 py-1 rounded-full text-sm font-medium transition-colors ${typeFilter === 'self' ? 'bg-violet-100 text-violet-700' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}
                >
                  官方自办
                </button>
                <button
                  onClick={() => setTypeFilter('third')}
                  className={`px-3 py-1 rounded-full text-sm font-medium transition-colors ${typeFilter === 'third' ? 'bg-orange-100 text-orange-700' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}
                >
                  三方活动
                </button>
              </div>
            </div>
            <div className="flex flex-wrap gap-2 items-center">
              <span className="text-sm text-gray-500 font-medium flex-shrink-0">类型：</span>
              {CATEGORY_FILTERS.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setCategoryFilter(cat)}
                  className={`px-3 py-1 rounded-full text-sm transition-colors ${categoryFilter === cat ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          <div className="text-sm text-gray-500 mb-4">
            共 <strong className="text-gray-900">{filtered.length}</strong> 场活动
          </div>

          {/* Event List */}
          <div className="space-y-4">
            {filtered.map((event) => {
              const st = STATUS_MAP[event.status]
              const tp = TYPE_MAP[event.type]
              const isRegistered = registeredIds.has(event.id)
              const isFull = event.registered >= event.seats
              const pct = Math.min(100, Math.round((event.registered / event.seats) * 100))

              return (
                <div
                  key={event.id}
                  className={`bg-white rounded-xl shadow-sm border overflow-hidden ${event.highlight ? 'ring-2 ring-blue-200' : ''} ${event.status === 'ended' ? 'opacity-70' : ''}`}
                >
                  {event.highlight && (
                    <div className="bg-gradient-to-r from-blue-600 to-violet-600 text-white text-xs text-center py-1 font-medium">
                      ⭐ 重点推荐活动
                    </div>
                  )}
                  <div className="p-5">
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-100 to-violet-100 flex items-center justify-center text-2xl flex-shrink-0">
                        {event.icon}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 flex-wrap mb-2">
                          <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${st.color}`}>
                            <span className={`inline-block w-1.5 h-1.5 rounded-full ${st.dot} mr-1`} />
                            {st.label}
                          </span>
                          <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${tp.color}`}>{tp.label}</span>
                          <span className="text-xs bg-gray-100 text-gray-500 px-2 py-0.5 rounded-full">{event.category}</span>
                        </div>

                        <h3 className="text-base font-bold text-gray-900 mb-2">{event.title}</h3>
                        <p className="text-sm text-gray-500 mb-3">{event.desc}</p>

                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 text-xs text-gray-500 mb-3">
                          <div className="flex items-center gap-1.5">
                            <span>📅</span>
                            <span>{event.dateDisplay}</span>
                          </div>
                          <div className="flex items-center gap-1.5">
                            <span>📍</span>
                            <span>{event.location}</span>
                          </div>
                          <div className="flex items-center gap-1.5">
                            <span>{event.organizerIcon}</span>
                            <span>{event.organizer}</span>
                          </div>
                        </div>

                        <div className="flex gap-1.5 mb-3 flex-wrap">
                          {event.tags.map((tag) => (
                            <span key={tag} className="text-xs bg-blue-50 text-blue-600 px-2 py-0.5 rounded-full">#{tag}</span>
                          ))}
                        </div>

                        {/* Seats progress */}
                        {event.status !== 'ended' && (
                          <div className="mb-3">
                            <div className="flex justify-between text-xs text-gray-400 mb-1">
                              <span>已报名 {event.registered} / {event.seats === 999 ? '不限' : event.seats} 人</span>
                              {event.seats !== 999 && <span>{isFull ? '名额已满' : `剩余 ${event.seats - event.registered} 个名额`}</span>}
                            </div>
                            {event.seats !== 999 && (
                              <div className="h-1.5 bg-gray-100 rounded-full overflow-hidden">
                                <div
                                  className={`h-full rounded-full transition-all ${pct >= 90 ? 'bg-red-400' : pct >= 70 ? 'bg-amber-400' : 'bg-emerald-400'}`}
                                  style={{ width: `${pct}%` }}
                                />
                              </div>
                            )}
                          </div>
                        )}

                        <div className="flex items-center justify-between flex-wrap gap-3">
                          <div className="text-sm font-semibold text-gray-900">
                            {event.price}
                          </div>
                          {event.status === 'ended' ? (
                            <span className="text-sm text-gray-400 px-4 py-1.5 border rounded-lg">活动已结束</span>
                          ) : isRegistered ? (
                            <span className="text-sm text-emerald-600 bg-emerald-50 px-4 py-1.5 rounded-lg font-medium">✅ 已报名</span>
                          ) : isFull ? (
                            <button className="text-sm text-gray-400 bg-gray-100 px-4 py-1.5 rounded-lg cursor-not-allowed">名额已满</button>
                          ) : (
                            <button
                              onClick={() => handleRegister(event.id)}
                              className="text-sm bg-blue-600 text-white px-4 py-1.5 rounded-lg hover:bg-blue-700 transition-colors font-medium"
                            >
                              {event.type === 'third' ? '申请参会名额' : '立即报名'}
                            </button>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </div>

        {/* Sidebar */}
        <div className="w-full lg:w-64 lg:flex-shrink-0 space-y-4 hidden lg:block">
          {/* Highlights */}
          <div className="bg-white rounded-xl p-4 shadow-sm border">
            <h3 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
              <span>⭐</span> 重点活动
            </h3>
            <div className="space-y-3">
              {upcomingHighlights.map((e) => (
                <div key={e.id} className="border-l-2 border-blue-300 pl-3">
                  <p className="text-sm font-medium text-gray-800 line-clamp-2">{e.title}</p>
                  <p className="text-xs text-gray-400 mt-0.5">{e.dateDisplay}</p>
                  <p className="text-xs text-blue-600 mt-0.5">{e.price}</p>
                </div>
              ))}
            </div>
          </div>

          {/* My Registrations */}
          <div className="bg-white rounded-xl p-4 shadow-sm border">
            <h3 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
              <span>📋</span> 我的报名
            </h3>
            {registeredIds.size === 0 ? (
              <p className="text-sm text-gray-400 text-center py-3">还没有报名任何活动</p>
            ) : (
              <div className="space-y-2">
                {EVENTS.filter((e) => registeredIds.has(e.id)).map((e) => (
                  <div key={e.id} className="text-sm text-gray-700 p-2 bg-blue-50 rounded-lg">
                    <p className="font-medium line-clamp-1">{e.title}</p>
                    <p className="text-xs text-gray-400 mt-0.5">📅 {e.dateDisplay}</p>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Tips */}
          <div className="bg-blue-50 rounded-xl p-4 border border-blue-100">
            <h3 className="font-semibold text-gray-900 mb-2 flex items-center gap-2">
              <span>💡</span> 参与建议
            </h3>
            <ul className="text-xs text-gray-600 space-y-1.5">
              <li>• 官方活动报名后积分 +50</li>
              <li>• 完成活动后额外 +100</li>
              <li>• 黑客松获奖最高 +1000</li>
              <li>• 三方活动名额有限，尽早申请</li>
              <li>• 认证考试通过获专属徽章</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}
