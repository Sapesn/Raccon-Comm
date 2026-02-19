'use client'

import type { ReactNode } from 'react'
import { useState } from 'react'
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { UNREAD_COUNT } from './messages/data'

/**
 * 主导航标签配置
 * - exact: true 表示需要精确匹配路径（仅用于首页）
 * - 其他标签使用 startsWith 匹配，支持子路由高亮
 */
const mainTabs = [
  { href: '/community', label: '首页', exact: true },
  { href: '/community/cases', label: '案例' },
  { href: '/community/knowledge', label: '知识库' },
  { href: '/community/blog', label: '博客' },
  { href: '/community/discuss', label: '讨论' },
  { href: '/community/raccoon', label: '🦝 浣熊园' },
]

/**
 * "更多"下拉菜单中的次级导航标签
 * 包含用户榜单、社区活动、荣誉室等功能页面
 */
const moreTabs = [
  { href: '/community/members', label: '用户榜单', icon: '👥' },
  { href: '/community/events', label: '社区活动', icon: '🗓️' },
  { href: '/community/honors', label: '荣誉室', icon: '🏆' },
  { href: '/community/feedback', label: '产品反馈', icon: '💭' },
  { href: '/community/guide', label: '使用指南', icon: '📖' },
]

/**
 * "发布"下拉菜单选项
 * 用户可以选择发布案例或写博客
 */
const publishOptions = [
  {
    href: '/community/cases/publish',
    label: '发布案例',
    desc: '分享可一键复用的工作流',
    icon: '📂',
  },
  {
    href: '/community/blog/write',
    label: '写博客',
    desc: '发布深度文章与行业洞察',
    icon: '✍️',
  },
]

/**
 * 个人头像下拉菜单选项
 * 包含个人中心和我的小浣熊
 */
const profileMenu = [
  { href: '/community/profile', label: '个人中心', icon: '⚙️' },
  { href: '/community/raccoon', label: '我的小浣熊', icon: '🦝' },
]

/**
 * 社区布局组件
 *
 * 职责：
 * - 提供统一的社区页面布局框架
 * - 管理顶部导航栏（桌面端和移动端）
 * - 处理多个下拉菜单的状态管理
 * - 响应式设计，移动端显示汉堡菜单
 *
 * @param children - 子页面内容
 */
export default function CommunityLayout({ children }: { children: ReactNode }) {
  const pathname = usePathname()
  const router = useRouter()

  // 状态管理：控制各种下拉菜单和移动端菜单的开关状态
  const [menuOpen, setMenuOpen] = useState(false)      // 移动端汉堡菜单展开状态
  const [moreOpen, setMoreOpen] = useState(false)      // 桌面端"更多"下拉菜单展开状态
  const [profileOpen, setProfileOpen] = useState(false) // 桌面端个人头像下拉菜单展开状态
  const [publishOpen, setPublishOpen] = useState(false) // "发布"下拉菜单展开状态

  // 判断"更多"标签是否处于激活状态（当前路径是否在 moreTabs 中）
  const isMoreActive = moreTabs.some((t) => pathname.startsWith(t.href))

  return (
    <div className="min-h-screen bg-[#f5f7fa]">
      {/* 顶部导航栏 - 固定定位，始终显示在页面顶部 */}
      <header className="sticky top-0 z-30 bg-white border-b shadow-sm">
        <div className="container mx-auto px-4 flex items-center justify-between h-14 gap-4">

          {/* Logo 区域 - 移动端显示简化版本 */}
          <Link href="/community" className="flex items-center gap-2 flex-shrink-0">
            <span className="text-2xl">🦝</span>
            <span className="font-bold text-lg text-gray-900 hidden sm:block">小浣熊社区</span>
            <span className="font-bold text-base text-gray-900 sm:hidden">社区</span>
            <span className="ml-1 text-xs bg-blue-100 text-blue-600 px-2 py-0.5 rounded-full font-medium hidden sm:inline">BETA</span>
          </Link>

          {/* 桌面端导航栏 - 仅在 md 断点以上显示 */}
          <nav className="hidden md:flex items-center gap-0.5 flex-1 justify-center">
            {/* 主导航标签循环渲染 */}
            {mainTabs.map((tab) => {
              // 根据 exact 属性判断是否需要精确匹配路径
              const isActive = tab.exact ? pathname === tab.href : pathname.startsWith(tab.href)
              return (
                <Link
                  key={tab.href}
                  href={tab.href}
                  className={`px-3 py-1.5 rounded-full text-sm font-medium transition-colors ${
                    isActive ? 'bg-blue-600 text-white' : 'text-gray-600 hover:bg-gray-100'
                  }`}
                >
                  {tab.label}
                </Link>
              )
            })}

            {/* "更多"下拉菜单 - 包含次级导航选项 */}
            <div className="relative">
              <button
                onClick={() => setMoreOpen(!moreOpen)}
                // onBlur 延迟关闭，确保用户有时间点击下拉菜单项
                onBlur={() => setTimeout(() => setMoreOpen(false), 150)}
                className={`px-3 py-1.5 rounded-full text-sm font-medium transition-colors flex items-center gap-1 ${
                  isMoreActive ? 'bg-blue-600 text-white' : 'text-gray-600 hover:bg-gray-100'
                }`}
              >
                更多
                {/* 箭头图标，根据菜单状态旋转 */}
                <svg className={`w-3 h-3 transition-transform ${moreOpen ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              {/* 下拉菜单面板 - 条件渲染 */}
              {moreOpen && (
                <div className="absolute top-full left-0 mt-1.5 w-40 bg-white rounded-xl shadow-lg border py-1 z-50">
                  {moreTabs.map((tab) => {
                    const isActive = pathname.startsWith(tab.href)
                    return (
                      <Link
                        key={tab.href}
                        href={tab.href}
                        className={`flex items-center gap-2 px-4 py-2.5 text-sm transition-colors ${
                          isActive ? 'text-blue-600 bg-blue-50 font-medium' : 'text-gray-700 hover:bg-gray-50'
                        }`}
                      >
                        <span>{tab.icon}</span>
                        {tab.label}
                      </Link>
                    )
                  })}
                </div>
              )}
            </div>
          </nav>

          {/* 桌面端右侧操作区 - 包含站内信、搜索、发布、个人头像 */}
          <div className="hidden md:flex items-center gap-2 flex-shrink-0">
            {/* 站内信图标 - 带未读消息徽章 */}
            <Link
              href="/community/messages"
              className="relative p-2 rounded-lg hover:bg-gray-100 transition-colors"
              aria-label="站内信"
            >
              <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
              {/* 未读消息数量徽章 - 超过 9 条显示 9+ */}
              {UNREAD_COUNT > 0 && (
                <span className="absolute -top-0.5 -right-0.5 bg-red-500 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center font-bold">
                  {UNREAD_COUNT > 9 ? '9+' : UNREAD_COUNT}
                </span>
              )}
            </Link>

            {/* 搜索框 - 响应式宽度 */}
            <div className="relative">
              <input
                type="text"
                placeholder="搜索..."
                className="pl-8 pr-3 py-1.5 text-sm border rounded-full bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-300 w-32 lg:w-40"
              />
              <svg className="absolute left-2.5 top-2 w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>

            {/* "发布"下拉菜单 - 提供发布案例和写博客两个选项 */}
            <div className="relative">
              <button
                onClick={() => setPublishOpen(!publishOpen)}
                onBlur={() => setTimeout(() => setPublishOpen(false), 150)}
                className="bg-blue-600 text-white text-sm px-4 py-1.5 rounded-full hover:bg-blue-700 transition-colors whitespace-nowrap flex items-center gap-1"
              >
                + 发布
                <svg className={`w-3 h-3 transition-transform ${publishOpen ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              {/* 发布选项面板 - 包含图标、标题和描述 */}
              {publishOpen && (
                <div className="absolute top-full right-0 mt-1.5 w-52 bg-white rounded-xl shadow-lg border py-1.5 z-50">
                  {publishOptions.map((opt) => (
                    <Link
                      key={opt.href}
                      href={opt.href}
                      className="flex items-start gap-3 px-4 py-2.5 hover:bg-gray-50 transition-colors"
                    >
                      <span className="text-lg mt-0.5">{opt.icon}</span>
                      <div>
                        <p className="text-sm font-medium text-gray-900">{opt.label}</p>
                        <p className="text-xs text-gray-400">{opt.desc}</p>
                      </div>
                    </Link>
                  ))}
                </div>
              )}
            </div>

            {/* 个人头像下拉菜单 */}
            <div className="relative">
              <button
                onClick={() => setProfileOpen(!profileOpen)}
                onBlur={() => setTimeout(() => setProfileOpen(false), 150)}
                className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-400 to-violet-500 flex items-center justify-center text-white text-sm font-bold cursor-pointer hover:ring-2 hover:ring-blue-300 transition-all"
              >
                A
              </button>
              {/* 个人信息和快捷菜单 */}
              {profileOpen && (
                <div className="absolute top-full right-0 mt-1.5 w-44 bg-white rounded-xl shadow-lg border py-1 z-50">
                  {/* 用户信息头部 - 显示昵称、等级和积分 */}
                  <div className="px-4 py-2 border-b">
                    <p className="text-sm font-semibold text-gray-900">小浣熊用户</p>
                    <p className="text-xs text-gray-400">Lv.5 大师 · 12,400 积分</p>
                  </div>
                  {profileMenu.map((item) => (
                    <Link
                      key={item.href}
                      href={item.href}
                      className="flex items-center gap-2 px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
                    >
                      <span>{item.icon}</span>
                      {item.label}
                    </Link>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* 移动端右侧操作区 - 仅包含发布按钮和汉堡菜单 */}
          <div className="flex md:hidden items-center gap-2">
            {/* 发布按钮 - 移动端简化版 */}
            <div className="relative">
              <button
                onClick={() => setPublishOpen(!publishOpen)}
                onBlur={() => setTimeout(() => setPublishOpen(false), 150)}
                className="bg-blue-600 text-white text-xs px-3 py-1.5 rounded-full hover:bg-blue-700 transition-colors whitespace-nowrap"
              >
                + 发布
              </button>
              {publishOpen && (
                <div className="absolute top-full right-0 mt-1.5 w-48 bg-white rounded-xl shadow-lg border py-1.5 z-50">
                  {publishOptions.map((opt) => (
                    <Link
                      key={opt.href}
                      href={opt.href}
                      className="flex items-start gap-3 px-4 py-2.5 hover:bg-gray-50 transition-colors"
                    >
                      <span className="text-base mt-0.5">{opt.icon}</span>
                      <div>
                        <p className="text-xs font-medium text-gray-900">{opt.label}</p>
                        <p className="text-xs text-gray-400">{opt.desc}</p>
                      </div>
                    </Link>
                  ))}
                </div>
              )}
            </div>

            {/* 汉堡菜单按钮 - 切换移动端导航菜单 */}
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="w-9 h-9 flex items-center justify-center rounded-lg hover:bg-gray-100 transition-colors"
              aria-label="菜单"
            >
              {/* 根据菜单状态切换图标：展开时显示关闭图标，收起时显示菜单图标 */}
              {menuOpen ? (
                <svg className="w-5 h-5 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              ) : (
                <svg className="w-5 h-5 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              )}
            </button>
          </div>
        </div>

        {/* 移动端菜单面板 - 全屏展开，包含所有导航选项 */}
        {menuOpen && (
          <div className="md:hidden border-t bg-white">
            <nav className="container mx-auto px-4 py-3 space-y-0.5">
              {/* 合并主导航、站内信、次级导航和个人中心为统一菜单 */}
              {[
                ...mainTabs,
                { href: '/community/messages', label: '站内信', icon: '📬' },
                ...moreTabs,
                { href: '/community/profile', label: '个人中心', icon: '⚙️' }
              ].map((tab) => {
                // 使用类型守卫判断是否有 exact 属性
                const isActive = 'exact' in tab && tab.exact ? pathname === tab.href : pathname.startsWith(tab.href)
                return (
                  <Link
                    key={tab.href}
                    href={tab.href}
                    onClick={() => setMenuOpen(false)} // 点击后自动关闭菜单
                    className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium transition-colors ${
                      isActive ? 'bg-blue-600 text-white' : 'text-gray-700 hover:bg-gray-100'
                    }`}
                  >
                    {/* 仅显示有 icon 属性的图标 */}
                    {'icon' in tab ? <span>{tab.icon}</span> : null}
                    {tab.label}
                  </Link>
                )
              })}
            </nav>
          </div>
        )}
      </header>

      {/* 主内容区域 - 渲染子页面 */}
      <main>{children}</main>
    </div>
  )
}
