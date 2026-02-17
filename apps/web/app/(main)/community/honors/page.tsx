'use client'

import { useState } from 'react'

const ZONES = [
  {
    key: 'authority',
    name: '权威殿堂',
    subtitle: '顶级机构认可',
    icon: '🏛️',
    animal: '🦁',
    animalName: '荣耀狮',
    bg: 'bg-amber-50',
    border: 'border-amber-300',
    headerBg: 'bg-amber-500',
    badgeBg: 'bg-amber-100',
    badgeText: 'text-amber-800',
    plaqueBg: 'bg-amber-900',
    plaqueText: 'text-amber-100',
    deco: ['🌳', '🌿', '🌳'],
    category: '权威机构',
  },
  {
    key: 'media',
    name: '媒体广场',
    subtitle: '行业媒体评选',
    icon: '📰',
    animal: '🦊',
    animalName: '捷报狐',
    bg: 'bg-orange-50',
    border: 'border-orange-300',
    headerBg: 'bg-orange-500',
    badgeBg: 'bg-orange-100',
    badgeText: 'text-orange-800',
    plaqueBg: 'bg-orange-900',
    plaqueText: 'text-orange-100',
    deco: ['🌺', '🌿', '🌼'],
    category: '媒体评选',
  },
  {
    key: 'user',
    name: '用户花园',
    subtitle: '用户口碑认证',
    icon: '⭐',
    animal: '🐼',
    animalName: '口碑熊猫',
    bg: 'bg-green-50',
    border: 'border-green-300',
    headerBg: 'bg-green-600',
    badgeBg: 'bg-green-100',
    badgeText: 'text-green-800',
    plaqueBg: 'bg-green-900',
    plaqueText: 'text-green-100',
    deco: ['🌱', '🌷', '🍃'],
    category: '用户评选',
  },
  {
    key: 'tech',
    name: '技术基地',
    subtitle: '开发者技术社区',
    icon: '💻',
    animal: '🦅',
    animalName: '代码鹰',
    bg: 'bg-blue-50',
    border: 'border-blue-300',
    headerBg: 'bg-blue-600',
    badgeBg: 'bg-blue-100',
    badgeText: 'text-blue-800',
    plaqueBg: 'bg-blue-900',
    plaqueText: 'text-blue-100',
    deco: ['🌲', '⚡', '🌲'],
    category: '技术社区',
  },
  {
    key: 'community',
    name: '社区成就墙',
    subtitle: '小浣熊社区里程碑',
    icon: '🦝',
    animal: '🦝',
    animalName: '社区浣熊',
    bg: 'bg-violet-50',
    border: 'border-violet-300',
    headerBg: 'bg-violet-600',
    badgeBg: 'bg-violet-100',
    badgeText: 'text-violet-800',
    plaqueBg: 'bg-violet-900',
    plaqueText: 'text-violet-100',
    deco: ['🎉', '✨', '🎊'],
    category: '社区成就',
  },
]

const AWARDS_BY_CATEGORY: Record<string, { name: string; org: string; year: string; product: string; desc: string; icon: string; level: string }[]> = {
  权威机构: [
    { name: 'WAIC 2024 最佳 AI 应用奖', org: '世界人工智能大会', year: '2024', product: '办公小浣熊', desc: '凭借卓越的 AI 办公能力和广泛的企业应用案例荣获殊荣', icon: '🏆', level: '金奖' },
    { name: '2023 IDC 中国 AI 平台市场领导者', org: 'IDC 中国', year: '2023', product: '小浣熊家族', desc: '技术领先性和市场增长率双项指标进入「领导者」象限', icon: '🥇', level: '市场领导者' },
    { name: '2024 OpenAtom 开源贡献奖', org: '开放原子开源基金会', year: '2024', product: '代码小浣熊', desc: '代码补全、缺陷检测核心能力突破性贡献，荣获年度贡献奖', icon: '⭐', level: '特别贡献' },
    { name: '2024 德勤科技高成长 50 强', org: '德勤中国', year: '2024', product: '商汤科技', desc: '小浣熊产品线作为核心增长引擎之一受到重点表彰', icon: '📈', level: 'TOP 50' },
    { name: 'CAICT 可信 AI 认证', org: '中国信通院', year: '2024', product: '小浣熊家族', desc: '通过中国信通院可信人工智能系列标准评测，获颁可信认证', icon: '✅', level: '可信认证' },
  ],
  媒体评选: [
    { name: '2024 中国年度最受企业欢迎 AI 产品', org: '36氪研究院', year: '2024', product: '小浣熊家族', desc: '以高企业采纳率和用户满意度获评年度最受欢迎产品', icon: '🎖️', level: '年度大奖' },
    { name: '2023 钛媒体年度 AI 创新产品', org: '钛媒体', year: '2023', product: '代码小浣熊', desc: '凭借多语言支持和企业级代码安全能力脱颖而出', icon: '🚀', level: '年度创新' },
    { name: '量子位 2024 AI 最佳商业落地案例', org: '量子位智库', year: '2024', product: '办公小浣熊', desc: '金融、医疗、法律三大行业规模化落地实践入选年度标杆案例', icon: '📊', level: '标杆案例' },
  ],
  用户评选: [
    { name: '用户满意度五星认证', org: '艾瑞咨询', year: '2024', product: '办公小浣熊', desc: '任务执行准确率、响应速度、用户界面三项均获最高评分', icon: '⭐', level: '五星认证' },
    { name: '2024 G2 企业软件高评分奖', org: 'G2 Crowd', year: '2024', product: '代码小浣熊', desc: '在开发者辅助类工具评测中获得 4.8/5.0 高分，连续两季度入选 High Performer', icon: '🌟', level: 'High Performer' },
  ],
  技术社区: [
    { name: 'GIAC 2023 大会最佳实践案例', org: '全球互联网架构大会', year: '2023', product: '代码小浣熊', desc: '展示在大型互联网企业 DevOps 流程中的规模化落地实践', icon: '🏅', level: '最佳实践' },
    { name: 'SegmentFault 2024 年度技术工具', org: 'SegmentFault 思否', year: '2024', product: '代码小浣熊', desc: '在 30 万开发者投票中脱颖而出，荣获年度最受欢迎技术工具', icon: '💻', level: '年度技术工具' },
  ],
  社区成就: [
    { name: '社区百万用户里程碑', org: '小浣熊社区', year: '2024', product: '小浣熊社区', desc: '注册用户突破 100 万，共享案例超 5000 个，知识库转存超 50 万次', icon: '🎉', level: '里程碑' },
    { name: '千万次 AI 任务执行纪念', org: '小浣熊平台', year: '2024', product: '小浣熊家族', desc: '平台 AI 任务执行次数突破 1000 万次，服务超 30 万企业用户', icon: '🚀', level: '超级里程碑' },
  ],
}

export default function HonorsPage() {
  const [activeZone, setActiveZone] = useState<string | null>(null)
  const [hoveredAward, setHoveredAward] = useState<string | null>(null)

  const totalAwards = Object.values(AWARDS_BY_CATEGORY).flat().length

  return (
    <div className="min-h-screen">
      {/* Zoo Entrance */}
      <div className="bg-gradient-to-b from-sky-400 via-sky-300 to-green-400 pt-8 pb-0 text-center relative overflow-hidden">
        {/* Clouds */}
        <div className="absolute top-3 left-8 text-4xl opacity-60 animate-pulse">☁️</div>
        <div className="absolute top-6 left-32 text-3xl opacity-40">☁️</div>
        <div className="absolute top-2 right-16 text-5xl opacity-50">☁️</div>
        <div className="absolute top-8 right-48 text-2xl opacity-60">☁️</div>

        {/* Gate */}
        <div className="relative z-10 inline-block">
          <div className="bg-amber-800 text-white px-12 py-4 rounded-t-3xl shadow-2xl border-4 border-amber-600 inline-block mx-4">
            <div className="flex items-center gap-3 mb-1">
              <span className="text-3xl">🏆</span>
              <h1 className="text-2xl font-black tracking-wide">小浣熊荣誉动物园</h1>
              <span className="text-3xl">🏆</span>
            </div>
            <p className="text-amber-200 text-sm">Raccoon Honor Zoo · 共 {totalAwards} 项荣誉展品</p>
          </div>
          {/* Gate Pillars */}
          <div className="flex justify-between px-2">
            <div className="w-6 h-8 bg-amber-800 border-2 border-amber-600 rounded-b-sm" />
            <div className="w-6 h-8 bg-amber-800 border-2 border-amber-600 rounded-b-sm" />
          </div>
        </div>

        {/* Ground line */}
        <div className="h-8 bg-green-600 mt-0 border-t-4 border-green-500" />
      </div>

      {/* Zoo Map */}
      <div
        className="relative overflow-auto"
        style={{
          background: 'repeating-linear-gradient(0deg, transparent, transparent 39px, rgba(34,197,94,0.15) 39px, rgba(34,197,94,0.15) 40px), repeating-linear-gradient(90deg, transparent, transparent 39px, rgba(34,197,94,0.15) 39px, rgba(34,197,94,0.15) 40px), #16a34a',
          minHeight: '700px',
        }}
      >
        {/* Decorative path in center */}
        <div className="absolute inset-0 pointer-events-none">
          {/* Horizontal path */}
          <div className="absolute top-1/2 left-0 right-0 h-10 -translate-y-1/2"
            style={{ background: 'repeating-linear-gradient(90deg, #d4b483 0px, #d4b483 30px, #c9a96e 30px, #c9a96e 40px)' }}
          />
          {/* Vertical path */}
          <div className="absolute left-1/2 top-0 bottom-0 w-10 -translate-x-1/2"
            style={{ background: 'repeating-linear-gradient(0deg, #d4b483 0px, #d4b483 30px, #c9a96e 30px, #c9a96e 40px)' }}
          />
          {/* Raccoon mascot at center */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-10">
            <div className="w-16 h-16 bg-amber-100 rounded-full border-4 border-amber-400 flex items-center justify-center shadow-xl text-3xl">
              🦝
            </div>
          </div>
        </div>

        {/* Zone Grid */}
        <div className="relative z-10 grid grid-cols-1 sm:grid-cols-2 gap-6 p-6 max-w-6xl mx-auto">
          {ZONES.map((zone) => {
            const awards = AWARDS_BY_CATEGORY[zone.category] || []
            const isActive = activeZone === zone.key || activeZone === null

            return (
              <div
                key={zone.key}
                className={`transition-all duration-300 ${!isActive ? 'opacity-40 scale-95' : ''} ${zone.key === 'community' ? 'sm:col-span-2' : ''}`}
              >
                {/* Zone Enclosure */}
                <div
                  className={`${zone.bg} border-4 ${zone.border} rounded-2xl overflow-hidden shadow-xl cursor-pointer`}
                  onClick={() => setActiveZone(activeZone === zone.key ? null : zone.key)}
                  style={{ borderStyle: 'dashed' }}
                >
                  {/* Zone Header / Sign */}
                  <div className={`${zone.headerBg} p-3 flex items-center justify-between`}>
                    <div className="flex items-center gap-2">
                      <span className="text-2xl">{zone.icon}</span>
                      <div>
                        <h3 className="text-white font-black text-sm tracking-wide">{zone.name}</h3>
                        <p className="text-white/70 text-xs">{zone.subtitle}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      {/* Decorative animals/plants */}
                      <div className="flex gap-1 text-sm">{zone.deco.map((d, i) => <span key={i}>{d}</span>)}</div>
                      <div className="bg-white/20 rounded-full px-2 py-0.5 text-white text-xs font-bold">
                        {awards.length} 项
                      </div>
                    </div>
                  </div>

                  {/* Zone Animal Tag */}
                  <div className="flex items-center gap-2 px-4 py-2 border-b border-dashed border-current opacity-40">
                    <span className="text-lg">{zone.animal}</span>
                    <span className="text-xs text-gray-500 italic">区域守护者：{zone.animalName}</span>
                  </div>

                  {/* Awards inside zone */}
                  <div className={`p-4 grid gap-3 ${zone.key === 'community' ? 'sm:grid-cols-2' : 'grid-cols-1'}`}>
                    {awards.map((award, i) => {
                      const awardKey = `${zone.key}-${i}`
                      const isHovered = hoveredAward === awardKey
                      return (
                        <div
                          key={i}
                          className="relative"
                          onMouseEnter={() => setHoveredAward(awardKey)}
                          onMouseLeave={() => setHoveredAward(null)}
                        >
                          {/* Plaque */}
                          <div
                            className={`${zone.plaqueBg} rounded-xl p-4 shadow-lg transition-all duration-200 ${isHovered ? 'scale-105 shadow-2xl' : ''}`}
                            style={{ boxShadow: isHovered ? `0 0 20px rgba(0,0,0,0.4)` : undefined }}
                          >
                            {/* Plaque Header */}
                            <div className="flex items-start justify-between mb-2">
                              <span className="text-2xl">{award.icon}</span>
                              <div className={`${zone.badgeBg} ${zone.badgeText} text-xs px-2 py-0.5 rounded-full font-bold`}>
                                {award.level}
                              </div>
                            </div>
                            {/* Award Name */}
                            <h4 className={`${zone.plaqueText} font-bold text-sm mb-1 leading-snug`}>
                              {award.name}
                            </h4>
                            {/* Meta */}
                            <div className={`flex items-center gap-2 text-xs mb-2 ${zone.plaqueText} opacity-60`}>
                              <span>{award.org}</span>
                              <span>·</span>
                              <span>{award.year}</span>
                              <span>·</span>
                              <span>{award.product}</span>
                            </div>
                            {/* Desc - show on hover */}
                            <div className={`overflow-hidden transition-all duration-200 ${isHovered ? 'max-h-20 opacity-100' : 'max-h-0 opacity-0'}`}>
                              <p className={`text-xs ${zone.plaqueText} opacity-70 leading-relaxed`}>
                                {award.desc}
                              </p>
                            </div>
                            {!isHovered && (
                              <p className={`text-xs ${zone.plaqueText} opacity-40 italic`}>悬停查看详情</p>
                            )}
                            {/* Decorative plaque bottom */}
                            <div className={`mt-2 pt-2 border-t border-white/10 flex justify-center`}>
                              <div className="flex gap-1">
                                {[...Array(3)].map((_, j) => (
                                  <div key={j} className="w-1 h-1 rounded-full bg-white opacity-20" />
                                ))}
                              </div>
                            </div>
                          </div>
                          {/* Plaque stand */}
                          <div className="flex justify-center">
                            <div className="w-8 h-2 bg-gray-400 opacity-50 rounded-b" />
                          </div>
                        </div>
                      )
                    })}
                  </div>

                  {/* Zone footer */}
                  <div className="px-4 pb-3 flex items-center justify-between text-xs text-gray-400">
                    <span>{activeZone === zone.key ? '🔍 点击关闭聚焦' : '🔍 点击聚焦此区域'}</span>
                    <span className="flex gap-1">{zone.deco.map((d, i) => <span key={i}>{d}</span>)}</span>
                  </div>
                </div>
              </div>
            )
          })}
        </div>

        {/* Zoo Footer decorations */}
        <div className="text-center pb-6 pt-2 text-2xl space-x-2 opacity-60 select-none">
          <span>🌳</span><span>🌲</span><span>🌿</span><span>🦝</span><span>🌿</span><span>🌲</span><span>🌳</span>
        </div>
      </div>

      {/* Bottom Stats Bar */}
      <div className="bg-amber-900 text-amber-100 py-4 px-6">
        <div className="max-w-6xl mx-auto flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-6 text-sm">
            {[
              { label: '展区总数', value: `${ZONES.length} 个`, icon: '🗺️' },
              { label: '荣誉展品', value: `${totalAwards} 项`, icon: '🏆' },
              { label: '权威机构', value: '5 个', icon: '🏛️' },
              { label: '覆盖年份', value: '2023–2024', icon: '📅' },
            ].map((item) => (
              <div key={item.label} className="flex items-center gap-1.5">
                <span>{item.icon}</span>
                <span className="text-amber-300 font-bold">{item.value}</span>
                <span className="text-amber-200/60">{item.label}</span>
              </div>
            ))}
          </div>
          <button className="text-sm bg-amber-700 hover:bg-amber-600 px-4 py-1.5 rounded-full transition-colors">
            🔗 分享荣誉园
          </button>
        </div>
      </div>
    </div>
  )
}
