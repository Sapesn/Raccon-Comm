'use client'

import { useState, useEffect, useRef } from 'react'
import Link from 'next/link'
import { USERS } from '../members/data'
import { RACCOON_LEVELS, RACCOON_DATA, SCENES, getRaccoonLevel, type RaccoonPersonality } from './data'

// Random moving raccoon component
function MovingRaccoon({
  user,
  rData,
  lv,
  onClick,
  isSelected
}: {
  user: (typeof USERS)[number]
  rData: RaccoonPersonality
  lv: ReturnType<typeof getRaccoonLevel>
  onClick: () => void
  isSelected: boolean
}) {
  const [position, setPosition] = useState({ x: 0, y: 0 })
  const timeoutRef = useRef<NodeJS.Timeout>()

  useEffect(() => {
    // Initialize with a consistent random position based on user ID
    const seed = parseInt(user.id) || 1
    const initialX = ((seed * 137.5) % 85) + 5 // 5-90% range
    const initialY = ((seed * 222.5) % 75) + 10 // 10-85% range
    setPosition({ x: initialX, y: initialY })

    // Move to new random position every 10-20 seconds
    const moveRaccoon = () => {
      const newX = 5 + Math.random() * 85 // 5-90%
      const newY = 10 + Math.random() * 75 // 10-85%
      setPosition({ x: newX, y: newY })

      const nextDelay = 10000 + Math.random() * 10000 // 10-20 seconds
      timeoutRef.current = setTimeout(moveRaccoon, nextDelay)
    }

    // Start movement after initial random delay
    const initialDelay = 5000 + Math.random() * 10000 // 5-15 seconds
    timeoutRef.current = setTimeout(moveRaccoon, initialDelay)

    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current)
    }
  }, [user.id])

  return (
    <button
      onClick={onClick}
      className={`absolute cursor-pointer transition-all duration-[8000ms] ease-in-out hover:scale-125 hover:z-20 ${
        isSelected ? 'scale-125 z-20' : 'hover:z-10'
      }`}
      style={{
        left: `${position.x}%`,
        top: `${position.y}%`,
        transform: isSelected ? 'scale(1.25)' : 'scale(1)',
      }}
      title={`${rData.name} (${user.name})`}
    >
      <div className="relative group">
        {/* Raccoon Image or Emoji */}
        {rData.imageUrl ? (
          <div className="relative">
            <img
              src={rData.imageUrl}
              alt={rData.name}
              className={`w-16 h-16 sm:w-20 sm:h-20 rounded-full object-cover border-4 ${isSelected ? 'ring-4 ' + lv.ring : 'border-white'} shadow-lg transition-all`}
            />
            {lv.accessory && (
              <span className="absolute -top-1 -right-1 text-xl">{lv.accessory}</span>
            )}
            <span className="absolute -bottom-1 -right-1 text-base bg-white rounded-full w-6 h-6 flex items-center justify-center shadow-sm">{rData.mood}</span>
          </div>
        ) : (
          <div className="relative">
            <div className={`w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-gradient-to-br ${lv.aura} flex items-center justify-center text-3xl sm:text-4xl shadow-lg border-2 ${isSelected ? 'ring-4 ' + lv.ring : 'border-white'} transition-all`}>
              {lv.emoji}
            </div>
            {lv.accessory && (
              <span className="absolute -top-1 -right-1 text-xl">{lv.accessory}</span>
            )}
            <span className="absolute -bottom-1 -right-1 text-base">{rData.mood}</span>
          </div>
        )}

        {/* Hover label */}
        <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap">
          <div className="bg-black/80 text-white text-xs px-2 py-1 rounded-lg">
            {rData.name}
          </div>
        </div>
      </div>
    </button>
  )
}

export default function RaccoonPlazaPage() {
  const [scene, setScene] = useState(SCENES[0])
  const [selected, setSelected] = useState<string | null>(null)
  const [nameInput, setNameInput] = useState('')
  const [myRaccoonName, setMyRaccoonName] = useState('小浣熊')
  const [myRaccoonImage, setMyRaccoonImage] = useState<string>('')
  const [editingName, setEditingName] = useState(false)
  const [generatingImage, setGeneratingImage] = useState(false)

  // My raccoon (mock current user: 12400 points → Lv.5)
  const myPoints = 12400
  const myLevel = getRaccoonLevel(myPoints)
  const isNight = scene.id === 'night'

  // Mock AI image generation
  const handleGenerateImage = async () => {
    setGeneratingImage(true)
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000))
    // Mock generated image URL
    setMyRaccoonImage(`https://api.dicebear.com/7.x/bottts/svg?seed=${myRaccoonName}&backgroundColor=b6e3f4`)
    setGeneratingImage(false)
  }

  return (
    <div className={`min-h-[calc(100vh-56px)] bg-gradient-to-b ${scene.bg} transition-all duration-700`}>
      <div className="container mx-auto px-4 py-6 max-w-7xl">

        {/* Header */}
        <div className="flex items-start justify-between mb-6 flex-wrap gap-3">
          <div>
            <h1 className={`text-2xl font-black mb-1 ${isNight ? 'text-white' : 'text-gray-900'}`}>
              🦝 浣熊园
            </h1>
            <p className={`text-sm ${isNight ? 'text-slate-300' : 'text-gray-500'}`}>
              每一只浣熊都是一位 AI 实践者的化身，它们在园子里自由漫步～
            </p>
          </div>
          {/* Scene switcher */}
          <div className="flex gap-1.5 flex-wrap">
            {SCENES.map((s) => (
              <button
                key={s.id}
                onClick={() => setScene(s)}
                className={`px-3 py-1.5 rounded-full text-xs font-medium transition-all ${
                  scene.id === s.id
                    ? 'bg-white/90 text-gray-900 shadow-md scale-105'
                    : isNight ? 'bg-white/10 text-white hover:bg-white/20' : 'bg-white/70 text-gray-600 hover:bg-white/90'
                }`}
              >
                {s.label}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">

          {/* My Raccoon Card - left sidebar */}
          <div className="lg:col-span-1 space-y-4">
            <div className={`rounded-2xl border overflow-hidden shadow-sm ${isNight ? 'bg-slate-800 border-slate-700' : 'bg-white'}`}>
              <div className={`bg-gradient-to-br ${myLevel.aura} p-5 text-center relative`}>
                {myRaccoonImage ? (
                  <div className="relative inline-block">
                    <img
                      src={myRaccoonImage}
                      alt={myRaccoonName}
                      className="w-24 h-24 rounded-2xl object-cover mx-auto mb-2 shadow-md"
                    />
                    {myLevel.accessory && (
                      <span className="absolute -top-1 -right-1 text-2xl">{myLevel.accessory}</span>
                    )}
                  </div>
                ) : (
                  <div className="text-6xl mb-1 relative inline-block">
                    {myLevel.emoji}
                    {myLevel.accessory && (
                      <span className="absolute -top-2 -right-2 text-2xl">{myLevel.accessory}</span>
                    )}
                  </div>
                )}
                <div className={`text-xs font-bold mt-1 ${myLevel.level === 6 ? 'text-amber-600' : myLevel.level === 5 ? 'text-violet-600' : 'text-gray-600'}`}>
                  {myLevel.name} {myLevel.form}
                </div>
              </div>
              <div className="p-4">
                {/* Name editor */}
                <div className="flex items-center justify-between mb-2">
                  {editingName ? (
                    <input
                      autoFocus
                      value={nameInput}
                      onChange={(e) => setNameInput(e.target.value)}
                      onBlur={() => { if (nameInput.trim()) setMyRaccoonName(nameInput.trim()); setEditingName(false) }}
                      onKeyDown={(e) => { if (e.key === 'Enter') { if (nameInput.trim()) setMyRaccoonName(nameInput.trim()); setEditingName(false) }}}
                      className="text-base font-bold border-b border-blue-400 outline-none bg-transparent w-24"
                      maxLength={8}
                    />
                  ) : (
                    <h3 className={`text-base font-bold ${isNight ? 'text-white' : 'text-gray-900'}`}>{myRaccoonName}</h3>
                  )}
                  <button
                    onClick={() => { setNameInput(myRaccoonName); setEditingName(true) }}
                    className="text-xs text-gray-400 hover:text-blue-500 transition-colors"
                  >
                    改名
                  </button>
                </div>
                <p className={`text-xs mb-3 ${isNight ? 'text-slate-400' : 'text-gray-500'}`}>{myLevel.desc}</p>
                <div className={`text-xs font-medium rounded-lg px-3 py-2 mb-3 ${isNight ? 'bg-slate-700 text-slate-300' : 'bg-gray-50 text-gray-600'}`}>
                  {myLevel.ability}
                </div>

                {/* AI Generate Button */}
                <button
                  onClick={handleGenerateImage}
                  disabled={generatingImage}
                  className={`w-full py-2 rounded-lg text-xs font-medium transition-colors mb-3 ${
                    generatingImage
                      ? 'bg-gray-200 text-gray-400 cursor-wait'
                      : myRaccoonImage
                      ? 'bg-green-50 text-green-700 border border-green-200 hover:bg-green-100'
                      : 'bg-blue-500 text-white hover:bg-blue-600'
                  }`}
                >
                  {generatingImage ? '🎨 AI 生成中...' : myRaccoonImage ? '✨ 重新生成形象' : '🎨 AI 生成形象'}
                </button>

                {/* Points progress */}
                <div className="mt-3">
                  <div className="flex justify-between text-xs mb-1">
                    <span className={isNight ? 'text-slate-400' : 'text-gray-400'}>积分进度</span>
                    <span className="font-semibold text-blue-500">{myPoints.toLocaleString()} / {myLevel.maxPoints?.toLocaleString() ?? '∞'}</span>
                  </div>
                  <div className={`h-2 rounded-full ${isNight ? 'bg-slate-700' : 'bg-gray-100'}`}>
                    <div
                      className="h-2 rounded-full bg-gradient-to-r from-blue-400 to-violet-500"
                      style={{
                        width: myLevel.maxPoints
                          ? `${Math.min(((myPoints - myLevel.minPoints) / (myLevel.maxPoints - myLevel.minPoints)) * 100, 100)}%`
                          : '100%'
                      }}
                    />
                  </div>
                  {myLevel.maxPoints && (
                    <p className="text-xs text-gray-400 mt-1 text-right">
                      再 {(myLevel.maxPoints - myPoints + 1).toLocaleString()} 积分升级
                    </p>
                  )}
                </div>
                <Link
                  href="/community/profile"
                  className="mt-3 block w-full text-center bg-blue-600 text-white text-xs py-2 rounded-lg hover:bg-blue-700 transition-colors"
                >
                  前往个人中心
                </Link>
              </div>
            </div>

            {/* Level guide */}
            <div className={`rounded-2xl border p-4 ${isNight ? 'bg-slate-800 border-slate-700' : 'bg-white'}`}>
              <h3 className={`text-sm font-semibold mb-3 ${isNight ? 'text-white' : 'text-gray-900'}`}>🌱 成长路线</h3>
              <div className="space-y-2">
                {RACCOON_LEVELS.map((lv) => (
                  <div key={lv.level} className={`flex items-center gap-2 text-xs p-2 rounded-lg ${lv.level === myLevel.level ? (isNight ? 'bg-blue-900 border border-blue-700' : 'bg-blue-50 border border-blue-200') : ''}`}>
                    <div className={`w-8 h-8 rounded-lg bg-gradient-to-br ${lv.aura} flex items-center justify-center text-sm relative`}>
                      {lv.emoji}
                      {lv.accessory && <span className="absolute -top-1 -right-1 text-xs">{lv.accessory}</span>}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className={`font-medium truncate ${isNight ? 'text-slate-200' : 'text-gray-800'}`}>{lv.form}</div>
                      <div className={isNight ? 'text-slate-400' : 'text-gray-400'}>{lv.minPoints.toLocaleString()}+ 积分</div>
                    </div>
                    {lv.level === myLevel.level && <span className="text-blue-500 font-bold">←</span>}
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Plaza - free roaming raccoons */}
          <div className="lg:col-span-3">
            {/* Ground scene */}
            <div className={`rounded-2xl overflow-hidden border shadow-sm ${isNight ? 'border-slate-700' : 'border-white/60'}`}>
              {/* Sky */}
              <div className={`bg-gradient-to-b ${scene.bg} px-6 pt-6 pb-2`}>
                <div className={`text-xs text-center mb-3 ${isNight ? 'text-slate-400' : 'text-gray-400'}`}>
                  {isNight ? '🌟'.repeat(8) : '☁️ ☁️ ☁️'}
                </div>
              </div>
              {/* Ground - absolute positioned raccoons */}
              <div className={`${scene.ground} relative overflow-hidden`} style={{ minHeight: '500px', height: '60vh' }}>
                {USERS.filter(u => u.identity !== 'official').map((user) => {
                  const lv = getRaccoonLevel(user.points)
                  const rData = RACCOON_DATA[user.id] ?? { name: `浣熊${user.id}`, mood: '🦝', catchphrase: '正在探索 AI 中...' }
                  const isSelected = selected === user.id
                  return (
                    <MovingRaccoon
                      key={user.id}
                      user={user}
                      rData={rData}
                      lv={lv}
                      onClick={() => setSelected(isSelected ? null : user.id)}
                      isSelected={isSelected}
                    />
                  )
                })}
              </div>
            </div>

            {/* Selected raccoon detail */}
            {selected && (() => {
              const user = USERS.find(u => u.id === selected)!
              const lv = getRaccoonLevel(user.points)
              const rData = RACCOON_DATA[selected] ?? { name: `浣熊${selected}`, mood: '🦝', catchphrase: '正在探索 AI 中...' }
              return (
                <div className={`mt-4 rounded-2xl border p-5 transition-all ${isNight ? 'bg-slate-800 border-slate-700' : 'bg-white shadow-sm'}`}>
                  <div className="flex items-start gap-4">
                    {rData.imageUrl ? (
                      <img
                        src={rData.imageUrl}
                        alt={rData.name}
                        className="w-16 h-16 rounded-2xl object-cover flex-shrink-0 shadow-md"
                      />
                    ) : (
                      <div className={`relative w-16 h-16 rounded-2xl bg-gradient-to-br ${lv.aura} flex items-center justify-center text-3xl flex-shrink-0`}>
                        {lv.emoji}
                        {lv.accessory && <span className="absolute -top-1.5 -right-1.5 text-xl">{lv.accessory}</span>}
                      </div>
                    )}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 flex-wrap mb-1">
                        <h3 className={`font-bold text-lg ${isNight ? 'text-white' : 'text-gray-900'}`}>{rData.name}</h3>
                        <span className={`text-xs px-2 py-0.5 rounded-full font-medium bg-gradient-to-r ${lv.aura} text-gray-700`}>
                          {lv.name} {lv.form}
                        </span>
                      </div>
                      <p className={`text-sm italic mb-2 ${isNight ? 'text-slate-400' : 'text-gray-500'}`}>
                        「{rData.catchphrase}」
                      </p>
                      <p className={`text-xs mb-3 ${isNight ? 'text-slate-400' : 'text-gray-500'}`}>{lv.desc}</p>
                      <div className="flex flex-wrap gap-3 text-xs text-gray-500">
                        <span className={isNight ? 'text-slate-400' : ''}>👤 {user.name}</span>
                        <span className={isNight ? 'text-slate-400' : ''}>⭐ {user.points.toLocaleString()} 积分</span>
                        <span className={isNight ? 'text-slate-400' : ''}>📂 {user.cases} 案例</span>
                        <span className={isNight ? 'text-slate-400' : ''}>{lv.ability}</span>
                      </div>
                    </div>
                    <Link
                      href={`/community/members/${user.id}`}
                      className="text-xs text-blue-500 hover:text-blue-700 whitespace-nowrap flex-shrink-0"
                    >
                      查看主页 →
                    </Link>
                  </div>
                </div>
              )
            })()}

            {/* Stats */}
            <div className="mt-4 grid grid-cols-3 gap-3">
              {[
                { label: '园内居民', value: USERS.filter(u => u.identity !== 'official').length + '只' },
                { label: '最高等级', value: '传说浣熊' },
                { label: '平均积分', value: Math.floor(USERS.filter(u => u.identity !== 'official').reduce((s, u) => s + u.points, 0) / USERS.filter(u => u.identity !== 'official').length).toLocaleString() },
              ].map((s) => (
                <div key={s.label} className={`rounded-xl p-3 text-center border ${isNight ? 'bg-slate-800 border-slate-700' : 'bg-white'}`}>
                  <div className={`font-bold text-sm ${isNight ? 'text-white' : 'text-gray-900'}`}>{s.value}</div>
                  <div className={`text-xs mt-0.5 ${isNight ? 'text-slate-400' : 'text-gray-400'}`}>{s.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
