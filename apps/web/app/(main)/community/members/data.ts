export type Identity = 'all' | 'vip' | 'contributor' | 'creator' | 'expert' | 'official'

export type SocialPlatform = 'weibo' | 'wechat' | 'twitter' | 'linkedin' | 'github' | 'xiaohongshu'

export type IndustryRole = 'leader' | 'evangelist' | null

export interface SocialLink {
  platform: SocialPlatform
  handle: string
  url?: string
}

export interface User {
  id: string
  name: string
  avatar: string
  avatarGrad: string
  identity: Exclude<Identity, 'all'>
  industry: string
  title: string
  bio: string
  points: number
  cases: number
  kbs: number
  followers: number
  tags: string[]
  rank: number
  badges: string[]
  highlight: boolean
  // Industry role
  industryRole: IndustryRole
  // Social fields
  socials: SocialLink[]
  socialPublic: boolean  // has user opted to show socials
  joinedAt: string
  location: string
  recentCases: { title: string; views: number; likes: number }[]
}

export interface IndustryCircle {
  industry: string
  icon: string
  gradient: string
  desc: string
  memberCount: number
  caseCount: number
  group: {
    type: 'wechat' | 'qq' | 'telegram'
    label: string
    note: string
  }
  topics: string[]
}

export const INDUSTRY_CIRCLES: Record<string, IndustryCircle> = {
  '电商': {
    industry: '电商',
    icon: '🛒',
    gradient: 'from-orange-500 to-red-500',
    desc: '电商 AI 实践者聚集地，从选品到售后全链路 AI 工作流落地经验分享，助力商家降本增效。',
    memberCount: 1240,
    caseCount: 328,
    group: { type: 'wechat', label: '电商 AI 实践群', note: '扫码加入微信群' },
    topics: ['AI 商品描述生成', '客服自动化', '大促排班', '数据分析', '私域运营'],
  },
  '互联网': {
    industry: '互联网',
    icon: '💻',
    gradient: 'from-blue-500 to-violet-600',
    desc: '互联网从业者技术交流圈，AI 工程化实践、研发效能提升、Prompt 工程前沿讨论。',
    memberCount: 2180,
    caseCount: 512,
    group: { type: 'wechat', label: '互联网 AI 技术群', note: '扫码加入微信群' },
    topics: ['Prompt 工程', '代码审查自动化', 'RAG 实践', '研发效能', 'AI 测试'],
  },
  '金融': {
    industry: '金融',
    icon: '📈',
    gradient: 'from-emerald-500 to-teal-600',
    desc: '金融科技 AI 应用圈，量化分析、风险识别、合规审查等金融场景 AI 落地经验分享。',
    memberCount: 860,
    caseCount: 194,
    group: { type: 'wechat', label: '金融 AI 实践群', note: '扫码加入微信群' },
    topics: ['财报分析', '风险识别', '量化策略', '合规审查', '投研报告'],
  },
  '医疗': {
    industry: '医疗',
    icon: '🏥',
    gradient: 'from-pink-500 to-rose-600',
    desc: '医疗 AI 应用探索者聚集地，病历书写、影像分析、医患沟通等医疗场景智能化实践。',
    memberCount: 620,
    caseCount: 143,
    group: { type: 'wechat', label: '医疗 AI 探索群', note: '扫码加入微信群' },
    topics: ['病历书写辅助', '影像报告摘要', '医患沟通', 'AI 伦理', '数据安全'],
  },
  '法律': {
    industry: '法律',
    icon: '⚖️',
    gradient: 'from-blue-400 to-cyan-600',
    desc: '法律科技先行者社区，合同审查、案例研究、法律文书生成等 LegalTech 实践经验汇聚。',
    memberCount: 480,
    caseCount: 108,
    group: { type: 'wechat', label: '法律科技交流群', note: '扫码加入微信群' },
    topics: ['合同风险识别', '判决书摘要', '法律文书生成', '尽调报告', 'LegalTech'],
  },
}

export const IDENTITY_MAP: Record<string, { label: string; color: string; bg: string; desc: string; icon: string }> = {
  vip: { label: '行业大 V', color: 'text-amber-700', bg: 'bg-amber-50 border-amber-200', desc: '行业影响力认证，粉丝 10000+', icon: '👑' },
  contributor: { label: '高级贡献者', color: 'text-violet-700', bg: 'bg-violet-50 border-violet-200', desc: '发布案例 50+ 且获官方推荐', icon: '🌟' },
  creator: { label: '优秀创作者', color: 'text-blue-700', bg: 'bg-blue-50 border-blue-200', desc: '高质量内容持续输出者', icon: '✍️' },
  expert: { label: '认证专家', color: 'text-emerald-700', bg: 'bg-emerald-50 border-emerald-200', desc: '通过官方技术认证考试', icon: '🎓' },
  official: { label: '官方团队', color: 'text-red-700', bg: 'bg-red-50 border-red-200', desc: '小浣熊官方账号', icon: '🦝' },
}

export const SOCIAL_META: Record<SocialPlatform, { label: string; icon: string; color: string }> = {
  weibo:        { label: '微博',     icon: '🔴', color: 'text-red-500' },
  wechat:       { label: '微信公众号', icon: '🟢', color: 'text-green-600' },
  twitter:      { label: 'X (Twitter)', icon: '🐦', color: 'text-sky-500' },
  linkedin:     { label: 'LinkedIn', icon: '💼', color: 'text-blue-700' },
  github:       { label: 'GitHub',   icon: '🐙', color: 'text-gray-800' },
  xiaohongshu:  { label: '小红书',   icon: '📕', color: 'text-rose-500' },
}

// 只有 vip / contributor / expert / official 可以公开展示社交账号
export function canPublishSocials(identity: string): boolean {
  return ['vip', 'contributor', 'expert', 'official'].includes(identity)
}

export const ROLE_META: Record<NonNullable<IndustryRole>, { label: string; color: string; bg: string; icon: string }> = {
  leader:     { label: '主理人', color: 'text-amber-700',   bg: 'bg-amber-50 border-amber-300',   icon: '🎯' },
  evangelist: { label: '布道师', color: 'text-violet-700',  bg: 'bg-violet-50 border-violet-200', icon: '📣' },
}

export const USERS: User[] = [
  {
    id: '1',
    name: '张小明',
    avatar: 'Z',
    avatarGrad: 'from-amber-400 to-orange-500',
    identity: 'vip',
    industry: '电商',
    title: '电商圈主理人 · 行业大 V',
    industryRole: 'leader',
    bio: '7 年电商运营经验，专注 AI 工作流在电商场景的落地，累计服务 20+ 企业客户。热衷于把复杂的 AI 技术转化为可落地的业务流程，擅长搭建从选品到售后的全链路 AI 工作流。',
    points: 28400,
    cases: 47,
    kbs: 8,
    followers: 12800,
    tags: ['电商', '数据分析', '自动化'],
    rank: 1,
    badges: ['👑', '🌟', '🎖️'],
    highlight: true,
    socials: [
      { platform: 'weibo', handle: '@张小明AI电商', url: 'https://weibo.com' },
      { platform: 'xiaohongshu', handle: '张小明AI实战', url: 'https://xiaohongshu.com' },
    ],
    socialPublic: true,
    joinedAt: '2023-03',
    location: '杭州',
    recentCases: [
      { title: '电商大促 AI 排班自动化方案', views: 4820, likes: 312 },
      { title: '用小浣熊批量生成商品详情页文案', views: 3640, likes: 208 },
      { title: '客服工单自动分类与派发链路', views: 2910, likes: 176 },
    ],
  },
  {
    id: '2',
    name: 'Prompt 工程师小王',
    avatar: 'W',
    avatarGrad: 'from-violet-400 to-blue-500',
    identity: 'contributor',
    industry: '互联网',
    title: '互联网圈主理人 · Prompt 工程布道者',
    industryRole: 'leader',
    bio: '专注 Prompt 优化研究，发布 500+ Prompt 模板，小浣熊社区精选收录 30+ 篇。开源 Prompt 评测框架已获 2000+ Star。相信好的 Prompt 是 AI 应用的核心竞争力。',
    points: 23200,
    cases: 62,
    kbs: 3,
    followers: 8640,
    tags: ['Prompt', 'LLM', '工程化'],
    rank: 2,
    badges: ['🌟', '✍️', '🎓'],
    highlight: true,
    socials: [
      { platform: 'github', handle: 'prompt-wang', url: 'https://github.com' },
      { platform: 'twitter', handle: '@promptwang_ai', url: 'https://twitter.com' },
      { platform: 'linkedin', handle: 'prompt-engineer-wang', url: 'https://linkedin.com' },
    ],
    socialPublic: true,
    joinedAt: '2023-06',
    location: '北京',
    recentCases: [
      { title: 'Chain-of-Thought 在企业报告生成中的实践', views: 6200, likes: 445 },
      { title: 'Prompt 结构化设计：从单步到多步', views: 5100, likes: 380 },
      { title: '如何用小浣熊做 Prompt 自动评测', views: 3900, likes: 267 },
    ],
  },
  {
    id: '3',
    name: '李律师',
    avatar: 'L',
    avatarGrad: 'from-blue-400 to-cyan-500',
    identity: 'vip',
    industry: '法律',
    title: '法律圈主理人 · 法律科技先行者',
    industryRole: 'leader',
    bio: '执业律师 + AI 探索者，将小浣熊引入合同审查、风险识别流程，效率提升 8 倍。在法律 AI 应用领域多次受邀演讲，致力于推动法律科技在中国的普及与落地。',
    points: 19800,
    cases: 28,
    kbs: 5,
    followers: 6200,
    tags: ['法律科技', '合同审查', 'LegalAI'],
    rank: 3,
    badges: ['👑', '🎖️'],
    highlight: true,
    socials: [
      { platform: 'linkedin', handle: 'lawyer-li-legaltech', url: 'https://linkedin.com' },
      { platform: 'weibo', handle: '@李律师说AI', url: 'https://weibo.com' },
    ],
    socialPublic: true,
    joinedAt: '2023-09',
    location: '上海',
    recentCases: [
      { title: '合同风险条款自动识别与标注', views: 5300, likes: 342 },
      { title: '法院判决书批量摘要与分类', views: 4100, likes: 278 },
      { title: '企业尽调报告 AI 辅助生成实践', views: 3200, likes: 199 },
    ],
  },
  {
    id: '4',
    name: '陈分析师',
    avatar: 'C',
    avatarGrad: 'from-emerald-400 to-teal-500',
    identity: 'expert',
    industry: '金融',
    title: '金融圈主理人 · 量化分析认证专家',
    industryRole: 'leader',
    bio: '10 年量化投研经验，将小浣熊应用于财务报表分析、异常交易识别，搭建的财务分析链路被 500+ 用户复用。专注金融数据智能处理与决策辅助系统研究。',
    points: 16400,
    cases: 31,
    kbs: 6,
    followers: 4800,
    tags: ['量化分析', '财务', 'FinTech'],
    rank: 4,
    badges: ['🎓', '🌟'],
    highlight: false,
    socials: [
      { platform: 'github', handle: 'quant-chen', url: 'https://github.com' },
    ],
    socialPublic: true,
    joinedAt: '2023-11',
    location: '深圳',
    recentCases: [
      { title: '上市公司财报异常指标自动检测', views: 3800, likes: 241 },
      { title: '量化研报摘要与关键因子提取', views: 2900, likes: 188 },
      { title: '风控模型输出的自然语言解释生成', views: 2100, likes: 145 },
    ],
  },
  {
    id: '5',
    name: '王医生',
    avatar: 'W',
    avatarGrad: 'from-pink-400 to-rose-500',
    identity: 'expert',
    industry: '医疗',
    title: '医疗圈主理人 · 医疗 AI 实践者',
    industryRole: 'leader',
    bio: '三甲医院主治医师，推动 AI 辅助病历书写在科室内部的规模化应用，日均节省医生文书时间 2 小时。关注医疗 AI 伦理与数据安全。',
    points: 14200,
    cases: 18,
    kbs: 4,
    followers: 3600,
    tags: ['医疗', '病历AI', 'HealthTech'],
    rank: 5,
    badges: ['🎓', '🎖️'],
    highlight: false,
    socials: [],
    socialPublic: false,
    joinedAt: '2024-01',
    location: '北京',
    recentCases: [
      { title: 'AI 辅助病历首次书写效率提升方案', views: 2800, likes: 192 },
      { title: '影像报告结构化摘要生成实践', views: 2100, likes: 148 },
      { title: '医患沟通记录要点自动整理', views: 1600, likes: 112 },
    ],
  },
  {
    id: '6',
    name: '运营达人小林',
    avatar: 'L',
    avatarGrad: 'from-orange-400 to-red-400',
    identity: 'creator',
    industry: '电商',
    title: '电商圈布道师 · 内容运营博主',
    industryRole: 'evangelist',
    bio: '专注 AI 运营工具分享，社区发帖 200+，平均点赞 80+。擅长把复杂的 AI 工作流用通俗语言讲清楚，粉丝称为「AI运营启蒙老师」。',
    points: 12600,
    cases: 15,
    kbs: 2,
    followers: 5200,
    tags: ['内容创作', '运营', '教程'],
    rank: 6,
    badges: ['✍️', '🎖️'],
    highlight: false,
    socials: [
      { platform: 'xiaohongshu', handle: '小林AI运营', url: 'https://xiaohongshu.com' },
    ],
    socialPublic: false,
    joinedAt: '2024-02',
    location: '广州',
    recentCases: [
      { title: '新手必看：小浣熊 10 分钟入门教程', views: 8900, likes: 621 },
      { title: '用 AI 做小红书内容日历规划', views: 6200, likes: 435 },
      { title: '私域运营 SOP 的 AI 辅助生成', views: 4100, likes: 288 },
    ],
  },
  {
    id: '7',
    name: '技术负责人老赵',
    avatar: 'Z',
    avatarGrad: 'from-slate-400 to-gray-600',
    identity: 'contributor',
    industry: '互联网',
    title: '互联网圈布道师 · 研发效能专家',
    industryRole: 'evangelist',
    bio: '大厂研发效能负责人，主导将小浣熊接入 CI/CD 流程，实现代码审查自动化。分享了完整的工程化方案，被多个团队直接采用。',
    points: 11800,
    cases: 23,
    kbs: 3,
    followers: 2900,
    tags: ['DevOps', '代码审查', '研发效能'],
    rank: 7,
    badges: ['🌟', '🎓'],
    highlight: false,
    socials: [
      { platform: 'github', handle: 'zhao-devops', url: 'https://github.com' },
      { platform: 'linkedin', handle: 'zhao-rd-efficiency', url: 'https://linkedin.com' },
    ],
    socialPublic: true,
    joinedAt: '2024-01',
    location: '杭州',
    recentCases: [
      { title: '小浣熊接入 GitLab CI 代码审查实战', views: 3200, likes: 224 },
      { title: '研发效能指标自动报告生成方案', views: 2400, likes: 167 },
      { title: 'Monorepo 项目的 AI 辅助文档生成', views: 1900, likes: 132 },
    ],
  },
  {
    id: '8',
    name: '小浣熊官方',
    avatar: '🦝',
    avatarGrad: 'from-blue-500 to-violet-600',
    identity: 'official',
    industry: '全行业',
    title: '小浣熊官方账号',
    industryRole: null,
    bio: '小浣熊产品官方社区账号，发布产品更新公告、优质案例精选、活动通知和使用技巧。欢迎关注获取第一手资讯。',
    points: 99999,
    cases: 124,
    kbs: 18,
    followers: 32600,
    tags: ['官方', '产品更新', '精选'],
    rank: 0,
    badges: ['🦝', '⭐', '🏆'],
    highlight: false,
    socials: [
      { platform: 'weibo', handle: '@小浣熊AI官方', url: 'https://weibo.com' },
      { platform: 'twitter', handle: '@RaccoonAI_CN', url: 'https://twitter.com' },
      { platform: 'wechat', handle: '小浣熊助手' },
    ],
    socialPublic: true,
    joinedAt: '2023-01',
    location: '上海',
    recentCases: [
      { title: '【官方】2024 年度最佳案例精选合集', views: 28600, likes: 1820 },
      { title: '【产品更新】小浣熊 v2.4 新功能详解', views: 21400, likes: 1340 },
      { title: '【教程】企业知识库搭建最佳实践', views: 18900, likes: 1120 },
    ],
  },
  // — Extra evangelist users —
  {
    id: '9',
    name: '刘合规',
    avatar: 'L',
    avatarGrad: 'from-cyan-400 to-blue-500',
    identity: 'expert',
    industry: '法律',
    title: '法律圈布道师 · 合规风控专家',
    industryRole: 'evangelist',
    bio: '企业法务合规总监，专注 AI 在合规审查、尽职调查领域的应用。曾主导多家上市公司法务智能化转型，发布法律 AI 实操教程 40+ 篇。',
    points: 9200,
    cases: 19,
    kbs: 3,
    followers: 2100,
    tags: ['合规', '企业法务', '风控'],
    rank: 9,
    badges: ['🎓', '🎖️'],
    highlight: false,
    socials: [
      { platform: 'linkedin', handle: 'liu-compliance-ai', url: 'https://linkedin.com' },
    ],
    socialPublic: true,
    joinedAt: '2024-03',
    location: '北京',
    recentCases: [
      { title: '企业合规文件 AI 智能审查流程搭建', views: 2400, likes: 158 },
      { title: '劳动合同批量风险扫描实战', views: 1900, likes: 122 },
      { title: '股权协议关键条款自动提取', views: 1500, likes: 96 },
    ],
  },
  {
    id: '10',
    name: '周风控',
    avatar: 'Z',
    avatarGrad: 'from-teal-400 to-emerald-500',
    identity: 'expert',
    industry: '金融',
    title: '金融圈布道师 · 风控模型专家',
    industryRole: 'evangelist',
    bio: '银行信贷风控部门负责人，将 AI 引入贷前审批与贷后监控，不良率下降 30%。热衷于分享金融场景 AI 落地的踩坑与最佳实践。',
    points: 8600,
    cases: 16,
    kbs: 4,
    followers: 1800,
    tags: ['风控', '信贷', '合规'],
    rank: 10,
    badges: ['🎓', '🌟'],
    highlight: false,
    socials: [
      { platform: 'linkedin', handle: 'zhou-risk-ai', url: 'https://linkedin.com' },
      { platform: 'weibo', handle: '@周风控AI实战', url: 'https://weibo.com' },
    ],
    socialPublic: true,
    joinedAt: '2024-04',
    location: '上海',
    recentCases: [
      { title: 'AI 驱动贷前信用评估：实践与反思', views: 2100, likes: 137 },
      { title: '贷后异常交易自动预警系统搭建', views: 1700, likes: 109 },
      { title: '金融客诉记录 AI 智能分类与归档', views: 1300, likes: 84 },
    ],
  },
  {
    id: '11',
    name: '赵护士长',
    avatar: 'Z',
    avatarGrad: 'from-rose-400 to-pink-500',
    identity: 'creator',
    industry: '医疗',
    title: '医疗圈布道师 · 护理信息化推广者',
    industryRole: 'evangelist',
    bio: '三甲医院护理部信息化专员，推动 AI 辅助护理记录书写，在科室内部培训 100+ 名护士使用 AI 工具。专注医疗 AI 的基层落地与普及。',
    points: 7400,
    cases: 12,
    kbs: 2,
    followers: 1400,
    tags: ['护理', '医疗信息化', '教程'],
    rank: 11,
    badges: ['✍️', '🎖️'],
    highlight: false,
    socials: [],
    socialPublic: false,
    joinedAt: '2024-05',
    location: '成都',
    recentCases: [
      { title: '护理交班记录 AI 辅助书写实践', views: 1800, likes: 114 },
      { title: '医院 AI 工具培训：从零到上手', views: 2300, likes: 142 },
      { title: '患者满意度调查 AI 分析方案', views: 1100, likes: 72 },
    ],
  },
  {
    id: '12',
    name: '吴产品经理',
    avatar: 'W',
    avatarGrad: 'from-indigo-400 to-blue-500',
    identity: 'creator',
    industry: '互联网',
    title: '互联网圈布道师 · AI 产品设计专家',
    industryRole: 'evangelist',
    bio: '资深产品经理，专注 AI 产品交互设计与需求挖掘，曾主导 3 款 AI SaaS 产品从 0 到 1。在社区分享 AI 产品设计方法论，帮助团队更高效地把 AI 能力转化为用户价值。',
    points: 8900,
    cases: 14,
    kbs: 2,
    followers: 3100,
    tags: ['产品设计', 'AI SaaS', '需求分析'],
    rank: 12,
    badges: ['✍️', '🎓'],
    highlight: false,
    socials: [
      { platform: 'xiaohongshu', handle: '吴产品AI笔记', url: 'https://xiaohongshu.com' },
      { platform: 'linkedin', handle: 'wu-pm-ai', url: 'https://linkedin.com' },
    ],
    socialPublic: false,
    joinedAt: '2024-03',
    location: '深圳',
    recentCases: [
      { title: 'AI 产品的需求文档如何用小浣熊来写', views: 3400, likes: 218 },
      { title: '竞品分析报告 AI 自动化生成实战', views: 2600, likes: 167 },
      { title: '用户访谈记录的 AI 要点整理方案', views: 1900, likes: 124 },
    ],
  },
]
