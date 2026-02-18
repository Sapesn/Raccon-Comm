'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { BLOG_CATEGORIES, type BlockType, type ContentBlock } from '../data'

const STEPS = ['基本信息', '内容编辑', '摘要与设置', '预览发布']

const COVER_GRADIENTS = [
  { name: 'AI 实践', gradient: 'from-amber-400 via-orange-400 to-red-500' },
  { name: '行业洞察', gradient: 'from-pink-400 via-rose-400 to-red-400' },
  { name: '工具技巧', gradient: 'from-blue-500 via-violet-500 to-purple-600' },
  { name: '案例复盘', gradient: 'from-blue-500 via-cyan-500 to-teal-500' },
  { name: '产品思考', gradient: 'from-emerald-500 via-teal-500 to-cyan-600' },
]

function BlockEditor({
  block,
  onChange,
  onDelete,
  onMoveUp,
  onMoveDown,
  canMoveUp,
  canMoveDown,
}: {
  block: ContentBlock
  onChange: (updates: Partial<ContentBlock>) => void
  onDelete: () => void
  onMoveUp: () => void
  onMoveDown: () => void
  canMoveUp: boolean
  canMoveDown: boolean
}) {
  const blockTypes: { value: BlockType; label: string }[] = [
    { value: 'paragraph', label: '段落' },
    { value: 'heading', label: '标题' },
    { value: 'quote', label: '引用' },
    { value: 'code', label: '代码' },
    { value: 'image', label: '图片' },
  ]

  return (
    <div className="border rounded-xl p-4 bg-white">
      <div className="flex items-center justify-between mb-3 gap-2">
        <select
          value={block.type}
          onChange={(e) => onChange({ type: e.target.value as BlockType })}
          className="text-xs border rounded-lg px-2 py-1 bg-white text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-300"
        >
          {blockTypes.map((t) => (
            <option key={t.value} value={t.value}>
              {t.label}
            </option>
          ))}
        </select>
        <div className="flex items-center gap-1">
          <button
            onClick={onMoveUp}
            disabled={!canMoveUp}
            className="p-1 text-gray-400 hover:text-gray-600 disabled:opacity-30 disabled:cursor-not-allowed"
            title="上移"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
            </svg>
          </button>
          <button
            onClick={onMoveDown}
            disabled={!canMoveDown}
            className="p-1 text-gray-400 hover:text-gray-600 disabled:opacity-30 disabled:cursor-not-allowed"
            title="下移"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </button>
          <button onClick={onDelete} className="p-1 text-red-400 hover:text-red-600" title="删除">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
      </div>

      {block.type === 'heading' && (
        <input
          type="text"
          value={block.content}
          onChange={(e) => onChange({ content: e.target.value })}
          placeholder="输入标题..."
          className="w-full text-lg font-bold border-0 focus:outline-none focus:ring-0 px-0"
        />
      )}

      {block.type === 'paragraph' && (
        <textarea
          value={block.content}
          onChange={(e) => onChange({ content: e.target.value })}
          placeholder="输入段落内容..."
          className="w-full text-sm border-0 focus:outline-none focus:ring-0 resize-none px-0"
          rows={4}
        />
      )}

      {block.type === 'quote' && (
        <div className="border-l-4 border-blue-500 bg-blue-50 pl-3 pr-2 py-2">
          <textarea
            value={block.content}
            onChange={(e) => onChange({ content: e.target.value })}
            placeholder="输入引用内容..."
            className="w-full text-sm italic bg-transparent border-0 focus:outline-none focus:ring-0 resize-none"
            rows={3}
          />
        </div>
      )}

      {block.type === 'code' && (
        <div className="bg-gray-900 text-green-400 rounded-lg p-3">
          <textarea
            value={block.content}
            onChange={(e) => onChange({ content: e.target.value })}
            placeholder="输入代码..."
            className="w-full text-xs font-mono bg-transparent text-green-400 border-0 focus:outline-none focus:ring-0 resize-none"
            rows={6}
          />
        </div>
      )}

      {block.type === 'image' && (
        <div className="border-2 border-dashed rounded-lg p-8 text-center bg-gray-50">
          <div className="text-4xl mb-2">🖼️</div>
          <p className="text-xs text-gray-500 mb-2">点击上传图片（功能演示）</p>
          <input
            type="text"
            value={block.content}
            onChange={(e) => onChange({ content: e.target.value })}
            placeholder="图片描述或URL"
            className="w-full text-xs border rounded px-2 py-1 mt-2 text-center"
          />
        </div>
      )}
    </div>
  )
}

function ContentPreview({ blocks }: { blocks: ContentBlock[] }) {
  return (
    <div className="prose prose-sm max-w-none">
      {blocks.map((block) => {
        switch (block.type) {
          case 'heading':
            return (
              <h2 key={block.id} className="text-xl font-bold text-gray-900 mt-6 mb-3">
                {block.content || '（空标题）'}
              </h2>
            )
          case 'paragraph':
            return (
              <p key={block.id} className="text-sm text-gray-700 leading-relaxed mb-4">
                {block.content || '（空段落）'}
              </p>
            )
          case 'quote':
            return (
              <blockquote key={block.id} className="border-l-4 border-blue-500 bg-blue-50 pl-4 pr-3 py-3 my-4 italic text-sm text-gray-700">
                {block.content || '（空引用）'}
              </blockquote>
            )
          case 'code':
            return (
              <pre key={block.id} className="bg-gray-900 text-green-400 text-xs p-4 rounded-lg overflow-x-auto my-4 font-mono">
                <code>{block.content || '// 代码'}</code>
              </pre>
            )
          case 'image':
            return (
              <div key={block.id} className="my-6 rounded-xl overflow-hidden bg-gray-100 flex items-center justify-center h-48">
                <div className="text-center text-gray-400">
                  <div className="text-4xl mb-2">🖼️</div>
                  <p className="text-xs">{block.content || '图片预览'}</p>
                </div>
              </div>
            )
          default:
            return null
        }
      })}
    </div>
  )
}

export default function BlogWritePage() {
  const router = useRouter()
  const [step, setStep] = useState(0)
  const [showToast, setShowToast] = useState(false)

  // Step 1: Basic Info
  const [title, setTitle] = useState('')
  const [category, setCategory] = useState<string>(BLOG_CATEGORIES[1])
  const [tags, setTags] = useState<string[]>([])
  const [tagInput, setTagInput] = useState('')

  // Step 2: Content
  const [blocks, setBlocks] = useState<ContentBlock[]>([
    { id: 'b1', type: 'paragraph', content: '' },
  ])

  // Step 3: Summary & Settings
  const [excerpt, setExcerpt] = useState('')
  const [coverGrad, setCoverGrad] = useState(COVER_GRADIENTS[0].gradient)

  const addTag = () => {
    if (tagInput.trim() && !tags.includes(tagInput.trim())) {
      setTags([...tags, tagInput.trim()])
      setTagInput('')
    }
  }

  const removeTag = (tag: string) => {
    setTags(tags.filter((t) => t !== tag))
  }

  const addBlock = () => {
    const newBlock: ContentBlock = {
      id: `b${blocks.length + 1}`,
      type: 'paragraph',
      content: '',
    }
    setBlocks([...blocks, newBlock])
  }

  const updateBlock = (id: string, updates: Partial<ContentBlock>) => {
    setBlocks(blocks.map((b) => (b.id === id ? { ...b, ...updates } : b)))
  }

  const deleteBlock = (id: string) => {
    if (blocks.length > 1) {
      setBlocks(blocks.filter((b) => b.id !== id))
    }
  }

  const moveBlock = (id: string, direction: 'up' | 'down') => {
    const index = blocks.findIndex((b) => b.id === id)
    if (index === -1) return
    if (direction === 'up' && index === 0) return
    if (direction === 'down' && index === blocks.length - 1) return

    const newBlocks = [...blocks]
    const targetIndex = direction === 'up' ? index - 1 : index + 1
    ;[newBlocks[index], newBlocks[targetIndex]] = [newBlocks[targetIndex], newBlocks[index]]
    setBlocks(newBlocks)
  }

  const canGoNext = () => {
    if (step === 0) return title.trim().length > 0 && category !== '全部'
    if (step === 1) return blocks.some((b) => b.content.trim().length > 0)
    if (step === 2) return excerpt.trim().length > 0
    return true
  }

  const handlePublish = () => {
    setShowToast(true)
    setTimeout(() => {
      router.push('/community/blog')
    }, 1500)
  }

  return (
    <div className="min-h-[calc(100vh-56px)] bg-[#f5f7fa]">
      <div className="container mx-auto px-4 py-6 max-w-4xl">

        {/* Header */}
        <div className="mb-6">
          <h1 className="text-2xl font-black text-gray-900 mb-1">✍️ 写文章</h1>
          <p className="text-sm text-gray-500">分享你的 AI 实践经验，帮助社区成长</p>
        </div>

        {/* Steps Progress */}
        <div className="bg-white rounded-2xl border p-5 mb-6">
          <div className="flex items-center justify-between mb-2">
            {STEPS.map((s, i) => (
              <div key={s} className="flex items-center flex-1">
                <div className="flex flex-col items-center flex-1">
                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold transition-colors ${
                      i <= step ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-400'
                    }`}
                  >
                    {i + 1}
                  </div>
                  <span className={`text-xs mt-1.5 font-medium ${i <= step ? 'text-gray-900' : 'text-gray-400'}`}>
                    {s}
                  </span>
                </div>
                {i < STEPS.length - 1 && (
                  <div className={`h-0.5 flex-1 -mt-6 ${i < step ? 'bg-blue-600' : 'bg-gray-200'}`} />
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Step Content */}
        <div className="bg-white rounded-2xl border p-6">
          {/* Step 1: Basic Info */}
          {step === 0 && (
            <div className="space-y-5">
              <h2 className="text-lg font-bold text-gray-900 mb-4">基本信息</h2>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  文章标题 <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="输入一个吸引人的标题..."
                  className="w-full border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-300"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  分类 <span className="text-red-500">*</span>
                </label>
                <div className="flex flex-wrap gap-2">
                  {BLOG_CATEGORIES.filter((c) => c !== '全部').map((cat) => (
                    <button
                      key={cat}
                      onClick={() => setCategory(cat)}
                      className={`px-3 py-1.5 rounded-full text-sm font-medium transition-colors ${
                        category === cat
                          ? 'bg-blue-600 text-white'
                          : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                      }`}
                    >
                      {cat}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">标签</label>
                <div className="flex gap-2 mb-2">
                  <input
                    type="text"
                    value={tagInput}
                    onChange={(e) => setTagInput(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') {
                        e.preventDefault()
                        addTag()
                      }
                    }}
                    placeholder="输入标签后按 Enter 添加"
                    className="flex-1 border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-300"
                  />
                  <button
                    onClick={addTag}
                    className="bg-gray-100 text-gray-600 px-4 py-2 rounded-lg text-sm font-medium hover:bg-gray-200 transition-colors"
                  >
                    添加
                  </button>
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {tags.map((tag) => (
                    <span
                      key={tag}
                      className="inline-flex items-center gap-1 bg-blue-50 text-blue-600 border border-blue-100 px-2 py-1 rounded-full text-xs"
                    >
                      #{tag}
                      <button onClick={() => removeTag(tag)} className="hover:text-blue-800">
                        ×
                      </button>
                    </span>
                  ))}
                  {tags.length === 0 && <p className="text-xs text-gray-400">还没有添加标签</p>}
                </div>
              </div>
            </div>
          )}

          {/* Step 2: Content Editor */}
          {step === 1 && (
            <div className="space-y-4">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-bold text-gray-900">内容编辑器</h2>
                <button
                  onClick={addBlock}
                  className="bg-blue-600 text-white text-sm px-3 py-1.5 rounded-lg hover:bg-blue-700 transition-colors font-medium"
                >
                  + 添加内容块
                </button>
              </div>

              {blocks.map((block, index) => (
                <BlockEditor
                  key={block.id}
                  block={block}
                  onChange={(updates) => updateBlock(block.id, updates)}
                  onDelete={() => deleteBlock(block.id)}
                  onMoveUp={() => moveBlock(block.id, 'up')}
                  onMoveDown={() => moveBlock(block.id, 'down')}
                  canMoveUp={index > 0}
                  canMoveDown={index < blocks.length - 1}
                />
              ))}

              {blocks.length === 0 && (
                <div className="text-center py-12 text-gray-400">
                  <div className="text-4xl mb-2">✍️</div>
                  <p className="text-sm">点击上方按钮添加内容块</p>
                </div>
              )}
            </div>
          )}

          {/* Step 3: Summary & Settings */}
          {step === 2 && (
            <div className="space-y-5">
              <h2 className="text-lg font-bold text-gray-900 mb-4">摘要与设置</h2>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  文章摘要 <span className="text-red-500">*</span>
                </label>
                <textarea
                  value={excerpt}
                  onChange={(e) => setExcerpt(e.target.value)}
                  placeholder="用 1-2 句话概括文章的核心内容..."
                  className="w-full border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-300 resize-none"
                  rows={3}
                />
                <p className="text-xs text-gray-400 mt-1">{excerpt.length} / 200</p>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">封面样式</label>
                <div className="grid grid-cols-5 gap-3">
                  {COVER_GRADIENTS.map((cover) => (
                    <button
                      key={cover.name}
                      onClick={() => setCoverGrad(cover.gradient)}
                      className={`h-16 rounded-lg bg-gradient-to-r ${cover.gradient} transition-all ${
                        coverGrad === cover.gradient ? 'ring-4 ring-blue-300 scale-105' : 'hover:scale-105'
                      }`}
                      title={cover.name}
                    />
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Step 4: Preview & Publish */}
          {step === 3 && (
            <div className="space-y-5">
              <h2 className="text-lg font-bold text-gray-900 mb-4">预览与发布</h2>

              <div className="border rounded-xl overflow-hidden">
                <div className={`h-3 bg-gradient-to-r ${coverGrad}`} />
                <div className="p-5">
                  <div className="flex items-center gap-2 mb-3">
                    <span className="text-xs bg-blue-50 text-blue-600 border border-blue-100 px-2 py-0.5 rounded-full font-medium">
                      {category}
                    </span>
                  </div>
                  <h1 className="text-xl font-bold text-gray-900 mb-3">{title || '（无标题）'}</h1>
                  <p className="text-sm text-gray-600 mb-4 leading-relaxed">{excerpt || '（无摘要）'}</p>
                  {tags.length > 0 && (
                    <div className="flex flex-wrap gap-1.5 mb-4">
                      {tags.map((tag) => (
                        <span key={tag} className="text-xs bg-gray-100 text-gray-600 px-2 py-0.5 rounded-full">
                          #{tag}
                        </span>
                      ))}
                    </div>
                  )}
                  <div className="border-t pt-4">
                    <ContentPreview blocks={blocks} />
                  </div>
                </div>
              </div>

              <div className="bg-blue-50 border border-blue-100 rounded-xl p-4 text-sm text-blue-700">
                <p className="font-medium mb-1">📢 发布提示</p>
                <ul className="text-xs space-y-0.5 ml-4 list-disc">
                  <li>发布后文章将出现在社区博客列表中</li>
                  <li>你将获得 +100 积分奖励</li>
                  <li>发布后可在个人中心管理你的文章</li>
                </ul>
              </div>
            </div>
          )}
        </div>

        {/* Navigation Buttons */}
        <div className="flex items-center justify-between mt-6">
          <div>
            {step > 0 ? (
              <button
                onClick={() => setStep(step - 1)}
                className="text-gray-600 hover:text-gray-900 text-sm font-medium flex items-center gap-1"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
                上一步
              </button>
            ) : (
              <Link href="/community/blog" className="text-gray-600 hover:text-gray-900 text-sm font-medium">
                取消
              </Link>
            )}
          </div>

          <div className="flex items-center gap-2">
            <Link
              href="/community/blog"
              className="text-gray-600 hover:text-gray-900 text-sm font-medium px-4 py-2"
            >
              保存草稿
            </Link>
            {step < STEPS.length - 1 ? (
              <button
                onClick={() => setStep(step + 1)}
                disabled={!canGoNext()}
                className="bg-blue-600 text-white text-sm px-5 py-2 rounded-lg hover:bg-blue-700 transition-colors font-medium disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-1"
              >
                下一步
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>
            ) : (
              <button
                onClick={handlePublish}
                className="bg-blue-600 text-white text-sm px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors font-medium flex items-center gap-2"
              >
                <span>🚀</span>
                发布文章
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Toast */}
      {showToast && (
        <div className="fixed bottom-6 right-6 bg-green-500 text-white px-5 py-3 rounded-xl shadow-lg flex items-center gap-2 animate-fade-in">
          <span className="text-lg">✅</span>
          <span className="font-medium">文章发布成功！正在跳转...</span>
        </div>
      )}
    </div>
  )
}
