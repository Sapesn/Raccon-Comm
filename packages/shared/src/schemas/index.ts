import { z } from 'zod'
import { VALIDATION } from '../constants'

// 用户注册 Schema
export const registerSchema = z.object({
  email: z.string().email('邮箱格式不正确').max(VALIDATION.EMAIL_MAX_LENGTH),
  password: z
    .string()
    .min(VALIDATION.PASSWORD_MIN_LENGTH, `密码至少 ${VALIDATION.PASSWORD_MIN_LENGTH} 个字符`)
    .max(VALIDATION.PASSWORD_MAX_LENGTH, `密码最多 ${VALIDATION.PASSWORD_MAX_LENGTH} 个字符`),
  displayName: z.string().min(1, '昵称不能为空').max(VALIDATION.DISPLAY_NAME_MAX_LENGTH),
})

// 用户登录 Schema
export const loginSchema = z.object({
  email: z.string().email('邮箱格式不正确'),
  password: z.string().min(1, '密码不能为空'),
})

// 创建知识库 Schema
export const createKBSchema = z.object({
  name: z.string().min(1, '知识库名称不能为空').max(VALIDATION.KB_NAME_MAX_LENGTH),
  slug: z
    .string()
    .min(1, 'Slug 不能为空')
    .max(VALIDATION.KB_SLUG_MAX_LENGTH)
    .regex(/^[a-z0-9-]+$/, 'Slug 只能包含小写字母、数字和连字符'),
  description: z.string().optional(),
  icon: z.string().optional(),
  visibility: z.enum(['public', 'private']).default('private'),
})

// 更新知识库 Schema
export const updateKBSchema = createKBSchema.partial()

// 创建文档 Schema
export const createDocumentSchema = z.object({
  kbId: z.string().uuid('无效的知识库 ID'),
  parentId: z.string().uuid('无效的父文档 ID').optional(),
  title: z.string().min(1, '文档标题不能为空').max(VALIDATION.DOCUMENT_TITLE_MAX_LENGTH),
  content: z.any().optional(), // TipTap JSON
  status: z.enum(['draft', 'published']).default('draft'),
})

// 更新文档 Schema
export const updateDocumentSchema = z.object({
  title: z.string().min(1).max(VALIDATION.DOCUMENT_TITLE_MAX_LENGTH).optional(),
  content: z.any().optional(),
  status: z.enum(['draft', 'published']).optional(),
  parentId: z.string().uuid().nullable().optional(),
})

// 创建评论 Schema
export const createCommentSchema = z.object({
  documentId: z.string().uuid('无效的文档 ID'),
  parentId: z.string().uuid('无效的父评论 ID').optional(),
  content: z.string().min(1, '评论内容不能为空').max(VALIDATION.COMMENT_MAX_LENGTH),
})

// 搜索 Schema
export const searchSchema = z.object({
  query: z.string().min(1, '搜索关键词不能为空'),
  limit: z.number().int().min(1).max(50).default(20),
  offset: z.number().int().min(0).default(0),
})
