'use client'

import { useState } from 'react'

const AWARDS = [
  {
    id: '1',
    name: 'WAIC 2024 最佳 AI 应用奖',
    org: '世界人工智能大会',
    orgIcon: '🏛️',
    year: '2024',
    product: '办公小浣熊',
    category: '权威机构',
    desc: '在 2024 世界人工智能大会上，办公小浣熊凭借其卓越的 AI 办公能力和广泛的企业应用案例，荣获"最佳 AI 应用"奖项。',
    level: '金奖',
    levelColor: 'text-amber-500',
    imgBg: 'from-amber-400 to-orange-500',
    icon: '🏆',
  },
  {
    id: '2',
    name: '2024 中国年度最受企业欢迎 AI 产品',
    org: '36氪研究院',
    orgIcon: '📰',
    year: '2024',
    product: '小浣熊家族',
    category: '媒体评选',
    desc: '36氪研究院发布的《2024年度 AI 工具报告》中，小浣熊家族以高企业采纳率和用户满意度获评"最受企业欢迎 AI 产品"。',
    level: '年度大奖',
    levelColor: 'text-violet-600',
    imgBg: 'from-violet-500 to-blue-500',
    icon: '🎖️',
  },
  {
    id: '3',
    name: '2024 OpenAtom 开源贡献奖',
    org: '开放原子开源基金会',
    orgIcon: '🌐',
    year: '2024',
    product: '代码小浣熊',
    category: '权威机构',
    desc: '代码小浣熊开源版本在代码补全、缺陷检测等核心能力上的突破性贡献，荣获开放原子开源基金会年度贡献奖。',
    level: '特别贡献',
    levelColor: 'text-blue-600',
    imgBg: 'from-blue-400 to-cyan-500',
    icon: '⭐',
  },
  {
    id: '4',
    name: '用户满意度五星认证',
    org: '艾瑞咨询',
    orgIcon: '📊',
    year: '2024',
    product: '办公小浣熊',
    category: '用户评选',
    desc: '艾瑞咨询 2024 AI 办公工具评测中，办公小浣熊在任务执行准确率、响应速度、用户界面满意度三项均获最高评分。',
    level: '五星认证',
    levelColor: 'text-amber-500',
    imgBg: 'from-green-400 to-emerald-500',
    icon: '⭐',
  },
  {
    id: '5',
    name: '2023 IDC 中国 AI 平台市场领导者',
    org: 'IDC 中国',
    orgIcon: '🌍',
    year: '2023',
    product: '小浣熊家族',
    category: '权威机构',
    desc: 'IDC 中国发布的 AI 平台市场报告中，商汤小浣熊以技术领先性和市场增长率双项指标进入"领导者"象限。',
    level: '市场领导者',
    levelColor: 'text-blue-700',
    imgBg: 'from-slate-500 to-blue-600',
    icon: '🥇',
  },
  {
    id: '6',
    name: '2023 钛媒体年度 AI 创新产品',
    org: '钛媒体',
    orgIcon: '📱',
    year: '2023',
    product: '代码小浣熊',
    category: '媒体评选',
    desc: '钛媒体评选的 2023 年度 AI 创新产品，代码小浣熊凭借多语言支持和企业级代码安全能力脱颖而出。',
    level: '年度创新',
    levelColor: 'text-orange-500',
    imgBg: 'from-orange-400 to-red-500',
    icon: '🚀',
  },
  {
    id: '7',
    name: 'GIAC 2023 大会最佳实践案例',
    org: '全球互联网架构大会',
    orgIcon: '💻',
    year: '2023',
    product: '代码小浣熊',
    category: '技术社区',
    desc: '在 GIAC 2023 大会上，商汤科技展示了代码小浣熊在大型互联网企业 DevOps 流程中的规模化落地实践，荣获最佳实践案例。',
    level: '最佳实践',
    levelColor: 'text-emerald-600',
    imgBg: 'from-emerald-400 to-teal-500',
    icon: '🏅',
  },
  {
    id: '8',
    name: '社区百万用户里程碑',
    org: '小浣熊社区',
    orgIcon: '🦝',
    year: '2024',
    product: '小浣熊社区',
    category: '社区成就',
    desc: '小浣熊社区注册用户突破 100 万，共享案例超 5000 个，知识库转存次数超 50 万次，社区生态繁荣发展。',
    level: '里程碑',
    levelColor: 'text-pink-600',
    imgBg: 'from-pink-400 to-rose-500',
    icon: '🎉',
  },
  {
    id: '9',
    name: '2024 德勤科技高成长 50 强',
    org: '德勤中国',
    orgIcon: '🏦',
    year: '2024',
    product: '商汤科技',
    category: '权威机构',
    desc: '商汤科技荣登德勤中国科技高成长 50 强榜单，小浣熊产品线作为核心增长引擎之一受到重点表彰。',
    level: 'TOP 50',
    levelColor: 'text-slate-700',
    imgBg: 'from-slate-400 to-gray-600',
    icon: '📈',
  },
]

const TIMELINE = [
  { year: '2024', count: 5, highlight: 'WAIC 最佳 AI 应用、IDC 领导者、百万用户里程碑' },
  { year: '2023', count: 4, highlight: '钛媒体年度创新、GIAC 最佳实践、开源贡献奖' },
]

const CATEGORIES = ['全部', '权威机构', '媒体评选', '用户评选', '技术社区', '社区成就']

export default function HonorsPage() {
  const [category, setCategory] = useState('全部')
  const [yearFilter, setYearFilter] = useState('全部')

  const filtered = AWARDS.filter((a) => {
    const matchCat = category === '全部' || a.category === category
    const matchYear = yearFilter === '全部' || a.year === yearFilter
    return matchCat && matchYear
  })

  return (
    <div className="container mx-auto px-4 py-6 max-w-6xl">
      {/* Hero */}
      <div className="relative rounded-2xl overflow-hidden bg-gradient-to-r from-amber-500 via-orange-500 to-red-500 p-8 mb-8 text-white">
        <div className="relative z-10">
          <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm rounded-full px-3 py-1 text-sm mb-4">
            <span>🏆</span>
            <span>累计荣获 {AWARDS.length}+ 项行业认可</span>
          </div>
          <h2 className="text-3xl font-bold mb-2">小浣熊荣誉室</h2>
          <p className="text-orange-100 max-w-lg">
            记录小浣熊家族在技术创新、产品体验、行业影响力上获得的每一份肯定与认可
          </p>
        </div>
        <div className="absolute right-8 top-1/2 -translate-y-1/2 text-9xl opacity-15 select-none">🏆</div>
        <div className="absolute bottom-0 right-0 w-72 h-72 bg-white/5 rounded-full translate-x-16 translate-y-16" />
      </div>

      {/* Timeline Summary */}
      <div className="flex gap-4 mb-8 overflow-x-auto pb-2">
        {TIMELINE.map((t) => (
          <div
            key={t.year}
            onClick={() => setYearFilter(yearFilter === t.year ? '全部' : t.year)}
            className={`flex-shrink-0 rounded-xl p-4 border cursor-pointer transition-all ${yearFilter === t.year ? 'bg-amber-50 border-amber-300' : 'bg-white hover:shadow-sm'}`}
          >
            <div className="flex items-center gap-2 mb-1">
              <span className="text-lg font-bold text-gray-900">{t.year}</span>
              <span className="text-xs bg-amber-100 text-amber-700 px-2 py-0.5 rounded-full">{t.count} 项荣誉</span>
            </div>
            <p className="text-xs text-gray-500 max-w-48">{t.highlight}</p>
          </div>
        ))}
      </div>

      <div className="flex flex-col lg:flex-row gap-6">
        {/* Main */}
        <div className="flex-1">
          {/* Filters */}
          <div className="bg-white rounded-xl p-4 shadow-sm border mb-5 flex flex-wrap gap-2 items-center">
            <span className="text-sm text-gray-500 font-medium">分类：</span>
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                onClick={() => setCategory(cat)}
                className={`px-3 py-1.5 rounded-full text-sm font-medium transition-colors ${category === cat ? 'bg-amber-500 text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}
              >
                {cat}
              </button>
            ))}
            {yearFilter !== '全部' && (
              <button
                onClick={() => setYearFilter('全部')}
                className="ml-auto text-xs text-gray-400 hover:text-gray-600 underline"
              >
                清除年份筛选
              </button>
            )}
          </div>

          <div className="text-sm text-gray-500 mb-4">
            共 <strong className="text-gray-900">{filtered.length}</strong> 项荣誉
          </div>

          {/* Award Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {filtered.map((award) => (
              <div key={award.id} className="bg-white rounded-xl shadow-sm border overflow-hidden hover:shadow-md transition-shadow group">
                {/* Top Banner */}
                <div className={`h-2 bg-gradient-to-r ${award.imgBg}`} />
                <div className="p-5">
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="text-xs bg-gray-100 text-gray-600 px-2 py-0.5 rounded-full">{award.category}</span>
                      <span className={`text-xs font-semibold ${award.levelColor}`}>{award.level}</span>
                    </div>
                    <span className="text-2xl flex-shrink-0">{award.icon}</span>
                  </div>

                  <h3 className="text-base font-bold text-gray-900 mb-1 leading-snug group-hover:text-amber-600 transition-colors">
                    {award.name}
                  </h3>

                  <div className="flex items-center gap-2 mb-3 text-xs text-gray-500">
                    <span>{award.orgIcon} {award.org}</span>
                    <span>·</span>
                    <span>{award.year} 年</span>
                    <span>·</span>
                    <span className="text-blue-600">{award.product}</span>
                  </div>

                  <p className="text-sm text-gray-500 line-clamp-3">{award.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Sidebar */}
        <div className="w-full lg:w-64 lg:flex-shrink-0 space-y-4 hidden lg:block">
          {/* Stats */}
          <div className="bg-gradient-to-br from-amber-50 to-orange-50 rounded-xl p-5 border border-amber-100">
            <h3 className="font-semibold text-gray-900 mb-4 flex items-center gap-2">
              <span>📊</span> 荣誉概览
            </h3>
            <div className="space-y-3">
              {[
                { label: '获奖总数', value: `${AWARDS.length}+`, icon: '🏆' },
                { label: '权威机构认可', value: '5', icon: '🏛️' },
                { label: '媒体评选', value: '2', icon: '📰' },
                { label: '社区成就', value: '2', icon: '🦝' },
                { label: '覆盖年份', value: '2023–2024', icon: '📅' },
              ].map((item) => (
                <div key={item.label} className="flex items-center justify-between">
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <span>{item.icon}</span>
                    <span>{item.label}</span>
                  </div>
                  <span className="text-sm font-bold text-gray-900">{item.value}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Products */}
          <div className="bg-white rounded-xl p-5 shadow-sm border">
            <h3 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
              <span>🦝</span> 小浣熊家族
            </h3>
            <div className="space-y-2.5">
              {[
                { name: '办公小浣熊', desc: 'AI 办公助手', awards: 3, color: 'bg-blue-100 text-blue-700' },
                { name: '代码小浣熊', desc: '智能编程助手', awards: 4, color: 'bg-violet-100 text-violet-700' },
                { name: '小浣熊社区', desc: '知识共享平台', awards: 2, color: 'bg-emerald-100 text-emerald-700' },
              ].map((p) => (
                <div key={p.name} className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-800">{p.name}</p>
                    <p className="text-xs text-gray-400">{p.desc}</p>
                  </div>
                  <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${p.color}`}>{p.awards} 项</span>
                </div>
              ))}
            </div>
          </div>

          {/* Share */}
          <div className="bg-white rounded-xl p-5 shadow-sm border">
            <h3 className="font-semibold text-gray-900 mb-2 flex items-center gap-2">
              <span>📤</span> 分享荣誉
            </h3>
            <p className="text-xs text-gray-500 mb-3">为小浣熊的成就点赞，分享给你的同事和朋友</p>
            <button className="w-full text-sm bg-gray-900 text-white py-2 rounded-lg hover:bg-gray-800 transition-colors">
              🔗 分享荣誉室
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
