export type Identity = 'all' | 'vip' | 'contributor' | 'creator' | 'expert' | 'official'

export type SocialPlatform = 'weibo' | 'wechat' | 'twitter' | 'linkedin' | 'github' | 'xiaohongshu'

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
  // Social fields
  socials: SocialLink[]
  socialPublic: boolean  // has user opted to show socials
  joinedAt: string
  location: string
  recentCases: { title: string; views: number; likes: number }[]
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

export const USERS: User[] = [
  {
    id: '1',
    name: '张小明',
    avatar: 'Z',
    avatarGrad: 'from-amber-400 to-orange-500',
    identity: 'vip',
    industry: '电商',
    title: '电商 AI 自动化专家',
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
    title: 'Prompt 工程首席布道者',
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
    title: '法律科技领域先行者',
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
    title: '量化分析 · 认证专家',
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
    title: '医疗 AI 落地实践者',
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
    title: '内容创作者 · 运营博主',
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
    socialPublic: false, // creator 身份不能公开展示
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
    title: '研发效能 · 高级贡献者',
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
]
