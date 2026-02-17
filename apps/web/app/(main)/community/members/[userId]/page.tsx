'use client'

import { useState } from 'react'
import Link from 'next/link'
import { use } from 'react'
import { USERS, IDENTITY_MAP, SOCIAL_META, INDUSTRY_CIRCLES, ROLE_META, canPublishSocials } from '../data'

export default function UserProfilePage({ params }: { params: Promise<{ userId: string }> }) {
  const { userId } = use(params)
  const user = USERS.find((u) => u.id === userId)

  if (!user) {
    return (
      <div className="container mx-auto px-4 py-16 max-w-3xl text-center">
        <div className="text-6xl mb-4">🦝</div>
        <h2 className="text-xl font-bold text-gray-800 mb-2">找不到该用户</h2>
        <p className="text-gray-500 mb-6">用户不存在或已注销</p>
        <Link href="/community/members" className="text-blue-600 hover:underline">← 返回用户榜单</Link>
      </div>
    )
  }

  return <ProfileContent userId={userId} />
}

function ProfileContent({ userId }: { userId: string }) {
  const user = USERS.find((u) => u.id === userId)!
  const id = IDENTITY_MAP[user.identity]
  const showSocials = user.socialPublic && canPublishSocials(user.identity) && user.socials.length > 0
  const eligible = canPublishSocials(user.identity)

  const [followed, setFollowed] = useState(false)

  return (
    <div className="container mx-auto px-4 py-6 max-w-4xl">
      {/* Back */}
      <Link href="/community/members" className="inline-flex items-center gap-1.5 text-sm text-gray-500 hover:text-blue-600 transition-colors mb-5">
        ← 返回用户榜单
      </Link>

      <div className="flex flex-col lg:flex-row gap-6">
        {/* Left: Profile card */}
        <div className="w-full lg:w-72 lg:flex-shrink-0 space-y-4">

          {/* Main card */}
          <div className="bg-white rounded-2xl shadow-sm border overflow-hidden">
            {/* Cover */}
            <div className={`h-20 bg-gradient-to-br ${user.avatarGrad} relative`}>
              <div className="absolute -bottom-8 left-5">
                <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${user.avatarGrad} flex items-center justify-center text-white text-2xl font-bold border-4 border-white shadow-lg`}>
                  {user.avatar}
                </div>
              </div>
            </div>

            <div className="px-5 pt-10 pb-5">
              {/* Identity badge + role badge */}
              <div className="flex flex-wrap gap-1.5 mb-2">
                <span className={`text-xs px-2 py-0.5 rounded-full font-medium border ${id.bg} ${id.color}`}>
                  {id.icon} {id.label}
                </span>
                {user.industryRole && (() => {
                  const role = ROLE_META[user.industryRole]
                  return (
                    <Link
                      href={`/community/industry/${encodeURIComponent(user.industry)}`}
                      className={`text-xs px-2 py-0.5 rounded-full font-medium border ${role.bg} ${role.color} hover:opacity-80 transition-opacity`}
                    >
                      {role.icon} {user.industry}{role.label}
                    </Link>
                  )
                })()}
              </div>

              <h1 className="text-xl font-black text-gray-900 mb-0.5">{user.name}</h1>
              <p className="text-sm text-gray-500 mb-3">{user.title}</p>

              {/* Meta */}
              <div className="flex flex-wrap gap-x-4 gap-y-1 text-xs text-gray-400 mb-4">
                <span>📍 {user.location}</span>
                <span>🗓️ 加入于 {user.joinedAt}</span>
                {INDUSTRY_CIRCLES[user.industry] ? (
                  <Link href={`/community/industry/${encodeURIComponent(user.industry)}`} className="flex items-center gap-1 hover:text-blue-500 transition-colors">
                    <span>{INDUSTRY_CIRCLES[user.industry].icon}</span>
                    <span>{user.industry}圈</span>
                  </Link>
                ) : (
                  <span>🏭 {user.industry}</span>
                )}
              </div>

              {/* Stats */}
              <div className="grid grid-cols-4 gap-2 text-center border-t border-b py-3 mb-4">
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

              {/* Follow button */}
              <button
                onClick={() => setFollowed(!followed)}
                className={`w-full py-2 rounded-xl text-sm font-medium transition-colors ${
                  followed
                    ? 'bg-gray-100 text-gray-500 border'
                    : 'bg-blue-600 text-white hover:bg-blue-700'
                }`}
              >
                {followed ? '✓ 已关注' : '+ 关注'}
              </button>
            </div>
          </div>

          {/* Social accounts */}
          <div className="bg-white rounded-2xl shadow-sm border p-4">
            <h3 className="font-semibold text-gray-900 mb-3 flex items-center gap-2 text-sm">
              <span>🔗</span> 社交账号
            </h3>

            {showSocials ? (
              <div className="space-y-2">
                {user.socials.map((s) => {
                  const meta = SOCIAL_META[s.platform]
                  const content = (
                    <div className="flex items-center gap-2.5 p-2.5 rounded-lg border hover:bg-gray-50 transition-colors">
                      <span className="text-lg">{meta.icon}</span>
                      <div className="flex-1 min-w-0">
                        <p className="text-xs text-gray-400">{meta.label}</p>
                        <p className="text-sm font-medium text-gray-800 truncate">{s.handle}</p>
                      </div>
                      {s.url && <span className="text-xs text-blue-500">↗</span>}
                    </div>
                  )
                  return s.url ? (
                    <a key={s.platform} href={s.url} target="_blank" rel="noopener noreferrer">
                      {content}
                    </a>
                  ) : (
                    <div key={s.platform}>{content}</div>
                  )
                })}
              </div>
            ) : !eligible ? (
              <div className="text-center py-4">
                <p className="text-xs text-gray-400 mb-2">该用户暂未开放社交联系</p>
                <p className="text-xs text-gray-300">仅认证用户与会员用户可展示社交账号</p>
              </div>
            ) : (
              <div className="text-center py-4">
                <p className="text-xs text-gray-400">该用户暂未公开社交账号</p>
              </div>
            )}
          </div>

          {/* Tags */}
          <div className="bg-white rounded-2xl shadow-sm border p-4">
            <h3 className="font-semibold text-gray-900 mb-3 text-sm">擅长领域</h3>
            <div className="flex flex-wrap gap-1.5">
              {user.tags.map((tag) => (
                <span key={tag} className="text-xs bg-blue-50 text-blue-600 px-2.5 py-1 rounded-full">#{tag}</span>
              ))}
            </div>
          </div>

          {/* Industry Circle */}
          {INDUSTRY_CIRCLES[user.industry] && (() => {
            const circle = INDUSTRY_CIRCLES[user.industry]
            return (
              <Link
                href={`/community/industry/${encodeURIComponent(user.industry)}`}
                className={`block bg-gradient-to-br ${circle.gradient} rounded-2xl p-4 text-white hover:opacity-95 transition-opacity`}
              >
                <div className="flex items-center gap-2 mb-1.5">
                  <span className="text-xl">{circle.icon}</span>
                  <h3 className="font-semibold text-sm">{user.industry}行业圈子</h3>
                </div>
                <p className="text-xs text-white/75 mb-2 line-clamp-2">{circle.desc}</p>
                <p className="text-xs text-white/90 font-medium">👥 {circle.memberCount.toLocaleString()} 位成员 · 进入圈子 →</p>
              </Link>
            )
          })()}
        </div>

        {/* Right: Content */}
        <div className="flex-1 space-y-5">

          {/* Bio */}
          <div className="bg-white rounded-2xl shadow-sm border p-5">
            <h2 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
              <span>📝</span> 个人简介
            </h2>
            <p className="text-sm text-gray-600 leading-relaxed">{user.bio}</p>
            <div className="mt-4 flex flex-wrap gap-1.5">
              {user.badges.map((b, i) => (
                <span key={i} className="text-xl" title="徽章">{b}</span>
              ))}
            </div>
          </div>

          {/* Recent Cases */}
          <div className="bg-white rounded-2xl shadow-sm border p-5">
            <div className="flex items-center justify-between mb-4">
              <h2 className="font-semibold text-gray-900 flex items-center gap-2">
                <span>📂</span> 近期案例
              </h2>
              <span className="text-xs text-gray-400">共 {user.cases} 个案例</span>
            </div>
            <div className="space-y-3">
              {user.recentCases.map((c, i) => (
                <div key={i} className="flex items-center gap-3 p-3 rounded-xl border hover:bg-gray-50 transition-colors cursor-pointer group">
                  <div className={`w-8 h-8 rounded-lg bg-gradient-to-br ${user.avatarGrad} flex items-center justify-center text-white text-xs font-bold flex-shrink-0`}>
                    {i + 1}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-gray-800 group-hover:text-blue-600 transition-colors truncate">{c.title}</p>
                    <div className="flex gap-3 text-xs text-gray-400 mt-0.5">
                      <span>👁 {c.views.toLocaleString()}</span>
                      <span>👍 {c.likes}</span>
                    </div>
                  </div>
                  <span className="text-gray-300 group-hover:text-blue-400 transition-colors text-sm">→</span>
                </div>
              ))}
            </div>
            <Link
              href="/community/cases"
              className="mt-3 w-full text-sm text-center text-gray-400 hover:text-blue-600 transition-colors block py-2"
            >
              查看全部案例 →
            </Link>
          </div>

          {/* Social settings notice (shown to own profile or admin — demo only) */}
          {eligible && (
            <div className="bg-gradient-to-br from-violet-50 to-blue-50 rounded-2xl border border-violet-100 p-5">
              <h2 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
                <span>⚙️</span> 社交账号管理
                <span className="text-xs bg-violet-100 text-violet-600 px-2 py-0.5 rounded-full font-normal">认证权益</span>
              </h2>
              <p className="text-sm text-gray-500 mb-4">
                作为 <span className="font-medium text-violet-700">{id.label}</span>，你可以在个人主页公开展示社交账号，让其他用户更方便地与你联系。
              </p>
              <div className="space-y-2 mb-4">
                {(['weibo', 'wechat', 'twitter', 'linkedin', 'github', 'xiaohongshu'] as const).map((platform) => {
                  const meta = SOCIAL_META[platform]
                  const linked = user.socials.find((s) => s.platform === platform)
                  return (
                    <div key={platform} className="flex items-center justify-between py-2 px-3 bg-white rounded-xl border">
                      <div className="flex items-center gap-2">
                        <span>{meta.icon}</span>
                        <span className="text-sm text-gray-700">{meta.label}</span>
                        {linked && (
                          <span className="text-xs text-gray-400 ml-1 truncate max-w-[100px]">{linked.handle}</span>
                        )}
                      </div>
                      <div className="flex items-center gap-2">
                        {linked ? (
                          <span className="text-xs text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full">已关联</span>
                        ) : (
                          <button className="text-xs text-blue-600 hover:underline">+ 关联</button>
                        )}
                        {linked && (
                          <button className="text-xs text-gray-400 hover:text-gray-600">
                            {user.socialPublic ? '👁 公开中' : '🔒 未公开'}
                          </button>
                        )}
                      </div>
                    </div>
                  )
                })}
              </div>
              <p className="text-xs text-gray-400">
                前往 <Link href="/community/profile" className="text-blue-500 hover:underline">个人中心</Link> 管理账号关联与公开设置。
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
