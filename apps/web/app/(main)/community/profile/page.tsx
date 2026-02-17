'use client'

import { useState } from 'react'
import Link from 'next/link'
import { SOCIAL_META, canPublishSocials, type SocialPlatform } from '../members/data'
import { getRaccoonLevel } from '../raccoon/data'

const MY_CASES = [
  {
    id: '1',
    title: '电商行业月度销售报告自动化生成链路',
    industry: '电商',
    tags: ['数据分析', '报告生成', '自动化'],
    status: '已发布',
    statusColor: 'bg-green-100 text-green-700',
    views: 1284,
    reuses: 56,
    likes: 89,
    collects: 134,
    points: 100,
    isOfficial: true,
    createdAt: '2025-12-10',
    summary: '通过小浣熊链路将 Excel 销售数据自动清洗、分析并生成专业 PDF 报告，处理时间从 3 小时压缩到 5 分钟。',
  },
  {
    id: '3',
    title: '客户邮件自动分类与优先级回复链路',
    industry: '零售',
    tags: ['邮件处理', '自动化', '客服'],
    status: '已发布',
    statusColor: 'bg-green-100 text-green-700',
    views: 348,
    reuses: 12,
    likes: 23,
    collects: 41,
    points: 100,
    isOfficial: false,
    createdAt: '2025-11-20',
    summary: '自动识别邮件类型和紧急程度，生成个性化回复草稿，大幅减少客服团队邮件处理时间。',
  },
  {
    id: 'draft-1',
    title: '竞品社交媒体舆情分析链路',
    industry: '互联网',
    tags: ['舆情分析', '社交媒体'],
    status: '审核中',
    statusColor: 'bg-amber-100 text-amber-700',
    views: 0,
    reuses: 0,
    likes: 0,
    collects: 0,
    points: 0,
    isOfficial: false,
    createdAt: '2026-02-15',
    summary: '监控竞品在各社交平台的用户评价，自动汇总关键情报并生成舆情报告。',
  },
]

const POINTS_HISTORY = [
  { type: '案例被复用', points: +200, detail: '案例《电商月度销售报告》被用户复用', date: '今天 09:24', icon: '⚡', color: 'text-blue-500' },
  { type: '每日签到', points: +5, detail: '连续签到第 7 天', date: '今天 08:00', icon: '✅', color: 'text-green-500' },
  { type: '案例被复用', points: +200, detail: '案例《电商月度销售报告》被用户复用', date: '昨天 16:33', icon: '⚡', color: 'text-blue-500' },
  { type: '获得点赞', points: +10, detail: '评论获得 5 个点赞', date: '昨天 14:21', icon: '❤️', color: 'text-red-500' },
  { type: '每日签到', points: +5, detail: '连续签到第 6 天', date: '昨天 08:00', icon: '✅', color: 'text-green-500' },
  { type: '被官方推荐', points: +300, detail: '案例《电商月度销售报告》被官方推荐', date: '3天前', icon: '⭐', color: 'text-amber-500' },
  { type: '发布案例', points: +100, detail: '发布案例《电商月度销售报告自动化生成链路》', date: '2025-12-10', icon: '📝', color: 'text-violet-500' },
  { type: '反馈被采纳', points: +200, detail: '功能建议《批量上传文件》已进入规划', date: '1周前', icon: '💡', color: 'text-orange-500' },
  { type: '案例被复用', points: +200, detail: '案例《客户邮件自动分类链路》被用户复用', date: '1周前', icon: '⚡', color: 'text-blue-500' },
  { type: '发布案例', points: +100, detail: '发布案例《客户邮件自动分类与优先级回复链路》', date: '2025-11-20', icon: '📝', color: 'text-violet-500' },
]

const MY_FEEDBACK = [
  {
    id: '1',
    title: '希望支持批量上传文件功能',
    category: '功能建议',
    status: 'planned',
    statusLabel: '规划中',
    statusColor: 'bg-purple-100 text-purple-600',
    votes: 47,
    replies: 8,
    createdAt: '2天前',
  },
  {
    id: '2',
    title: '移动端 Web 自适应体验优化',
    category: '体验优化',
    status: 'accepted',
    statusLabel: '已受理',
    statusColor: 'bg-blue-100 text-blue-600',
    votes: 23,
    replies: 4,
    createdAt: '1周前',
  },
]

const MY_COMMENTS = [
  {
    id: '1',
    caseId: '1',
    caseTitle: '电商行业月度销售报告自动化生成链路',
    content: '这个链路我们团队用了一个月了，真的太好用了！建议在数据清洗步骤增加人工审核环节。',
    likes: 12,
    createdAt: '30分钟前',
    type: '案例评论',
  },
  {
    id: '2',
    discussId: '1',
    discussTitle: '如何设计一个高效的文档处理链路？分享我的最佳实践',
    content: '同意楼主的观点，分段处理非常关键。我一般按照 3000 字一个 chunk 来切分。',
    likes: 7,
    createdAt: '2小时前',
    type: '讨论回复',
  },
  {
    id: '3',
    caseId: '2',
    caseTitle: '法律合同风险条款智能审查链路',
    content: '风险识别维度覆盖很全面，建议后续可以增加"合同效力"审查模块。',
    likes: 5,
    createdAt: '1天前',
    type: '案例评论',
  },
]

const MY_COLLECTS = [
  {
    id: '2',
    title: '法律合同风险条款智能审查链路',
    industry: '法律',
    author: '李律师',
    reuses: 42,
    collectDate: '1天前',
  },
  {
    id: '5',
    title: '财务季报智能分析与可视化',
    industry: '金融',
    author: '陈分析师',
    reuses: 29,
    collectDate: '3天前',
  },
  {
    id: '4',
    title: '竞品分析报告一键生成链路',
    industry: '互联网',
    author: '产品团队',
    reuses: 31,
    collectDate: '1周前',
  },
]

const BADGES = [
  { icon: '🌟', name: '初级贡献者', desc: '发布第一个案例', unlocked: true, unlockedAt: '2025-11-20', tip: '欢迎加入社区！' },
  { icon: '🔥', name: '热门作者', desc: '案例获得 50+ 赞', unlocked: true, unlockedAt: '2025-12-20', tip: '你的内容深受欢迎！' },
  { icon: '⚡', name: '复用达人', desc: '案例被复用 50+ 次', unlocked: true, unlockedAt: '2026-01-15', tip: '你创造了巨大价值！' },
  { icon: '🎯', name: '精品认证', desc: '获得官方推荐', unlocked: false, tip: '需要获得官方推荐', progress: '已获得 1 次推荐' },
  { icon: '🏆', name: '顶级贡献者', desc: '累计积分 5000+', unlocked: false, tip: '再积累 4000 积分可解锁', progress: '当前积分 1010' },
  { icon: '💼', name: '行业专家', desc: '同行业发布 20+ 案例', unlocked: false, tip: '需在同一行业发布 20 个案例', progress: '当前 2/20' },
  { icon: '💡', name: '创意达人', desc: '提交反馈被采纳 3 次', unlocked: false, tip: '需要再被采纳 2 次', progress: '当前 1/3' },
  { icon: '👥', name: '社区之星', desc: '粉丝数超过 100', unlocked: false, tip: '需要再积累 76 名粉丝', progress: '当前 24/100' },
]

const TABS = [
  { id: 'overview', label: '概览' },
  { id: 'cases', label: '我的案例', count: 3 },
  { id: 'points', label: '积分记录' },
  { id: 'feedback', label: '我的反馈', count: 2 },
  { id: 'comments', label: '我的评论', count: 3 },
  { id: 'collects', label: '我的收藏', count: 3 },
  { id: 'badges', label: '勋章墙', count: 3 },
]

const totalPoints = POINTS_HISTORY.reduce((sum, h) => sum + h.points, 0)

export default function ProfilePage() {
  const [activeTab, setActiveTab] = useState('overview')
  const [checkedIn, setCheckedIn] = useState(false)
  const [editOpen, setEditOpen] = useState(false)
  const [editTab, setEditTab] = useState<'basic' | 'social'>('basic')

  // Demo: current user identity (优秀创作者 cannot publish socials publicly)
  const currentIdentity = 'contributor'
  const canShowSocials = canPublishSocials(currentIdentity)

  const [profile, setProfile] = useState({
    name: 'Asui',
    title: '产品经理 · 社区用户',
    bio: '热爱 AI 工具，专注于电商和互联网行业的 AI 应用落地实践。',
    location: '上海',
    industry: '电商',
  })

  const [socials, setSocials] = useState<{ platform: SocialPlatform; handle: string; enabled: boolean }[]>([
    { platform: 'weibo', handle: '', enabled: false },
    { platform: 'wechat', handle: '', enabled: false },
    { platform: 'twitter', handle: '', enabled: false },
    { platform: 'linkedin', handle: '', enabled: false },
    { platform: 'github', handle: '', enabled: false },
    { platform: 'xiaohongshu', handle: '', enabled: false },
  ])
  const [socialPublic, setSocialPublic] = useState(false)

  const [saved, setSaved] = useState(false)
  const handleSave = () => {
    setSaved(true)
    setTimeout(() => { setSaved(false); setEditOpen(false) }, 1200)
  }

  return (
    <>
    <div className="container mx-auto px-4 py-6 max-w-5xl">
      {/* Profile Header */}
      <div className="bg-white rounded-2xl shadow-sm border overflow-hidden mb-5">
        {/* Cover */}
        <div className="h-28 bg-gradient-to-r from-blue-500 via-violet-500 to-purple-600" />

        <div className="px-6 pb-6">
          <div className="flex items-end justify-between -mt-10 mb-4 flex-wrap gap-2">
            {/* Avatar */}
            <div className="relative">
              <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-blue-400 to-violet-500 flex items-center justify-center text-white text-3xl font-bold shadow-lg border-4 border-white">
                A
              </div>
              <div className="absolute -bottom-1 -right-1 bg-blue-600 text-white text-xs px-1.5 py-0.5 rounded-full font-bold">
                Lv.3
              </div>
            </div>
            <div className="flex gap-2 mb-1">
              <button
                onClick={() => setCheckedIn(true)}
                disabled={checkedIn}
                className={`text-sm px-4 py-1.5 rounded-full font-medium transition-colors ${
                  checkedIn ? 'bg-green-100 text-green-600' : 'bg-amber-500 text-white hover:bg-amber-600'
                }`}
              >
                {checkedIn ? '✅ 已签到' : '📅 签到 +5'}
              </button>
              <button className="text-sm px-4 py-1.5 rounded-full border text-gray-600 hover:bg-gray-50 transition-colors" onClick={() => setEditOpen(true)}>
                编辑资料
              </button>
            </div>
          </div>

          <div className="flex flex-col lg:flex-row items-start justify-between gap-4">
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-1">Asui</h2>
              <div className="flex items-center gap-2 mb-2">
                <span className="text-sm text-gray-500">初级贡献者</span>
                <span className="w-1 h-1 bg-gray-300 rounded-full" />
                <span className="text-xs bg-blue-100 text-blue-600 px-2 py-0.5 rounded-full">电商 · 互联网</span>
              </div>
              <div className="flex items-center gap-4 text-sm text-gray-400">
                <span>📅 加入于 2024年11月</span>
                <span>📍 上海</span>
                <span>🔗 <a href="#" className="text-blue-500 hover:underline">个人主页</a></span>
              </div>
              {/* Badges Row */}
              <div className="flex items-center gap-1.5 mt-3">
                {BADGES.filter((b) => b.unlocked).map((badge) => (
                  <span key={badge.name} title={`${badge.name}: ${badge.desc}`} className="text-xl cursor-pointer hover:scale-125 transition-transform">
                    {badge.icon}
                  </span>
                ))}
              </div>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-5 gap-2 sm:gap-4 text-center w-full lg:w-auto">
              {[
                { label: '案例', value: '2', sublabel: '已发布', color: 'text-blue-600' },
                { label: '复用', value: '68', sublabel: '次', color: 'text-purple-600' },
                { label: '点赞', value: '112', sublabel: '获得', color: 'text-red-500' },
                { label: '积分', value: totalPoints.toLocaleString(), sublabel: '', color: 'text-amber-500' },
                { label: '粉丝', value: '24', sublabel: '', color: 'text-green-600' },
              ].map((stat) => (
                <div key={stat.label} className="bg-gray-50 rounded-xl p-2 sm:p-3">
                  <div className={`text-base sm:text-xl font-bold ${stat.color}`}>{stat.value}</div>
                  <div className="text-xs text-gray-500">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Progress Bar */}
          <div className="mt-4 pt-4 border-t">
            <div className="flex items-center justify-between mb-1.5">
              <span className="text-sm text-gray-600">升级进度（Lv.3 → Lv.4 高级贡献者）</span>
              <span className="text-sm font-medium text-gray-900">{totalPoints} / 2000 积分</span>
            </div>
            <div className="w-full bg-gray-100 rounded-full h-2 overflow-hidden">
              <div
                className="bg-gradient-to-r from-blue-500 to-violet-500 h-2 rounded-full"
                style={{ width: `${Math.min((totalPoints / 2000) * 100, 100)}%` }}
              />
            </div>
            <div className="text-xs text-gray-400 mt-1">
              还差 {Math.max(2000 - totalPoints, 0)} 积分升级，继续加油！
            </div>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="bg-white rounded-2xl shadow-sm border overflow-hidden">
        {/* Tab Nav */}
        <div className="flex border-b overflow-x-auto">
          {TABS.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex-shrink-0 px-5 py-3.5 text-sm font-medium transition-colors whitespace-nowrap flex items-center gap-1.5 ${
                activeTab === tab.id
                  ? 'border-b-2 border-blue-600 text-blue-600 bg-blue-50/50'
                  : 'text-gray-500 hover:text-gray-700 hover:bg-gray-50'
              }`}
            >
              {tab.label}
              {tab.count !== undefined && (
                <span className={`text-xs px-1.5 py-0.5 rounded-full ${activeTab === tab.id ? 'bg-blue-100 text-blue-600' : 'bg-gray-100 text-gray-500'}`}>
                  {tab.count}
                </span>
              )}
            </button>
          ))}
        </div>

        <div className="p-6">
          {/* 概览 */}
          {activeTab === 'overview' && (
            <div className="space-y-5">
              {/* My Raccoon Card */}
              {(() => {
                const myRaccoonLevel = getRaccoonLevel(totalPoints)
                return (
                  <div className="bg-gradient-to-br from-blue-50 via-violet-50 to-purple-50 rounded-2xl border-2 border-violet-100 overflow-hidden">
                    <div className="p-5">
                      <div className="flex items-start gap-4">
                        {/* Raccoon Avatar */}
                        <div className={`relative w-20 h-20 rounded-2xl bg-gradient-to-br ${myRaccoonLevel.aura} flex items-center justify-center text-4xl flex-shrink-0 shadow-md`}>
                          {myRaccoonLevel.emoji}
                          {myRaccoonLevel.accessory && (
                            <span className="absolute -top-1 -right-1 text-xl">{myRaccoonLevel.accessory}</span>
                          )}
                        </div>

                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 mb-1">
                            <h3 className="font-bold text-gray-900 text-lg">我的小浣熊</h3>
                            <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${myRaccoonLevel.level === 6 ? 'bg-amber-100 text-amber-700' : myRaccoonLevel.level === 5 ? 'bg-violet-100 text-violet-700' : 'bg-blue-100 text-blue-700'}`}>
                              {myRaccoonLevel.name} {myRaccoonLevel.form}
                            </span>
                          </div>
                          <p className="text-sm text-gray-600 mb-3">{myRaccoonLevel.desc}</p>
                          <div className="flex items-center gap-2 text-xs bg-white/70 rounded-lg px-3 py-2 mb-3">
                            <span className="text-gray-500">特殊能力：</span>
                            <span className="font-medium text-gray-700">{myRaccoonLevel.ability}</span>
                          </div>

                          {/* Progress Bar */}
                          <div>
                            <div className="flex justify-between text-xs mb-1">
                              <span className="text-gray-500">成长进度</span>
                              <span className="font-semibold text-violet-600">
                                {totalPoints.toLocaleString()} / {myRaccoonLevel.maxPoints?.toLocaleString() ?? '∞'} 积分
                              </span>
                            </div>
                            <div className="h-2 rounded-full bg-white/70">
                              <div
                                className="h-2 rounded-full bg-gradient-to-r from-blue-400 via-violet-500 to-purple-500"
                                style={{
                                  width: myRaccoonLevel.maxPoints
                                    ? `${Math.min(((totalPoints - myRaccoonLevel.minPoints) / (myRaccoonLevel.maxPoints - myRaccoonLevel.minPoints)) * 100, 100)}%`
                                    : '100%'
                                }}
                              />
                            </div>
                            {myRaccoonLevel.maxPoints && (
                              <p className="text-xs text-gray-500 mt-1">
                                再获得 {(myRaccoonLevel.maxPoints - totalPoints + 1).toLocaleString()} 积分可进化为下一形态
                              </p>
                            )}
                          </div>
                        </div>

                        <Link
                          href="/community/raccoon"
                          className="flex-shrink-0 bg-gradient-to-r from-blue-500 to-violet-500 text-white text-sm px-4 py-2 rounded-xl hover:opacity-90 transition-opacity font-medium"
                        >
                          前往浣熊园 →
                        </Link>
                      </div>
                    </div>
                  </div>
                )
              })()}

              <div className="flex items-center justify-between mb-2">
                <h3 className="font-bold text-gray-900">近期动态</h3>
              </div>
              <div className="space-y-4">
                {[
                  { icon: '⭐', text: '案例《电商月度销售报告》被官方推荐', point: '+300 积分', time: '3天前', color: 'bg-amber-50 border-amber-100' },
                  { icon: '⚡', text: '案例《电商月度销售报告》被第 56 位用户复用', point: '+200 积分', time: '今天', color: 'bg-blue-50 border-blue-100' },
                  { icon: '📝', text: '发布了新案例《竞品社交媒体舆情分析链路》，正在审核中', point: '', time: '2天前', color: 'bg-gray-50 border-gray-100' },
                  { icon: '💡', text: '提交的反馈《批量上传文件》进入规划阶段', point: '+50 积分', time: '2天前', color: 'bg-purple-50 border-purple-100' },
                  { icon: '💬', text: '在讨论《如何设计高效文档处理链路》发表了回复，获 7 个赞', point: '', time: '2小时前', color: 'bg-gray-50 border-gray-100' },
                  { icon: '✅', text: '连续签到 7 天', point: '+5 积分', time: '今天', color: 'bg-green-50 border-green-100' },
                ].map((activity, i) => (
                  <div key={i} className={`flex items-start gap-4 p-4 rounded-xl border ${activity.color}`}>
                    <span className="text-2xl flex-shrink-0">{activity.icon}</span>
                    <div className="flex-1">
                      <p className="text-sm text-gray-700">{activity.text}</p>
                      <div className="flex items-center gap-3 mt-1">
                        {activity.point && (
                          <span className="text-xs font-semibold text-amber-600">{activity.point}</span>
                        )}
                        <span className="text-xs text-gray-400">{activity.time}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* 我的案例 */}
          {activeTab === 'cases' && (
            <div>
              <div className="flex items-center justify-between mb-5">
                <div>
                  <h3 className="font-bold text-gray-900">我发布的案例</h3>
                  <p className="text-sm text-gray-500 mt-0.5">共 {MY_CASES.length} 个，已发布 2 个</p>
                </div>
                <Link
                  href="/community/cases/publish"
                  className="bg-blue-600 text-white text-sm px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
                >
                  + 发布新案例
                </Link>
              </div>

              <div className="space-y-4">
                {MY_CASES.map((c) => (
                  <div key={c.id} className="border rounded-xl p-5 hover:shadow-sm transition-shadow">
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2 flex-wrap">
                          <span className="text-xs bg-blue-50 text-blue-600 px-2 py-0.5 rounded-full font-medium">{c.industry}</span>
                          <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${c.statusColor}`}>{c.status}</span>
                          {c.isOfficial && <span className="text-xs bg-amber-50 text-amber-600 px-2 py-0.5 rounded-full">⭐ 官方推荐</span>}
                          <span className="text-xs text-gray-400">发布于 {c.createdAt}</span>
                        </div>
                        <Link
                          href={`/community/cases/${c.id}`}
                          className="text-base font-semibold text-gray-900 hover:text-blue-600 transition-colors"
                        >
                          {c.title}
                        </Link>
                        <p className="text-sm text-gray-500 mt-1.5 line-clamp-2">{c.summary}</p>
                        <div className="flex gap-1.5 mt-2 flex-wrap">
                          {c.tags.map((tag) => (
                            <span key={tag} className="text-xs bg-gray-100 text-gray-500 px-2 py-0.5 rounded-full">#{tag}</span>
                          ))}
                        </div>
                      </div>
                    </div>

                    {/* Stats */}
                    <div className="flex items-center justify-between mt-4 pt-4 border-t">
                      <div className="flex items-center gap-4 text-sm text-gray-500">
                        <span>👁 {c.views}</span>
                        <span>❤️ {c.likes}</span>
                        <span>⭐ {c.collects}</span>
                        <span className="text-blue-500 font-medium">⚡ {c.reuses} 次复用</span>
                        {c.points > 0 && <span className="text-amber-500 font-medium">+{c.points} 积分</span>}
                      </div>
                      <div className="flex gap-2">
                        <Link
                          href={`/community/cases/${c.id}`}
                          className="text-sm border text-gray-600 px-3 py-1.5 rounded-lg hover:bg-gray-50 transition-colors"
                        >
                          查看详情
                        </Link>
                        <button className="text-sm border text-gray-600 px-3 py-1.5 rounded-lg hover:bg-gray-50 transition-colors">
                          编辑
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* 积分记录 */}
          {activeTab === 'points' && (
            <div>
              <div className="flex items-center justify-between mb-5">
                <div>
                  <h3 className="font-bold text-gray-900">积分记录</h3>
                  <p className="text-sm text-gray-500 mt-0.5">累计获得 {totalPoints} 积分</p>
                </div>
                <div className="bg-amber-50 border border-amber-100 rounded-xl px-4 py-2 text-center">
                  <div className="text-2xl font-bold text-amber-500">{totalPoints}</div>
                  <div className="text-xs text-gray-500">当前积分</div>
                </div>
              </div>

              <div className="space-y-2">
                {POINTS_HISTORY.map((h, i) => (
                  <div key={i} className="flex items-center gap-4 p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors">
                    <div className="w-10 h-10 rounded-xl bg-white flex items-center justify-center text-2xl shadow-sm flex-shrink-0">
                      {h.icon}
                    </div>
                    <div className="flex-1">
                      <div className="font-medium text-gray-900 text-sm">{h.type}</div>
                      <div className="text-xs text-gray-500 mt-0.5">{h.detail}</div>
                    </div>
                    <div className="text-right flex-shrink-0">
                      <div className={`font-bold text-base ${h.color}`}>+{h.points}</div>
                      <div className="text-xs text-gray-400">{h.date}</div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Points Guide */}
              <div className="mt-6 bg-gradient-to-br from-amber-50 to-orange-50 rounded-xl p-5 border border-amber-100">
                <h4 className="font-semibold text-gray-900 mb-3">积分获取方式</h4>
                <div className="grid grid-cols-2 gap-2 text-sm">
                  {[
                    { action: '发布案例', points: '+100', icon: '📝' },
                    { action: '被官方推荐', points: '+300', icon: '⭐' },
                    { action: '案例被复用', points: '+200', icon: '⚡' },
                    { action: '反馈被采纳', points: '+200', icon: '💡' },
                    { action: '获得点赞（每5个）', points: '+10', icon: '❤️' },
                    { action: '每日签到', points: '+5', icon: '✅' },
                  ].map((item) => (
                    <div key={item.action} className="flex items-center gap-2">
                      <span>{item.icon}</span>
                      <span className="text-gray-600">{item.action}</span>
                      <span className="font-semibold text-amber-600 ml-auto">{item.points}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* 我的反馈 */}
          {activeTab === 'feedback' && (
            <div>
              <div className="flex items-center justify-between mb-5">
                <h3 className="font-bold text-gray-900">我提交的反馈</h3>
                <Link href="/community/feedback" className="bg-blue-600 text-white text-sm px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors">
                  + 提交新反馈
                </Link>
              </div>

              <div className="space-y-3">
                {MY_FEEDBACK.map((f) => (
                  <div key={f.id} className="border rounded-xl p-4 hover:shadow-sm transition-shadow">
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${f.statusColor}`}>{f.statusLabel}</span>
                          <span className="text-xs bg-gray-100 text-gray-500 px-2 py-0.5 rounded-full">{f.category}</span>
                          <span className="text-xs text-gray-400">{f.createdAt}</span>
                        </div>
                        <h4 className="font-semibold text-gray-900">{f.title}</h4>
                        {f.status === 'planned' && (
                          <p className="text-xs text-purple-600 mt-1">📅 预计下一个版本上线</p>
                        )}
                      </div>
                      <div className="text-right flex-shrink-0">
                        <div className="text-lg font-bold text-blue-500">👍 {f.votes}</div>
                        <div className="text-xs text-gray-400">{f.replies} 条回复</div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* 我的评论 */}
          {activeTab === 'comments' && (
            <div>
              <h3 className="font-bold text-gray-900 mb-5">我发表的评论</h3>
              <div className="space-y-3">
                {MY_COMMENTS.map((c) => (
                  <div key={c.id} className="border rounded-xl p-4 hover:shadow-sm transition-shadow">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="text-xs bg-gray-100 text-gray-500 px-2 py-0.5 rounded-full">{c.type}</span>
                      <Link
                        href={c.caseId ? `/community/cases/${c.caseId}` : `/community/discuss/${c.discussId}`}
                        className="text-xs text-blue-600 hover:underline flex-1 truncate"
                      >
                        {c.caseTitle || c.discussTitle}
                      </Link>
                      <span className="text-xs text-gray-400 flex-shrink-0">{c.createdAt}</span>
                    </div>
                    <p className="text-sm text-gray-700 bg-gray-50 rounded-lg p-3 mb-2">{c.content}</p>
                    <div className="text-xs text-gray-400">❤️ {c.likes} 个赞</div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* 我的收藏 */}
          {activeTab === 'collects' && (
            <div>
              <h3 className="font-bold text-gray-900 mb-5">我收藏的案例</h3>
              <div className="space-y-3">
                {MY_COLLECTS.map((c) => (
                  <Link key={c.id} href={`/community/cases/${c.id}`} className="block border rounded-xl p-4 hover:shadow-sm hover:bg-blue-50/30 transition-all">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1.5">
                          <span className="text-xs bg-blue-50 text-blue-600 px-2 py-0.5 rounded-full">{c.industry}</span>
                          <span className="text-xs text-gray-400">by {c.author}</span>
                          <span className="text-xs text-gray-400">收藏于 {c.collectDate}</span>
                        </div>
                        <h4 className="font-semibold text-gray-900 hover:text-blue-600 transition-colors">{c.title}</h4>
                      </div>
                      <div className="flex items-center gap-2 text-sm text-gray-400 flex-shrink-0">
                        <span className="text-blue-500 font-medium">⚡ {c.reuses}</span>
                        <button className="text-amber-500 hover:text-amber-600">⭐</button>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          )}

          {/* 勋章墙 */}
          {activeTab === 'badges' && (
            <div>
              <div className="flex items-center justify-between mb-5">
                <div>
                  <h3 className="font-bold text-gray-900">我的勋章</h3>
                  <p className="text-sm text-gray-500 mt-0.5">已解锁 {BADGES.filter((b) => b.unlocked).length}/{BADGES.length} 枚</p>
                </div>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4">
                {BADGES.map((badge) => (
                  <div
                    key={badge.name}
                    className={`text-center p-5 rounded-2xl border-2 transition-all ${
                      badge.unlocked
                        ? 'border-amber-200 bg-gradient-to-b from-amber-50 to-orange-50 shadow-sm'
                        : 'border-gray-100 bg-gray-50/50'
                    }`}
                  >
                    <div className={`text-3xl sm:text-5xl mb-2 sm:mb-3 ${!badge.unlocked && 'grayscale opacity-40'}`}>{badge.icon}</div>
                    <div className={`font-semibold mb-1 ${badge.unlocked ? 'text-gray-900' : 'text-gray-400'}`}>{badge.name}</div>
                    <div className={`text-xs mb-2 ${badge.unlocked ? 'text-gray-500' : 'text-gray-300'}`}>{badge.desc}</div>
                    {badge.unlocked ? (
                      <div className="text-xs text-amber-600 font-medium bg-amber-100 rounded-full px-2 py-0.5">
                        已解锁 {badge.unlockedAt}
                      </div>
                    ) : (
                      <div className="text-xs text-gray-400 bg-gray-100 rounded-full px-2 py-0.5 truncate" title={badge.progress}>
                        {badge.progress}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>

    {/* Edit Profile Modal */}
    {editOpen && (
      <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4">
        {/* Backdrop */}
        <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={() => setEditOpen(false)} />

        {/* Panel */}
        <div className="relative w-full sm:max-w-xl bg-white rounded-t-3xl sm:rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
          {/* Header */}
          <div className="flex items-center justify-between px-5 py-4 border-b flex-shrink-0">
            <h2 className="font-bold text-gray-900 text-base">编辑资料</h2>
            <button onClick={() => setEditOpen(false)} className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-gray-100 text-gray-500 transition-colors">✕</button>
          </div>

          {/* Tabs */}
          <div className="flex border-b px-5 flex-shrink-0">
            {(['basic', 'social'] as const).map((t) => (
              <button
                key={t}
                onClick={() => setEditTab(t)}
                className={`py-2.5 mr-5 text-sm font-medium border-b-2 transition-colors ${editTab === t ? 'border-blue-600 text-blue-600' : 'border-transparent text-gray-500 hover:text-gray-800'}`}
              >
                {t === 'basic' ? '基本信息' : '社交账号'}
              </button>
            ))}
          </div>

          {/* Body */}
          <div className="flex-1 overflow-y-auto px-5 py-5 space-y-4">
            {editTab === 'basic' && (
              <>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">昵称</label>
                  <input
                    value={profile.name}
                    onChange={(e) => setProfile({ ...profile, name: e.target.value })}
                    className="w-full border rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-300"
                    placeholder="你的昵称"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">职位 / 头衔</label>
                  <input
                    value={profile.title}
                    onChange={(e) => setProfile({ ...profile, title: e.target.value })}
                    className="w-full border rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-300"
                    placeholder="如：产品经理 · 电商行业"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">个人简介</label>
                  <textarea
                    value={profile.bio}
                    onChange={(e) => setProfile({ ...profile, bio: e.target.value })}
                    rows={3}
                    className="w-full border rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-300 resize-none"
                    placeholder="简单介绍一下自己..."
                  />
                  <p className="text-xs text-gray-400 mt-1 text-right">{profile.bio.length} / 200</p>
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">所在地</label>
                    <input
                      value={profile.location}
                      onChange={(e) => setProfile({ ...profile, location: e.target.value })}
                      className="w-full border rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-300"
                      placeholder="城市"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">行业</label>
                    <select
                      value={profile.industry}
                      onChange={(e) => setProfile({ ...profile, industry: e.target.value })}
                      className="w-full border rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-300 bg-white"
                    >
                      {['电商', '互联网', '金融', '医疗', '法律', '教育', '其他'].map((ind) => (
                        <option key={ind}>{ind}</option>
                      ))}
                    </select>
                  </div>
                </div>
              </>
            )}

            {editTab === 'social' && (
              <>
                {/* Public switch */}
                <div className={`rounded-xl p-4 flex items-start gap-3 ${canShowSocials ? 'bg-blue-50 border border-blue-100' : 'bg-gray-50 border border-gray-200'}`}>
                  <div className="flex-1">
                    <p className={`text-sm font-medium ${canShowSocials ? 'text-blue-800' : 'text-gray-500'}`}>公开展示社交账号</p>
                    <p className="text-xs text-gray-500 mt-0.5">
                      {canShowSocials
                        ? '开启后，你的社交账号将展示在榜单卡片和个人主页，方便其他用户联系你'
                        : '仅认证用户（行业大 V、高级贡献者、认证专家）可以公开展示社交账号'}
                    </p>
                  </div>
                  <button
                    disabled={!canShowSocials}
                    onClick={() => canShowSocials && setSocialPublic(!socialPublic)}
                    className={`relative w-11 h-6 rounded-full transition-colors flex-shrink-0 mt-0.5 ${
                      !canShowSocials ? 'bg-gray-200 cursor-not-allowed' : socialPublic ? 'bg-blue-600' : 'bg-gray-300'
                    }`}
                  >
                    <span className={`absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full shadow transition-transform ${socialPublic && canShowSocials ? 'translate-x-5' : ''}`} />
                  </button>
                </div>

                {/* Platform list */}
                <div className="space-y-3">
                  {socials.map((s, idx) => {
                    const meta = SOCIAL_META[s.platform]
                    return (
                      <div key={s.platform} className="border rounded-xl p-3">
                        <div className="flex items-center gap-2 mb-2">
                          <span className="text-lg">{meta.icon}</span>
                          <span className="text-sm font-medium text-gray-700 flex-1">{meta.label}</span>
                          <button
                            onClick={() => {
                              const next = [...socials]
                              next[idx] = { ...s, enabled: !s.enabled }
                              setSocials(next)
                            }}
                            className={`text-xs px-2 py-0.5 rounded-full font-medium transition-colors ${
                              s.enabled ? 'bg-emerald-100 text-emerald-700' : 'bg-gray-100 text-gray-500 hover:bg-gray-200'
                            }`}
                          >
                            {s.enabled ? '已关联' : '+ 关联'}
                          </button>
                        </div>
                        {s.enabled && (
                          <input
                            value={s.handle}
                            onChange={(e) => {
                              const next = [...socials]
                              next[idx] = { ...s, handle: e.target.value }
                              setSocials(next)
                            }}
                            placeholder={`输入你的 ${meta.label} 账号名`}
                            className="w-full border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-300"
                          />
                        )}
                      </div>
                    )
                  })}
                </div>
              </>
            )}
          </div>

          {/* Footer */}
          <div className="px-5 py-4 border-t bg-gray-50 flex gap-3 flex-shrink-0">
            <button
              onClick={() => setEditOpen(false)}
              className="flex-1 border text-gray-600 py-2.5 rounded-xl text-sm hover:bg-gray-100 transition-colors"
            >
              取消
            </button>
            <button
              onClick={handleSave}
              className={`flex-1 py-2.5 rounded-xl text-sm font-medium transition-colors ${
                saved ? 'bg-emerald-500 text-white' : 'bg-blue-600 text-white hover:bg-blue-700'
              }`}
            >
              {saved ? '✓ 已保存' : '保存'}
            </button>
          </div>
        </div>
      </div>
    )}
    </>
  )
}
