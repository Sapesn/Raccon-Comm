'use client'

import type { ReactNode } from 'react'
import { useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

const tabs = [
  { href: '/community', label: '首页', exact: true },
  { href: '/community/cases', label: '成果案例' },
  { href: '/community/discuss', label: '交流专区' },
  { href: '/community/feedback', label: '产品反馈' },
  { href: '/community/profile', label: '个人中心' },
]

export default function CommunityLayout({ children }: { children: ReactNode }) {
  const pathname = usePathname()
  const [menuOpen, setMenuOpen] = useState(false)

  return (
    <div className="min-h-screen bg-[#f5f7fa]">
      {/* Top Nav */}
      <header className="sticky top-0 z-30 bg-white border-b shadow-sm">
        <div className="container mx-auto px-4 flex items-center justify-between h-14">

          {/* Logo */}
          <div className="flex items-center gap-2">
            <span className="text-2xl">🦝</span>
            <span className="font-bold text-lg text-gray-900 hidden sm:block">小浣熊社区</span>
            <span className="font-bold text-base text-gray-900 sm:hidden">社区</span>
            <span className="ml-1 text-xs bg-blue-100 text-blue-600 px-2 py-0.5 rounded-full font-medium hidden sm:inline">BETA</span>
          </div>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-1">
            {tabs.map((tab) => {
              const isActive = tab.exact ? pathname === tab.href : pathname.startsWith(tab.href)
              return (
                <Link
                  key={tab.href}
                  href={tab.href}
                  className={`px-4 py-1.5 rounded-full text-sm font-medium transition-colors ${
                    isActive ? 'bg-blue-600 text-white' : 'text-gray-600 hover:bg-gray-100'
                  }`}
                >
                  {tab.label}
                </Link>
              )
            })}
          </nav>

          {/* Desktop Right Actions */}
          <div className="hidden md:flex items-center gap-3">
            <div className="relative">
              <input
                type="text"
                placeholder="搜索案例、讨论..."
                className="pl-8 pr-4 py-1.5 text-sm border rounded-full bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-300 w-44 lg:w-52"
              />
              <svg className="absolute left-2.5 top-2 w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
            <Link href="/community/cases/publish" className="bg-blue-600 text-white text-sm px-4 py-1.5 rounded-full hover:bg-blue-700 transition-colors whitespace-nowrap">
              + 发布案例
            </Link>
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-400 to-violet-500 flex items-center justify-center text-white text-sm font-bold cursor-pointer flex-shrink-0">
              A
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

        {/* Mobile Menu Dropdown */}
        {menuOpen && (
          <div className="md:hidden border-t bg-white">
            <nav className="container mx-auto px-4 py-3 flex flex-col gap-1">
              {tabs.map((tab) => {
                const isActive = tab.exact ? pathname === tab.href : pathname.startsWith(tab.href)
                return (
                  <Link
                    key={tab.href}
                    href={tab.href}
                    onClick={() => setMenuOpen(false)}
                    className={`px-4 py-2.5 rounded-xl text-sm font-medium transition-colors ${
                      isActive ? 'bg-blue-600 text-white' : 'text-gray-700 hover:bg-gray-100'
                    }`}
                  >
                    {tab.label}
                  </Link>
                )
              })}
              <div className="mt-2 pt-2 border-t">
                <input
                  type="text"
                  placeholder="搜索案例、讨论..."
                  className="w-full pl-4 pr-4 py-2 text-sm border rounded-xl bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-300"
                />
              </div>
            </nav>
          </div>
        )}
      </header>

      <main>{children}</main>
    </div>
  )
}
