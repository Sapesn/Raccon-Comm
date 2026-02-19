/**
 * 知识库详情页组件
 *
 * 功能概述:
 * - 展示社区共享知识库的详细信息
 * - 提供一键转存功能（带多步骤进度动画的模态框）
 * - 支持点赞互动
 * - 展示 PAW 三步法使用指引
 * - 显示文档目录预览和配套链路
 *
 * PAW 三步法:
 * P - Prepare: 准备知识库
 * A - Apply: 应用到对话
 * W - Work: 完成工作任务
 *
 * 转存模态框状态机（3态流转）:
 * 初始态 → 进行中 → 完成态
 * saveStep 从 0 开始，每 800ms 递增一次，到达 2 后触发完成
 */
'use client'

import { useState } from 'react'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { ALL_KBS } from '../data'

/**
 * 知识库详情页主组件
 *
 * 页面结构:
 * - 面包屑导航
 * - 左侧主内容区（2列）：知识库详情、使用示例、PAW步骤、文档目录、配套链路、互动按钮
 * - 右侧边栏（1列）：作者卡片、相关推荐、返回按钮
 *
 * 状态管理:
 * - saved: 是否已转存（转存完成后置为 true，按钮变为"已转存"且禁用）
 * - liked / likeCount: 点赞状态和实时计数
 * - showSaveModal: 转存模态框的显示控制
 * - saveStep: 转存进度步骤（0~2，由定时器驱动）
 * - saveDone: 转存是否完全完成（区别于"进行中"状态）
 *
 * @param params - 路由参数，包含知识库 id
 */
export default function KnowledgeDetailPage({ params }: { params: { id: string } }) {
  // 根据 URL 参数查找知识库
  const kb = ALL_KBS.find((k) => k.id === params.id)

  // 知识库不存在时触发 404
  if (!kb) {
    notFound()
  }

  // ========== 状态定义 ==========
  // 转存状态：一旦完成转存则持久保持
  const [saved, setSaved] = useState(false)
  // 点赞状态和计数（乐观更新）
  const [liked, setLiked] = useState(false)
  const [likeCount, setLikeCount] = useState(kb.likes)
  // 模态框可见性
  const [showSaveModal, setShowSaveModal] = useState(false)
  // 当前转存步骤（0=未开始, 1=步骤二, 2=步骤三）
  const [saveStep, setSaveStep] = useState(0)
  // 是否完全完成转存（用于区分进行中和完成态的渲染）
  const [saveDone, setSaveDone] = useState(false)

  /**
   * 点击"一键转存"按钮的处理器
   *
   * 逻辑:
   * - 仅在未转存状态下弹出模态框
   * - 已转存则按钮处于禁用状态，不触发此函数
   */
  const handleSave = () => {
    if (!saved) {
      setShowSaveModal(true)
    }
  }

  /**
   * 开始转存操作（在模态框内点击确认按钮触发）
   *
   * 转存状态机驱动逻辑:
   * 使用 setInterval 每 800ms 推进一个步骤：
   * - saveStep: 0 → 1 → 2（对应三个进度步骤）
   * - 到达步骤 2（s >= 2）时：
   *   1. 清除定时器（防止继续执行）
   *   2. 设置 saveDone = true（显示完成 UI）
   *   3. 设置 saved = true（更新全局转存状态）
   *   4. 延迟 1200ms 后自动关闭模态框（给用户看到成功状态）
   *
   * 注: 使用函数式更新 setSaveStep(s => s + 1) 确保状态更新的正确性
   */
  const handleStartSave = () => {
    if (!saveDone) {
      const timer = setInterval(() => {
        setSaveStep((s) => {
          if (s >= 2) {
            // 已到最后一步，停止定时器并完成转存
            clearInterval(timer)
            setSaveDone(true)
            setSaved(true)
            // 延迟自动关闭，让用户看到成功动画
            setTimeout(() => setShowSaveModal(false), 1200)
            return s
          }
          return s + 1
        })
      }, 800)
    }
  }

  /**
   * 切换点赞状态
   * 乐观更新：立即更新本地计数
   */
  const handleLike = () => {
    setLiked(!liked)
    setLikeCount(liked ? likeCount - 1 : likeCount + 1)
  }

  // ========== 转存步骤定义 ==========
  // 三个步骤对应三种操作阶段
  const saveSteps = [
    { icon: '📂', title: '读取知识库结构', desc: '正在解析知识库文档目录...' },
    { icon: '📋', title: '复制文档内容', desc: `正在复制 ${kb.docCount} 篇文档...` },
    { icon: '✅', title: '存入我的知识库', desc: '即将完成转存，稍等片刻...' },
  ]

  // 相关知识库：同行业其他知识库，最多3个
  // Related knowledge bases
  const relatedKBs = ALL_KBS.filter((k) => k.industry === kb.industry && k.id !== kb.id).slice(0, 3)

  return (
    <>
      <div className="min-h-[calc(100vh-56px)] bg-[#f5f7fa]">
        <div className="container mx-auto px-4 py-6 max-w-6xl">
          {/* 面包屑导航 */}
          <nav className="text-xs text-gray-500 mb-4 flex items-center gap-1.5">
            <Link href="/community" className="hover:text-emerald-600">社区</Link>
            <span>/</span>
            <Link href="/community/knowledge" className="hover:text-emerald-600">知识库</Link>
            <span>/</span>
            <span className="text-gray-700 line-clamp-1">{kb.title}</span>
          </nav>

          {/* 主体：左右分栏 */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* ===== 左侧主内容区（2列） ===== */}
            <div className="lg:col-span-2">
              <div className="bg-white rounded-2xl border overflow-hidden">
                {/* 顶部绿色渐变装饰条（区别于博客的蓝色） */}
                <div className="bg-gradient-to-r from-emerald-500 to-teal-600 h-3" />

                <div className="p-6">
                  {/* 知识库元信息：行业分类、官方推荐标记、更新时间、浏览量 */}
                  <div className="flex items-center gap-2 mb-3 flex-wrap">
                    <span className="text-xs bg-emerald-50 text-emerald-600 border border-emerald-100 px-2 py-0.5 rounded-full font-medium">
                      {kb.industry}
                    </span>
                    {kb.isOfficial && (
                      <span className="text-xs bg-amber-50 text-amber-600 border border-amber-100 px-2 py-0.5 rounded-full font-medium">
                        官方推荐
                      </span>
                    )}
                    <span className="text-xs text-gray-400">{kb.updatedAt} 更新</span>
                    <span className="text-xs text-gray-400">· 👁 {kb.views.toLocaleString()} 次浏览</span>
                  </div>

                  {/* 知识库标题 */}
                  <h1 className="text-2xl font-black text-gray-900 mb-4 leading-snug">
                    {kb.title}
                  </h1>

                  {/* 作者信息 */}
                  <div className="flex items-center gap-3 pb-5 mb-5 border-b">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-emerald-400 to-blue-400 flex items-center justify-center text-white text-sm font-bold">
                      {typeof kb.avatar === 'string' && kb.avatar.length > 1 ? kb.avatar : kb.avatar}
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-gray-900">{kb.author}</p>
                      <p className="text-xs text-gray-500">发布于 {kb.createdAt}</p>
                    </div>
                  </div>

                  {/* ===== 知识库介绍 ===== */}
                  <div className="mb-6">
                    <h2 className="text-lg font-bold text-gray-900 mb-3 flex items-center gap-2">
                      <span>📖</span> 知识库介绍
                    </h2>
                    <p className="text-sm text-gray-700 leading-relaxed">
                      {kb.desc}
                    </p>
                  </div>

                  {/* ===== 核心统计指标：文档数、文件类型、转存次数 ===== */}
                  <div className="bg-emerald-50 rounded-xl p-4 mb-6 grid grid-cols-2 sm:grid-cols-3 gap-3">
                    <div>
                      <div className="text-xs text-emerald-600 mb-1">文档数量</div>
                      <div className="text-lg font-bold text-emerald-700">{kb.docCount} 篇</div>
                    </div>
                    <div>
                      <div className="text-xs text-emerald-600 mb-1">文件类型</div>
                      {/* join('/') 将数组转为格式化的类型列表字符串 */}
                      <div className="text-sm font-medium text-emerald-700">{kb.fileTypes.join(' / ')}</div>
                    </div>
                    <div>
                      <div className="text-xs text-emerald-600 mb-1">转存次数</div>
                      <div className="text-lg font-bold text-emerald-700">{kb.saves.toLocaleString()}</div>
                    </div>
                  </div>

                  {/* ===== 使用示例：展示在小浣熊中的具体调用方式 ===== */}
                  <div className="mb-6">
                    <h2 className="text-lg font-bold text-gray-900 mb-3 flex items-center gap-2">
                      <span>💡</span> 使用示例
                    </h2>
                    <div className="bg-blue-50 rounded-xl px-4 py-3">
                      <p className="text-xs font-medium text-blue-700 mb-1.5">小浣熊中这样使用：</p>
                      {/* break-all 防止长字符串（如命令）溢出 */}
                      <p className="text-sm text-blue-600 font-mono break-all leading-relaxed">{kb.usagePattern}</p>
                    </div>
                  </div>

                  {/* ===== PAW 三步法使用指引 ===== */}
                  {/*
                    PAW 是小浣熊推荐的知识库使用方法论:
                    P (Prepare): 准备知识库 - 转存并配置知识库
                    A (Apply): 应用知识库  - 在对话中引用知识库
                    W (Work): 完成工作    - 获取基于知识库的回答

                    三步对应三种颜色（蓝/紫/绿），视觉上区分阶段
                  */}
                  <div className="mb-6">
                    <h2 className="text-lg font-bold text-gray-900 mb-3 flex items-center gap-2">
                      <span>🐾</span> PAW 三步法使用指引
                    </h2>
                    <div className="flex flex-col sm:flex-row gap-2">
                      {kb.pawSteps.map((step, i) => (
                        <div
                          key={i}
                          className={`flex-1 rounded-xl px-4 py-3 text-sm ${
                            i === 0
                              ? 'bg-blue-50 text-blue-700 border border-blue-100'      // P: 蓝色
                              : i === 1
                              ? 'bg-violet-50 text-violet-700 border border-violet-100' // A: 紫色
                              : 'bg-emerald-50 text-emerald-700 border border-emerald-100' // W: 绿色
                          }`}
                        >
                          {step}
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* ===== 文档目录预览（部分） ===== */}
                  <div className="mb-6">
                    <h2 className="text-lg font-bold text-gray-900 mb-3 flex items-center gap-2">
                      <span>📄</span> 文档目录（部分）
                    </h2>
                    <div className="bg-gray-50 rounded-xl p-4">
                      <ul className="space-y-2">
                        {kb.preview.map((doc, i) => (
                          <li key={i} className="flex items-center gap-2.5 text-sm text-gray-700">
                            <span className="text-gray-400 text-base">📄</span>
                            {doc}
                          </li>
                        ))}
                        {/* 显示总文档数，表明预览是部分内容 */}
                        <li className="text-xs text-gray-400 pt-2 border-t">...共 {kb.docCount} 篇文档</li>
                      </ul>
                    </div>
                  </div>

                  {/* ===== 配套链路 ===== */}
                  {/* 展示可与此知识库配合使用的 AI 工作链路 */}
                  <div className="mb-6">
                    <h2 className="text-lg font-bold text-gray-900 mb-3 flex items-center gap-2">
                      <span>⚡</span> 配套链路
                    </h2>
                    <div className="flex flex-wrap gap-2">
                      {kb.linkedChains.map((chain) => (
                        <div key={chain} className="bg-violet-50 text-violet-700 border border-violet-100 px-3 py-2 rounded-lg text-sm font-medium">
                          ⚡ {chain}
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* 标签列表 */}
                  <div className="flex flex-wrap gap-1.5 mb-5 pt-5 border-t">
                    {kb.tags.map((tag) => (
                      <span key={tag} className="text-xs bg-gray-100 text-gray-600 px-2.5 py-1 rounded-full">
                        #{tag}
                      </span>
                    ))}
                  </div>

                  {/* ===== 底部互动按钮 ===== */}
                  <div className="flex items-center gap-3 pt-5 border-t">
                    {/* 转存按钮：完成后禁用并显示"已转存" */}
                    <button
                      onClick={handleSave}
                      disabled={saved}
                      className={`flex items-center gap-2 px-5 py-2.5 rounded-full font-medium text-sm transition-all ${
                        saved
                          ? 'bg-green-50 text-green-600 border-2 border-green-200'
                          : 'bg-emerald-600 text-white hover:bg-emerald-700 shadow-md hover:shadow-lg'
                      }`}
                    >
                      <span className="text-base">{saved ? '✅' : '📥'}</span>
                      <span>{saved ? '已转存' : '一键转存'}</span>
                    </button>
                    {/* 点赞按钮：切换状态 */}
                    <button
                      onClick={handleLike}
                      className={`flex items-center gap-2 px-4 py-2 rounded-full font-medium text-sm transition-all ${
                        liked
                          ? 'bg-red-50 text-red-600 border-2 border-red-200'
                          : 'bg-gray-100 text-gray-600 border-2 border-transparent hover:border-gray-300'
                      }`}
                    >
                      <span className="text-base">{liked ? '❤️' : '🤍'}</span>
                      <span>{likeCount}</span>
                    </button>
                    {/* 转存计数（只读显示） */}
                    <div className="flex items-center gap-1.5 text-sm text-gray-500">
                      <span>📥</span>
                      <span>{kb.saves.toLocaleString()} 转存</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* ===== 右侧边栏（1列） ===== */}
            <div className="space-y-4">
              {/* 作者卡片 */}
              <div className="bg-white rounded-2xl border p-5">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-emerald-400 to-blue-400 flex items-center justify-center text-white font-bold">
                    {typeof kb.avatar === 'string' && kb.avatar.length > 1 ? kb.avatar : kb.avatar}
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900 text-sm">{kb.author}</p>
                    <p className="text-xs text-gray-500">知识库作者</p>
                  </div>
                </div>
                <button className="w-full bg-emerald-600 text-white text-sm py-2 rounded-lg hover:bg-emerald-700 transition-colors font-medium">
                  + 关注
                </button>
              </div>

              {/* 相关知识库推荐：同行业筛选 */}
              {relatedKBs.length > 0 && (
                <div className="bg-white rounded-2xl border p-4">
                  <h3 className="font-semibold text-gray-900 mb-3 text-sm flex items-center gap-1.5">
                    <span>📚</span> 相关推荐
                  </h3>
                  <div className="space-y-3">
                    {relatedKBs.map((k) => (
                      <Link key={k.id} href={`/community/knowledge/${k.id}`} className="block group">
                        {/* 绿色渐变装饰条 */}
                        <div className="bg-gradient-to-r from-emerald-500 to-teal-600 h-1.5 rounded-full mb-2" />
                        <p className="text-sm text-gray-700 group-hover:text-emerald-600 transition-colors line-clamp-2 leading-snug mb-1">
                          {k.title}
                        </p>
                        <div className="flex items-center gap-2 text-xs text-gray-400">
                          <span>👁 {k.views.toLocaleString()}</span>
                          <span>📥 {k.saves.toLocaleString()}</span>
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>
              )}

              {/* 返回列表（绿色主题） */}
              <Link
                href="/community/knowledge"
                className="block text-center text-sm text-emerald-600 bg-emerald-50 border border-emerald-100 rounded-xl py-2.5 hover:bg-emerald-100 transition-colors"
              >
                ← 返回知识库列表
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* ========== 一键转存模态框 ========== */}
      {/*
        模态框三种渲染状态（由 saveStep 和 saveDone 控制）:

        1. 初始态（saveStep === 0 && !saveDone）:
           - 显示知识库预览信息
           - 显示"立即转存"主操作按钮

        2. 进行中（saveStep > 0 && !saveDone）:
           - 已完成的步骤显示 ✅
           - 当前步骤高亮（emerald 背景）
           - 显示加载动画（旋转圆圈）

        3. 完成态（saveDone === true）:
           - 显示成功提示和 emoji 庆祝
           - 1.2秒后自动关闭

        步骤激活条件（i <= saveStep）:
        与 cases 页不同，knowledge 页使用 i <= saveStep
        因此当前步骤和已完成步骤都被激活高亮
      */}
      {showSaveModal && (
        /* 点击背景关闭（仅在未完成时允许关闭） */
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4" onClick={() => !saveDone && setShowSaveModal(false)}>
          {/* 内容区点击阻止冒泡 */}
          <div className="bg-white rounded-2xl p-6 w-full max-w-md shadow-2xl" onClick={(e) => e.stopPropagation()}>
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-bold text-gray-900">📥 一键转存</h3>
              {/* 关闭按钮（X） */}
              <button onClick={() => setShowSaveModal(false)} className="text-gray-400 hover:text-gray-600 text-xl">×</button>
            </div>

            {/* 知识库信息预览 */}
            <div className="bg-emerald-50 rounded-xl p-4 mb-4">
              <p className="text-sm font-semibold text-gray-800 mb-1">{kb.title}</p>
              {/* join('、') 中文顿号分隔文件类型 */}
              <p className="text-xs text-gray-500 mb-2">{kb.docCount} 篇文档 · {kb.fileTypes.join('、')}</p>
              <div className="flex gap-2 flex-wrap">
                {kb.tags.map((tag) => (
                  <span key={tag} className="text-xs bg-emerald-100 text-emerald-700 px-2 py-0.5 rounded-full">#{tag}</span>
                ))}
              </div>
            </div>

            {/* 转存后使用示例提示 */}
            <div className="bg-blue-50 rounded-xl p-3 mb-4">
              <p className="text-xs font-medium text-blue-700 mb-1">💡 转存后在小浣熊中这样使用：</p>
              <p className="text-xs text-blue-600 font-mono break-all">{kb.usagePattern}</p>
            </div>

            {/* ===== 步骤进度列表 ===== */}
            <div className="space-y-3 mb-5">
              {saveSteps.map((s, i) => (
                <div
                  key={i}
                  className={`flex items-center gap-3 p-3 rounded-xl transition-all ${
                    // 当前步骤及已完成步骤均高亮（与 cases 页逻辑略有不同）
                    i <= saveStep ? 'bg-emerald-50 border border-emerald-100' : 'bg-gray-50 border border-transparent'
                  }`}
                >
                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center text-lg flex-shrink-0 ${
                      // 图标背景色：完成态/当前进行中/等待中
                      saveDone && i <= saveStep ? 'bg-emerald-100'
                        : i === saveStep && !saveDone ? 'bg-blue-100'
                        : i < saveStep ? 'bg-emerald-100'
                        : 'bg-gray-100'
                    }`}
                  >
                    {/* 已完成步骤显示 ✅，否则显示步骤图标 */}
                    {i < saveStep ? '✅' : s.icon}
                  </div>
                  <div>
                    {/* 标题：激活步骤深色，等待步骤灰色 */}
                    <div className={`text-sm font-medium ${i <= saveStep ? 'text-gray-900' : 'text-gray-400'}`}>{s.title}</div>
                    {/* 描述：同样按激活状态切换颜色 */}
                    <div className={`text-xs ${i <= saveStep ? 'text-gray-500' : 'text-gray-300'}`}>{s.desc}</div>
                  </div>
                </div>
              ))}
            </div>

            {/* ===== 底部操作区：根据转存状态三选一渲染 ===== */}
            {saveStep === 0 && !saveDone ? (
              /* 初始态：显示启动按钮 */
              <button
                onClick={handleStartSave}
                className="w-full bg-emerald-600 text-white py-3 rounded-xl font-semibold hover:bg-emerald-700 transition-colors"
              >
                📥 立即转存到我的知识库
              </button>
            ) : saveDone ? (
              /* 完成态：显示成功动画 */
              <div className="text-center">
                <div className="text-4xl mb-2">🎉</div>
                <p className="text-sm font-semibold text-emerald-600">转存成功！</p>
                <p className="text-xs text-gray-500 mt-1">可在"我的知识库"中查看</p>
              </div>
            ) : (
              /* 进行中：显示旋转加载动画 */
              <div className="flex items-center justify-center gap-2 text-sm text-gray-500">
                {/* CSS 旋转动画：border-t 透明形成缺口效果 */}
                <div className="w-4 h-4 border-2 border-emerald-500 border-t-transparent rounded-full animate-spin" />
                正在转存...
              </div>
            )}
          </div>
        </div>
      )}
    </>
  )
}
