'use client'

import type { ReactNode } from 'react'
import { useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { UNREAD_COUNT } from './messages/data'

const mainTabs = [
  { href: '/community', label: '首页', exact: true },
  { href: '/community/cases', label: '案例' },
  { href: '/community/knowledge', label: '知识库' },
  { href: '/community/discuss', label: '讨论' },
  { href: '/community/raccoon', label: '🦝 浣熊园' },
]

const moreTabs = [
  { href: '/community/blog', label: '博客', icon: '✍️' },
  { href: '/community/members', label: '用户榜单', icon: '👥' },
  { href: '/community/events', label: '社区活动', icon: '🗓️' },
  { href: '/community/honors', label: '荣誉室', icon: '🏆' },
  { href: '/community/feedback', label: '产品反馈', icon: '💭' },
  { href: '/community/guide', label: '使用指南', icon: '📖' },
]

const profileMenu = [
  { href: '/community/profile', label: '个人中心', icon: '⚙️' },
  { href: '/community/raccoon', label: '我的小浣熊', icon: '🦝' },
]

export default function CommunityLayout({ children }: { children: ReactNode }) {
  const pathname = usePathname()
  const [menuOpen, setMenuOpen] = useState(false)
  const [moreOpen, setMoreOpen] = useState(false)
  const [profileOpen, setProfileOpen] = useState(false)

  const isMoreActive = moreTabs.some((t) => pathname.startsWith(t.href))

  return (
    <div className="min-h-screen bg-[#f5f7fa]">
      {/* Top Nav */}
      <header className="sticky top-0 z-30 bg-white border-b shadow-sm">
        <div className="container mx-auto px-4 flex items-center justify-between h-14 gap-4">

          {/* Logo */}
          <Link href="/community" className="flex items-center gap-2 flex-shrink-0">
            <span className="text-2xl">🦝</span>
            <span className="font-bold text-lg text-gray-900 hidden sm:block">小浣熊社区</span>
            <span className="font-bold text-base text-gray-900 sm:hidden">社区</span>
            <span className="ml-1 text-xs bg-blue-100 text-blue-600 px-2 py-0.5 rounded-full font-medium hidden sm:inline">BETA</span>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-0.5 flex-1 justify-center">
            {mainTabs.map((tab) => {
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

            {/* More Dropdown */}
            <div className="relative">
              <button
                onClick={() => setMoreOpen(!moreOpen)}
                onBlur={() => setTimeout(() => setMoreOpen(false), 150)}
                className={`px-3 py-1.5 rounded-full text-sm font-medium transition-colors flex items-center gap-1 ${
                  isMoreActive ? 'bg-blue-600 text-white' : 'text-gray-600 hover:bg-gray-100'
                }`}
              >
                更多
                <svg className={`w-3 h-3 transition-transform ${moreOpen ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
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

          {/* Desktop Right Actions */}
          <div className="hidden md:flex items-center gap-2 flex-shrink-0">
            {/* Messages icon with unread badge */}
            <Link
              href="/community/messages"
              className="relative p-2 rounded-lg hover:bg-gray-100 transition-colors"
              aria-label="站内信"
            >
              <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
              {UNREAD_COUNT > 0 && (
                <span className="absolute -top-0.5 -right-0.5 bg-red-500 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center font-bold">
                  {UNREAD_COUNT > 9 ? '9+' : UNREAD_COUNT}
                </span>
              )}
            </Link>
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
            <Link href="/community/cases/publish" className="bg-blue-600 text-white text-sm px-4 py-1.5 rounded-full hover:bg-blue-700 transition-colors whitespace-nowrap">
              + 发布
            </Link>

            {/* Profile avatar dropdown */}
            <div className="relative">
              <button
                onClick={() => setProfileOpen(!profileOpen)}
                onBlur={() => setTimeout(() => setProfileOpen(false), 150)}
                className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-400 to-violet-500 flex items-center justify-center text-white text-sm font-bold cursor-pointer hover:ring-2 hover:ring-blue-300 transition-all"
              >
                A
              </button>
              {profileOpen && (
                <div className="absolute top-full right-0 mt-1.5 w-44 bg-white rounded-xl shadow-lg border py-1 z-50">
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

          {/* Mobile Right Actions */}
          <div className="flex md:hidden items-center gap-2">
            <Link href="/community/cases/publish" className="bg-blue-600 text-white text-xs px-3 py-1.5 rounded-full hover:bg-blue-700 transition-colors whitespace-nowrap">
              + 发布
            </Link>
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="w-9 h-9 flex items-center justify-center rounded-lg hover:bg-gray-100 transition-colors"
              aria-label="菜单"
            >
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

        {/* Mobile Menu */}
        {menuOpen && (
          <div className="md:hidden border-t bg-white">
            <nav className="container mx-auto px-4 py-3 space-y-0.5">
              {[
                ...mainTabs,
                { href: '/community/messages', label: '站内信', icon: '📬' },
                ...moreTabs,
                { href: '/community/profile', label: '个人中心', icon: '⚙️' }
              ].map((tab) => {
                const isActive = 'exact' in tab && tab.exact ? pathname === tab.href : pathname.startsWith(tab.href)
                return (
                  <Link
                    key={tab.href}
                    href={tab.href}
                    onClick={() => setMenuOpen(false)}
                    className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium transition-colors ${
                      isActive ? 'bg-blue-600 text-white' : 'text-gray-700 hover:bg-gray-100'
                    }`}
                  >
                    {'icon' in tab ? <span>{tab.icon}</span> : null}
                    {tab.label}
                  </Link>
                )
              })}
            </nav>
          </div>
        )}
      </header>

      <main>{children}</main>
    </div>
  )
}
