'use client'

import { useState } from 'react'
import Link from 'next/link'

const ALL_CASES = [
  {
    id: '1',
    title: '电商行业月度销售报告自动化生成链路',
    industry: '电商',
    tags: ['数据分析', '报告生成', '自动化'],
    author: '张小明',
    avatar: 'Z',
    views: 1284,
    likes: 89,
    reuses: 56,
    summary: '通过小浣熊链路将 Excel 销售数据自动清洗、分析并生成专业 PDF 报告，原本需要 3 小时的工作压缩到 5 分钟。',
    background: '每月底财务团队需要花费大量时间手动整理销售数据并制作报告，工作重复且耗时。',
    workflow: '上传Excel → 数据清洗去重 → 统计分析 → 图表生成 → PDF报告导出',
    result: '处理时间从 3 小时缩短至 5 分钟，准确率 99.8%，每月节省人力 20+ 小时',
    value: '将重复性数据处理工作自动化，解放财务人员精力，专注更高价值工作',
    updatedAt: '2小时前',
    isOfficial: true,
  },
  {
    id: '2',
    title: '法律合同风险条款智能审查链路',
    industry: '法律',
    tags: ['合同审查', '风险识别', 'NLP'],
    author: '李律师',
    avatar: 'L',
    views: 986,
    likes: 73,
    reuses: 42,
    summary: '上传合同 PDF，自动识别高风险条款、不平等约定、缺失必要条款，生成结构化风险报告及修改建议。',
    background: '法律顾问审查大量合同耗时费力，且容易遗漏风险条款，造成法律纠纷。',
    workflow: '上传合同PDF → 条款提取解析 → 风险识别分类 → 修改建议生成 → 风险报告输出',
    result: '合同审查效率提升 8 倍，风险识别准确率超 95%，已审查合同 500+ 份',
    value: '降低法律风险，提升审查效率，让律师专注高价值法律判断而非重复劳动',
    updatedAt: '5小时前',
    isOfficial: false,
  },
  {
    id: '3',
    title: '医疗病历结构化提取与摘要生成',
    industry: '医疗',
    tags: ['病历处理', '信息提取', '摘要'],
    author: '王医生',
    avatar: 'W',
    views: 754,
    likes: 61,
    reuses: 38,
    summary: '将非结构化病历文本自动提取关键诊断信息，生成标准化病历摘要，支持批量处理，效率提升 10 倍。',
    background: '医院病历格式不统一，医生需要花费大量时间整理和归档病历信息。',
    workflow: '录入病历文本 → 关键信息提取 → 诊断结构化 → 标准摘要生成 → 系统归档',
    result: '单份病历处理时间从 15 分钟降至 90 秒，日处理能力提升 10 倍',
    value: '提升医疗效率，减少医生行政负担，让医生有更多时间关注患者',
    updatedAt: '1天前',
    isOfficial: false,
  },
  {
    id: '4',
    title: '竞品分析报告一键生成链路',
    industry: '互联网',
    tags: ['竞品分析', '市场研究', '策略'],
    author: '产品团队',
    avatar: 'P',
    views: 623,
    likes: 54,
    reuses: 31,
    summary: '输入竞品名称，自动抓取多维度信息，进行对比分析，生成结构化竞品分析报告，包含 SWOT 分析。',
    background: '产品经理需要定期进行竞品分析，数据收集和整理工作繁琐耗时。',
    workflow: '输入竞品列表 → 多维度信息采集 → 对比分析 → SWOT生成 → 报告输出',
    result: '竞品报告生成时间从 2 天缩短至 2 小时，覆盖维度更全面',
    value: '加速产品决策，确保产品方向不偏离市场，提升竞争力',
    updatedAt: '2天前',
    isOfficial: true,
  },
  {
    id: '5',
    title: '财务季报智能分析与可视化',
    industry: '金融',
    tags: ['财务分析', '可视化', '趋势预测'],
    author: '陈分析师',
    avatar: 'C',
    views: 512,
    likes: 47,
    reuses: 29,
    summary: '上传财务数据，自动计算关键财务指标，识别异常趋势，生成含图表的分析报告，并提供改善建议。',
    background: '财务分析师每季度需要手动处理大量数据，报告周期长，时效性差。',
    workflow: '导入财务数据 → 指标自动计算 → 异常检测 → 图表可视化 → 分析报告',
    result: '季报生成周期从 2 周缩短至 2 天，异常指标发现率提升 40%',
    value: '提升财务决策速度，及时发现资金风险，支持管理层快速决策',
    updatedAt: '3天前',
    isOfficial: false,
  },
  {
    id: '6',
    title: '客服工单智能分类与优先级排序',
    industry: '零售',
    tags: ['客服', '分类', '自动化'],
    author: '运营小组',
    avatar: 'Y',
    views: 489,
    likes: 38,
    reuses: 24,
    summary: '批量处理客服工单，自动识别问题类型、紧急程度，分配给合适的处理人，大幅提升客服效率。',
    background: '客服团队每天处理大量工单，人工分类效率低，紧急问题容易被遗漏。',
    workflow: '工单导入 → NLP分类识别 → 紧急程度评估 → 智能分配 → 处理追踪',
    result: '工单响应时间降低 60%，客户满意度提升至 92%，运营成本降低 30%',
    value: '优化客服资源配置，提升客户体验，降低运营成本',
    updatedAt: '4天前',
    isOfficial: false,
  },
]

const INDUSTRIES = ['全部', '电商', '金融', '医疗', '法律', '教育', '互联网', '制造业', '零售']
const SORT_OPTIONS = ['最多复用', '最新发布', '最多点赞', '最多浏览']

function ReuseModal({ caseItem, onClose }: { caseItem: typeof ALL_CASES[0]; onClose: () => void }) {
  const [step, setStep] = useState(0)
  const steps = [
    { icon: '📂', title: '加载示例文件', desc: '正在自动加载案例示例文件...' },
    { icon: '✍️', title: '填充 Prompt', desc: '正在自动填充任务提示词...' },
    { icon: '🚀', title: '进入执行页', desc: '即将跳转至任务执行页...' },
  ]

  const handleStart = () => {
    if (step < steps.length) {
      const timer = setInterval(() => {
        setStep((s) => {
          if (s >= steps.length - 1) {
            clearInterval(timer)
            return s
          }
          return s + 1
        })
      }, 800)
    }
  }

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4" onClick={onClose}>
      <div className="bg-white rounded-2xl p-6 w-full max-w-md shadow-2xl" onClick={(e) => e.stopPropagation()}>
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-bold text-gray-900">⚡ 一键复用</h3>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600 text-xl">×</button>
        </div>
        <div className="bg-gray-50 rounded-xl p-4 mb-5">
          <p className="text-sm font-medium text-gray-700 line-clamp-2">{caseItem.title}</p>
          <div className="flex gap-2 mt-2">
            {caseItem.tags.map((tag) => (
              <span key={tag} className="text-xs bg-blue-100 text-blue-600 px-2 py-0.5 rounded-full">#{tag}</span>
            ))}
          </div>
        </div>

        <div className="space-y-3 mb-5">
          {steps.map((s, i) => (
            <div key={i} className={`flex items-center gap-3 p-3 rounded-xl transition-all ${i <= step ? 'bg-blue-50 border border-blue-100' : 'bg-gray-50 border border-transparent'}`}>
              <div className={`w-8 h-8 rounded-full flex items-center justify-center text-lg flex-shrink-0 ${i < step ? 'bg-green-100' : i === step ? 'bg-blue-100' : 'bg-gray-100'}`}>
                {i < step ? '✅' : s.icon}
              </div>
              <div>
                <div className={`text-sm font-medium ${i <= step ? 'text-gray-900' : 'text-gray-400'}`}>{s.title}</div>
                <div className={`text-xs ${i <= step ? 'text-gray-500' : 'text-gray-300'}`}>{s.desc}</div>
              </div>
            </div>
          ))}
        </div>

        {step === 0 ? (
          <button
            onClick={handleStart}
            className="w-full bg-blue-600 text-white py-3 rounded-xl font-semibold hover:bg-blue-700 transition-colors"
          >
            🚀 立即复用到小浣熊
          </button>
        ) : step < steps.length - 1 ? (
          <div className="w-full bg-gray-100 text-gray-400 py-3 rounded-xl font-semibold text-center">
            处理中...
          </div>
        ) : (
          <button
            onClick={onClose}
            className="w-full bg-green-600 text-white py-3 rounded-xl font-semibold hover:bg-green-700 transition-colors"
          >
            ✅ 已复用，前往小浣熊执行
          </button>
        )}
        <p className="text-xs text-center text-gray-400 mt-3">
          复用将自动打开小浣熊产品并填充所有配置
        </p>
      </div>
    </div>
  )
}

export default function CasesPage() {
  const [industry, setIndustry] = useState('全部')
  const [sort, setSort] = useState('最多复用')
  const [search, setSearch] = useState('')
  const [selectedCase, setSelectedCase] = useState<typeof ALL_CASES[0] | null>(null)

  const filtered = ALL_CASES.filter((c) => {
    const matchIndustry = industry === '全部' || c.industry === industry
    const matchSearch = !search || c.title.includes(search) || c.tags.some((t) => t.includes(search))
    return matchIndustry && matchSearch
  }).sort((a, b) => {
    if (sort === '最多复用') return b.reuses - a.reuses
    if (sort === '最多点赞') return b.likes - a.likes
    return b.views - a.views
  })

  return (
    <div className="container mx-auto px-4 py-6 max-w-7xl">
      {/* Filters */}
      <div className="bg-white rounded-xl p-4 shadow-sm border mb-5">
        <div className="flex flex-wrap items-center gap-3">
          <div className="flex gap-2 flex-wrap w-full sm:w-auto">
            {INDUSTRIES.map((ind) => (
              <button
                key={ind}
                onClick={() => setIndustry(ind)}
                className={`px-3 py-1.5 rounded-full text-sm font-medium transition-colors ${industry === ind ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}
              >
                {ind}
              </button>
            ))}
          </div>
          <div className="flex items-center gap-2 w-full sm:w-auto sm:ml-auto">
            <span className="text-sm text-gray-500">排序：</span>
            <select
              value={sort}
              onChange={(e) => setSort(e.target.value)}
              className="text-sm border rounded-lg px-2 py-1.5 focus:outline-none focus:ring-2 focus:ring-blue-300"
            >
              {SORT_OPTIONS.map((o) => <option key={o}>{o}</option>)}
            </select>
          </div>
          <input
            type="text"
            placeholder="搜索案例..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="text-sm border rounded-lg px-3 py-1.5 focus:outline-none focus:ring-2 focus:ring-blue-300 w-full sm:w-40"
          />
        </div>
      </div>

      {/* Stats */}
      <div className="flex items-center gap-2 mb-4 text-sm text-gray-500">
        <span>共 <strong className="text-gray-900">{filtered.length}</strong> 个案例</span>
        <span>·</span>
        <span>本周新增 <strong className="text-blue-600">47</strong> 个</span>
      </div>

      {/* Case List */}
      <div className="space-y-4">
        {filtered.map((c) => (
          <div key={c.id} className="bg-white rounded-xl shadow-sm border overflow-hidden">
            {/* Card Header */}
            <div className="p-5">
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-xs bg-blue-50 text-blue-600 px-2 py-0.5 rounded-full font-medium">{c.industry}</span>
                    {c.isOfficial && (
                      <span className="text-xs bg-amber-50 text-amber-600 px-2 py-0.5 rounded-full font-medium">官方推荐</span>
                    )}
                    <span className="text-xs text-gray-400">{c.updatedAt}</span>
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">{c.title}</h3>
                  <p className="text-sm text-gray-500 mb-3">{c.summary}</p>

                  {/* Tags */}
                  <div className="flex gap-2 flex-wrap mb-3">
                    {c.tags.map((tag) => (
                      <span key={tag} className="text-xs bg-gray-100 text-gray-500 px-2 py-0.5 rounded-full">#{tag}</span>
                    ))}
                  </div>

                  {/* Workflow Preview */}
                  <div className="bg-blue-50 rounded-lg px-3 py-2 text-sm text-blue-700 mb-3">
                    <span className="font-medium text-blue-800">使用链路：</span>{c.workflow}
                  </div>
                </div>
              </div>

              {/* Actions */}
              <div className="flex items-center justify-between mt-3">
                <div className="flex items-center gap-3">
                  <div className="flex items-center gap-2">
                    <div className="w-7 h-7 rounded-full bg-gradient-to-br from-blue-400 to-violet-400 flex items-center justify-center text-white text-xs font-bold">
                      {c.avatar}
                    </div>
                    <span className="text-sm text-gray-600">{c.author}</span>
                  </div>
                  <div className="flex items-center gap-3 text-xs text-gray-400">
                    <span>👁 {c.views}</span>
                    <button className="hover:text-red-500 transition-colors">❤️ {c.likes}</button>
                    <span className="text-blue-500 font-medium">⚡ {c.reuses} 次复用</span>
                  </div>
                </div>
                <div className="flex gap-2">
                  <Link
                    href={`/community/cases/${c.id}`}
                    className="text-sm text-gray-500 px-3 py-1.5 rounded-lg border hover:bg-gray-50 transition-colors"
                  >
                    查看详情
                  </Link>
                  <button className="text-sm text-gray-500 px-3 py-1.5 rounded-lg border hover:bg-gray-50 transition-colors">
                    🔗 分享
                  </button>
                  <button
                    onClick={() => setSelectedCase(c)}
                    className="text-sm bg-blue-600 text-white px-4 py-1.5 rounded-lg hover:bg-blue-700 transition-colors font-medium"
                  >
                    ⚡ 一键复用
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Reuse Modal */}
      {selectedCase && <ReuseModal caseItem={selectedCase} onClose={() => setSelectedCase(null)} />}
    </div>
  )
}
