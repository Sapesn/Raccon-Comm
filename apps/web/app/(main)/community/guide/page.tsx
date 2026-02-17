'use client'

import { useState } from 'react'
import Link from 'next/link'
import { IDENTITY_MAP, ROLE_META } from '../members/data'

const MODULES = [
  {
    id: 'cases',
    icon: '📂',
    name: '案例分享',
    desc: '真实用户的 AI 落地实践经验',
    link: '/community/cases',
    features: [
      '按行业分类浏览（电商、金融、医疗、法律等）',
      '查看案例详情、点赞、收藏',
      '发布你的 AI 实践案例，分享使用技巧',
      '学习他人的工作流搭建思路',
    ],
    tips: '💡 发布优质案例可获得 50-200 积分，被官方推荐可额外获得 500 积分',
  },
  {
    id: 'knowledge',
    icon: '📚',
    name: '知识库',
    desc: '系统化的 AI 应用知识沉淀',
    link: '/community/knowledge',
    features: [
      '按分类浏览知识文档（基础教程、进阶技巧、行业方案）',
      '收藏有价值的知识内容',
      '贡献你的知识总结与最佳实践',
      '构建个人/团队的知识库',
    ],
    tips: '💡 发布知识库文档可获得 30-100 积分，被多人收藏可获得额外奖励',
  },
  {
    id: 'discuss',
    icon: '💬',
    name: '讨论区',
    desc: '开放式问答与技术交流',
    link: '/community/discuss',
    features: [
      '提问、回答、分享经验',
      '按标签筛选话题（Prompt 工程、RAG、工作流等）',
      '采纳最佳答案，感谢优质回复',
      '关注感兴趣的话题和用户',
    ],
    tips: '💡 提问 +5 积分，回答 +10 积分，答案被采纳 +50 积分',
  },
  {
    id: 'feedback',
    icon: '💭',
    name: '产品反馈',
    desc: '与产品团队共建小浣熊',
    link: '/community/feedback',
    features: [
      '提交功能需求、报告 Bug、分享使用建议',
      '为感兴趣的需求投票，影响产品路线图',
      '查看官方回复与实现进度',
      '参与产品内测与优先体验',
    ],
    tips: '💡 提交反馈 +10 积分，被采纳实现 +200 积分',
  },
  {
    id: 'honors',
    icon: '🏆',
    name: '荣誉动物园',
    desc: '社区贡献者的荣誉殿堂',
    link: '/community/honors',
    features: [
      '查看本月/年度贡献排行榜',
      '了解优秀贡献者的成就',
      '获得社区颁发的荣誉称号与徽章',
      '解锁独家权益（优先内测、周边礼物等）',
    ],
    tips: '💡 积分越高，排名越靠前，可获得更多曝光与认可',
  },
  {
    id: 'events',
    icon: '🎉',
    name: '活动中心',
    desc: '线上线下活动与竞赛',
    link: '/community/events',
    features: [
      '参加官方组织的 AI 实践挑战赛',
      '报名线下 Meetup、工作坊',
      '加入在线直播、专题研讨',
      '赢取奖品、证书与社区特权',
    ],
    tips: '💡 参加活动可获得专属徽章，完成挑战可获得大量积分',
  },
  {
    id: 'members',
    icon: '👥',
    name: '用户榜单',
    desc: '发现优秀创作者与行业专家',
    link: '/community/members',
    features: [
      '按身份、行业筛选用户',
      '查看用户主页、关注感兴趣的创作者',
      '查看积分榜、案例榜、影响力榜',
      '联系认证用户，交流学习',
    ],
    tips: '💡 持续贡献优质内容，提升个人影响力，获得认证身份',
  },
  {
    id: 'industry',
    icon: '🌐',
    name: '行业圈子',
    desc: '垂直行业的专属交流社群',
    link: '/community/members',
    features: [
      '加入你所在行业的 AI 实践圈',
      '认识行业主理人与布道师',
      '参与行业专属话题讨论',
      '进入微信群与同行深度交流',
    ],
    tips: '💡 主理人与布道师享有圈子管理权限与专属徽章',
  },
]

const POINT_RULES = [
  { category: '内容贡献', items: [
    { action: '发布案例', points: '50-200', note: '根据质量评分' },
    { action: '案例被官方推荐', points: '+500', note: '额外奖励' },
    { action: '发布知识库', points: '30-100', note: '根据完整度' },
    { action: '知识库被收藏', points: '+2/次', note: '上限 200' },
    { action: '发布讨论', points: '+5', note: '' },
    { action: '回复讨论', points: '+10', note: '' },
    { action: '回答被采纳', points: '+50', note: '' },
  ]},
  { category: '社区互动', items: [
    { action: '每日签到', points: '+5', note: '连续签到有加成' },
    { action: '点赞内容', points: '+1', note: '每日上限 20' },
    { action: '收藏内容', points: '+2', note: '' },
    { action: '分享内容', points: '+3', note: '' },
    { action: '邀请新用户', points: '+100', note: '新用户完成认证' },
  ]},
  { category: '产品反馈', items: [
    { action: '提交反馈', points: '+10', note: '' },
    { action: '反馈被采纳', points: '+200', note: '' },
    { action: '参与投票', points: '+1', note: '' },
  ]},
  { category: '活动参与', items: [
    { action: '报名活动', points: '+10', note: '' },
    { action: '完成挑战', points: '50-500', note: '根据难度' },
    { action: '活动签到', points: '+20', note: '' },
    { action: '获奖', points: '+1000', note: '' },
  ]},
]

const POINT_LEVELS = [
  { level: 'Lv.1 新手', min: 0, max: 499, icon: '🌱', perks: ['基础社区权限'] },
  { level: 'Lv.2 活跃者', min: 500, max: 1999, icon: '🌿', perks: ['发布案例', '参与讨论'] },
  { level: 'Lv.3 贡献者', min: 2000, max: 4999, icon: '🌳', perks: ['发布知识库', '优先客服'] },
  { level: 'Lv.4 专家', min: 5000, max: 9999, icon: '🏅', perks: ['申请认证', '参与内测'] },
  { level: 'Lv.5 大神', min: 10000, max: 19999, icon: '💎', perks: ['官方推荐', '专属客服'] },
  { level: 'Lv.6 传说', min: 20000, max: null, icon: '👑', perks: ['产品顾问', '独家活动', '定制周边'] },
]

const BADGES = [
  { icon: '🎖️', name: '早期用户', desc: '2023 年前注册' },
  { icon: '🏆', name: '月度之星', desc: '单月积分 Top 10' },
  { icon: '🔥', name: '连续签到 100 天', desc: '坚持就是胜利' },
  { icon: '✍️', name: '优秀创作者', desc: '发布 10+ 优质案例' },
  { icon: '💬', name: '讨论达人', desc: '回答被采纳 20+ 次' },
  { icon: '🎓', name: '知识贡献者', desc: '发布 5+ 知识库' },
  { icon: '🌟', name: '社区元老', desc: '注册满 1 年' },
  { icon: '🎯', name: '活动积极分子', desc: '参加 5+ 活动' },
  { icon: '👥', name: '邀请达人', desc: '邀请 10+ 用户' },
  { icon: '⭐', name: '官方认证', desc: '通过官方身份认证' },
]

const TABS = ['模块指南', '积分体系', '身份认证', '徽章系统'] as const

export default function GuidePage() {
  const [activeTab, setActiveTab] = useState<typeof TABS[number]>('模块指南')

  return (
    <div className="container mx-auto px-4 py-6 max-w-6xl">
      {/* Hero */}
      <div className="bg-gradient-to-r from-blue-600 to-violet-600 rounded-2xl p-6 mb-6 text-white">
        <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm rounded-full px-3 py-1 text-sm mb-3">
          <span>📖</span>
          <span>新手必读</span>
        </div>
        <h1 className="text-2xl font-black mb-1">社区使用指南</h1>
        <p className="text-blue-100 text-sm">了解社区功能，快速上手小浣熊社区，与 AI 实践者共同成长</p>
      </div>

      {/* Tabs */}
      <div className="flex gap-2 mb-6 overflow-x-auto pb-2">
        {TABS.map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-4 py-2 rounded-lg text-sm font-semibold whitespace-nowrap transition-colors ${
              activeTab === tab
                ? 'bg-blue-600 text-white'
                : 'bg-white text-gray-600 hover:bg-gray-100 border'
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Content */}
      <div className="space-y-6">
        {activeTab === '模块指南' && (
          <>
            <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 text-sm text-blue-800">
              <strong>💡 小贴士：</strong>社区共有 8 个核心模块，涵盖案例分享、知识沉淀、交流讨论、产品共建等功能。点击下方卡片可快速跳转到对应模块。
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {MODULES.map((module) => (
                <div key={module.id} className="bg-white rounded-xl shadow-sm border p-5 hover:shadow-md transition-shadow">
                  <div className="flex items-start gap-3 mb-3">
                    <span className="text-3xl">{module.icon}</span>
                    <div className="flex-1">
                      <h3 className="font-bold text-gray-900 mb-1">{module.name}</h3>
                      <p className="text-sm text-gray-500">{module.desc}</p>
                    </div>
                  </div>
                  <div className="space-y-1.5 mb-3">
                    {module.features.map((feature, i) => (
                      <div key={i} className="flex items-start gap-2 text-sm text-gray-600">
                        <span className="text-blue-500 mt-0.5">•</span>
                        <span>{feature}</span>
                      </div>
                    ))}
                  </div>
                  <div className="bg-amber-50 border border-amber-200 rounded-lg p-2.5 mb-3 text-xs text-amber-800">
                    {module.tips}
                  </div>
                  <Link
                    href={module.link}
                    className="inline-flex items-center gap-1 text-sm text-blue-600 hover:text-blue-700 font-medium"
                  >
                    前往 {module.name} →
                  </Link>
                </div>
              ))}
            </div>
          </>
        )}

        {activeTab === '积分体系' && (
          <>
            <div className="bg-gradient-to-r from-amber-500 to-orange-500 rounded-xl p-5 text-white mb-6">
              <h2 className="font-bold text-lg mb-2">🌟 积分是什么？</h2>
              <p className="text-sm text-amber-50">
                积分是小浣熊社区的核心成长体系，通过内容贡献、社区互动、产品反馈等方式获得。积分越高，解锁的权益越多，影响力越大！
              </p>
            </div>

            {/* Point Rules */}
            <div>
              <h2 className="font-bold text-gray-900 mb-4 flex items-center gap-2">
                <span>📈</span> 如何获得积分
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {POINT_RULES.map((cat) => (
                  <div key={cat.category} className="bg-white rounded-xl shadow-sm border p-4">
                    <h3 className="font-semibold text-gray-900 mb-3 text-sm">{cat.category}</h3>
                    <div className="space-y-2">
                      {cat.items.map((item, i) => (
                        <div key={i} className="flex items-center justify-between text-sm">
                          <div className="flex-1">
                            <span className="text-gray-700">{item.action}</span>
                            {item.note && <span className="text-xs text-gray-400 ml-1">({item.note})</span>}
                          </div>
                          <span className="font-semibold text-blue-600 ml-2">{item.points}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Point Levels */}
            <div>
              <h2 className="font-bold text-gray-900 mb-4 flex items-center gap-2">
                <span>🏅</span> 积分等级与权益
              </h2>
              <div className="space-y-3">
                {POINT_LEVELS.map((lv) => (
                  <div key={lv.level} className="bg-white rounded-xl shadow-sm border p-4 flex items-center gap-4">
                    <span className="text-3xl">{lv.icon}</span>
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-1">
                        <h3 className="font-bold text-gray-900">{lv.level}</h3>
                        <span className="text-sm text-gray-500">
                          {lv.min.toLocaleString()} - {lv.max ? lv.max.toLocaleString() : '∞'} 积分
                        </span>
                      </div>
                      <div className="flex flex-wrap gap-2">
                        {lv.perks.map((perk, i) => (
                          <span key={i} className="text-xs bg-blue-50 text-blue-600 px-2 py-0.5 rounded-full">
                            ✓ {perk}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-violet-50 border border-violet-200 rounded-xl p-4 text-sm text-violet-800">
              <strong>💎 积分用途：</strong>积分不仅是荣誉的象征，还可以用于兑换社区周边、参与抽奖、解锁高级功能等。持续贡献，享受更多权益！
            </div>
          </>
        )}

        {activeTab === '身份认证' && (
          <>
            <div className="bg-gradient-to-r from-violet-500 to-purple-600 rounded-xl p-5 text-white mb-6">
              <h2 className="font-bold text-lg mb-2">🎖️ 身份认证体系</h2>
              <p className="text-sm text-violet-50">
                小浣熊社区提供多种身份认证，帮助优秀创作者建立个人品牌，获得更多曝光与权益。认证身份用户可公开展示社交账号，方便用户之间联系交流。
              </p>
            </div>

            {/* Identity Cards */}
            <div>
              <h2 className="font-bold text-gray-900 mb-4 flex items-center gap-2">
                <span>👥</span> 用户身份类型
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {Object.entries(IDENTITY_MAP).map(([key, val]) => (
                  <div key={key} className={`rounded-xl p-5 border-2 ${val.bg}`}>
                    <div className="flex items-center gap-2 mb-2">
                      <span className="text-2xl">{val.icon}</span>
                      <h3 className={`font-bold text-lg ${val.color}`}>{val.label}</h3>
                    </div>
                    <p className="text-sm text-gray-600 mb-3">{val.desc}</p>
                    {key === 'vip' && (
                      <div className="text-xs text-gray-500">
                        <strong>如何获得：</strong>粉丝数达到 10,000+，且有持续的优质内容输出
                      </div>
                    )}
                    {key === 'contributor' && (
                      <div className="text-xs text-gray-500">
                        <strong>如何获得：</strong>发布 50+ 案例且至少 10 篇被官方推荐
                      </div>
                    )}
                    {key === 'creator' && (
                      <div className="text-xs text-gray-500">
                        <strong>如何获得：</strong>发布 10+ 优质案例，平均点赞 50+
                      </div>
                    )}
                    {key === 'expert' && (
                      <div className="text-xs text-gray-500">
                        <strong>如何获得：</strong>通过小浣熊官方技术认证考试
                      </div>
                    )}
                    {key === 'official' && (
                      <div className="text-xs text-gray-500">
                        <strong>说明：</strong>仅限小浣熊官方团队账号
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Industry Roles */}
            <div>
              <h2 className="font-bold text-gray-900 mb-4 flex items-center gap-2">
                <span>🌐</span> 行业圈子角色
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {Object.entries(ROLE_META).map(([key, val]) => (
                  <div key={key} className={`rounded-xl p-5 border-2 ${val.bg}`}>
                    <div className="flex items-center gap-2 mb-2">
                      <span className="text-2xl">{val.icon}</span>
                      <h3 className={`font-bold text-lg ${val.color}`}>{val.label}</h3>
                    </div>
                    {key === 'leader' && (
                      <>
                        <p className="text-sm text-gray-600 mb-2">
                          行业圈子的主理人，负责圈子运营、话题引导、成员管理，是行业内的意见领袖
                        </p>
                        <div className="text-xs text-gray-500">
                          <strong>权益：</strong>圈子页面优先展示、专属徽章、圈子管理权限、官方推广支持
                        </div>
                      </>
                    )}
                    {key === 'evangelist' && (
                      <>
                        <p className="text-sm text-gray-600 mb-2">
                          行业圈子的活跃分享者，持续输出优质内容，帮助新人快速成长，推广 AI 实践
                        </p>
                        <div className="text-xs text-gray-500">
                          <strong>权益：</strong>圈子页面展示、专属徽章、优先推荐、内测资格
                        </div>
                      </>
                    )}
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 text-sm text-blue-800">
              <strong>📝 如何申请认证：</strong>前往 <Link href="/community/profile" className="underline font-medium">个人中心</Link> → 认证申请，填写相关信息并提交。官方将在 3-5 个工作日内审核并反馈结果。
            </div>
          </>
        )}

        {activeTab === '徽章系统' && (
          <>
            <div className="bg-gradient-to-r from-pink-500 to-rose-600 rounded-xl p-5 text-white mb-6">
              <h2 className="font-bold text-lg mb-2">🏆 徽章收集系统</h2>
              <p className="text-sm text-pink-50">
                通过完成特定成就解锁徽章，展示在个人主页。徽章不仅是荣誉的象征，部分徽章还附带专属权益！
              </p>
            </div>

            <div>
              <h2 className="font-bold text-gray-900 mb-4 flex items-center gap-2">
                <span>🎖️</span> 可获得的徽章
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
                {BADGES.map((badge, i) => (
                  <div key={i} className="bg-white rounded-xl shadow-sm border p-4 text-center hover:shadow-md transition-shadow">
                    <span className="text-4xl block mb-2">{badge.icon}</span>
                    <h3 className="font-semibold text-gray-900 text-sm mb-1">{badge.name}</h3>
                    <p className="text-xs text-gray-500">{badge.desc}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-sm border p-5">
              <h3 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
                <span>💡</span> 徽章获取技巧
              </h3>
              <div className="space-y-2 text-sm text-gray-600">
                <p>• <strong>坚持签到：</strong>每日签到积累，解锁连续签到徽章</p>
                <p>• <strong>优质内容：</strong>发布高质量案例与知识库，获得创作者徽章</p>
                <p>• <strong>积极互动：</strong>回答问题、参与讨论，赢取互动徽章</p>
                <p>• <strong>参加活动：</strong>官方活动通常有专属徽章奖励</p>
                <p>• <strong>邀请好友：</strong>邀请新用户注册，获得邀请徽章</p>
                <p>• <strong>申请认证：</strong>通过身份认证，获得官方认证徽章</p>
              </div>
            </div>

            <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 text-sm text-amber-800">
              <strong>🎁 徽章权益：</strong>部分徽章附带专属权益，如优先客服、内测资格、定制周边等。前往 <Link href="/community/profile" className="underline font-medium">个人中心</Link> 查看你已获得的徽章。
            </div>
          </>
        )}
      </div>

      {/* Quick Links */}
      <div className="mt-8 bg-gradient-to-br from-gray-50 to-blue-50 rounded-2xl border p-6">
        <h2 className="font-bold text-gray-900 mb-4 flex items-center gap-2">
          <span>🚀</span> 快速开始
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          <Link
            href="/community/cases"
            className="bg-white rounded-lg p-3 text-center hover:shadow-md transition-shadow border"
          >
            <span className="text-2xl block mb-1">📂</span>
            <span className="text-sm font-medium text-gray-700">浏览案例</span>
          </Link>
          <Link
            href="/community/discuss"
            className="bg-white rounded-lg p-3 text-center hover:shadow-md transition-shadow border"
          >
            <span className="text-2xl block mb-1">💬</span>
            <span className="text-sm font-medium text-gray-700">参与讨论</span>
          </Link>
          <Link
            href="/community/members"
            className="bg-white rounded-lg p-3 text-center hover:shadow-md transition-shadow border"
          >
            <span className="text-2xl block mb-1">👥</span>
            <span className="text-sm font-medium text-gray-700">认识大神</span>
          </Link>
          <Link
            href="/community/profile"
            className="bg-white rounded-lg p-3 text-center hover:shadow-md transition-shadow border"
          >
            <span className="text-2xl block mb-1">⚙️</span>
            <span className="text-sm font-medium text-gray-700">个人中心</span>
          </Link>
        </div>
      </div>
    </div>
  )
}
