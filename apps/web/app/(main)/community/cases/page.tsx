/**
 * 案例列表页
 * 展示社区中用户发布的 AI 工作流复用案例
 * 案例与博客不同：案例是可一键复用的 workflow，博客是文章内容
 */
'use client'

import { useState } from 'react'
import Link from 'next/link'
import { ALL_CASES } from './data'


/** 行业分类筛选选项 */
const INDUSTRIES = ['全部', '电商', '金融', '医疗', '法律', '教育', '互联网', '制造业', '零售']
/** 排序选项 */
const SORT_OPTIONS = ['最多复用', '最新发布', '最多点赞', '最多浏览']

/**
 * 一键复用弹窗组件
 * 模拟将案例加载到小浣熊工作区的过程（三步进度动画）
 *
 * @param caseItem - 要复用的案例数据
 * @param onClose - 关闭弹窗的回调函数
 */
function ReuseModal({ caseItem, onClose }: { caseItem: typeof ALL_CASES[0]; onClose: () => void }) {
  /** 当前进度步骤（0=加载文件, 1=填充Prompt, 2=跳转执行页） */
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

/**
 * 案例列表页组件
 *
 * 功能：
 * - 按行业分类筛选案例
 * - 关键词搜索（匹配标题或标签）
 * - 多维度排序（复用数、发布时间、点赞数、浏览数）
 * - 点击"一键复用"弹出 ReuseModal 进度弹窗
 */
export default function CasesPage() {
  /** 当前选中的行业分类 */
  const [industry, setIndustry] = useState('全部')
  /** 当前排序方式 */
  const [sort, setSort] = useState('最多复用')
  /** 搜索关键词 */
  const [search, setSearch] = useState('')
  /** 当前打开复用弹窗的案例（null 表示弹窗关闭） */
  const [selectedCase, setSelectedCase] = useState<typeof ALL_CASES[0] | null>(null)

  // 应用行业筛选 + 关键词搜索 + 排序
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
                  <Link href={`/community/cases/${c.id}`} className="text-lg font-semibold text-gray-900 mb-2 hover:text-blue-600 transition-colors block">{c.title}</Link>
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
