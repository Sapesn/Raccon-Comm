export interface RaccoonLevel {
  level: number
  name: string
  form: string
  minPoints: number
  maxPoints: number | null
  emoji: string
  accessory: string
  aura: string
  ring: string
  desc: string
  ability: string
}

export const RACCOON_LEVELS: RaccoonLevel[] = [
  {
    level: 1,
    name: 'Lv.1',
    form: '浣熊幼崽',
    minPoints: 0,
    maxPoints: 499,
    emoji: '🦝',
    accessory: '',
    aura: 'from-gray-100 to-gray-200',
    ring: 'ring-gray-300',
    desc: '刚刚诞生，睁着圆溜溜的大眼睛好奇地看着世界',
    ability: '好奇心·超强',
  },
  {
    level: 2,
    name: 'Lv.2',
    form: '探索小浣熊',
    minPoints: 500,
    maxPoints: 1999,
    emoji: '🦝',
    accessory: '🔍',
    aura: 'from-blue-100 to-cyan-100',
    ring: 'ring-blue-300',
    desc: '开始探索社区，热情分享自己的第一个 AI 实践',
    ability: '探索力·旺盛',
  },
  {
    level: 3,
    name: 'Lv.3',
    form: '知识浣熊',
    minPoints: 2000,
    maxPoints: 4999,
    emoji: '🦝',
    accessory: '📚',
    aura: 'from-green-100 to-emerald-100',
    ring: 'ring-green-300',
    desc: '积累了丰富的知识，开始为社区贡献高质量内容',
    ability: '学习力·满格',
  },
  {
    level: 4,
    name: 'Lv.4',
    form: '专家浣熊',
    minPoints: 5000,
    maxPoints: 9999,
    emoji: '🦝',
    accessory: '🎓',
    aura: 'from-amber-100 to-yellow-100',
    ring: 'ring-amber-400',
    desc: '成为领域专家，深受社区用户信赖，经常被提问',
    ability: '专业力·精通',
  },
  {
    level: 5,
    name: 'Lv.5',
    form: '大师浣熊',
    minPoints: 10000,
    maxPoints: 19999,
    emoji: '🦝',
    accessory: '✨',
    aura: 'from-violet-100 to-purple-100',
    ring: 'ring-violet-400',
    desc: '声名远播的社区大师，影响力辐射全行业',
    ability: '影响力·强劲',
  },
  {
    level: 6,
    name: 'Lv.6',
    form: '传说浣熊',
    minPoints: 20000,
    maxPoints: null,
    emoji: '🦝',
    accessory: '👑',
    aura: 'from-amber-200 via-rose-100 to-violet-200',
    ring: 'ring-amber-500',
    desc: '传说级存在，为社区发展作出了不可磨灭的贡献',
    ability: '传奇力·无极',
  },
]

export function getRaccoonLevel(points: number): RaccoonLevel {
  return [...RACCOON_LEVELS].reverse().find((l) => points >= l.minPoints) ?? RACCOON_LEVELS[0]
}

export interface RaccoonPersonality {
  name: string
  mood: string
  catchphrase: string
  imageUrl?: string  // AI generated raccoon image
}

export const RACCOON_DATA: Record<string, RaccoonPersonality> = {
  '1':  { name: '橙子',   mood: '🎯', catchphrase: '用 AI 征服每一个大促！' },
  '2':  { name: '提示词', mood: '💡', catchphrase: 'Prompt 就是一切～' },
  '3':  { name: '判官',   mood: '⚖️', catchphrase: '合同风险，我来把关' },
  '4':  { name: '量化君', mood: '📊', catchphrase: '数字会说话的' },
  '5':  { name: '听诊器', mood: '🏥', catchphrase: '医者仁心，AI 相助' },
  '6':  { name: '小林林', mood: '🎨', catchphrase: '内容为王，AI 赋能' },
  '7':  { name: '代码侠', mood: '⚙️', catchphrase: 'CI/CD 走起！' },
  '8':  { name: '官方熊', mood: '🦝', catchphrase: '欢迎来到小浣熊社区！' },
  '9':  { name: '合规君', mood: '📋', catchphrase: '合规无小事' },
  '10': { name: '风控士', mood: '🛡️', catchphrase: '风险前置，损失归零' },
  '11': { name: '护理星', mood: '💊', catchphrase: '医疗 AI，从护理开始' },
  '12': { name: '产品熊', mood: '🎯', catchphrase: '用户需求第一位！' },
}

export const SCENES = [
  { id: 'forest', label: '🌲 竹林小院', bg: 'from-green-50 via-emerald-50 to-teal-50', ground: 'bg-green-100' },
  { id: 'sunset', label: '🌅 落日草原', bg: 'from-amber-50 via-orange-50 to-rose-50', ground: 'bg-amber-100' },
  { id: 'night',  label: '🌙 星夜营地', bg: 'from-slate-800 via-slate-700 to-indigo-900', ground: 'bg-slate-700' },
  { id: 'sakura', label: '🌸 樱花庭院', bg: 'from-pink-50 via-rose-50 to-fuchsia-50', ground: 'bg-pink-100' },
]
