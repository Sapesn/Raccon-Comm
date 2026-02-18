export type BlockType = 'heading' | 'paragraph' | 'quote' | 'code' | 'image'

export interface ContentBlock {
  id: string
  type: BlockType
  content: string
}

export interface BlogComment {
  id: string
  author: string
  avatar: string
  avatarGrad: string
  content: string
  createdAt: string
  likes: number
}

export interface BlogArticle {
  id: string
  title: string
  excerpt: string
  category: string
  tags: string[]
  author: string
  authorTitle: string
  avatar: string
  avatarGrad: string
  createdAt: string
  updatedAt: string
  readTime: number
  views: number
  likes: number
  coverGrad: string
  content: ContentBlock[]
  comments: BlogComment[]
}

export const BLOG_CATEGORIES = ['全部', 'AI 实践', '行业洞察', '工具技巧', '案例复盘', '产品思考']

export const BLOG_ARTICLES: BlogArticle[] = [
  {
    id: '1',
    title: '我是如何用小浣熊把月报工作从 3 小时压缩到 5 分钟的',
    excerpt: '每个月底对我来说都是噩梦——汇总 Excel、写分析、出报告，这套流程不仅耗时，还极容易出错。直到我开始用 AI 工作流，一切都变了。',
    category: 'AI 实践',
    tags: ['自动化', '效率提升', '电商', '数据分析'],
    author: '张小明',
    authorTitle: '电商运营负责人 · 圈子主理人',
    avatar: 'Z',
    avatarGrad: 'from-amber-400 to-orange-500',
    createdAt: '2026-02-15',
    updatedAt: '2026-02-16',
    readTime: 8,
    views: 3420,
    likes: 218,
    coverGrad: 'from-amber-400 via-orange-400 to-red-500',
    content: [
      { id: 'b1', type: 'heading', content: '问题背景：月报地狱' },
      { id: 'b2', type: 'paragraph', content: '作为电商运营负责人，我每个月都要生成至少 5 份报告：销售周报、品类分析、广告 ROI 汇总、供应商对账、库存预警。这些报告的数据来源分散在不同的 Excel 文件、ERP 系统和广告后台，光是收集数据就要花 1 个多小时。' },
      { id: 'b3', type: 'quote', content: '原来我需要 3 小时完成的月报，现在 5 分钟就能搞定。不是夸张，是真实发生的事情。' },
      { id: 'b4', type: 'heading', content: '解决方案：三步链路设计' },
      { id: 'b5', type: 'paragraph', content: '我把整个流程拆分为三个步骤：第一步，数据采集与清洗；第二步，智能分析与异常识别；第三步，报告生成与格式化输出。每一步都配置了专门的 Prompt，确保 AI 能够准确理解上下文。' },
      { id: 'b6', type: 'code', content: '# 数据清洗 Prompt 模板\n请对以下销售数据进行清洗：\n1. 去除重复订单（按订单ID去重）\n2. 过滤退款/取消订单\n3. 统一日期格式为 YYYY-MM-DD\n4. 将金额单位统一为元（保留两位小数）\n5. 输出清洗后的数据和清洗日志' },
      { id: 'b7', type: 'paragraph', content: '最关键的是第二步的异常识别。我训练 AI 根据历史数据建立基准线，当某个 SKU 的日销售额偏差超过 30% 时，自动标红并给出可能的原因分析。这个功能帮我提前发现了两次供应断货风险。' },
      { id: 'b8', type: 'heading', content: '成果与感悟' },
      { id: 'b9', type: 'paragraph', content: '实施三个月后，月报时间从 3 小时降至 5 分钟，报告质量反而更高——因为 AI 不会遗漏任何指标。更重要的是，我有了更多时间思考业务策略，而不是陷在数据整理的泥潭里。如果你也在做重复性的数据工作，强烈建议试试 AI 工作流。' },
    ],
    comments: [
      { id: 'c1', author: '运营达人小林', avatar: 'L', avatarGrad: 'from-green-400 to-emerald-500', content: '太有用了！我们团队也在做类似的事情，请问数据清洗那步有没有遇到特殊字符导致的问题？', createdAt: '1天前', likes: 12 },
      { id: 'c2', author: '陈分析师', avatar: 'C', avatarGrad: 'from-emerald-400 to-teal-500', content: '异常识别那块很有启发，我是做金融分析的，想把这个思路迁移到财务报表的异动检测上。', createdAt: '2天前', likes: 8 },
    ],
  },
  {
    id: '2',
    title: '2026 年 AI 在医疗行业的落地实践：从技术噱头到真实价值',
    excerpt: '很多人对医疗 AI 持悲观态度，认为法规限制太多、数据太敏感。但在一线临床工作了 8 年之后，我看到了完全不同的图景。',
    category: '行业洞察',
    tags: ['医疗', 'AI落地', '临床实践', '行业分析'],
    author: '王医生',
    authorTitle: '医疗 AI 实践者 · 认证专家',
    avatar: 'W',
    avatarGrad: 'from-pink-400 to-rose-500',
    createdAt: '2026-02-14',
    updatedAt: '2026-02-14',
    readTime: 12,
    views: 2180,
    likes: 156,
    coverGrad: 'from-pink-400 via-rose-400 to-red-400',
    content: [
      { id: 'b1', type: 'heading', content: '医疗 AI 的现实与误解' },
      { id: 'b2', type: 'paragraph', content: 'AI 在医疗领域的应用远比大众想象的更加保守和落地。它并不是要替代医生做诊断，而是在「辅助性」场景中释放医生的时间和精力。当前最成熟的三个方向：病历结构化、影像辅助标注、医疗文书自动生成。' },
      { id: 'b3', type: 'quote', content: 'AI 不是来抢医生饭碗的，它是让医生能把 80% 的时间花在真正需要人判断的事情上，而不是埋头写病历。' },
      { id: 'b4', type: 'heading', content: '我们科室的实际部署情况' },
      { id: 'b5', type: 'paragraph', content: '去年我们在门诊引入了 AI 辅助病历系统，医生口述或简单录入关键词，系统自动生成符合规范的结构化病历。上线 6 个月的数据：每位医生日均书写时间从 2.3 小时降至 40 分钟，病历质控一次通过率从 78% 提升至 96%。' },
      { id: 'b6', type: 'paragraph', content: '这个数据看起来很好，但背后的挑战也很真实：数据安全合规需要专门的私有化部署；AI 生成的内容必须经过医生确认才能入档；部分年长医生的接受度需要时间培养。' },
    ],
    comments: [
      { id: 'c1', author: '护理星', avatar: 'H', avatarGrad: 'from-violet-400 to-purple-500', content: '护理端有没有类似的实践？护理记录书写也是很大的负担。', createdAt: '3天前', likes: 15 },
    ],
  },
  {
    id: '3',
    title: 'Prompt 工程核心技巧：让 AI 真正理解你的业务场景',
    excerpt: '写了 6 个月的 Prompt，踩了无数坑，总结出这 8 条让 AI 输出质量翻倍的实用技巧。不是理论，全是实操经验。',
    category: '工具技巧',
    tags: ['Prompt工程', '技巧', 'AI对话', '实用'],
    author: 'Prompt工程师小王',
    authorTitle: '互联网产品经理 · 高级贡献者',
    avatar: 'P',
    avatarGrad: 'from-blue-400 to-violet-500',
    createdAt: '2026-02-13',
    updatedAt: '2026-02-15',
    readTime: 6,
    views: 5630,
    likes: 347,
    coverGrad: 'from-blue-500 via-violet-500 to-purple-600',
    content: [
      { id: 'b1', type: 'heading', content: '技巧一：给 AI 一个角色' },
      { id: 'b2', type: 'paragraph', content: '最简单也最有效的技巧。不要说「帮我分析这份合同」，而是说「你是一位有 10 年经验的商业律师，专注于知识产权和合同风险识别，请分析以下合同……」。角色设定会让 AI 调用对应领域的知识模式。' },
      { id: 'b3', type: 'heading', content: '技巧二：提供输出格式模板' },
      { id: 'b4', type: 'code', content: '# 好的做法\n请按以下格式输出分析结果：\n## 风险等级：[高/中/低]\n## 关键风险点：\n1. [风险描述] - 建议措施：[具体建议]\n## 整体评价：[50字以内的总结]\n\n# 坏的做法\n请帮我分析这份合同的风险。' },
      { id: 'b5', type: 'heading', content: '技巧三：用例子说话（Few-shot）' },
      { id: 'b6', type: 'paragraph', content: '当你需要 AI 模仿特定风格或格式时，给它看 2-3 个例子远比用文字描述更有效。尤其是在写营销文案、数据摘要、客服回复这类有固定范式的任务中。' },
      { id: 'b7', type: 'quote', content: '一个好的例子，胜过一百个字的描述。在 Prompt 工程里，Show, Don\'t Tell 依然是铁律。' },
    ],
    comments: [
      { id: 'c1', author: '张小明', avatar: 'Z', avatarGrad: 'from-amber-400 to-orange-500', content: '技巧二特别有用！我现在所有的 Prompt 都会带上输出格式模板，AI 幻觉率降低了很多。', createdAt: '1天前', likes: 24 },
      { id: 'c2', author: '代码侠', avatar: 'D', avatarGrad: 'from-gray-600 to-slate-700', content: '代码块的格式很清晰，建议再补充一篇专门讲 Chain-of-Thought 的技巧文章！', createdAt: '5小时前', likes: 11 },
    ],
  },
  {
    id: '4',
    title: '合同审查 AI 工作流上线三个月复盘：数据、坑点与反思',
    excerpt: '三个月前我们上线了合同智能审查系统，处理了 800+ 份合同。今天把真实数据、遇到的坑、以及一些反思都写出来，希望对同行有参考价值。',
    category: '案例复盘',
    tags: ['合同审查', '法律AI', '复盘', '数据'],
    author: '李律师',
    authorTitle: '法律科技研究者 · 行业大V',
    avatar: 'L',
    avatarGrad: 'from-blue-400 to-cyan-500',
    createdAt: '2026-02-12',
    updatedAt: '2026-02-13',
    readTime: 10,
    views: 1890,
    likes: 134,
    coverGrad: 'from-blue-500 via-cyan-500 to-teal-500',
    content: [
      { id: 'b1', type: 'heading', content: '三个月的真实数据' },
      { id: 'b2', type: 'paragraph', content: '上线以来共审查合同 847 份，平均每份审查时间从人工的 45 分钟降至 3 分钟（AI 预审）+ 8 分钟（律师复核）。风险条款识别准确率经过人工校验约为 91.3%，高风险合同（律师判定需要重大修改）的识别召回率为 95.2%。' },
      { id: 'b3', type: 'heading', content: '三个主要坑点' },
      { id: 'b4', type: 'paragraph', content: '坑一：长合同的上下文截断问题。超过 50 页的合同，AI 会在中间「遗忘」前面的定义条款，导致对后续条款的判断出现偏差。我们的解决方案是将合同按章节分段，建立「条款记忆索引」在各段之间传递关键定义。' },
      { id: 'b5', type: 'quote', content: '最危险的不是 AI 识别错误，而是 AI 以高置信度输出了错误结果。建立人工复核机制，不是对 AI 不信任，是对客户负责。' },
      { id: 'b6', type: 'paragraph', content: '坑二：行业专有名词理解偏差。金融类合同中的「循环信用额度」「对赌条款」等专业术语，通用大模型会按字面含义理解，我们最终在知识库中补充了 300+ 条法律专有名词解释。' },
    ],
    comments: [],
  },
  {
    id: '5',
    title: '为什么我认为 AI 工作流的价值不在效率，而在决策质量',
    excerpt: '大家谈 AI 都在说省多少时间、提多少效率。但用了一年之后，我越来越觉得真正的价值在另一个地方——让决策更可解释、更可追溯。',
    category: '产品思考',
    tags: ['AI思考', '决策', '价值观', '深度'],
    author: '陈分析师',
    authorTitle: '量化分析师 · 认证专家',
    avatar: 'C',
    avatarGrad: 'from-emerald-400 to-teal-500',
    createdAt: '2026-02-10',
    updatedAt: '2026-02-10',
    readTime: 7,
    views: 2760,
    likes: 203,
    coverGrad: 'from-emerald-500 via-teal-500 to-cyan-600',
    content: [
      { id: 'b1', type: 'heading', content: '效率提升只是表象' },
      { id: 'b2', type: 'paragraph', content: '当我们说 AI 让工作效率提升了 5 倍，这背后意味着什么？本质上是：原来需要人脑处理的信息，现在由机器预处理了一遍。信息密度更高、格式更统一、遗漏更少。但「效率」本身不是终点，决策才是。' },
      { id: 'b3', type: 'quote', content: '效率是手段，决策才是目的。如果你用 AI 省出来的时间还是在做同样的决策，那你只是更快地在原地打转。' },
      { id: 'b4', type: 'heading', content: 'AI 让决策可解释的价值' },
      { id: 'b5', type: 'paragraph', content: '以我的量化分析工作为例，过去的分析报告里经常有「我感觉」「历史经验显示」这类模糊表述。引入 AI 工作流之后，每个结论都有对应的数据支撑链路——哪条数据、经过什么计算、对应什么假设。这种可解释性，让团队协作和向上汇报都变得更高效。' },
    ],
    comments: [
      { id: 'c1', author: 'Prompt工程师小王', avatar: 'P', avatarGrad: 'from-blue-400 to-violet-500', content: '「更快地在原地打转」这句话太精准了。很多团队引入 AI 只是让低质量的决策更快产出，并没有真正改变思维框架。', createdAt: '2天前', likes: 31 },
    ],
  },
  {
    id: '6',
    title: '从零搭建企业知识库：选型、踩坑与最终方案',
    excerpt: '花了两个月帮公司从零建立了一套 AI 知识库体系，从选型到落地，遇到了各种意想不到的问题。把整个过程记录下来，希望能帮到正在做同样事情的人。',
    category: '工具技巧',
    tags: ['知识库', '企业AI', '选型', '落地'],
    author: '技术负责人老赵',
    authorTitle: '全栈工程师 · 高级贡献者',
    avatar: 'Z',
    avatarGrad: 'from-violet-400 to-purple-500',
    createdAt: '2026-02-08',
    updatedAt: '2026-02-09',
    readTime: 15,
    views: 3980,
    likes: 289,
    coverGrad: 'from-violet-500 via-purple-500 to-indigo-600',
    content: [
      { id: 'b1', type: 'heading', content: '为什么要建知识库' },
      { id: 'b2', type: 'paragraph', content: '公司发展到 200 人规模，最大的问题不是没有知识，而是知识散落在各处——有人的脑子里、有 Confluence 里、有群聊记录里、有各种 Excel 模板里。新员工入职培训要 2 个月，老员工要回答大量重复问题。知识库是解决这个问题的基础设施。' },
      { id: 'b3', type: 'heading', content: '选型过程' },
      { id: 'b4', type: 'paragraph', content: '我们调研了 6 个方案：Notion AI、飞书知识库+AI、私有化向量数据库（Milvus）、RAG 自建、小浣熊知识库、国内其他 SaaS 产品。最终选择了以小浣熊知识库为核心 + 私有化 Embedding 的混合方案。核心考量是：数据安全性、与现有工作流的集成度、维护成本。' },
      { id: 'b5', type: 'code', content: '# 选型评估维度（我们用的打分矩阵）\n| 维度       | 权重 | 小浣熊 | 飞书 | 自建 |\n|------------|------|--------|------|------|\n| 数据安全   | 30%  | 9      | 7    | 10   |\n| 易用性     | 25%  | 9      | 8    | 4    |\n| 集成成本   | 20%  | 8      | 9    | 3    |\n| 检索精度   | 25%  | 8      | 7    | 9    |\n| 综合得分   | -    | 8.6    | 7.8  | 6.5  |' },
      { id: 'b6', type: 'quote', content: '知识库的成功率 20% 取决于技术选型，80% 取决于知识录入的规范化和持续运营。工具只是开始。' },
    ],
    comments: [
      { id: 'c1', author: '张小明', avatar: 'Z', avatarGrad: 'from-amber-400 to-orange-500', content: '选型矩阵太实用了，我们也在选型，直接拿来用了，感谢！', createdAt: '5小时前', likes: 18 },
      { id: 'c2', author: 'Prompt工程师小王', avatar: 'P', avatarGrad: 'from-blue-400 to-violet-500', content: '请问 Embedding 私有化部署的服务器配置大概是什么规格？成本大概多少？', createdAt: '1天前', likes: 9 },
    ],
  },
]
