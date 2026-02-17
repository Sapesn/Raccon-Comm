'use client'

import { useState } from 'react'

type Identity = 'all' | 'vip' | 'contributor' | 'creator' | 'expert' | 'official'

const IDENTITY_MAP: Record<string, { label: string; color: string; bg: string; desc: string; icon: string }> = {
  vip: { label: '行业大 V', color: 'text-amber-700', bg: 'bg-amber-50 border-amber-200', desc: '行业影响力认证，粉丝 10000+', icon: '👑' },
  contributor: { label: '高级贡献者', color: 'text-violet-700', bg: 'bg-violet-50 border-violet-200', desc: '发布案例 50+ 且获官方推荐', icon: '🌟' },
  creator: { label: '优秀创作者', color: 'text-blue-700', bg: 'bg-blue-50 border-blue-200', desc: '高质量内容持续输出者', icon: '✍️' },
  expert: { label: '认证专家', color: 'text-emerald-700', bg: 'bg-emerald-50 border-emerald-200', desc: '通过官方技术认证考试', icon: '🎓' },
  official: { label: '官方团队', color: 'text-red-700', bg: 'bg-red-50 border-red-200', desc: '小浣熊官方账号', icon: '🦝' },
}

const USERS = [
  {
    id: '1',
    name: '张小明',
    avatar: 'Z',
    avatarGrad: 'from-amber-400 to-orange-500',
    identity: 'vip' as const,
    industry: '电商',
    title: '电商 AI 自动化专家',
    bio: '7 年电商运营经验，专注 AI 工作流在电商场景的落地，累计服务 20+ 企业客户。',
    points: 28400,
    cases: 47,
    kbs: 8,
    followers: 12800,
    tags: ['电商', '数据分析', '自动化'],
    rank: 1,
    badges: ['👑', '🌟', '🎖️'],
    highlight: true,
  },
  {
    id: '2',
    name: 'Prompt 工程师小王',
    avatar: 'W',
    avatarGrad: 'from-violet-400 to-blue-500',
    identity: 'contributor' as const,
    industry: '互联网',
    title: 'Prompt 工程首席布道者',
    bio: '专注 Prompt 优化研究，发布 500+ Prompt 模板，小浣熊社区精选收录 30+ 篇。开源 Prompt 评测框架已获 2000+ Star。',
    points: 23200,
    cases: 62,
    kbs: 3,
    followers: 8640,
    tags: ['Prompt', 'LLM', '工程化'],
    rank: 2,
    badges: ['🌟', '✍️', '🎓'],
    highlight: true,
  },
  {
    id: '3',
    name: '李律师',
    avatar: 'L',
    avatarGrad: 'from-blue-400 to-cyan-500',
    identity: 'vip' as const,
    industry: '法律',
    title: '法律科技领域先行者',
    bio: '执业律师 + AI 探索者，将小浣熊引入合同审查、风险识别流程，效率提升 8 倍。在法律 AI 应用领域多次受邀演讲。',
    points: 19800,
    cases: 28,
    kbs: 5,
    followers: 6200,
    tags: ['法律科技', '合同审查', 'LegalAI'],
    rank: 3,
    badges: ['👑', '🎖️'],
    highlight: true,
  },
  {
    id: '4',
    name: '陈分析师',
    avatar: 'C',
    avatarGrad: 'from-emerald-400 to-teal-500',
    identity: 'expert' as const,
    industry: '金融',
    title: '量化分析 · 认证专家',
    bio: '10 年量化投研经验，将小浣熊应用于财务报表分析、异常交易识别，搭建的财务分析链路被 500+ 用户复用。',
    points: 16400,
    cases: 31,
    kbs: 6,
    followers: 4800,
    tags: ['量化分析', '财务', 'FinTech'],
    rank: 4,
    badges: ['🎓', '🌟'],
    highlight: false,
  },
  {
    id: '5',
    name: '王医生',
    avatar: 'W',
    avatarGrad: 'from-pink-400 to-rose-500',
    identity: 'expert' as const,
    industry: '医疗',
    title: '医疗 AI 落地实践者',
    bio: '三甲医院主治医师，推动 AI 辅助病历书写在科室内部的规模化应用，日均节省医生文书时间 2 小时。',
    points: 14200,
    cases: 18,
    kbs: 4,
    followers: 3600,
    tags: ['医疗', '病历AI', 'HealthTech'],
    rank: 5,
    badges: ['🎓', '🎖️'],
    highlight: false,
  },
  {
    id: '6',
    name: '运营达人小林',
    avatar: 'L',
    avatarGrad: 'from-orange-400 to-red-400',
    identity: 'creator' as const,
    industry: '电商',
    title: '内容创作者 · 运营博主',
    bio: '专注 AI 运营工具分享，社区发帖 200+，平均点赞 80+。擅长把复杂的 AI 工作流用通俗语言讲清楚，粉丝称为「AI运营启蒙老师」。',
    points: 12600,
    cases: 15,
    kbs: 2,
    followers: 5200,
    tags: ['内容创作', '运营', '教程'],
    rank: 6,
    badges: ['✍️', '🎖️'],
    highlight: false,
  },
  {
    id: '7',
    name: '技术负责人老赵',
    avatar: 'Z',
    avatarGrad: 'from-slate-400 to-gray-600',
    identity: 'contributor' as const,
    industry: '互联网',
    title: '研发效能 · 高级贡献者',
    bio: '大厂研发效能负责人，主导将小浣熊接入 CI/CD 流程，实现代码审查自动化。分享了完整的工程化方案，被多个团队直接采用。',
    points: 11800,
    cases: 23,
    kbs: 3,
    followers: 2900,
    tags: ['DevOps', '代码审查', '研发效能'],
    rank: 7,
    badges: ['🌟', '🎓'],
    highlight: false,
  },
  {
    id: '8',
    name: '小浣熊官方',
    avatar: '🦝',
    avatarGrad: 'from-blue-500 to-violet-600',
    identity: 'official' as const,
    industry: '全行业',
    title: '小浣熊官方账号',
    bio: '小浣熊产品官方社区账号，发布产品更新公告、优质案例精选、活动通知和使用技巧。欢迎关注获取第一手资讯。',
    points: 99999,
    cases: 124,
    kbs: 18,
    followers: 32600,
    tags: ['官方', '产品更新', '精选'],
    rank: 0,
    badges: ['🦝', '⭐', '🏆'],
    highlight: false,
  },
]

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
              return (
                <div key={user.id} className={`bg-white rounded-xl shadow-sm border overflow-hidden hover:shadow-md transition-shadow ${user.highlight ? 'ring-2 ring-violet-100' : ''}`}>
                  {/* Top gradient */}
                  <div className={`h-1.5 bg-gradient-to-r ${user.avatarGrad}`} />
                  <div className="p-5">
                    <div className="flex items-start gap-4 mb-3">
                      <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${user.avatarGrad} flex items-center justify-center text-white text-xl font-bold flex-shrink-0`}>
                        {user.avatar}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 flex-wrap mb-1">
                          <span className={`text-xs px-2 py-0.5 rounded-full font-medium border ${id.bg} ${id.color}`}>
                            {id.icon} {id.label}
                          </span>
                          <span className="text-xs bg-gray-100 text-gray-500 px-2 py-0.5 rounded-full">{user.industry}</span>
                        </div>
                        <h3 className="font-bold text-gray-900">{user.name}</h3>
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

                    <button className="mt-3 w-full text-sm border text-gray-600 py-1.5 rounded-lg hover:bg-gray-50 transition-colors">
                      关注 Ta
                    </button>
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
                    <div className={`w-7 h-7 rounded-full bg-gradient-to-br ${user.avatarGrad} flex items-center justify-center text-white text-xs font-bold`}>
                      {user.avatar}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm text-gray-800 truncate">{user.name}</p>
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
