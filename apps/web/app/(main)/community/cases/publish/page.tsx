'use client'

import { useState } from 'react'
import Link from 'next/link'

type WorkflowStep = {
  name: string
  desc: string
  prompt: string
  icon: string
}

export default function PublishCasePage() {
  const [step, setStep] = useState(1)
  const [formData, setFormData] = useState({
    title: '',
    industry: '',
    tags: [] as string[],
    background: '',
    workflow: [
      { name: '', desc: '', prompt: '', icon: '📝' },
    ] as WorkflowStep[],
    inputs: [{ name: '', type: '文件', example: '' }],
    outputs: [{ name: '', desc: '' }],
    result: '',
    value: '',
  })
  const [tagInput, setTagInput] = useState('')

  const INDUSTRIES = ['电商', '金融', '医疗', '法律', '教育', '互联网', '制造业', '零售', '其他']
  const ICONS = ['📝', '📊', '🔍', '⚡', '🎯', '💡', '🚀', '🔧', '📁', '📄', '🧹', '✨']

  const addWorkflowStep = () => {
    setFormData({
      ...formData,
      workflow: [...formData.workflow, { name: '', desc: '', prompt: '', icon: '📝' }],
    })
  }

  const updateWorkflowStep = (index: number, field: keyof WorkflowStep, value: string) => {
    const newWorkflow = [...formData.workflow]
    newWorkflow[index] = { ...newWorkflow[index], [field]: value }
    setFormData({ ...formData, workflow: newWorkflow })
  }

  const removeWorkflowStep = (index: number) => {
    setFormData({
      ...formData,
      workflow: formData.workflow.filter((_, i) => i !== index),
    })
  }

  const addTag = () => {
    if (tagInput.trim() && !formData.tags.includes(tagInput.trim())) {
      setFormData({ ...formData, tags: [...formData.tags, tagInput.trim()] })
      setTagInput('')
    }
  }

  const removeTag = (tag: string) => {
    setFormData({ ...formData, tags: formData.tags.filter((t) => t !== tag) })
  }

  const canProceed = () => {
    if (step === 1) return formData.title && formData.industry && formData.tags.length > 0
    if (step === 2) return formData.background
    if (step === 3) return formData.workflow.every((w) => w.name && w.desc)
    if (step === 4) return formData.result && formData.value
    return false
  }

  const STEPS = [
    { num: 1, label: '基本信息' },
    { num: 2, label: '背景问题' },
    { num: 3, label: '使用链路' },
    { num: 4, label: '成果价值' },
    { num: 5, label: '预览发布' },
  ]

  return (
    <div className="container mx-auto px-4 py-6 max-w-4xl">
      {/* Header */}
      <div className="mb-6">
        <div className="flex items-center gap-2 text-sm text-gray-400 mb-3">
          <Link href="/community" className="hover:text-blue-600">社区首页</Link>
          <span>/</span>
          <Link href="/community/cases" className="hover:text-blue-600">成果案例</Link>
          <span>/</span>
          <span className="text-gray-600">发布案例</span>
        </div>
        <h1 className="text-2xl font-bold text-gray-900">发布成果案例</h1>
        <p className="text-sm text-gray-500 mt-1">分享你的 AI 工作链路，帮助更多人提升效率</p>
      </div>

      {/* Progress Steps */}
      <div className="bg-white rounded-2xl p-6 shadow-sm border mb-6">
        <div className="flex items-center justify-between">
          {STEPS.map((s, i) => (
            <div key={s.num} className="flex items-center">
              <div className="flex flex-col items-center">
                <div
                  className={`w-10 h-10 rounded-full flex items-center justify-center font-bold transition-colors ${
                    step >= s.num ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-400'
                  }`}
                >
                  {step > s.num ? '✓' : s.num}
                </div>
                <span className={`text-xs mt-1 ${step >= s.num ? 'text-gray-900 font-medium' : 'text-gray-400'}`}>
                  {s.label}
                </span>
              </div>
              {i < STEPS.length - 1 && (
                <div className={`w-16 h-0.5 mx-2 ${step > s.num ? 'bg-blue-600' : 'bg-gray-200'}`} />
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Form */}
      <div className="bg-white rounded-2xl p-6 shadow-sm border">
        {/* Step 1: Basic Info */}
        {step === 1 && (
          <div className="space-y-5">
            <h2 className="text-lg font-bold text-gray-900 mb-4">基本信息</h2>

            {/* Title */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                案例标题 <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                placeholder="如：电商行业月度销售报告自动化生成链路"
                className="w-full border rounded-lg px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-blue-300"
              />
              <p className="text-xs text-gray-400 mt-1">请用简洁的语言描述你的案例，建议控制在 30 字以内</p>
            </div>

            {/* Industry */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                所属行业 <span className="text-red-500">*</span>
              </label>
              <div className="flex gap-2 flex-wrap">
                {INDUSTRIES.map((ind) => (
                  <button
                    key={ind}
                    onClick={() => setFormData({ ...formData, industry: ind })}
                    className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                      formData.industry === ind ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                    }`}
                  >
                    {ind}
                  </button>
                ))}
              </div>
            </div>

            {/* Tags */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                功能标签 <span className="text-red-500">*</span>
              </label>
              <div className="flex gap-2 mb-2">
                <input
                  type="text"
                  value={tagInput}
                  onChange={(e) => setTagInput(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addTag())}
                  placeholder="输入标签，按回车添加"
                  className="flex-1 border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-300"
                />
                <button
                  onClick={addTag}
                  className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
                >
                  添加
                </button>
              </div>
              {formData.tags.length > 0 && (
                <div className="flex gap-2 flex-wrap">
                  {formData.tags.map((tag) => (
                    <span
                      key={tag}
                      className="inline-flex items-center gap-1 bg-blue-50 text-blue-600 px-3 py-1 rounded-full text-sm"
                    >
                      #{tag}
                      <button onClick={() => removeTag(tag)} className="hover:text-blue-800">×</button>
                    </span>
                  ))}
                </div>
              )}
              <p className="text-xs text-gray-400 mt-1">添加 3-5 个标签，帮助其他人找到你的案例</p>
            </div>
          </div>
        )}

        {/* Step 2: Background */}
        {step === 2 && (
          <div className="space-y-5">
            <h2 className="text-lg font-bold text-gray-900 mb-4">背景问题</h2>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                描述你要解决的问题和痛点 <span className="text-red-500">*</span>
              </label>
              <textarea
                value={formData.background}
                onChange={(e) => setFormData({ ...formData, background: e.target.value })}
                rows={6}
                placeholder="详细描述使用此链路前遇到的问题、痛点和挑战。例如：工作耗时长、错误率高、成本高等。"
                className="w-full border rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-300 resize-none"
              />
              <p className="text-xs text-gray-400 mt-1">建议 100-300 字，清晰描述问题背景</p>
            </div>
          </div>
        )}

        {/* Step 3: Workflow */}
        {step === 3 && (
          <div className="space-y-5">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-bold text-gray-900">使用链路</h2>
              <button
                onClick={addWorkflowStep}
                className="text-sm bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
              >
                + 添加步骤
              </button>
            </div>

            {formData.workflow.map((w, i) => (
              <div key={i} className="border rounded-xl p-4 bg-gray-50">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <span className="w-7 h-7 bg-blue-600 text-white rounded-lg flex items-center justify-center font-bold text-sm">
                      {i + 1}
                    </span>
                    <select
                      value={w.icon}
                      onChange={(e) => updateWorkflowStep(i, 'icon', e.target.value)}
                      className="border rounded-lg px-2 py-1 text-lg focus:outline-none focus:ring-2 focus:ring-blue-300"
                    >
                      {ICONS.map((icon) => (
                        <option key={icon} value={icon}>{icon}</option>
                      ))}
                    </select>
                  </div>
                  {formData.workflow.length > 1 && (
                    <button
                      onClick={() => removeWorkflowStep(i)}
                      className="text-red-500 hover:text-red-700 text-sm"
                    >
                      删除
                    </button>
                  )}
                </div>

                <div className="space-y-3">
                  <input
                    type="text"
                    value={w.name}
                    onChange={(e) => updateWorkflowStep(i, 'name', e.target.value)}
                    placeholder="步骤名称，如：上传原始数据"
                    className="w-full border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-300"
                  />
                  <textarea
                    value={w.desc}
                    onChange={(e) => updateWorkflowStep(i, 'desc', e.target.value)}
                    rows={2}
                    placeholder="步骤描述，如：将月度销售明细 Excel 文件上传至小浣熊..."
                    className="w-full border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-300 resize-none"
                  />
                  <textarea
                    value={w.prompt}
                    onChange={(e) => updateWorkflowStep(i, 'prompt', e.target.value)}
                    rows={3}
                    placeholder="（可选）填写此步骤的 Prompt 示例，帮助复用者了解如何使用"
                    className="w-full border rounded-lg px-3 py-2 text-xs font-mono bg-white focus:outline-none focus:ring-2 focus:ring-blue-300 resize-none"
                  />
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Step 4: Result & Value */}
        {step === 4 && (
          <div className="space-y-5">
            <h2 className="text-lg font-bold text-gray-900 mb-4">成果与价值</h2>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                成果展示 <span className="text-red-500">*</span>
              </label>
              <textarea
                value={formData.result}
                onChange={(e) => setFormData({ ...formData, result: e.target.value })}
                rows={5}
                placeholder="描述使用此链路后的具体成果和数据对比。例如：时间从 3 小时缩短至 5 分钟，准确率提升至 99.8%..."
                className="w-full border rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-300 resize-none"
              />
              <p className="text-xs text-gray-400 mt-1">建议包含具体数据对比，增强说服力</p>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                价值总结 <span className="text-red-500">*</span>
              </label>
              <textarea
                value={formData.value}
                onChange={(e) => setFormData({ ...formData, value: e.target.value })}
                rows={4}
                placeholder="总结此链路为团队或业务带来的核心价值。例如：解放人力、降低风险、提升效率..."
                className="w-full border rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-300 resize-none"
              />
            </div>
          </div>
        )}

        {/* Step 5: Preview */}
        {step === 5 && (
          <div className="space-y-5">
            <h2 className="text-lg font-bold text-gray-900 mb-4">预览案例</h2>

            <div className="border rounded-xl p-5 bg-gray-50">
              <div className="flex items-center gap-2 mb-3">
                <span className="text-sm bg-blue-50 text-blue-600 px-2.5 py-1 rounded-full font-medium">{formData.industry}</span>
                {formData.tags.map((tag) => (
                  <span key={tag} className="text-xs bg-gray-100 text-gray-500 px-2 py-0.5 rounded-full">#{tag}</span>
                ))}
              </div>

              <h3 className="text-xl font-bold text-gray-900 mb-4">{formData.title}</h3>

              <div className="space-y-4">
                <div>
                  <h4 className="font-semibold text-gray-800 mb-2">背景问题</h4>
                  <p className="text-sm text-gray-600">{formData.background}</p>
                </div>

                <div>
                  <h4 className="font-semibold text-gray-800 mb-2">使用链路</h4>
                  <div className="space-y-2">
                    {formData.workflow.map((w, i) => (
                      <div key={i} className="flex gap-2 text-sm">
                        <span className="font-bold text-blue-600">{i + 1}.</span>
                        <span className="text-lg">{w.icon}</span>
                        <span className="text-gray-700"><strong>{w.name}</strong> - {w.desc}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <h4 className="font-semibold text-gray-800 mb-2">成果展示</h4>
                  <p className="text-sm text-gray-600">{formData.result}</p>
                </div>

                <div>
                  <h4 className="font-semibold text-gray-800 mb-2">价值总结</h4>
                  <p className="text-sm text-gray-600">{formData.value}</p>
                </div>
              </div>
            </div>

            <div className="bg-blue-50 border border-blue-100 rounded-xl p-4 text-sm text-gray-600">
              <p className="mb-2">📢 <strong>发布须知：</strong></p>
              <ul className="space-y-1 text-xs ml-5 list-disc">
                <li>案例发布后将进入审核队列，通常 1-2 个工作日内完成审核</li>
                <li>审核通过后将自动发布，您将获得 <strong className="text-amber-600">+100 积分</strong></li>
                <li>优质案例有机会被官方推荐，额外获得 <strong className="text-amber-600">+300 积分</strong></li>
                <li>案例被他人复用时，每次复用可获得 <strong className="text-amber-600">+200 积分</strong></li>
              </ul>
            </div>
          </div>
        )}

        {/* Navigation */}
        <div className="flex items-center justify-between mt-6 pt-6 border-t">
          <button
            onClick={() => setStep(Math.max(1, step - 1))}
            disabled={step === 1}
            className={`px-6 py-2.5 rounded-lg font-medium transition-colors ${
              step === 1
                ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            上一步
          </button>

          <div className="flex gap-2">
            <Link
              href="/community/cases"
              className="px-6 py-2.5 rounded-lg border text-gray-600 hover:bg-gray-50 transition-colors"
            >
              取消
            </Link>
            {step < 5 ? (
              <button
                onClick={() => setStep(step + 1)}
                disabled={!canProceed()}
                className={`px-6 py-2.5 rounded-lg font-medium transition-colors ${
                  canProceed()
                    ? 'bg-blue-600 text-white hover:bg-blue-700'
                    : 'bg-gray-100 text-gray-400 cursor-not-allowed'
                }`}
              >
                下一步
              </button>
            ) : (
              <button className="px-6 py-2.5 rounded-lg bg-blue-600 text-white font-medium hover:bg-blue-700 transition-colors">
                提交发布
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
