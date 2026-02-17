'use client'

import { use, useState } from 'react'
import Link from 'next/link'
import { USERS, IDENTITY_MAP, SOCIAL_META, INDUSTRY_CIRCLES, ROLE_META, canPublishSocials } from '../../members/data'

export default function IndustryPage({ params }: { params: Promise<{ industry: string }> }) {
  const { industry: industryRaw } = use(params)
  const industry = decodeURIComponent(industryRaw)

  const circle = INDUSTRY_CIRCLES[industry]
  if (!circle) {
    return (
      <div className="container mx-auto px-4 py-16 max-w-3xl text-center">
        <div className="text-6xl mb-4">🦝</div>
        <h2 className="text-xl font-bold text-gray-800 mb-2">找不到该行业圈子</h2>
        <p className="text-gray-500 mb-6">该行业圈子暂未开放</p>
        <Link href="/community/members" className="text-blue-600 hover:underline">← 返回用户榜单</Link>
      </div>
    )
  }

  const industryUsers = USERS.filter((u) => u.industry === industry)
  const leader = industryUsers.find((u) => u.industryRole === 'leader')
  const evangelists = industryUsers.filter((u) => u.industryRole === 'evangelist')

  return <IndustryContent industry={industry} circle={circle} leader={leader} evangelists={evangelists} />
}

function IndustryContent({
  industry,
  circle,
  leader,
  evangelists,
}: {
  industry: string
  circle: ReturnType<typeof INDUSTRY_CIRCLES[string]> | typeof INDUSTRY_CIRCLES[string]
  leader: (typeof USERS)[number] | undefined
  evangelists: (typeof USERS)[number][]
}) {
  const [joined, setJoined] = useState(false)
  const [showQR, setShowQR] = useState(false)

  return (
    <div className="container mx-auto px-4 py-6 max-w-5xl">
      {/* Breadcrumb */}
      <div className="flex items-center gap-2 text-sm text-gray-400 mb-5">
        <Link href="/community/members" className="hover:text-blue-600 transition-colors">用户榜单</Link>
        <span>/</span>
        <span className="text-gray-700">{circle.icon} {industry}圈子</span>
      </div>

      {/* Hero */}
      <div className={`bg-gradient-to-r ${circle.gradient} rounded-2xl p-6 mb-6 text-white relative overflow-hidden`}>
        <div className="absolute inset-0 opacity-10 text-[120px] flex items-center justify-end pr-8 select-none pointer-events-none leading-none">
          {circle.icon}
        </div>
        <div className="relative">
          <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm rounded-full px-3 py-1 text-sm mb-3">
            <span>{circle.icon}</span>
            <span>{industry}行业圈子</span>
          </div>
          <h1 className="text-2xl font-black mb-1">{industry} AI 实践圈</h1>
          <p className="text-white/80 text-sm max-w-xl mb-4">{circle.desc}</p>
          <div className="flex gap-4 text-sm text-white/90">
            <span>👥 {circle.memberCount.toLocaleString()} 位成员</span>
            <span>📂 {circle.caseCount} 个案例</span>
            <span>🔥 活跃交流中</span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left: Leader + Evangelists */}
        <div className="lg:col-span-2 space-y-6">

          {/* Leader */}
          {leader && (
            <div>
              <h2 className="font-bold text-gray-900 mb-3 flex items-center gap-2">
                <span className="text-lg">🎯</span> 圈子主理人
              </h2>
              <LeaderCard user={leader} />
            </div>
          )}

          {/* Evangelists */}
          {evangelists.length > 0 && (
            <div>
              <h2 className="font-bold text-gray-900 mb-3 flex items-center gap-2">
                <span className="text-lg">📣</span> 圈子布道师
                <span className="text-xs text-gray-400 font-normal">· 活跃分享者，欢迎联系</span>
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {evangelists.map((user) => (
                  <EvangelistCard key={user.id} user={user} />
                ))}
              </div>
            </div>
          )}

          {/* Hot Topics */}
          <div className="bg-white rounded-2xl shadow-sm border p-5">
            <h2 className="font-bold text-gray-900 mb-4 flex items-center gap-2">
              <span>💬</span> 圈内热议话题
            </h2>
            <div className="flex flex-wrap gap-2">
              {circle.topics.map((topic, i) => (
                <Link
                  key={topic}
                  href={`/community/discuss?tag=${encodeURIComponent(topic)}`}
                  className={`px-3 py-1.5 rounded-full text-sm font-medium transition-colors border
                    ${i === 0
                      ? 'bg-red-50 border-red-200 text-red-700 hover:bg-red-100'
                      : i === 1
                      ? 'bg-orange-50 border-orange-200 text-orange-700 hover:bg-orange-100'
                      : 'bg-gray-50 border-gray-200 text-gray-600 hover:bg-gray-100'
                    }`}
                >
                  # {topic}
                </Link>
              ))}
            </div>
          </div>

          {/* Cases link */}
          <Link
            href={`/community/cases?industry=${encodeURIComponent(industry)}`}
            className="flex items-center justify-between bg-white rounded-2xl shadow-sm border p-5 hover:shadow-md transition-shadow group"
          >
            <div>
              <h2 className="font-bold text-gray-900 mb-1 flex items-center gap-2">
                <span>📂</span> {industry}行业案例库
              </h2>
              <p className="text-sm text-gray-500">浏览 {circle.caseCount} 个来自真实用户的落地实践案例</p>
            </div>
            <span className="text-gray-400 group-hover:text-blue-500 transition-colors text-xl">→</span>
          </Link>
        </div>

        {/* Right: Join Group + Industry info */}
        <div className="space-y-4">

          {/* Join Group Card */}
          <div className="bg-white rounded-2xl shadow-sm border overflow-hidden">
            <div className={`h-2 bg-gradient-to-r ${circle.gradient}`} />
            <div className="p-5">
              <h3 className="font-bold text-gray-900 mb-1 flex items-center gap-2">
                <span>💬</span> 加入交流社群
              </h3>
              <p className="text-sm text-gray-500 mb-4">{circle.group.label}，与 {circle.memberCount.toLocaleString()}+ 同行共同探讨 AI 实践</p>

              {showQR ? (
                <div className="text-center mb-4">
                  {/* Mock QR code placeholder */}
                  <div className="w-32 h-32 mx-auto bg-gray-100 rounded-xl border-2 border-dashed border-gray-300 flex flex-col items-center justify-center text-gray-400 mb-2">
                    <span className="text-3xl mb-1">📱</span>
                    <span className="text-xs">微信扫码</span>
                  </div>
                  <p className="text-xs text-gray-400">扫码后点击「加入群聊」</p>
                  <p className="text-xs text-amber-600 mt-1">群二维码 7 天内有效</p>
                </div>
              ) : null}

              <button
                onClick={() => { setJoined(true); setShowQR(true) }}
                className={`w-full py-2.5 rounded-xl text-sm font-semibold transition-colors ${
                  joined
                    ? 'bg-green-50 text-green-700 border border-green-200'
                    : `bg-gradient-to-r ${circle.gradient} text-white hover:opacity-90`
                }`}
              >
                {joined ? '✓ 已获取入群方式' : circle.group.note}
              </button>

              {!joined && (
                <p className="text-xs text-gray-400 text-center mt-2">点击后显示二维码</p>
              )}
            </div>
          </div>

          {/* Stats */}
          <div className="bg-white rounded-2xl shadow-sm border p-4">
            <h3 className="font-semibold text-gray-900 mb-3 text-sm">圈子数据</h3>
            <div className="space-y-2.5">
              {[
                { label: '社群成员', value: circle.memberCount.toLocaleString() + '人', icon: '👥' },
                { label: '行业案例', value: circle.caseCount + '个', icon: '📂' },
                { label: '主理人', value: leader ? leader.name : '待定', icon: '🎯' },
                { label: '布道师', value: evangelists.length + '位', icon: '📣' },
              ].map((item) => (
                <div key={item.label} className="flex items-center justify-between text-sm">
                  <span className="text-gray-500 flex items-center gap-1.5">
                    <span>{item.icon}</span> {item.label}
                  </span>
                  <span className="font-semibold text-gray-900">{item.value}</span>
                </div>
              ))}
            </div>
          </div>

          {/* All Circles nav */}
          <div className="bg-white rounded-2xl shadow-sm border p-4">
            <h3 className="font-semibold text-gray-900 mb-3 text-sm flex items-center gap-1.5">
              <span>🌐</span> 其他行业圈子
            </h3>
            <div className="space-y-1.5">
              {Object.entries(INDUSTRY_CIRCLES)
                .filter(([ind]) => ind !== industry)
                .map(([ind, c]) => (
                  <Link
                    key={ind}
                    href={`/community/industry/${encodeURIComponent(ind)}`}
                    className="flex items-center gap-2 text-sm text-gray-600 hover:text-blue-600 py-1 px-2 rounded-lg hover:bg-blue-50 transition-colors"
                  >
                    <span>{c.icon}</span>
                    <span>{ind}圈</span>
                    <span className="ml-auto text-xs text-gray-400">{c.memberCount.toLocaleString()}人</span>
                  </Link>
                ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

function LeaderCard({ user }: { user: (typeof USERS)[number] }) {
  const id = IDENTITY_MAP[user.identity]
  const showSocials = user.socialPublic && canPublishSocials(user.identity) && user.socials.length > 0

  return (
    <div className="bg-white rounded-2xl shadow-sm border overflow-hidden">
      <div className={`h-2 bg-gradient-to-r ${user.avatarGrad}`} />
      <div className="p-5">
        <div className="flex items-start gap-4">
          <Link href={`/community/members/${user.id}`} className="flex-shrink-0">
            <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${user.avatarGrad} flex items-center justify-center text-white text-2xl font-black hover:scale-105 transition-transform border-2 border-white shadow-md`}>
              {user.avatar}
            </div>
          </Link>
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 flex-wrap mb-1">
              <span className="text-xs px-2 py-0.5 rounded-full font-medium border bg-amber-50 border-amber-300 text-amber-700">
                🎯 主理人
              </span>
              <span className={`text-xs px-2 py-0.5 rounded-full font-medium border ${id.bg} ${id.color}`}>
                {id.icon} {id.label}
              </span>
            </div>
            <Link href={`/community/members/${user.id}`}>
              <h3 className="font-black text-gray-900 hover:text-blue-600 transition-colors text-lg">{user.name}</h3>
            </Link>
            <p className="text-sm text-gray-500">{user.title}</p>
          </div>
        </div>

        <p className="text-sm text-gray-600 leading-relaxed mt-3 mb-3">{user.bio}</p>

        <div className="flex flex-wrap gap-3 text-xs text-gray-400 mb-3">
          <span>📍 {user.location}</span>
          <span>⭐ {user.points.toLocaleString()} 积分</span>
          <span>📂 {user.cases} 案例</span>
          <span>👥 {user.followers >= 10000 ? `${(user.followers / 10000).toFixed(1)}w` : user.followers.toLocaleString()} 关注者</span>
        </div>

        {showSocials && (
          <div className="flex flex-wrap gap-2 mb-3">
            <span className="text-xs text-gray-400">联系方式：</span>
            {user.socials.map((s) => {
              const meta = SOCIAL_META[s.platform]
              return s.url ? (
                <a
                  key={s.platform}
                  href={s.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1 text-xs bg-gray-50 border rounded-full px-2.5 py-1 hover:bg-gray-100 transition-colors"
                >
                  <span>{meta.icon}</span>
                  <span className="text-gray-600">{s.handle}</span>
                </a>
              ) : (
                <span key={s.platform} className="flex items-center gap-1 text-xs bg-gray-50 border rounded-full px-2.5 py-1">
                  <span>{meta.icon}</span>
                  <span className="text-gray-600">{s.handle}</span>
                </span>
              )
            })}
          </div>
        )}

        <Link
          href={`/community/members/${user.id}`}
          className="inline-flex items-center gap-1.5 text-sm text-blue-600 hover:text-blue-700 font-medium"
        >
          查看完整主页 →
        </Link>
      </div>
    </div>
  )
}

function EvangelistCard({ user }: { user: (typeof USERS)[number] }) {
  const id = IDENTITY_MAP[user.identity]
  const showSocials = user.socialPublic && canPublishSocials(user.identity) && user.socials.length > 0

  return (
    <div className="bg-white rounded-xl shadow-sm border p-4 hover:shadow-md transition-shadow">
      <div className="flex items-start gap-3 mb-3">
        <Link href={`/community/members/${user.id}`} className="flex-shrink-0">
          <div className={`w-11 h-11 rounded-xl bg-gradient-to-br ${user.avatarGrad} flex items-center justify-center text-white font-bold hover:scale-105 transition-transform`}>
            {user.avatar}
          </div>
        </Link>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-1.5 flex-wrap mb-0.5">
            <span className="text-xs px-1.5 py-0.5 rounded-full font-medium border bg-violet-50 border-violet-200 text-violet-700">
              📣 布道师
            </span>
            <span className={`text-xs px-1.5 py-0.5 rounded-full font-medium border ${id.bg} ${id.color}`}>
              {id.icon} {id.label}
            </span>
          </div>
          <Link href={`/community/members/${user.id}`}>
            <h3 className="font-bold text-gray-900 hover:text-blue-600 transition-colors text-sm">{user.name}</h3>
          </Link>
          <p className="text-xs text-gray-500 truncate">{user.title}</p>
        </div>
      </div>

      <p className="text-xs text-gray-500 leading-relaxed mb-3 line-clamp-2">{user.bio}</p>

      <div className="flex flex-wrap gap-1.5 mb-3">
        {user.tags.map((tag) => (
          <span key={tag} className="text-xs bg-gray-100 text-gray-500 px-2 py-0.5 rounded-full">#{tag}</span>
        ))}
      </div>

      {showSocials && user.socials.length > 0 && (
        <div className="flex flex-wrap gap-1.5 mb-3">
          {user.socials.slice(0, 3).map((s) => {
            const meta = SOCIAL_META[s.platform]
            return s.url ? (
              <a
                key={s.platform}
                href={s.url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1 text-xs bg-gray-50 border rounded-full px-2 py-0.5 hover:bg-gray-100 transition-colors"
                title={`${meta.label}: ${s.handle}`}
              >
                <span>{meta.icon}</span>
                <span className="text-gray-500 max-w-[70px] truncate">{s.handle}</span>
              </a>
            ) : (
              <span
                key={s.platform}
                className="flex items-center gap-1 text-xs bg-gray-50 border rounded-full px-2 py-0.5"
                title={`${meta.label}: ${s.handle}`}
              >
                <span>{meta.icon}</span>
              </span>
            )
          })}
        </div>
      )}

      <div className="flex items-center justify-between text-xs text-gray-400 pt-2 border-t">
        <span>📂 {user.cases} 案例 · 👥 {user.followers >= 10000 ? `${(user.followers / 10000).toFixed(1)}w` : user.followers.toLocaleString()} 关注</span>
        <Link href={`/community/members/${user.id}`} className="text-blue-500 hover:text-blue-700">
          主页 →
        </Link>
      </div>
    </div>
  )
}
