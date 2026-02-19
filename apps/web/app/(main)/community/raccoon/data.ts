/**
 * 小浣熊等级系统与个性化数据
 *
 * 包含用户成长等级体系、小浣熊个性化角色、场景背景等数据
 * 用于实现社区的游戏化激励机制和个性化展示
 */

/**
 * 小浣熊等级结构
 * 定义用户在社区的成长等级及对应的视觉效果和能力标签
 */
export interface RaccoonLevel {
  level: number           // 等级编号（1-6）
  name: string            // 等级名称（Lv.1、Lv.2 等）
  form: string            // 等级形态名称（如"浣熊幼崽"、"探索小浣熊"）
  minPoints: number       // 该等级所需最低积分
  maxPoints: number | null // 该等级上限积分，最高级为 null 表示无上限
  emoji: string           // 等级对应的 Emoji 图标
  accessory: string       // 等级装饰品 Emoji（如🔍、📚、🎓等），体现等级特征
  aura: string            // 等级光环渐变色类名，用于背景效果
  ring: string            // 等级边框颜色类名，用于头像边框
  desc: string            // 等级描述文案，展现该等级用户的特点
  ability: string         // 等级能力标签，概括该等级的核心能力
}

/**
 * 小浣熊等级配置列表
 * 从 Lv.1 到 Lv.6 共 6 个等级，积分越高等级越高
 * 通过不同的视觉效果（光环、装饰品、边框）区分等级
 */
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

/**
 * 根据积分获取对应的小浣熊等级
 * 从最高等级开始反向查找，找到第一个积分满足条件的等级
 * 若积分低于所有等级要求（不可能发生），默认返回 Lv.1
 *
 * @param points - 用户当前积分
 * @returns 对应的等级配置对象
 */
export function getRaccoonLevel(points: number): RaccoonLevel {
  return [...RACCOON_LEVELS].reverse().find((l) => points >= l.minPoints) ?? RACCOON_LEVELS[0]
}

/**
 * 小浣熊个性化角色结构
 * 每个用户的小浣熊宠物都有独立的名字、心情和口头禅
 * 体现了社区的个性化与趣味性，增强用户归属感
 */
export interface RaccoonPersonality {
  name: string       // 小浣熊的名字，由系统或用户自定义
  mood: string       // 当前心情 Emoji，展示小浣熊的状态
  catchphrase: string // 小浣熊的口头禅，体现角色个性
  imageUrl?: string  // AI 生成的小浣熊形象图片 URL（可选）
}

/**
 * 用户小浣熊个性化数据映射
 * key 为用户 ID，value 为对应的小浣熊角色数据
 * 每个社区成员都有专属的小浣熊名字和口头禅，体现不同的职业背景和性格
 */
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

/**
 * 场景背景配置列表
 * 用户可以为自己的小浣熊选择不同的展示场景
 *
 * 字段说明：
 * - id: 场景唯一标识
 * - label: 场景显示名称（含 Emoji）
 * - bg: 场景天空背景渐变色类名
 * - ground: 场景地面颜色类名
 */
export const SCENES = [
  { id: 'forest', label: '🌲 竹林小院', bg: 'from-green-50 via-emerald-50 to-teal-50', ground: 'bg-green-100' },
  { id: 'sunset', label: '🌅 落日草原', bg: 'from-amber-50 via-orange-50 to-rose-50', ground: 'bg-amber-100' },
  { id: 'night',  label: '🌙 星夜营地', bg: 'from-slate-800 via-slate-700 to-indigo-900', ground: 'bg-slate-700' },
  { id: 'sakura', label: '🌸 樱花庭院', bg: 'from-pink-50 via-rose-50 to-fuchsia-50', ground: 'bg-pink-100' },
]
