'use client'

import { useState } from 'react'

const ALL_KBS = [
  {
    id: '1',
    title: 'AI Prompt 工程实践库',
    industry: '互联网',
    tags: ['Prompt', 'AI', '模板', '提示工程'],
    author: 'Prompt 工程师',
    avatar: 'P',
    docCount: 512,
    fileTypes: ['Markdown', 'TXT'],
    saves: 2341,
    views: 8960,
    likes: 412,
    createdAt: '3天前',
    updatedAt: '1天前',
    isOfficial: true,
    desc: '汇总 500+ 个经过验证的 Prompt 模板，涵盖文本处理、代码生成、数据分析等场景，持续更新维护。包含完整的使用说明和效果示例。',
    preview: ['GPT 角色扮演模板集', '代码审查 Prompt 大全', '数据分析指令模板', '文案创作提示词', '翻译润色专用 Prompt'],
  },
  {
    id: '2',
    title: '电商运营知识库 · 完整版',
    industry: '电商',
    tags: ['选品', '广告', '数据分析', '客服'],
    author: '张小明',
    avatar: 'Z',
    docCount: 236,
    fileTypes: ['PDF', 'Excel', 'Word'],
    saves: 1284,
    views: 4820,
    likes: 238,
    createdAt: '1周前',
    updatedAt: '2天前',
    isOfficial: true,
    desc: '涵盖选品策略、广告投放、数据分析、客服话术等 200+ 篇文档，适合电商团队日常运营参考。经过实际验证，可直接复用。',
    preview: ['选品分析框架.xlsx', '广告投放 SOP.pdf', '客服话术大全.docx', '数据看板模板.xlsx', 'ROI 计算工具.xlsx'],
  },
  {
    id: '3',
    title: '法律合规知识库 · 企业版',
    industry: '法律',
    tags: ['合同', '合规', '风险', '模板'],
    author: '李律师',
    avatar: 'L',
    docCount: 158,
    fileTypes: ['PDF', 'Word'],
    saves: 986,
    views: 3560,
    likes: 176,
    createdAt: '2周前',
    updatedAt: '3天前',
    isOfficial: false,
    desc: '整理了劳动合同、保密协议、股权协议等常见法律文件模板及风险分析，适合法务和创业团队日常使用。',
    preview: ['劳动合同模板（标准版）.docx', '股权投资协议.docx', '保密协议 NDA.docx', '合同风险审查清单.pdf', '企业合规自查手册.pdf'],
  },
  {
    id: '4',
    title: '金融分析师工具箱',
    industry: '金融',
    tags: ['财务', '估值', '研究', '模型'],
    author: '陈分析师',
    avatar: 'C',
    docCount: 189,
    fileTypes: ['Excel', 'PDF'],
    saves: 743,
    views: 2840,
    likes: 152,
    createdAt: '1周前',
    updatedAt: '4天前',
    isOfficial: false,
    desc: '包含财务分析框架、DCF 估值模型、行业研究模板、数据处理脚本等，适合投研和财务分析师使用。',
    preview: ['DCF 估值模型.xlsx', '财务三表分析框架.xlsx', '行业研究报告模板.docx', '风险评估矩阵.xlsx', '财务指标速查手册.pdf'],
  },
  {
    id: '5',
    title: '医疗健康文档资源库',
    industry: '医疗',
    tags: ['病历', '临床', '规范', '指南'],
    author: '王医生',
    avatar: 'W',
    docCount: 124,
    fileTypes: ['PDF', 'Word'],
    saves: 612,
    views: 2130,
    likes: 98,
    createdAt: '2周前',
    updatedAt: '5天前',
    isOfficial: false,
    desc: '收录常见疾病诊疗规范、病历书写标准、药物说明及临床指南，方便医疗从业者快速查阅和使用。',
    preview: ['病历书写规范.pdf', '常见疾病诊疗流程.pdf', '药物相互作用速查.docx', '手术知情同意书模板.docx', '护理记录表模板.docx'],
  },
  {
    id: '6',
    title: '教育培训课程资料库',
    industry: '教育',
    tags: ['课件', '教案', '题库', '培训'],
    author: '教育达人',
    avatar: 'J',
    docCount: 203,
    fileTypes: ['PPT', 'PDF', 'Word'],
    saves: 834,
    views: 3210,
    likes: 165,
    createdAt: '3周前',
    updatedAt: '1周前',
    isOfficial: true,
    desc: '包含 K12 到职场培训的多种课件、教案模板和题库，支持一键导入，快速搭建自己的课程体系。',
    preview: ['Python 入门课件.pptx', '职场沟通技巧教案.docx', '数学题库（初中版）.pdf', '培训效果评估表.xlsx', '学员反馈问卷.docx'],
  },
  {
    id: '7',
    title: '互联网产品设计知识库',
    industry: '互联网',
    tags: ['产品', 'UX', '设计规范', '竞品'],
    author: '产品团队',
    avatar: 'P',
    docCount: 167,
    fileTypes: ['PDF', 'Markdown'],
    saves: 921,
    views: 3740,
    likes: 208,
    createdAt: '1周前',
    updatedAt: '2天前',
    isOfficial: false,
    desc: '汇集产品需求文档模板、UX 设计规范、竞品分析框架、用户访谈指南等，适合产品和设计团队使用。',
    preview: ['PRD 需求文档模板.docx', 'UX 设计规范手册.pdf', '竞品分析框架.xlsx', '用户访谈指南.docx', '产品迭代复盘模板.docx'],
  },
  {
    id: '8',
    title: '制造业生产管理知识库',
    industry: '制造业',
    tags: ['生产', '质量', 'SOP', '6Sigma'],
    author: '工厂管理员',
    avatar: 'G',
    docCount: 98,
    fileTypes: ['Excel', 'PDF', 'Word'],
    saves: 384,
    views: 1450,
    likes: 67,
    createdAt: '1个月前',
    updatedAt: '2周前',
    isOfficial: false,
    desc: '涵盖生产计划、质量管理（6Sigma/ISO）、设备维护 SOP、安全规程等文档，适合制造企业管理人员。',
    preview: ['生产日报表模板.xlsx', '质量检验 SOP.pdf', '设备点检表.xlsx', '安全操作规程.docx', '6Sigma 项目模板.pptx'],
  },
]

const INDUSTRIES = ['全部', '互联网', '电商', '金融', '医疗', '法律', '教育', '制造业', '零售']
const SORT_OPTIONS = ['最多转存', '最新发布', '最多点赞', '最多浏览']

function SaveModal({ kb, onClose }: { kb: typeof ALL_KBS[0]; onClose: () => void }) {
  const [step, setStep] = useState(0)
  const [done, setDone] = useState(false)

  const steps = [
    { icon: '📂', title: '读取知识库结构', desc: '正在解析知识库文档目录...' },
    { icon: '📋', title: '复制文档内容', desc: `正在复制 ${kb.docCount} 篇文档...` },
    { icon: '✅', title: '存入我的知识库', desc: '即将完成转存，稍等片刻...' },
  ]

  const handleStart = () => {
    if (!done) {
      const timer = setInterval(() => {
        setStep((s) => {
          if (s >= steps.length - 1) {
            clearInterval(timer)
            setDone(true)
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
          <h3 className="text-lg font-bold text-gray-900">📥 一键转存</h3>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600 text-xl">×</button>
        </div>

        <div className="bg-emerald-50 rounded-xl p-4 mb-5">
          <p className="text-sm font-semibold text-gray-800 mb-1">{kb.title}</p>
          <p className="text-xs text-gray-500 mb-2">{kb.docCount} 篇文档 · {kb.fileTypes.join('、')}</p>
          <div className="flex gap-2 flex-wrap">
            {kb.tags.map((tag) => (
              <span key={tag} className="text-xs bg-emerald-100 text-emerald-700 px-2 py-0.5 rounded-full">#{tag}</span>
            ))}
          </div>
        </div>

        <div className="space-y-3 mb-5">
          {steps.map((s, i) => (
            <div
              key={i}
              className={`flex items-center gap-3 p-3 rounded-xl transition-all ${i <= step && (done || i < step || step === i) ? 'bg-emerald-50 border border-emerald-100' : 'bg-gray-50 border border-transparent'}`}
            >
              <div className={`w-8 h-8 rounded-full flex items-center justify-center text-lg flex-shrink-0 ${done && i <= step ? 'bg-emerald-100' : i === step && !done ? 'bg-blue-100' : i < step ? 'bg-emerald-100' : 'bg-gray-100'}`}>
                {i < step ? '✅' : s.icon}
              </div>
              <div>
                <div className={`text-sm font-medium ${i <= step ? 'text-gray-900' : 'text-gray-400'}`}>{s.title}</div>
                <div className={`text-xs ${i <= step ? 'text-gray-500' : 'text-gray-300'}`}>{s.desc}</div>
              </div>
            </div>
          ))}
        </div>

        {step === 0 && !done ? (
          <button
            onClick={handleStart}
            className="w-full bg-emerald-600 text-white py-3 rounded-xl font-semibold hover:bg-emerald-700 transition-colors"
          >
            📥 立即转存到我的知识库
          </button>
        ) : done ? (
          <button
            onClick={onClose}
            className="w-full bg-blue-600 text-white py-3 rounded-xl font-semibold hover:bg-blue-700 transition-colors"
          >
            ✅ 转存完成，前往我的知识库
          </button>
        ) : (
          <div className="w-full bg-gray-100 text-gray-400 py-3 rounded-xl font-semibold text-center">
            转存中...
          </div>
        )}
        <p className="text-xs text-center text-gray-400 mt-3">
          转存后可在「我的知识库」中独立编辑和使用
        </p>
      </div>
    </div>
  )
}

export default function KnowledgePage() {
  const [industry, setIndustry] = useState('全部')
  const [sort, setSort] = useState('最多转存')
  const [search, setSearch] = useState('')
  const [selectedKb, setSelectedKb] = useState<typeof ALL_KBS[0] | null>(null)
  const [expandedId, setExpandedId] = useState<string | null>(null)
  const [savedIds, setSavedIds] = useState<Set<string>>(new Set())

  const filtered = ALL_KBS.filter((kb) => {
    const matchIndustry = industry === '全部' || kb.industry === industry
    const matchSearch = !search || kb.title.includes(search) || kb.tags.some((t) => t.includes(search))
    return matchIndustry && matchSearch
  }).sort((a, b) => {
    if (sort === '最多转存') return b.saves - a.saves
    if (sort === '最多点赞') return b.likes - a.likes
    if (sort === '最多浏览') return b.views - a.views
    return 0
  })

  return (
    <div className="container mx-auto px-4 py-6 max-w-7xl">
      <div className="flex flex-col lg:flex-row gap-6">
        {/* Main Content */}
        <div className="flex-1 min-w-0">
          {/* Header */}
          <div className="bg-gradient-to-r from-emerald-500 to-teal-600 rounded-2xl p-6 mb-5 text-white">
            <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm rounded-full px-3 py-1 text-sm mb-3">
              <span>📚</span>
              <span>已有 318 个知识库共享，本周新增 24 个</span>
            </div>
            <h2 className="text-2xl font-bold mb-1">共享知识库广场</h2>
            <p className="text-emerald-100 text-sm">
              发现并转存优质知识库，一键复制到你的工作空间，开箱即用
            </p>
          </div>

          {/* Filters */}
          <div className="bg-white rounded-xl p-4 shadow-sm border mb-5">
            <div className="flex flex-wrap items-center gap-3">
              <div className="flex gap-2 flex-wrap w-full sm:w-auto">
                {INDUSTRIES.map((ind) => (
                  <button
                    key={ind}
                    onClick={() => setIndustry(ind)}
                    className={`px-3 py-1.5 rounded-full text-sm font-medium transition-colors ${industry === ind ? 'bg-emerald-600 text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}
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
                  className="text-sm border rounded-lg px-2 py-1.5 focus:outline-none focus:ring-2 focus:ring-emerald-300"
                >
                  {SORT_OPTIONS.map((o) => <option key={o}>{o}</option>)}
                </select>
              </div>
              <input
                type="text"
                placeholder="搜索知识库..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="text-sm border rounded-lg px-3 py-1.5 focus:outline-none focus:ring-2 focus:ring-emerald-300 w-full sm:w-44"
              />
            </div>
          </div>

          {/* Stats */}
          <div className="flex items-center gap-2 mb-4 text-sm text-gray-500">
            <span>共 <strong className="text-gray-900">{filtered.length}</strong> 个知识库</span>
            <span>·</span>
            <span>本周新增 <strong className="text-emerald-600">24</strong> 个</span>
          </div>

          {/* KB List */}
          <div className="space-y-4">
            {filtered.map((kb) => {
              const isSaved = savedIds.has(kb.id)
              const isExpanded = expandedId === kb.id

              return (
                <div key={kb.id} className="bg-white rounded-xl shadow-sm border overflow-hidden hover:shadow-md transition-shadow">
                  <div className="p-5">
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex-1 min-w-0">
                        {/* Tags row */}
                        <div className="flex items-center gap-2 mb-2 flex-wrap">
                          <span className="text-xs bg-emerald-50 text-emerald-600 px-2 py-0.5 rounded-full font-medium">{kb.industry}</span>
                          {kb.isOfficial && (
                            <span className="text-xs bg-amber-50 text-amber-600 px-2 py-0.5 rounded-full font-medium">官方推荐</span>
                          )}
                          <span className="text-xs text-gray-400">{kb.updatedAt} 更新</span>
                        </div>

                        <h3 className="text-lg font-semibold text-gray-900 mb-1">{kb.title}</h3>
                        <p className="text-sm text-gray-500 mb-3">{kb.desc}</p>

                        {/* Tags */}
                        <div className="flex gap-2 flex-wrap mb-3">
                          {kb.tags.map((tag) => (
                            <span key={tag} className="text-xs bg-gray-100 text-gray-500 px-2 py-0.5 rounded-full">#{tag}</span>
                          ))}
                        </div>

                        {/* Meta */}
                        <div className="flex items-center gap-4 text-xs text-gray-400 mb-3">
                          <span>📄 {kb.docCount} 篇文档</span>
                          <span>📁 {kb.fileTypes.join(' / ')}</span>
                        </div>

                        {/* Preview Collapsed/Expanded */}
                        {isExpanded && (
                          <div className="bg-gray-50 rounded-xl p-3 mb-3">
                            <p className="text-xs font-medium text-gray-700 mb-2">文档预览（部分）</p>
                            <ul className="space-y-1.5">
                              {kb.preview.map((doc, i) => (
                                <li key={i} className="flex items-center gap-2 text-sm text-gray-600">
                                  <span className="text-gray-300">📄</span>
                                  {doc}
                                </li>
                              ))}
                              <li className="text-xs text-gray-400 pt-1">...共 {kb.docCount} 篇</li>
                            </ul>
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Actions */}
                    <div className="flex items-center justify-between mt-1">
                      <div className="flex items-center gap-3">
                        <div className="flex items-center gap-2">
                          <div className="w-7 h-7 rounded-full bg-gradient-to-br from-emerald-400 to-blue-400 flex items-center justify-center text-white text-xs font-bold">
                            {kb.avatar}
                          </div>
                          <span className="text-sm text-gray-600">{kb.author}</span>
                        </div>
                        <div className="flex items-center gap-3 text-xs text-gray-400">
                          <span>👁 {kb.views.toLocaleString()}</span>
                          <button className="hover:text-red-500 transition-colors">❤️ {kb.likes}</button>
                          <span className="text-emerald-600 font-medium">📥 {kb.saves.toLocaleString()} 转存</span>
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <button
                          onClick={() => setExpandedId(isExpanded ? null : kb.id)}
                          className="text-sm text-gray-500 px-3 py-1.5 rounded-lg border hover:bg-gray-50 transition-colors"
                        >
                          {isExpanded ? '收起' : '预览目录'}
                        </button>
                        <button className="text-sm text-gray-500 px-3 py-1.5 rounded-lg border hover:bg-gray-50 transition-colors">
                          🔗 分享
                        </button>
                        <button
                          onClick={() => {
                            if (!isSaved) setSelectedKb(kb)
                          }}
                          className={`text-sm px-4 py-1.5 rounded-lg font-medium transition-colors ${
                            isSaved
                              ? 'bg-gray-100 text-gray-400 cursor-default'
                              : 'bg-emerald-600 text-white hover:bg-emerald-700'
                          }`}
                        >
                          {isSaved ? '✅ 已转存' : '📥 一键转存'}
                        </button>
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
          {/* Publish */}
          <div className="bg-gradient-to-br from-emerald-500 to-teal-600 rounded-xl p-5 text-white">
            <h3 className="font-semibold mb-2 flex items-center gap-2">
              <span>📤</span> 共享知识库
            </h3>
            <p className="text-sm text-emerald-100 mb-3">将你的知识库共享给社区，帮助更多人，同时获取积分奖励。</p>
            <div className="space-y-1.5 text-sm text-emerald-100 mb-4">
              <div className="flex justify-between">
                <span>发布知识库</span>
                <span className="font-semibold text-white">+100 积分</span>
              </div>
              <div className="flex justify-between">
                <span>每次被转存</span>
                <span className="font-semibold text-white">+20 积分</span>
              </div>
              <div className="flex justify-between">
                <span>官方推荐</span>
                <span className="font-semibold text-white">+300 积分</span>
              </div>
            </div>
            <button className="w-full bg-white text-emerald-600 font-semibold py-2 rounded-lg hover:bg-emerald-50 transition-colors text-sm">
              + 共享我的知识库
            </button>
          </div>

          {/* Hot Industries */}
          <div className="bg-white rounded-xl p-4 shadow-sm border">
            <h3 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
              <span>🔥</span> 热门行业
            </h3>
            <div className="space-y-2.5">
              {[
                { name: '互联网', count: 89, icon: '💻' },
                { name: '电商', count: 67, icon: '🛒' },
                { name: '金融', count: 54, icon: '💰' },
                { name: '法律', count: 42, icon: '⚖️' },
                { name: '教育', count: 38, icon: '📚' },
              ].map((item, i) => (
                <div
                  key={item.name}
                  onClick={() => setIndustry(item.name)}
                  className="flex items-center justify-between cursor-pointer hover:bg-gray-50 p-1.5 rounded-lg transition-colors"
                >
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold text-gray-400">{i + 1}</span>
                    <span className="text-lg">{item.icon}</span>
                    <span className="text-sm text-gray-700">{item.name}</span>
                  </div>
                  <span className="text-xs text-gray-400">{item.count} 个</span>
                </div>
              ))}
            </div>
          </div>

          {/* Tips */}
          <div className="bg-blue-50 rounded-xl p-4 border border-blue-100">
            <h3 className="font-semibold text-gray-900 mb-2 flex items-center gap-2">
              <span>💡</span> 使用建议
            </h3>
            <ul className="text-xs text-gray-600 space-y-1.5">
              <li>• 转存后的知识库独立于原版</li>
              <li>• 可自由添加、删除、修改文档</li>
              <li>• 支持导入到小浣熊任务使用</li>
              <li>• 点击「预览目录」查看文档列表</li>
              <li>• 分享给同事可一起使用</li>
            </ul>
          </div>

          {/* My Saved */}
          <div className="bg-white rounded-xl p-4 shadow-sm border">
            <h3 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
              <span>📁</span> 我的转存
            </h3>
            {savedIds.size === 0 ? (
              <p className="text-sm text-gray-400 text-center py-4">还没有转存任何知识库</p>
            ) : (
              <div className="space-y-2">
                {ALL_KBS.filter((kb) => savedIds.has(kb.id)).map((kb) => (
                  <div key={kb.id} className="text-sm text-gray-700 p-2 bg-emerald-50 rounded-lg">
                    <p className="font-medium line-clamp-1">{kb.title}</p>
                    <p className="text-xs text-gray-400 mt-0.5">📄 {kb.docCount} 篇</p>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Save Modal */}
      {selectedKb && (
        <SaveModal
          kb={selectedKb}
          onClose={() => {
            setSavedIds((prev) => {
              const next = new Set(prev)
              if (selectedKb) next.add(selectedKb.id)
              return next
            })
            setSelectedKb(null)
          }}
        />
      )}
    </div>
  )
}
