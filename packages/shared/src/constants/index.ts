// 用户角色
export const USER_ROLES = {
  ADMIN: 'admin',
  MEMBER: 'member',
} as const

// 用户状态
export const USER_STATUS = {
  ACTIVE: 'active',
  SUSPENDED: 'suspended',
  DELETED: 'deleted',
} as const

// 知识库可见性
export const KB_VISIBILITY = {
  PUBLIC: 'public',
  PRIVATE: 'private',
} as const

// 文档状态
export const DOCUMENT_STATUS = {
  DRAFT: 'draft',
  PUBLISHED: 'published',
} as const

// 权限级别
export const PERMISSIONS = {
  OWNER: 'owner',
  EDITOR: 'editor',
  VIEWER: 'viewer',
} as const

// 权限等级（用于比较）
export const PERMISSION_LEVELS = {
  viewer: 1,
  editor: 2,
  owner: 3,
} as const

// 资源类型
export const RESOURCE_TYPES = {
  KNOWLEDGE_BASE: 'knowledge_base',
  DOCUMENT: 'document',
} as const

// 反应类型
export const REACTION_TYPES = {
  LIKE: 'like',
} as const

// 反应目标类型
export const REACTION_TARGET_TYPES = {
  DOCUMENT: 'document',
  COMMENT: 'comment',
} as const

// 验证规则
export const VALIDATION = {
  EMAIL_MAX_LENGTH: 255,
  PASSWORD_MIN_LENGTH: 8,
  PASSWORD_MAX_LENGTH: 128,
  DISPLAY_NAME_MAX_LENGTH: 100,
  KB_NAME_MAX_LENGTH: 200,
  KB_SLUG_MAX_LENGTH: 100,
  DOCUMENT_TITLE_MAX_LENGTH: 500,
  COMMENT_MAX_LENGTH: 5000,
} as const
