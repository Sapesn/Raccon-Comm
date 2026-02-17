'use client'

import { useState } from 'react'

const ALL_KBS = [
  {
    id: '1',
    title: '客服智能问答知识库',
    industry: '通用',
    tags: ['客服', '问答', 'FAQ', '话术'],
    author: '小浣熊官方',
    avatar: '🦝',
    docCount: 186,
    fileTypes: ['Word', 'PDF', 'Markdown'],
    saves: 3421,
    views: 12860,
    likes: 624,
    createdAt: '2周前',
    updatedAt: '1天前',
    isOfficial: true,
    desc: '覆盖售前咨询、售后服务、投诉处理等场景的完整客服知识库。转存后，在小浣熊中 @ 本知识库，即可让 AI 自动回答用户问题，无需人工逐条查找。',
    preview: [
      '产品常见问题 FAQ.docx',
      '退换货处理流程.pdf',
      '投诉处理话术手册.docx',
      '会员权益说明.pdf',
      '售后服务标准 SOP.docx',
      '客服绩效考核指引.xlsx',
    ],
    usagePattern: '@客服知识库 用户反映订单长时间未发货，请帮我起草一封安抚邮件',
    linkedChains: ['工单自动分类链路', '客户满意度分析链路'],
    pawSteps: ['Plan：识别用户问题类型', 'Analyze：检索知识库对应政策', 'Write：生成标准回复话术'],
  },
  {
    id: '2',
    title: '合同审查与风险识别库',
    industry: '法律',
    tags: ['合同', '风险', '合规', '法务'],
    author: '李律师',
    avatar: 'L',
    docCount: 214,
    fileTypes: ['PDF', 'Word'],
    saves: 1986,
    views: 7240,
    likes: 348,
    createdAt: '3周前',
    updatedAt: '3天前',
    isOfficial: false,
    desc: '收录了劳动合同、采购合同、服务协议等 20+ 种合同模板及对应的风险条款识别指南。配合小浣熊链路，可实现合同上传后自动标注高风险条款并给出修改建议。',
    preview: [
      '劳动合同风险条款清单.docx',
      '采购合同审查要点.pdf',
      '保密协议 NDA 标准版.docx',
      '股权投资协议模板.docx',
      '服务合同违约条款说明.pdf',
      '合同合规自查 Checklist.xlsx',
    ],
    usagePattern: '@合同知识库 分析这份采购合同中哪些条款对我方不利，给出修改建议',
    linkedChains: ['合同风险审查链路', '合规条款对比链路'],
    pawSteps: ['Plan：确定合同类型和审查重点', 'Analyze：逐条对照知识库风险标准', 'Write：生成风险报告及修改建议'],
  },
  {
    id: '3',
    title: '产品需求文档资源库',
    industry: '互联网',
    tags: ['PRD', '需求', '产品设计', 'UX'],
    author: '产品团队',
    avatar: 'P',
    docCount: 167,
    fileTypes: ['Word', 'Markdown', 'PDF'],
    saves: 2134,
    views: 8960,
    likes: 412,
    createdAt: '1周前',
    updatedAt: '2天前',
    isOfficial: true,
    desc: '包含 PRD 模板、用户故事卡、竞品分析框架、设计规范文档。利用小浣熊 PAW 三步法，配合本知识库可快速生成符合团队规范的需求文档。',
    preview: [
      'PRD 需求文档模板 v2.0.docx',
      '用户故事卡模板.md',
      '功能优先级评估矩阵.xlsx',
      'UX 设计规范手册.pdf',
      '竞品分析框架.docx',
      '产品迭代复盘模板.md',
    ],
    usagePattern: '@产品知识库 基于用户反馈，帮我起草「消息通知中心」功能的 PRD，参考现有文档格式',
    linkedChains: ['竞品分析报告生成链路', '用户需求拆解链路'],
    pawSteps: ['Plan：拆解功能需求点', 'Analyze：参考知识库现有 PRD 结构', 'Write：生成完整 PRD 文档'],
  },
  {
    id: '4',
    title: '财务分析与报表解读库',
    industry: '金融',
    tags: ['财务', '报表', '分析', '指标'],
    author: '陈分析师',
    avatar: 'C',
    docCount: 189,
    fileTypes: ['Excel', 'PDF'],
    saves: 1743,
    views: 5840,
    likes: 296,
    createdAt: '2周前',
    updatedAt: '4天前',
    isOfficial: false,
    desc: '包含财务三表解读指南、关键指标计算公式、DCF 估值模型、行业基准对比数据。上传财务报表后，小浣熊可参考本知识库自动生成分析报告。',
    preview: [
      '财务三表快速解读手册.pdf',
      'DCF 估值模型.xlsx',
      '财务指标速查表.xlsx',
      '异常指标预警规则.docx',
      '行业财务基准数据.xlsx',
      '季报撰写规范指引.docx',
    ],
    usagePattern: '@财务知识库 上传的是 Q3 财报，请分析主要财务指标变化趋势并标注异常项',
    linkedChains: ['季报智能分析链路', '财务异常检测链路'],
    pawSteps: ['Plan：确定分析维度（盈利/偿债/运营/成长）', 'Analyze：对比知识库行业基准数据', 'Write：生成含结论的财务分析报告'],
  },
  {
    id: '5',
    title: '电商运营全场景知识库',
    industry: '电商',
    tags: ['选品', '广告', '数据分析', '运营'],
    author: '张小明',
    avatar: 'Z',
    docCount: 243,
    fileTypes: ['Excel', 'PDF', 'Word'],
    saves: 2284,
    views: 9120,
    likes: 502,
    createdAt: '1个月前',
    updatedAt: '2天前',
    isOfficial: true,
    desc: '覆盖选品分析、广告投放、活动策划、数据复盘的完整运营知识体系。配套多条小浣熊链路，可直接用于日报/周报自动生成、广告效果分析。',
    preview: [
      '选品分析 SOP.pdf',
      '广告投放 ROI 计算模板.xlsx',
      '大促活动策划手册.docx',
      '数据日报自动化模板.xlsx',
      '竞品价格监控规则.docx',
      '用户评论情感分析指南.md',
    ],
    usagePattern: '@运营知识库 根据本周销售数据，帮我生成运营周报，重点分析 ROI 下降原因',
    linkedChains: ['销售数据日报链路', '用户评论批量分析链路', '活动效果复盘链路'],
    pawSteps: ['Plan：确定报告周期和数据范围', 'Analyze：参照知识库指标体系解读数据', 'Write：生成图文并茂的运营报告'],
  },
  {
    id: '6',
    title: '医疗文书规范知识库',
    industry: '医疗',
    tags: ['病历', '医嘱', '规范', '临床'],
    author: '王医生',
    avatar: 'W',
    docCount: 128,
    fileTypes: ['PDF', 'Word'],
    saves: 912,
    views: 3450,
    likes: 198,
    createdAt: '3周前',
    updatedAt: '5天前',
    isOfficial: false,
    desc: '收录病历书写规范、常见病诊疗路径、医嘱模板、知情同意书等临床文书。转存后可让小浣熊参考规范自动结构化病历文本，节省医生书写时间。',
    preview: [
      '病历书写质控标准.pdf',
      '常见疾病诊疗路径.pdf',
      '手术知情同意书模板.docx',
      '护理记录书写规范.docx',
      '药物使用说明速查.pdf',
      '出院小结模板.docx',
    ],
    usagePattern: '@医疗知识库 将以下口述病历内容整理为符合规范的电子病历格式',
    linkedChains: ['病历结构化提取链路', '出院小结生成链路'],
    pawSteps: ['Plan：识别病历关键信息字段', 'Analyze：对照书写规范检查完整性', 'Write：输出结构化标准病历'],
  },
  {
    id: '7',
    title: '代码审查与研发规范库',
    industry: '互联网',
    tags: ['代码规范', '安全', 'Code Review', '研发'],
    author: '技术负责人',
    avatar: 'T',
    docCount: 156,
    fileTypes: ['Markdown', 'PDF'],
    saves: 1654,
    views: 6320,
    likes: 334,
    createdAt: '2周前',
    updatedAt: '1天前',
    isOfficial: false,
    desc: '包含前后端编码规范、安全漏洞检查项、Code Review 评审标准、API 设计指南。小浣熊代码模式下 @ 本库，可自动对照规范完成代码审查。',
    preview: [
      '前端编码规范 v3.0.md',
      '后端 API 设计指南.md',
      '安全漏洞检查清单（OWASP）.pdf',
      'Code Review 评审标准.md',
      'SQL 查询优化规范.md',
      '单元测试覆盖率要求.md',
    ],
    usagePattern: '@研发规范库 对这段 Python 代码做 Code Review，重点检查安全问题和规范符合性',
    linkedChains: ['代码安全扫描链路', 'PR 自动评审链路'],
    pawSteps: ['Plan：明确审查维度（安全/性能/规范）', 'Analyze：逐条对照规范文档检查', 'Write：生成评审意见和改进建议'],
  },
  {
    id: '8',
    title: '市场营销内容素材库',
    industry: '通用',
    tags: ['营销', '文案', '品牌', '内容创作'],
    author: '市场团队',
    avatar: 'M',
    docCount: 312,
    fileTypes: ['Word', 'Markdown', 'PDF'],
    saves: 1834,
    views: 7640,
    likes: 428,
    createdAt: '1周前',
    updatedAt: '12小时前',
    isOfficial: true,
    desc: '汇集品牌手册、文案风格指南、历史爆款案例、各渠道内容模板。转存后让小浣熊参考品牌调性自动生成符合风格的营销内容，保持品牌一致性。',
    preview: [
      '品牌视觉与文案风格指南.pdf',
      '微信公众号推文模板集.docx',
      '小红书种草文案公式.md',
      '抖音脚本写作框架.docx',
      '历史爆款案例分析.xlsx',
      '活动策划文案模板库.docx',
    ],
    usagePattern: '@营销知识库 参考品牌风格，为新品发布写一篇小红书种草文案，突出 AI 办公场景',
    linkedChains: ['多平台内容批量生成链路', '爆款文案分析链路'],
    pawSteps: ['Plan：确定目标平台和受众', 'Analyze：参考知识库爆款案例和品牌调性', 'Write：生成符合平台规范的营销内容'],
  },
]

const INDUSTRIES = ['全部', '通用', '互联网', '电商', '金融', '医疗', '法律']
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

        <div className="bg-emerald-50 rounded-xl p-4 mb-4">
          <p className="text-sm font-semibold text-gray-800 mb-1">{kb.title}</p>
          <p className="text-xs text-gray-500 mb-2">{kb.docCount} 篇文档 · {kb.fileTypes.join('、')}</p>
          <div className="flex gap-2 flex-wrap">
            {kb.tags.map((tag) => (
              <span key={tag} className="text-xs bg-emerald-100 text-emerald-700 px-2 py-0.5 rounded-full">#{tag}</span>
            ))}
          </div>
        </div>

        {/* Usage hint */}
        <div className="bg-blue-50 rounded-xl p-3 mb-4">
          <p className="text-xs font-medium text-blue-700 mb-1">💡 转存后在小浣熊中这样使用：</p>
          <p className="text-xs text-blue-600 font-mono break-all">{kb.usagePattern}</p>
        </div>

        <div className="space-y-3 mb-5">
          {steps.map((s, i) => (
            <div
              key={i}
              className={`flex items-center gap-3 p-3 rounded-xl transition-all ${i <= step ? 'bg-emerald-50 border border-emerald-100' : 'bg-gray-50 border border-transparent'}`}
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
            ✅ 转存完成，前往小浣熊使用
          </button>
        ) : (
          <div className="w-full bg-gray-100 text-gray-400 py-3 rounded-xl font-semibold text-center">
            转存中...
          </div>
        )}
        <p className="text-xs text-center text-gray-400 mt-3">
          转存后可在「我的知识库」中独立编辑，并在小浣熊任务中通过 @ 引用
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
            <p className="text-emerald-100 text-sm mb-4">
              发现并转存优质知识库，在小浣熊中通过 <code className="bg-white/20 px-1.5 py-0.5 rounded text-xs">@知识库名</code> 即可引用，开箱即用
            </p>
            <div className="flex flex-wrap gap-3 text-xs">
              {[
                { icon: '📥', text: '一键转存到个人空间' },
                { icon: '@', text: '小浣熊任务中直接引用' },
                { icon: '🔗', text: '配套链路快速复用' },
              ].map((item) => (
                <div key={item.text} className="flex items-center gap-1.5 bg-white/15 rounded-full px-3 py-1">
                  <span>{item.icon}</span>
                  <span>{item.text}</span>
                </div>
              ))}
            </div>
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

                    {/* Usage Pattern */}
                    <div className="bg-blue-50 rounded-lg px-3 py-2 mb-3">
                      <span className="text-xs font-medium text-blue-700">小浣熊使用示例：</span>
                      <p className="text-xs text-blue-600 font-mono mt-0.5 break-all">{kb.usagePattern}</p>
                    </div>

                    {/* Linked Chains */}
                    <div className="flex items-center gap-2 mb-3 flex-wrap">
                      <span className="text-xs text-gray-400">配套链路：</span>
                      {kb.linkedChains.map((chain) => (
                        <span key={chain} className="text-xs bg-violet-50 text-violet-600 px-2 py-0.5 rounded-full">⚡ {chain}</span>
                      ))}
                    </div>

                    {/* Meta */}
                    <div className="flex items-center gap-4 text-xs text-gray-400 mb-3">
                      <span>📄 {kb.docCount} 篇文档</span>
                      <span>📁 {kb.fileTypes.join(' / ')}</span>
                    </div>

                    {/* Preview Collapsed/Expanded */}
                    {isExpanded && (
                      <div className="bg-gray-50 rounded-xl p-4 mb-3 space-y-3">
                        {/* PAW Steps */}
                        <div>
                          <p className="text-xs font-semibold text-gray-700 mb-2">PAW 三步法使用指引</p>
                          <div className="flex flex-col sm:flex-row gap-2">
                            {kb.pawSteps.map((step, i) => (
                              <div key={i} className={`flex-1 rounded-lg px-3 py-2 text-xs ${i === 0 ? 'bg-blue-50 text-blue-700' : i === 1 ? 'bg-violet-50 text-violet-700' : 'bg-emerald-50 text-emerald-700'}`}>
                                {step}
                              </div>
                            ))}
                          </div>
                        </div>
                        {/* Doc Preview */}
                        <div>
                          <p className="text-xs font-semibold text-gray-700 mb-2">文档目录（部分）</p>
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
                      </div>
                    )}

                    {/* Actions */}
                    <div className="flex items-center justify-between mt-1 flex-wrap gap-3">
                      <div className="flex items-center gap-3">
                        <div className="flex items-center gap-2">
                          <div className="w-7 h-7 rounded-full bg-gradient-to-br from-emerald-400 to-blue-400 flex items-center justify-center text-white text-xs font-bold">
                            {typeof kb.avatar === 'string' && kb.avatar.length > 1 ? kb.avatar : kb.avatar}
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
                          {isExpanded ? '收起' : '查看详情'}
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
          {/* How to use */}
          <div className="bg-white rounded-xl p-4 shadow-sm border">
            <h3 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
              <span>🚀</span> 如何使用知识库
            </h3>
            <div className="space-y-3">
              {[
                { step: '1', title: '转存知识库', desc: '点击「一键转存」复制到你的空间' },
                { step: '2', title: '在小浣熊中引用', desc: '输入 @ 选择对应知识库' },
                { step: '3', title: '执行 AI 任务', desc: 'AI 自动参考知识库内容完成任务' },
              ].map((item) => (
                <div key={item.step} className="flex gap-3">
                  <div className="w-6 h-6 rounded-full bg-emerald-100 text-emerald-700 text-xs font-bold flex items-center justify-center flex-shrink-0">
                    {item.step}
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-800">{item.title}</p>
                    <p className="text-xs text-gray-500">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* PAW Method */}
          <div className="bg-gradient-to-br from-blue-50 to-violet-50 rounded-xl p-4 border border-blue-100">
            <h3 className="font-semibold text-gray-900 mb-2 flex items-center gap-2">
              <span>🐾</span> PAW 三步法
            </h3>
            <p className="text-xs text-gray-500 mb-3">小浣熊推荐的知识库使用方法</p>
            <div className="space-y-2">
              {[
                { letter: 'P', word: 'Plan', desc: '明确任务目标和范围', color: 'bg-blue-100 text-blue-700' },
                { letter: 'A', word: 'Analyze', desc: '参考知识库分析现状', color: 'bg-violet-100 text-violet-700' },
                { letter: 'W', word: 'Write', desc: '生成符合规范的输出', color: 'bg-emerald-100 text-emerald-700' },
              ].map((item) => (
                <div key={item.letter} className="flex items-start gap-2">
                  <span className={`text-xs font-bold px-1.5 py-0.5 rounded ${item.color} flex-shrink-0`}>{item.letter}</span>
                  <div>
                    <span className="text-xs font-medium text-gray-700">{item.word}</span>
                    <span className="text-xs text-gray-500 ml-1">— {item.desc}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Publish */}
          <div className="bg-gradient-to-br from-emerald-500 to-teal-600 rounded-xl p-5 text-white">
            <h3 className="font-semibold mb-2 flex items-center gap-2">
              <span>📤</span> 共享知识库
            </h3>
            <p className="text-sm text-emerald-100 mb-3">将你的知识库共享给社区，同时获取积分奖励。</p>
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
