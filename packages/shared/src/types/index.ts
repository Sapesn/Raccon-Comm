// 用户角色
export type UserRole = 'admin' | 'member'

// 用户状态
export type UserStatus = 'active' | 'suspended' | 'deleted'

// 用户类型
export interface User {
  id: string
  email: string
  displayName: string
  avatarUrl: string | null
  role: UserRole
  status: UserStatus
  createdAt: Date
  updatedAt: Date
}

// 知识库可见性
export type KBVisibility = 'public' | 'private'

// 知识库类型
export interface KnowledgeBase {
  id: string
  ownerId: string
  name: string
  slug: string
  description: string | null
  icon: string | null
  visibility: KBVisibility
  createdAt: Date
  updatedAt: Date
}

// 文档状态
export type DocumentStatus = 'draft' | 'published'

// 文档类型
export interface Document {
  id: string
  kbId: string
  parentId: string | null
  authorId: string
  title: string
  content: any // TipTap JSON
  contentText: string | null
  status: DocumentStatus
  position: number
  createdAt: Date
  updatedAt: Date
}

// 权限类型
export type Permission = 'owner' | 'editor' | 'viewer'

// 资源类型
export type ResourceType = 'knowledge_base' | 'document'

// 权限记录
export interface PermissionRecord {
  id: string
  userId: string
  resourceType: ResourceType
  resourceId: string
  permission: Permission
  createdAt: Date
}

// 评论类型
export interface Comment {
  id: string
  documentId: string
  authorId: string
  parentId: string | null
  content: string
  createdAt: Date
}

// 反应类型
export type ReactionType = 'like'

// 互动目标类型
export type ReactionTargetType = 'document' | 'comment'

// 反应记录
export interface Reaction {
  id: string
  userId: string
  targetType: ReactionTargetType
  targetId: string
  reactionType: ReactionType
  createdAt: Date
}
