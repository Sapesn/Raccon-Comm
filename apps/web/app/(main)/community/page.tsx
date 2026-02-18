import Link from 'next/link'
import { BLOG_ARTICLES } from './blog/data'

const FEATURED_KBS = [
  {
    id: '1',
    title: '电商运营知识库 · 完整版',
    industry: '电商',
    desc: '涵盖选品策略、广告投放、数据分析、客服话术等 200+ 篇文档，适合电商团队日常运营参考。',
    tags: ['选品', '广告', '数据分析'],
    author: '张小明',
    avatar: 'Z',
    docCount: 236,
    saves: 1284,
    views: 4820,
    isOfficial: true,
  },
  {
    id: '2',
    title: '法律合规知识库 · 企业版',
    industry: '法律',
    desc: '整理了劳动合同、保密协议、股权协议等常见法律文件模板及风险分析，适合法务和创业团队。',
    tags: ['合同', '合规', '风险'],
    author: '李律师',
    avatar: 'L',
    docCount: 158,
    saves: 986,
    views: 3560,
    isOfficial: false,
  },
  {
    id: '3',
    title: 'AI Prompt 工程实践库',
    industry: '互联网',
    desc: '汇总 500+ 个经过验证的 Prompt 模板，涵盖文本处理、代码生成、数据分析等场景，持续更新。',
    tags: ['Prompt', 'AI', '模板'],
    author: 'Prompt 工程师',
    avatar: 'P',
    docCount: 512,
    saves: 2341,
    views: 8960,
    isOfficial: true,
  },
  {
    id: '4',
    title: '金融分析师工具箱',
    industry: '金融',
    desc: '包含财务分析框架、估值模型、行业研究模板、数据处理脚本等，适合投研和财务分析师使用。',
    tags: ['财务', '估值', '研究'],
    author: '陈分析师',
    avatar: 'C',
    docCount: 189,
    saves: 743,
    views: 2840,
    isOfficial: false,
  },
]

const FEATURED_CASES = [
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
    updatedAt: '4天前',
    isOfficial: false,
  },
]

const DISCUSSIONS = [
  {
    id: '1',
    title: '如何设计一个高效的文档处理链路？分享我的最佳实践',
    author: '技术达人',
    avatar: 'T',
    replies: 24,
    views: 312,
    lastReply: '10分钟前',
    category: '经验分享',
  },
  {
    id: '2',
    title: '小浣熊在教育行业的应用场景探讨',
    author: '教育从业者',
    avatar: 'E',
    replies: 18,
    views: 256,
    lastReply: '30分钟前',
    category: '行业讨论',
  },
  {
    id: '3',
    title: '【求助】多文件并行处理时如何避免上下文混淆？',
    author: '新手用户',
    avatar: 'N',
    replies: 15,
    views: 198,
    lastReply: '1小时前',
    category: '问题求助',
  },
  {
    id: '4',
    title: '使用小浣熊一个月总结：哪些场景最高效？',
    author: '资深用户',
    avatar: 'S',
    replies: 31,
    views: 445,
    lastReply: '2小时前',
    category: '使用心得',
  },
]

const INDUSTRIES = [
  { name: '电商', icon: '🛒', count: 128 },
  { name: '金融', icon: '💰', count: 96 },
  { name: '医疗', icon: '🏥', count: 74 },
  { name: '法律', icon: '⚖️', count: 68 },
  { name: '教育', icon: '📚', count: 85 },
  { name: '互联网', icon: '💻', count: 112 },
  { name: '制造业', icon: '🏭', count: 53 },
  { name: '零售', icon: '🏪', count: 61 },
]

const LEADERBOARD = [
  { rank: 1, name: '张小明', points: 2840, badge: '🥇' },
  { rank: 2, name: '李律师', points: 2320, badge: '🥈' },
  { rank: 3, name: '陈分析师', points: 1980, badge: '🥉' },
  { rank: 4, name: '产品团队', points: 1640, badge: '' },
  { rank: 5, name: '王医生', points: 1420, badge: '' },
]

export default function CommunityHomePage() {
  return (
    <div className="container mx-auto px-4 py-6 max-w-7xl">
      <div className="flex flex-col lg:flex-row gap-6">
        {/* Main Content */}
        <div className="flex-1 min-w-0">

          {/* Banner */}
          <div className="relative rounded-2xl overflow-hidden bg-gradient-to-r from-blue-600 via-blue-500 to-violet-600 p-8 mb-6 text-white">
            <div className="relative z-10">
              <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm rounded-full px-3 py-1 text-sm mb-4">
                <span>🔥</span>
                <span>本周新增案例 47 个，复用次数突破 1000+</span>
              </div>
              <h2 className="text-3xl font-bold mb-2">分享你的 AI 工作链路</h2>
              <p className="text-blue-100 mb-6 max-w-lg">
                让优质的工作流程被更多人发现和复用，加速整个行业的 AI 落地进程
              </p>
              <div className="flex flex-wrap gap-3">
                <button className="bg-white text-blue-600 font-semibold px-6 py-2.5 rounded-full hover:bg-blue-50 transition-colors">
                  发布成果案例
                </button>
                <button className="border border-white/50 text-white px-6 py-2.5 rounded-full hover:bg-white/10 transition-colors">
                  探索案例库
                </button>
              </div>
            </div>
            {/* Decorative */}
            <div className="absolute right-8 top-1/2 -translate-y-1/2 text-8xl opacity-20 select-none">🦝</div>
            <div className="absolute bottom-0 right-0 w-64 h-64 bg-white/5 rounded-full -translate-x-8 translate-y-16"></div>
          </div>

          {/* Stats Bar */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-6">
            {[
              { label: '案例总数', value: '536', change: '+47', color: 'text-blue-600' },
              { label: '本周复用', value: '1,248', change: '+23%', color: 'text-green-600' },
              { label: '社区成员', value: '12,840', change: '+312', color: 'text-violet-600' },
              { label: '共享知识库', value: '318', change: '+24', color: 'text-orange-500' },
            ].map((stat) => (
              <div key={stat.label} className="bg-white rounded-xl p-4 shadow-sm border">
                <div className="text-2xl font-bold text-gray-900">{stat.value}</div>
                <div className="text-sm text-gray-500 mt-0.5">{stat.label}</div>
                <div className={`text-xs font-medium mt-1 ${stat.color}`}>{stat.change} 较上周</div>
              </div>
            ))}
          </div>

          {/* Quick Navigation */}
          <div className="bg-gradient-to-r from-violet-50 to-blue-50 rounded-xl border border-violet-100 p-4 mb-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <span className="text-2xl">📖</span>
                <div>
                  <h3 className="font-semibold text-gray-900 text-sm">刚来社区？查看使用指南</h3>
                  <p className="text-xs text-gray-500">了解社区功能、积分体系、身份认证等</p>
                </div>
              </div>
              <Link
                href="/community/guide"
                className="bg-violet-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-violet-700 transition-colors whitespace-nowrap"
              >
                查看指南 →
              </Link>
            </div>
          </div>

          {/* Industry Quick Entry */}
          <div className="bg-white rounded-xl p-5 shadow-sm border mb-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-semibold text-gray-900">行业入口</h3>
              <Link href="/community/cases" className="text-sm text-blue-600 hover:underline">查看全部 →</Link>
            </div>
            <div className="grid grid-cols-4 gap-2 sm:gap-3">
              {INDUSTRIES.map((ind) => (
                <Link
                  key={ind.name}
                  href={`/community/cases?industry=${ind.name}`}
                  className="flex flex-col items-center gap-1.5 p-3 rounded-xl bg-gray-50 hover:bg-blue-50 hover:border-blue-200 border border-transparent transition-all cursor-pointer"
                >
                  <span className="text-2xl">{ind.icon}</span>
                  <span className="text-sm font-medium text-gray-700">{ind.name}</span>
                  <span className="text-xs text-gray-400">{ind.count} 个案例</span>
                </Link>
              ))}
            </div>
          </div>

          {/* Featured Cases */}
          <div className="mb-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-semibold text-gray-900 text-lg">精选成果案例</h3>
              <Link href="/community/cases" className="text-sm text-blue-600 hover:underline">查看全部 →</Link>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {FEATURED_CASES.slice(0, 4).map((c) => (
                <Link
                  key={c.id}
                  href={`/community/cases/${c.id}`}
                  className="bg-white rounded-xl p-5 shadow-sm border hover:shadow-md hover:-translate-y-0.5 transition-all cursor-pointer block"
                >
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-center gap-2">
                      <span className="text-xs bg-blue-50 text-blue-600 px-2 py-0.5 rounded-full font-medium">
                        {c.industry}
                      </span>
                      {c.isOfficial && (
                        <span className="text-xs bg-amber-50 text-amber-600 px-2 py-0.5 rounded-full font-medium">
                          官方推荐
                        </span>
                      )}
                    </div>
                    <span className="text-xs text-gray-400">{c.updatedAt}</span>
                  </div>
                  <h4 className="font-semibold text-gray-900 mb-2 line-clamp-2 leading-snug">{c.title}</h4>
                  <p className="text-sm text-gray-500 line-clamp-2 mb-3">{c.summary}</p>
                  <div className="flex gap-1.5 mb-3 flex-wrap">
                    {c.tags.map((tag) => (
                      <span key={tag} className="text-xs bg-gray-100 text-gray-500 px-2 py-0.5 rounded-full">
                        #{tag}
                      </span>
                    ))}
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="w-6 h-6 rounded-full bg-gradient-to-br from-blue-400 to-violet-400 flex items-center justify-center text-white text-xs font-bold">
                        {c.avatar}
                      </div>
                      <span className="text-xs text-gray-500">{c.author}</span>
                    </div>
                    <div className="flex items-center gap-3 text-xs text-gray-400">
                      <span>👁 {c.views}</span>
                      <span>❤️ {c.likes}</span>
                      <span className="text-blue-500 font-medium">⚡ {c.reuses} 次复用</span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>

          {/* Hot Knowledge Bases */}
          <div className="mb-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-semibold text-gray-900 text-lg">热门知识库</h3>
              <Link href="/community/knowledge" className="text-sm text-blue-600 hover:underline">查看全部 →</Link>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {FEATURED_KBS.map((kb) => (
                <Link
                  key={kb.id}
                  href={`/community/knowledge`}
                  className="bg-white rounded-xl p-5 shadow-sm border hover:shadow-md hover:-translate-y-0.5 transition-all block group"
                >
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-center gap-2">
                      <span className="text-xs bg-emerald-50 text-emerald-600 px-2 py-0.5 rounded-full font-medium">{kb.industry}</span>
                      {kb.isOfficial && (
                        <span className="text-xs bg-amber-50 text-amber-600 px-2 py-0.5 rounded-full font-medium">官方推荐</span>
                      )}
                    </div>
                    <span className="text-xs text-gray-400">📄 {kb.docCount} 篇</span>
                  </div>
                  <h4 className="font-semibold text-gray-900 mb-2 line-clamp-1 group-hover:text-blue-600 transition-colors">{kb.title}</h4>
                  <p className="text-sm text-gray-500 line-clamp-2 mb-3">{kb.desc}</p>
                  <div className="flex gap-1.5 mb-3 flex-wrap">
                    {kb.tags.map((tag) => (
                      <span key={tag} className="text-xs bg-gray-100 text-gray-500 px-2 py-0.5 rounded-full">#{tag}</span>
                    ))}
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="w-6 h-6 rounded-full bg-gradient-to-br from-emerald-400 to-blue-400 flex items-center justify-center text-white text-xs font-bold">
                        {kb.avatar}
                      </div>
                      <span className="text-xs text-gray-500">{kb.author}</span>
                    </div>
                    <div className="flex items-center gap-3 text-xs text-gray-400">
                      <span>👁 {kb.views.toLocaleString()}</span>
                      <span className="text-emerald-600 font-medium">📥 {kb.saves.toLocaleString()} 转存</span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>

          {/* Latest Discussions */}
          <div>
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-semibold text-gray-900 text-lg">最新讨论</h3>
              <Link href="/community/discuss" className="text-sm text-blue-600 hover:underline">查看全部 →</Link>
            </div>
            <div className="bg-white rounded-xl shadow-sm border overflow-hidden">
              {DISCUSSIONS.map((d, i) => (
                <Link
                  key={d.id}
                  href={`/community/discuss/${d.id}`}
                  className={`flex items-start gap-4 p-4 hover:bg-gray-50 transition-colors cursor-pointer block ${i < DISCUSSIONS.length - 1 ? 'border-b' : ''}`}
                >
                  <div className="w-9 h-9 rounded-full bg-gradient-to-br from-green-400 to-blue-400 flex items-center justify-center text-white text-sm font-bold flex-shrink-0">
                    {d.avatar}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-2">
                      <h4 className="font-medium text-gray-900 text-sm line-clamp-1">{d.title}</h4>
                      <span className="text-xs bg-gray-100 text-gray-500 px-2 py-0.5 rounded-full flex-shrink-0">
                        {d.category}
                      </span>
                    </div>
                    <div className="flex items-center gap-4 mt-1.5 text-xs text-gray-400">
                      <span>{d.author}</span>
                      <span>💬 {d.replies} 回复</span>
                      <span>👁 {d.views} 浏览</span>
                      <span>最新回复 {d.lastReply}</span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <div className="w-full lg:w-72 lg:flex-shrink-0 space-y-4">

          {/* My Profile Card */}
          <div className="bg-white rounded-xl p-5 shadow-sm border">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-400 to-violet-500 flex items-center justify-center text-white text-lg font-bold">
                A
              </div>
              <div>
                <div className="font-semibold text-gray-900">Asui</div>
                <div className="text-sm text-gray-500">初级贡献者</div>
              </div>
            </div>
            <div className="grid grid-cols-3 gap-2 text-center mb-4">
              <div className="bg-gray-50 rounded-lg p-2">
                <div className="font-bold text-gray-900">3</div>
                <div className="text-xs text-gray-500">案例</div>
              </div>
              <div className="bg-gray-50 rounded-lg p-2">
                <div className="font-bold text-gray-900">12</div>
                <div className="text-xs text-gray-500">获赞</div>
              </div>
              <div className="bg-gray-50 rounded-lg p-2">
                <div className="font-bold text-yellow-600">480</div>
                <div className="text-xs text-gray-500">积分</div>
              </div>
            </div>
            <div className="flex gap-2">
              <Link href="/community/profile" className="flex-1 text-center text-sm bg-blue-600 text-white py-1.5 rounded-lg hover:bg-blue-700 transition-colors">
                个人中心
              </Link>
              <button className="flex-1 text-sm border text-gray-600 py-1.5 rounded-lg hover:bg-gray-50 transition-colors">
                每日签到 +5
              </button>
            </div>
          </div>

          {/* Points Leaderboard */}
          <div className="bg-white rounded-xl p-5 shadow-sm border">
            <h3 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
              <span>🏆</span> 积分榜
            </h3>
            <div className="space-y-2.5">
              {LEADERBOARD.map((user) => (
                <div key={user.rank} className="flex items-center gap-3">
                  <div className="w-6 text-center">
                    {user.badge ? (
                      <span className="text-base">{user.badge}</span>
                    ) : (
                      <span className="text-sm text-gray-400 font-medium">{user.rank}</span>
                    )}
                  </div>
                  <div className="flex-1 text-sm text-gray-700">{user.name}</div>
                  <div className="text-sm font-semibold text-yellow-600">{user.points.toLocaleString()}</div>
                </div>
              ))}
            </div>
            <Link href="/community/profile" className="block text-center text-xs text-blue-600 mt-3 hover:underline">
              查看完整排行榜 →
            </Link>
          </div>

          {/* Latest Blog */}
          <div className="bg-white rounded-xl p-5 shadow-sm border">
            <h3 className="font-semibold text-gray-900 mb-3 flex items-center gap-2 text-sm">
              <span>✍️</span> 最新博客
            </h3>
            <div className="space-y-3">
              {BLOG_ARTICLES.slice(0, 3).map((a) => (
                <Link key={a.id} href={`/community/blog/${a.id}`} className="block group">
                  <p className="text-sm text-gray-700 group-hover:text-blue-600 transition-colors line-clamp-2 leading-snug mb-1">
                    {a.title}
                  </p>
                  <div className="flex items-center gap-2 text-xs text-gray-400">
                    <span>{a.author}</span>
                    <span>·</span>
                    <span>👁 {a.views.toLocaleString()}</span>
                  </div>
                </Link>
              ))}
            </div>
            <Link href="/community/blog" className="block text-center text-xs text-blue-600 mt-3 hover:underline">
              查看全部博客 →
            </Link>
          </div>

          {/* Feedback Quick Entry */}
          <div className="bg-white rounded-xl p-5 shadow-sm border">
            <h3 className="font-semibold text-gray-900 mb-2 flex items-center gap-2">
              <span>💡</span> 提交产品反馈
            </h3>
            <p className="text-xs text-gray-500 mb-3">遇到 bug 或有好的建议？告诉我们！</p>
            <Link href="/community/feedback" className="block text-center text-sm bg-gray-900 text-white py-2 rounded-lg hover:bg-gray-800 transition-colors">
              去提交反馈
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
