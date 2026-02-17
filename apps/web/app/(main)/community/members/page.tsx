'use client'

import { useState } from 'react'
import Link from 'next/link'
import { USERS, IDENTITY_MAP, SOCIAL_META, canPublishSocials, type Identity } from './data'

const DIMENSIONS = [
  { key: 'points', label: '积分榜', icon: '⭐' },
  { key: 'cases', label: '案例榜', icon: '📂' },
  { key: 'kbs', label: '知识库榜', icon: '📚' },
  { key: 'followers', label: '影响力榜', icon: '👥' },
]

export default function MembersPage() {
  const [identityFilter, setIdentityFilter] = useState<Identity>('all')
  const [industryFilter, setIndustryFilter] = useState('全部')
  const [rankDimension, setRankDimension] = useState('points')

  const INDUSTRIES = ['全部', '互联网', '电商', '金融', '医疗', '法律']

  const filtered = USERS.filter((u) => {
    const matchIdentity = identityFilter === 'all' || u.identity === identityFilter
    const matchIndustry = industryFilter === '全部' || u.industry === industryFilter
    return matchIdentity && matchIndustry
  })

  const leaderboard = [...USERS]
    .filter((u) => u.identity !== 'official')
    .sort((a, b) => {
      if (rankDimension === 'points') return b.points - a.points
      if (rankDimension === 'cases') return b.cases - a.cases
      if (rankDimension === 'kbs') return b.kbs - a.kbs
      return b.followers - a.followers
    })
    .slice(0, 5)

  return (
    <div className="container mx-auto px-4 py-6 max-w-6xl">
      {/* Hero */}
      <div className="bg-gradient-to-r from-violet-600 to-pink-500 rounded-2xl p-6 mb-6 text-white">
        <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm rounded-full px-3 py-1 text-sm mb-3">
          <span>👥</span>
          <span>认识社区里最活跃的一批人</span>
        </div>
        <h2 className="text-2xl font-bold mb-1">用户榜单与展示</h2>
        <p className="text-violet-100 text-sm">行业大 V、高级贡献者、认证专家……发现优质创作者，学习他们的使用经验</p>
      </div>

      <div className="flex flex-col lg:flex-row gap-6">
        {/* Main */}
        <div className="flex-1">
          {/* Identity Filters */}
          <div className="bg-white rounded-xl p-4 shadow-sm border mb-5 space-y-3">
            <div className="flex flex-wrap gap-2 items-center">
              <span className="text-sm text-gray-500 font-medium flex-shrink-0">身份：</span>
              <button
                onClick={() => setIdentityFilter('all')}
                className={`px-3 py-1.5 rounded-full text-sm font-medium transition-colors ${identityFilter === 'all' ? 'bg-gray-900 text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}
              >
                全部
              </button>
              {Object.entries(IDENTITY_MAP).map(([key, val]) => (
                <button
                  key={key}
                  onClick={() => setIdentityFilter(key as Identity)}
                  className={`px-3 py-1.5 rounded-full text-sm font-medium transition-colors border ${identityFilter === key ? val.bg + ' ' + val.color : 'bg-gray-100 text-gray-600 hover:bg-gray-200 border-transparent'}`}
                >
                  {val.icon} {val.label}
                </button>
              ))}
            </div>
            <div className="flex flex-wrap gap-2 items-center">
              <span className="text-sm text-gray-500 font-medium flex-shrink-0">行业：</span>
              {INDUSTRIES.map((ind) => (
                <button
                  key={ind}
                  onClick={() => setIndustryFilter(ind)}
                  className={`px-3 py-1.5 rounded-full text-sm font-medium transition-colors ${industryFilter === ind ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}
                >
                  {ind}
                </button>
              ))}
            </div>
          </div>

          <div className="text-sm text-gray-500 mb-4">
            共 <strong className="text-gray-900">{filtered.length}</strong> 位认证用户
          </div>

          {/* User Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {filtered.map((user) => {
              const id = IDENTITY_MAP[user.identity]
              const showSocials = user.socialPublic && canPublishSocials(user.identity) && user.socials.length > 0
              return (
                <div key={user.id} className={`bg-white rounded-xl shadow-sm border overflow-hidden hover:shadow-md transition-shadow ${user.highlight ? 'ring-2 ring-violet-100' : ''}`}>
                  {/* Top gradient */}
                  <div className={`h-1.5 bg-gradient-to-r ${user.avatarGrad}`} />
                  <div className="p-5">
                    <div className="flex items-start gap-4 mb-3">
                      <Link href={`/community/members/${user.id}`} className="flex-shrink-0">
                        <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${user.avatarGrad} flex items-center justify-center text-white text-xl font-bold hover:scale-105 transition-transform`}>
                          {user.avatar}
                        </div>
                      </Link>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 flex-wrap mb-1">
                          <span className={`text-xs px-2 py-0.5 rounded-full font-medium border ${id.bg} ${id.color}`}>
                            {id.icon} {id.label}
                          </span>
                          <span className="text-xs bg-gray-100 text-gray-500 px-2 py-0.5 rounded-full">{user.industry}</span>
                        </div>
                        <Link href={`/community/members/${user.id}`}>
                          <h3 className="font-bold text-gray-900 hover:text-blue-600 transition-colors">{user.name}</h3>
                        </Link>
                        <p className="text-xs text-gray-500">{user.title}</p>
                      </div>
                    </div>

                    <p className="text-sm text-gray-500 mb-3 line-clamp-2">{user.bio}</p>

                    <div className="flex gap-1.5 mb-3 flex-wrap">
                      {user.tags.map((tag) => (
                        <span key={tag} className="text-xs bg-gray-100 text-gray-500 px-2 py-0.5 rounded-full">#{tag}</span>
                      ))}
                    </div>

                    {/* Badges */}
                    <div className="flex items-center gap-1.5 mb-3">
                      <span className="text-xs text-gray-400">徽章：</span>
                      {user.badges.map((b, i) => (
                        <span key={i} className="text-base">{b}</span>
                      ))}
                    </div>

                    {/* Social links (only for eligible users who opted in) */}
                    {showSocials && (
                      <div className="flex items-center gap-2 mb-3 flex-wrap">
                        <span className="text-xs text-gray-400">联系：</span>
                        {user.socials.map((s) => {
                          const meta = SOCIAL_META[s.platform]
                          return s.url ? (
                            <a
                              key={s.platform}
                              href={s.url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="flex items-center gap-1 text-xs bg-gray-50 border rounded-full px-2 py-0.5 hover:bg-gray-100 transition-colors"
                              title={`${meta.label}：${s.handle}`}
                            >
                              <span>{meta.icon}</span>
                              <span className="text-gray-600 max-w-[80px] truncate">{s.handle}</span>
                            </a>
                          ) : (
                            <span
                              key={s.platform}
                              className="flex items-center gap-1 text-xs bg-gray-50 border rounded-full px-2 py-0.5"
                              title={`${meta.label}：${s.handle}`}
                            >
                              <span>{meta.icon}</span>
                              <span className="text-gray-600 max-w-[80px] truncate">{s.handle}</span>
                            </span>
                          )
                        })}
                      </div>
                    )}

                    {/* Stats */}
                    <div className="grid grid-cols-4 gap-2 text-center border-t pt-3">
                      {[
                        { label: '积分', value: user.points >= 99999 ? '∞' : user.points.toLocaleString() },
                        { label: '案例', value: user.cases },
                        { label: '知识库', value: user.kbs },
                        { label: '关注者', value: user.followers >= 10000 ? `${(user.followers / 10000).toFixed(1)}w` : user.followers.toLocaleString() },
                      ].map((s) => (
                        <div key={s.label}>
                          <div className="text-sm font-bold text-gray-900">{s.value}</div>
                          <div className="text-xs text-gray-400">{s.label}</div>
                        </div>
                      ))}
                    </div>

                    <Link
                      href={`/community/members/${user.id}`}
                      className="mt-3 w-full text-sm border text-gray-600 py-1.5 rounded-lg hover:bg-gray-50 transition-colors flex items-center justify-center gap-1"
                    >
                      查看主页 →
                    </Link>
                  </div>
                </div>
              )
            })}
          </div>
        </div>

        {/* Sidebar */}
        <div className="w-full lg:w-64 lg:flex-shrink-0 space-y-4 hidden lg:block">
          {/* Leaderboard */}
          <div className="bg-white rounded-xl p-4 shadow-sm border">
            <h3 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
              <span>🏆</span> 排行榜
            </h3>
            <div className="flex gap-1 mb-3 flex-wrap">
              {DIMENSIONS.map((d) => (
                <button
                  key={d.key}
                  onClick={() => setRankDimension(d.key)}
                  className={`flex-1 text-xs py-1 rounded-lg transition-colors ${rankDimension === d.key ? 'bg-violet-600 text-white' : 'bg-gray-100 text-gray-500 hover:bg-gray-200'}`}
                >
                  {d.icon}
                </button>
              ))}
            </div>
            <div className="text-xs text-center text-gray-400 mb-3">
              {DIMENSIONS.find((d) => d.key === rankDimension)?.label}
            </div>
            <div className="space-y-2.5">
              {leaderboard.map((user, i) => {
                const val = rankDimension === 'points' ? user.points.toLocaleString()
                  : rankDimension === 'cases' ? `${user.cases} 个`
                  : rankDimension === 'kbs' ? `${user.kbs} 个`
                  : user.followers >= 10000 ? `${(user.followers / 10000).toFixed(1)}w` : user.followers.toLocaleString()
                const id = IDENTITY_MAP[user.identity]
                return (
                  <div key={user.id} className="flex items-center gap-2">
                    <span className="text-sm w-5 text-center font-bold text-gray-400">
                      {i === 0 ? '🥇' : i === 1 ? '🥈' : i === 2 ? '🥉' : i + 1}
                    </span>
                    <Link href={`/community/members/${user.id}`}>
                      <div className={`w-7 h-7 rounded-full bg-gradient-to-br ${user.avatarGrad} flex items-center justify-center text-white text-xs font-bold hover:scale-110 transition-transform`}>
                        {user.avatar}
                      </div>
                    </Link>
                    <div className="flex-1 min-w-0">
                      <Link href={`/community/members/${user.id}`}>
                        <p className="text-sm text-gray-800 truncate hover:text-blue-600 transition-colors">{user.name}</p>
                      </Link>
                      <p className="text-xs text-gray-400">{id.icon} {id.label}</p>
                    </div>
                    <span className="text-xs font-semibold text-violet-600">{val}</span>
                  </div>
                )
              })}
            </div>
          </div>

          {/* Identity Guide */}
          <div className="bg-white rounded-xl p-4 shadow-sm border">
            <h3 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
              <span>🎖️</span> 身份说明
            </h3>
            <div className="space-y-2.5">
              {Object.entries(IDENTITY_MAP).filter(([k]) => k !== 'official').map(([key, val]) => (
                <div key={key} className={`p-2.5 rounded-lg border ${val.bg}`}>
                  <div className="flex items-center gap-1.5 mb-0.5">
                    <span className="text-base">{val.icon}</span>
                    <span className={`text-sm font-semibold ${val.color}`}>{val.label}</span>
                  </div>
                  <p className="text-xs text-gray-500">{val.desc}</p>
                </div>
              ))}
            </div>
          </div>

          {/* How to get identity */}
          <div className="bg-gradient-to-br from-violet-50 to-pink-50 rounded-xl p-4 border border-violet-100">
            <h3 className="font-semibold text-gray-900 mb-2 flex items-center gap-2">
              <span>🚀</span> 如何获得认证
            </h3>
            <ul className="text-xs text-gray-600 space-y-1.5">
              <li>• 发布 10+ 优质案例 → 优秀创作者</li>
              <li>• 发布 50+ 案例被推荐 → 高级贡献者</li>
              <li>• 通过技术认证考试 → 认证专家</li>
              <li>• 粉丝 10000+ → 行业大 V</li>
              <li>• 申请入口：个人中心 → 认证申请</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}
