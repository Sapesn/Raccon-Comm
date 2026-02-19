/**
 * 成果案例详情页组件
 *
 * 功能概述:
 * - 展示 AI 链路案例的详细信息（背景、工作流、输入输出、成果数据）
 * - 支持一键复用链路（带步骤动画的模态框）
 * - 提供点赞、收藏、评论互动功能
 * - 展示相关案例推荐
 *
 * 数据结构:
 * - CASES_DATA: 静态案例数据字典，以案例 id 为键
 * - 每个案例包含：基本信息、工作流步骤、输入输出规格、成果指标、评论
 */
'use client'

import { useState, use } from 'react'
import Link from 'next/link'

/**
 * 案例数据静态存储
 *
 * 结构说明:
 * 使用 Record<string, ...> 类型以 id 为键存储案例数据，
 * 支持 O(1) 时间复杂度的快速查找。
 * 实际生产环境中应替换为 API 请求。
 */
const CASES_DATA: Record<string, {
  id: string
  title: string
  industry: string
  tags: string[]
  author: string
  authorTitle: string
  avatar: string
  avatarBg: string
  views: number
  likes: number
  reuses: number
  collects: number
  createdAt: string
  updatedAt: string
  isOfficial: boolean
  background: string
  workflow: {
    step: number
    name: string
    desc: string
    icon: string
    prompt?: string
  }[]
  inputs: { name: string; type: string; example: string }[]
  outputs: { name: string; desc: string }[]
  result: string
  resultMetrics: { label: string; before: string; after: string; change: string }[]
  value: string
  comments: { id: string; author: string; avatar: string; avatarBg: string; content: string; time: string; likes: number }[]
  related: { id: string; title: string; industry: string; reuses: number }[]
}> = {
  '1': {
    id: '1',
    title: '电商行业月度销售报告自动化生成链路',
    industry: '电商',
    tags: ['数据分析', '报告生成', '自动化', 'Excel处理'],
    author: '张小明',
    authorTitle: '某头部电商平台数据分析师',
    avatar: 'Z',
    avatarBg: 'from-blue-400 to-cyan-400',
    views: 1284,
    likes: 89,
    reuses: 56,
    collects: 134,
    createdAt: '2025-12-10',
    updatedAt: '2天前',
    isOfficial: true,
    background: '电商平台每月底需要向管理层提交销售报告，以往由数据团队手动整理 Excel 原始数据、计算各维度指标、制作图表，最后编写分析文字。整个流程耗时约 3 小时，且容易因手动操作产生计算错误。高峰期人手紧张时，报告质量难以保障。',
    workflow: [
      {
        step: 1,
        name: '上传原始数据',
        icon: '📁',
        desc: '将月度销售明细 Excel 文件上传至小浣熊，支持多 Sheet 批量上传',
        prompt: '请读取上传的 Excel 文件，识别所有 Sheet 页及数据结构，列出包含的字段名称和数据条数。',
      },
      {
        step: 2,
        name: '数据清洗去重',
        icon: '🧹',
        desc: '自动识别并处理重复订单、异常金额、格式不一致等数据质量问题',
        prompt: '对上述数据进行清洗：1) 删除重复订单号；2) 标记金额异常（超过均值3倍标准差）的记录；3) 统一日期格式为 YYYY-MM-DD；输出清洗后数据及问题清单。',
      },
      {
        step: 3,
        name: '多维度分析',
        icon: '📊',
        desc: '按品类、渠道、地区、时间维度计算 GMV、订单量、客单价、同比环比等指标',
        prompt: '基于清洗后的数据，计算以下指标：总GMV、总订单量、平均客单价、退款率，以及按品类/渠道/地区分组的各维度数据，并计算与上月和去年同月的环比同比变化率。',
      },
      {
        step: 4,
        name: '趋势洞察',
        icon: '🔍',
        desc: '识别数据中的增长亮点、下滑警示，生成智能化分析结论',
        prompt: '基于以上统计数据，分析：1) 增长最快的3个品类和渠道；2) 需要关注的下滑风险项；3) 与行业基准相比的表现；给出3-5条具体的业务洞察。',
      },
      {
        step: 5,
        name: '生成 PDF 报告',
        icon: '📄',
        desc: '输出包含图表、数据表格和分析文字的专业 PDF 报告，一键发送给管理层',
        prompt: '基于以上所有分析结果，生成一份结构完整的月度销售报告，包含：执行摘要、核心指标大盘、各维度详细分析、风险与机会、下月建议，格式专业，适合管理层阅读。',
      },
    ],
    inputs: [
      { name: '销售明细 Excel', type: '文件', example: 'sales_2024_12.xlsx (必填)' },
      { name: '目标/预算数据', type: '文件', example: 'budget_2024.xlsx (可选)' },
      { name: '报告月份', type: '文本', example: '2024年12月' },
      { name: '分析维度', type: '选项', example: '品类、渠道、地区（可多选）' },
    ],
    outputs: [
      { name: 'PDF 月度报告', desc: '含执行摘要、指标大盘、分析图表的完整报告' },
      { name: '数据清洗日志', desc: '记录所有数据问题及处理方式' },
      { name: '指标汇总表', desc: '可直接复制到 PPT 的数据表格' },
    ],
    result: '该链路已在某头部电商平台数据团队稳定运行 3 个月，月均处理 15 份报告，累计节省人力 200+ 小时。报告生成时间从平均 3 小时压缩至 5 分钟，数据准确率从 96% 提升至 99.8%。',
    resultMetrics: [
      { label: '报告生成时间', before: '3 小时', after: '5 分钟', change: '-97%' },
      { label: '数据准确率', before: '96%', after: '99.8%', change: '+3.8%' },
      { label: '月均节省人力', before: '-', after: '65 小时', change: '' },
      { label: '分析维度覆盖', before: '3 个', after: '8 个', change: '+167%' },
    ],
    value: '将数据团队从重复性的报告制作工作中解放出来，让他们专注于更高价值的业务分析和策略制定。同时通过标准化流程，消除了人工操作引入的错误风险，提升了管理决策的数据质量。',
    comments: [
      {
        id: 'c1',
        author: '数据组长',
        avatar: 'D',
        avatarBg: 'from-green-400 to-teal-400',
        content: '这个链路我们团队用了一个月了，真的太好用了！唯一的建议是在数据清洗步骤可以加一个人工审核环节，有些业务特殊情况需要人工判断。',
        time: '30分钟前',
        likes: 12,
      },
      {
        id: 'c2',
        author: '运营总监',
        avatar: 'Y',
        avatarBg: 'from-purple-400 to-pink-400',
        content: '作为接收报告的管理层，报告质量确实提升很多，格式统一，数据准确。最喜欢最后的"下月建议"部分，很有参考价值。',
        time: '2小时前',
        likes: 8,
      },
      {
        id: 'c3',
        author: '小白学习中',
        avatar: 'X',
        avatarBg: 'from-orange-400 to-amber-400',
        content: '请问上传的 Excel 文件有什么格式要求吗？我们的原始数据是从系统导出的，有时候格式比较乱。',
        time: '5小时前',
        likes: 3,
      },
    ],
    related: [
      { id: '5', title: '财务季报智能分析与可视化', industry: '金融', reuses: 29 },
      { id: '4', title: '竞品分析报告一键生成链路', industry: '互联网', reuses: 31 },
      { id: '6', title: '客服工单智能分类与优先级排序', industry: '零售', reuses: 24 },
    ],
  },
  '2': {
    id: '2',
    title: '法律合同风险条款智能审查链路',
    industry: '法律',
    tags: ['合同审查', '风险识别', 'NLP', '法务'],
    author: '李律师',
    authorTitle: '执业律师 / 法律科技探索者',
    avatar: 'L',
    avatarBg: 'from-violet-400 to-purple-400',
    views: 986,
    likes: 73,
    reuses: 42,
    collects: 98,
    createdAt: '2025-12-08',
    updatedAt: '5小时前',
    isOfficial: false,
    background: '法律团队每周需要审查大量采购合同、服务协议和劳动合同。传统人工审查不仅耗时，还存在遗漏风险条款的风险。一份标准合同的审查通常需要资深律师花费 2-4 小时，且质量高度依赖个人经验。',
    workflow: [
      {
        step: 1,
        name: '上传合同文件',
        icon: '📄',
        desc: '支持 PDF、Word 格式，自动提取文本内容，识别合同类型',
        prompt: '请读取上传的合同文件，识别合同类型（采购/服务/劳动/保密等），提取甲乙双方信息、合同金额、签订日期、履行期限等基本信息。',
      },
      {
        step: 2,
        name: '条款结构化解析',
        icon: '🔍',
        desc: '将合同全文解析为结构化条款，建立条款索引',
        prompt: '将合同正文按章节和条款编号进行结构化解析，输出条款列表，每条包含：条款编号、条款标题、核心内容摘要（不超过50字）。',
      },
      {
        step: 3,
        name: '风险条款识别',
        icon: '⚠️',
        desc: '对照风险条款库，识别高风险、中风险、低风险条款',
        prompt: '按照以下维度逐条检查风险：1)违约责任是否对等；2)单方解除权是否合理；3)免责条款是否过宽；4)知识产权归属是否清晰；5)争议解决条款是否有利；6)必备条款是否缺失。对每个风险条款标注风险等级（高/中/低）和风险类型。',
      },
      {
        step: 4,
        name: '修改建议生成',
        icon: '✏️',
        desc: '针对每个风险条款给出具体的修改建议和替代表述',
        prompt: '针对上述标注的风险条款，分别给出：1)风险说明（该条款存在什么风险）；2)修改建议（如何修改更有利）；3)参考表述（建议的替代条款文字）。',
      },
      {
        step: 5,
        name: '输出审查报告',
        icon: '📋',
        desc: '生成包含风险评分、条款清单、修改建议的结构化审查报告',
        prompt: '整合以上分析，生成合同审查报告：1)综合风险评分（0-100）；2)关键风险汇总表；3)各条款详细审查意见；4)优先需要谈判修改的条款清单；5)总体审查意见。',
      },
    ],
    inputs: [
      { name: '合同文件', type: '文件', example: 'contract.pdf / contract.docx (必填)' },
      { name: '合同类型', type: '选项', example: '采购合同、服务合同、劳动合同等' },
      { name: '己方角色', type: '选项', example: '甲方 / 乙方（影响风险判断角度）' },
      { name: '行业背景', type: '文本', example: '如"软件服务行业"，帮助判断行业惯例' },
    ],
    outputs: [
      { name: '合同审查报告', desc: '含风险评分、逐条审查意见的完整报告' },
      { name: '风险条款清单', desc: '按风险等级排序的条款汇总表' },
      { name: '修改建议文件', desc: '带批注的合同修改版本' },
    ],
    result: '已帮助律所审查 500+ 份合同，平均审查时间从 3 小时缩短至 22 分钟，风险识别覆盖率从人工的约 85% 提升至 97% 以上。客户反馈满意度 4.8/5。',
    resultMetrics: [
      { label: '审查时间', before: '3 小时', after: '22 分钟', change: '-88%' },
      { label: '风险识别率', before: '约85%', after: '97%+', change: '+12%' },
      { label: '已审查合同', before: '-', after: '500+ 份', change: '' },
      { label: '客户满意度', before: '-', after: '4.8/5', change: '' },
    ],
    value: '降低企业法律风险，提升合同审查效率，让律师将精力聚焦在高价值的法律判断和谈判策略上，而非重复性的条款核查工作。同时通过标准化审查，消除个人经验差异带来的审查质量不稳定问题。',
    comments: [
      {
        id: 'c1',
        author: '企业法务',
        avatar: 'Q',
        avatarBg: 'from-blue-400 to-indigo-400',
        content: '作为企业法务，这个工具帮了大忙。以前每周要审查十几份合同，现在用这个链路可以在一天内全部搞定，而且质量更稳定。',
        time: '1小时前',
        likes: 15,
      },
      {
        id: 'c2',
        author: '法学研究者',
        avatar: 'F',
        avatarBg: 'from-green-400 to-emerald-400',
        content: '风险识别维度覆盖很全面，建议后续可以增加"合同效力"审查模块，比如格式条款的提示义务、电子合同的签署合规性等。',
        time: '3小时前',
        likes: 7,
      },
    ],
    related: [
      { id: '1', title: '电商行业月度销售报告自动化生成链路', industry: '电商', reuses: 56 },
      { id: '3', title: '医疗病历结构化提取与摘要生成', industry: '医疗', reuses: 38 },
    ],
  },
}

/**
 * 案例详情页主组件
 *
 * 页面布局:
 * - 左侧主内容区（flex-1）：案例标题卡、背景、工作链路、输入输出、成果展示、评论
 * - 右侧固定边栏（w-72）：复用 CTA 卡片（sticky）、案例统计、相关案例
 *
 * 状态管理:
 * - liked / collected: 用户互动状态（布尔值切换）
 * - showReuseModal: 控制一键复用模态框的显示/隐藏
 * - reuseStep: 复用动画的当前步骤（0~3，使用 setTimeout 链驱动）
 * - newComment: 评论输入框内容
 * - likedComments: Set 集合存储已点赞的评论 ID
 *
 * @param params - Promise 类型的路由参数，需要用 React.use() 解包
 */
export default function CaseDetailPage({ params }: { params: Promise<{ id: string }> }) {
  // 使用 React.use() 解包 Promise 类型的路由参数（Next.js 15+ 规范）
  const { id } = use(params)
  // 查找案例数据，找不到时降级到第一个案例
  const caseData = CASES_DATA[id] ?? CASES_DATA['1']

  // ========== 互动状态管理 ==========
  // 点赞和收藏状态
  const [liked, setLiked] = useState(false)
  const [collected, setCollected] = useState(false)

  // ========== 复用模态框状态机 ==========
  // showReuseModal: 控制模态框可见性
  // reuseStep: 动画步骤索引（0=未开始, 1/2/3=各步骤进行中）
  const [showReuseModal, setShowReuseModal] = useState(false)
  const [reuseStep, setReuseStep] = useState(0)

  // 评论输入状态
  const [newComment, setNewComment] = useState('')
  // 使用 Set 存储已点赞的评论 ID，避免重复点赞
  const [likedComments, setLikedComments] = useState<Set<string>>(new Set())

  /**
   * 触发一键复用操作
   *
   * 复用动画状态机逻辑:
   * 1. 显示模态框，重置步骤计数器到0
   * 2. 通过多个 setTimeout 依次推进步骤（每步间隔900ms）
   * 3. 每步对应一个操作：打开小浣熊 -> 加载示例 -> 进入执行页
   * 4. 最终步骤完成后显示"前往执行"按钮
   */
  const handleReuse = () => {
    setShowReuseModal(true)
    setReuseStep(0)
    const steps = [1, 2, 3]
    // 链式 setTimeout 模拟异步操作进度
    // 步骤 s 在 s * 900ms 后触发，实现顺序动画效果
    steps.forEach((s) => {
      setTimeout(() => setReuseStep(s), s * 900)
    })
  }

  // 复用步骤定义：每步包含图标和文字说明
  const reuseSteps = [
    { icon: '📂', label: '自动打开小浣熊' },
    { icon: '✍️', label: '加载示例文件 & 填充 Prompt' },
    { icon: '🚀', label: '进入任务执行页' },
  ]

  return (
    <div className="container mx-auto px-4 py-6 max-w-7xl">
      <div className="flex flex-col lg:flex-row gap-6">
        {/* ===== 左侧主内容区 ===== */}
        <div className="flex-1 min-w-0">

          {/* 面包屑导航：社区首页 / 成果案例 / 当前案例标题 */}
          <div className="flex items-center gap-2 text-sm text-gray-400 mb-4 overflow-hidden">
            <Link href="/community" className="hover:text-blue-600 transition-colors">社区首页</Link>
            <span>/</span>
            <Link href="/community/cases" className="hover:text-blue-600 transition-colors">成果案例</Link>
            <span>/</span>
            <span className="text-gray-600 truncate">{caseData.title}</span>
          </div>

          {/* ===== 标题卡片 ===== */}
          <div className="bg-white rounded-2xl p-6 shadow-sm border mb-5">
            {/* 标签行：行业分类、官方推荐标记、关键词标签 */}
            <div className="flex items-center gap-2 mb-3">
              <span className="text-sm bg-blue-50 text-blue-600 px-2.5 py-1 rounded-full font-medium">{caseData.industry}</span>
              {caseData.isOfficial && (
                <span className="text-sm bg-amber-50 text-amber-600 px-2.5 py-1 rounded-full font-medium">⭐ 官方推荐</span>
              )}
              {caseData.tags.map((tag) => (
                <span key={tag} className="text-xs bg-gray-100 text-gray-500 px-2 py-0.5 rounded-full">#{tag}</span>
              ))}
            </div>

            <h1 className="text-2xl font-bold text-gray-900 mb-4">{caseData.title}</h1>

            {/* 作者信息行 + 互动数据 */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className={`w-10 h-10 rounded-full bg-gradient-to-br ${caseData.avatarBg} flex items-center justify-center text-white font-bold text-lg`}>
                  {caseData.avatar}
                </div>
                <div>
                  <div className="font-semibold text-gray-900">{caseData.author}</div>
                  <div className="text-xs text-gray-400">{caseData.authorTitle} · 发布于 {caseData.createdAt}</div>
                </div>
              </div>
              {/* 右侧互动按钮：浏览量（只读）、点赞、收藏、复用次数 */}
              <div className="flex items-center gap-4 text-sm text-gray-400">
                <span>👁 {caseData.views}</span>
                {/* 点赞：切换后立即反映在计数上 */}
                <button
                  onClick={() => setLiked(!liked)}
                  className={`flex items-center gap-1 transition-colors ${liked ? 'text-red-500' : 'hover:text-red-400'}`}
                >
                  ❤️ {caseData.likes + (liked ? 1 : 0)}
                </button>
                {/* 收藏：与点赞类似的乐观更新 */}
                <button
                  onClick={() => setCollected(!collected)}
                  className={`flex items-center gap-1 transition-colors ${collected ? 'text-amber-500' : 'hover:text-amber-400'}`}
                >
                  ⭐ {caseData.collects + (collected ? 1 : 0)}
                </button>
                {/* 复用次数：静态展示 */}
                <span className="text-blue-500 font-medium">⚡ {caseData.reuses} 次复用</span>
              </div>
            </div>
          </div>

          {/* ===== 背景问题 ===== */}
          {/* 描述该案例解决的业务痛点和原始问题 */}
          <div className="bg-white rounded-2xl p-6 shadow-sm border mb-5">
            <h2 className="text-lg font-bold text-gray-900 mb-3 flex items-center gap-2">
              <span className="w-7 h-7 bg-orange-100 rounded-lg flex items-center justify-center text-base">❓</span>
              背景问题
            </h2>
            <p className="text-gray-700 leading-relaxed">{caseData.background}</p>
          </div>

          {/* ===== 使用链路：带连接线的步骤流程图 ===== */}
          <div className="bg-white rounded-2xl p-6 shadow-sm border mb-5">
            <h2 className="text-lg font-bold text-gray-900 mb-5 flex items-center gap-2">
              <span className="w-7 h-7 bg-blue-100 rounded-lg flex items-center justify-center text-base">⚡</span>
              使用链路（{caseData.workflow.length} 个步骤）
            </h2>

            <div className="space-y-4">
              {caseData.workflow.map((step, i) => (
                <div key={step.step} className="relative">
                  {/* 步骤连接线：从第一步到倒数第二步绘制垂直连接线 */}
                  {i < caseData.workflow.length - 1 && (
                    <div className="absolute left-5 top-14 bottom-0 w-0.5 bg-gray-100 -mb-4" />
                  )}
                  <div className="flex gap-4">
                    {/* 步骤序号圆圈：蓝色背景，z-index 确保遮住连接线 */}
                    <div className="flex-shrink-0 w-10 h-10 rounded-xl bg-blue-600 flex items-center justify-center text-white font-bold z-10">
                      {step.step}
                    </div>

                    {/* 步骤内容卡片 */}
                    <div className="flex-1 bg-gray-50 rounded-xl p-4 border">
                      <div className="flex items-center gap-2 mb-2">
                        <span className="text-xl">{step.icon}</span>
                        <span className="font-semibold text-gray-900">{step.name}</span>
                      </div>
                      <p className="text-sm text-gray-600 mb-3">{step.desc}</p>
                      {/* Prompt 示例：可选字段，展示具体的提示词 */}
                      {step.prompt && (
                        <div className="bg-white rounded-lg border border-dashed border-blue-200 p-3">
                          <div className="text-xs font-semibold text-blue-600 mb-1.5 flex items-center gap-1">
                            <span>💬</span> Prompt 示例
                          </div>
                          <p className="text-xs text-gray-600 leading-relaxed font-mono">{step.prompt}</p>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* ===== 输入 & 输出：左右并排卡片 ===== */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-5">
            {/* 输入规格：列出所有必需/可选的输入数据 */}
            <div className="bg-white rounded-2xl p-5 shadow-sm border">
              <h2 className="text-base font-bold text-gray-900 mb-4 flex items-center gap-2">
                <span className="w-6 h-6 bg-green-100 rounded-lg flex items-center justify-center text-sm">📥</span>
                需要的输入
              </h2>
              <div className="space-y-3">
                {caseData.inputs.map((input, i) => (
                  <div key={i} className="flex gap-3 p-3 bg-gray-50 rounded-xl">
                    <span className="text-xs bg-green-100 text-green-700 px-1.5 py-0.5 rounded font-medium flex-shrink-0 h-fit">{input.type}</span>
                    <div>
                      <div className="text-sm font-medium text-gray-800">{input.name}</div>
                      <div className="text-xs text-gray-400 mt-0.5">{input.example}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* 输出成果：展示链路产出的结果文件 */}
            <div className="bg-white rounded-2xl p-5 shadow-sm border">
              <h2 className="text-base font-bold text-gray-900 mb-4 flex items-center gap-2">
                <span className="w-6 h-6 bg-blue-100 rounded-lg flex items-center justify-center text-sm">📤</span>
                输出成果
              </h2>
              <div className="space-y-3">
                {caseData.outputs.map((output, i) => (
                  <div key={i} className="flex gap-3 p-3 bg-gray-50 rounded-xl">
                    <span className="text-blue-500 flex-shrink-0 mt-0.5">📄</span>
                    <div>
                      <div className="text-sm font-medium text-gray-800">{output.name}</div>
                      <div className="text-xs text-gray-400 mt-0.5">{output.desc}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* ===== 成果展示：量化指标对比 ===== */}
          <div className="bg-white rounded-2xl p-6 shadow-sm border mb-5">
            <h2 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
              <span className="w-7 h-7 bg-green-100 rounded-lg flex items-center justify-center text-base">📈</span>
              成果展示
            </h2>
            <p className="text-gray-700 mb-5 leading-relaxed">{caseData.result}</p>

            {/* 指标网格：显示 before/after 对比，"-" 表示该项无对比基准 */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {caseData.resultMetrics.map((metric) => (
                <div key={metric.label} className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl p-4 border border-green-100 text-center">
                  <div className="text-xs text-gray-500 mb-2">{metric.label}</div>
                  <div className="flex items-center justify-center gap-2 mb-1">
                    {/* 若 before 值非"-"，显示带删除线的旧数值 */}
                    {metric.before !== '-' && (
                      <>
                        <span className="text-sm text-gray-400 line-through">{metric.before}</span>
                        <span className="text-gray-300">→</span>
                      </>
                    )}
                    <span className="text-base font-bold text-green-700">{metric.after}</span>
                  </div>
                  {metric.change && (
                    <div className="text-xs font-semibold text-green-600">{metric.change}</div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* ===== 价值总结：蓝紫渐变背景突出显示 ===== */}
          <div className="bg-gradient-to-r from-blue-50 to-violet-50 rounded-2xl p-6 border border-blue-100 mb-5">
            <h2 className="text-lg font-bold text-gray-900 mb-3 flex items-center gap-2">
              <span className="w-7 h-7 bg-blue-100 rounded-lg flex items-center justify-center text-base">💡</span>
              价值总结
            </h2>
            <p className="text-gray-700 leading-relaxed">{caseData.value}</p>
          </div>

          {/* ===== 评论区 ===== */}
          <div className="bg-white rounded-2xl p-6 shadow-sm border mb-5">
            <h2 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
              <span>💬</span> 评论 ({caseData.comments.length})
            </h2>

            {/* 评论输入行：头像 + 输入框 + 发送按钮 */}
            <div className="flex gap-3 mb-5">
              {/* 当前用户头像（占位） */}
              <div className="w-9 h-9 rounded-full bg-gradient-to-br from-blue-400 to-violet-500 flex items-center justify-center text-white text-sm font-bold flex-shrink-0">
                A
              </div>
              <div className="flex-1 flex gap-2">
                <input
                  type="text"
                  value={newComment}
                  onChange={(e) => setNewComment(e.target.value)}
                  placeholder="写下你的想法或问题..."
                  className="flex-1 border rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-300"
                />
                {/* 发送后清空输入框（注意：当前仅清空，未真正提交到列表） */}
                <button
                  onClick={() => setNewComment('')}
                  className="bg-blue-600 text-white px-4 py-2.5 rounded-xl text-sm hover:bg-blue-700 transition-colors flex-shrink-0"
                >
                  发送
                </button>
              </div>
            </div>

            {/* 评论列表 */}
            <div className="space-y-4">
              {caseData.comments.map((comment) => (
                <div key={comment.id} className="flex gap-3">
                  <div className={`w-9 h-9 rounded-full bg-gradient-to-br ${comment.avatarBg} flex items-center justify-center text-white text-sm font-bold flex-shrink-0`}>
                    {comment.avatar}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="font-semibold text-gray-900 text-sm">{comment.author}</span>
                      <span className="text-xs text-gray-400">{comment.time}</span>
                    </div>
                    <p className="text-sm text-gray-700 bg-gray-50 rounded-xl p-3 mb-2">{comment.content}</p>
                    {/* 评论点赞：使用 Set 进行 O(1) 的存在性检查和切换 */}
                    <button
                      onClick={() => {
                        const next = new Set(likedComments)
                        if (next.has(comment.id)) { next.delete(comment.id) } else { next.add(comment.id) }
                        setLikedComments(next)
                      }}
                      className={`text-xs flex items-center gap-1 transition-colors ${likedComments.has(comment.id) ? 'text-red-500' : 'text-gray-400 hover:text-red-400'}`}
                    >
                      ❤️ {comment.likes + (likedComments.has(comment.id) ? 1 : 0)} 有用
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* ===== 右侧边栏（固定宽度） ===== */}
        <div className="w-full lg:w-72 lg:flex-shrink-0 space-y-4">

          {/* === 一键复用 CTA 卡片（sticky 跟随页面滚动） === */}
          <div className="bg-white rounded-2xl p-5 shadow-sm border lg:sticky top-20">
            <div className="text-center mb-4">
              <div className="text-3xl mb-2">⚡</div>
              <div className="font-bold text-gray-900 mb-1">一键复用此链路</div>
              <div className="text-xs text-gray-500">自动加载配置，直接开始执行</div>
            </div>

            {/* 复用步骤预览列表 */}
            <div className="space-y-2 mb-4">
              {[
                '自动打开小浣熊',
                '加载示例文件',
                '填充所有 Prompt',
                '跳转执行页',
              ].map((item, i) => (
                <div key={i} className="flex items-center gap-2 text-sm text-gray-600">
                  <div className="w-5 h-5 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center text-xs font-bold flex-shrink-0">{i + 1}</div>
                  {item}
                </div>
              ))}
            </div>

            {/* 主操作按钮：触发复用动画 */}
            <button
              onClick={handleReuse}
              className="w-full bg-blue-600 text-white py-3 rounded-xl font-semibold hover:bg-blue-700 transition-colors"
            >
              立即复用
            </button>
            <button className="w-full mt-2 border text-gray-600 py-2.5 rounded-xl text-sm hover:bg-gray-50 transition-colors">
              🔗 分享给他人
            </button>

            {/* 已复用人数提示 */}
            <div className="mt-3 pt-3 border-t text-center text-xs text-gray-400">
              已有 <span className="text-blue-600 font-semibold">{caseData.reuses}</span> 人复用了此链路
            </div>
          </div>

          {/* === 案例统计数据面板 === */}
          <div className="bg-white rounded-xl p-4 shadow-sm border">
            <h3 className="font-semibold text-gray-900 mb-3">案例数据</h3>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-500">发布时间</span>
                <span className="text-gray-700">{caseData.createdAt}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">最后更新</span>
                <span className="text-gray-700">{caseData.updatedAt}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">复用次数</span>
                <span className="text-blue-600 font-medium">{caseData.reuses}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">浏览量</span>
                <span className="text-gray-700">{caseData.views}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">收藏数</span>
                <span className="text-gray-700">{caseData.collects}</span>
              </div>
            </div>
          </div>

          {/* === 相关案例推荐 === */}
          <div className="bg-white rounded-xl p-4 shadow-sm border">
            <h3 className="font-semibold text-gray-900 mb-3">相关案例</h3>
            <div className="space-y-2.5">
              {caseData.related.map((r) => (
                <Link
                  key={r.id}
                  href={`/community/cases/${r.id}`}
                  className="block p-3 bg-gray-50 rounded-xl hover:bg-blue-50 transition-colors cursor-pointer"
                >
                  <div className="text-sm font-medium text-gray-800 line-clamp-2 mb-1">{r.title}</div>
                  <div className="flex items-center gap-2 text-xs text-gray-400">
                    <span>{r.industry}</span>
                    <span>·</span>
                    <span className="text-blue-500">⚡ {r.reuses} 次复用</span>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* ========== 一键复用模态框 ========== */}
      {/*
        模态框状态机:
        - 初始状态: reuseStep = 0（步骤未开始）
        - 进行中: reuseStep = 1/2（对应步骤高亮 + 旋转加载图标）
        - 完成: reuseStep >= reuseSteps.length（显示"前往执行"按钮）

        视觉状态映射:
        - i < reuseStep: 绿色（已完成）
        - i === reuseStep: 蓝色（进行中）
        - i > reuseStep: 灰色（待执行）
      */}
      {showReuseModal && (
        /* 点击背景遮罩关闭模态框 */
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center" onClick={() => { setShowReuseModal(false); setReuseStep(0) }}>
          {/* e.stopPropagation() 防止点击内容区时触发背景关闭 */}
          <div className="bg-white rounded-2xl p-6 w-full max-w-sm shadow-2xl" onClick={(e) => e.stopPropagation()}>
            <h3 className="text-lg font-bold text-gray-900 mb-4 text-center">⚡ 一键复用中...</h3>
            <div className="space-y-3 mb-6">
              {reuseSteps.map((s, i) => (
                <div key={i} className={`flex items-center gap-3 p-3 rounded-xl transition-all ${i < reuseStep ? 'bg-green-50 border border-green-100' : i === reuseStep ? 'bg-blue-50 border border-blue-200' : 'bg-gray-50 border border-transparent'}`}>
                  <div className={`w-9 h-9 rounded-full flex items-center justify-center text-xl flex-shrink-0 ${i < reuseStep ? 'bg-green-100' : i === reuseStep ? 'bg-blue-100' : 'bg-gray-100'}`}>
                    {/* 已完成步骤显示绿色对勾，否则显示步骤图标 */}
                    {i < reuseStep ? '✅' : s.icon}
                  </div>
                  <span className={`text-sm font-medium ${i <= reuseStep ? 'text-gray-900' : 'text-gray-400'}`}>{s.label}</span>
                  {/* 当前正在执行的步骤显示旋转加载动画 */}
                  {i === reuseStep && reuseStep < reuseSteps.length && (
                    <div className="ml-auto w-4 h-4 border-2 border-blue-600 border-t-transparent rounded-full animate-spin" />
                  )}
                </div>
              ))}
            </div>
            {/* 根据步骤状态显示不同的底部操作区 */}
            {reuseStep >= reuseSteps.length ? (
              // 全部完成：显示跳转按钮
              <button onClick={() => { setShowReuseModal(false); setReuseStep(0) }} className="w-full bg-green-600 text-white py-3 rounded-xl font-semibold">
                ✅ 已就绪，前往小浣熊执行
              </button>
            ) : (
              // 进行中：显示等待提示
              <div className="text-center text-sm text-gray-400">正在自动配置，请稍候...</div>
            )}
          </div>
        </div>
      )}
    </div>
  )
}
