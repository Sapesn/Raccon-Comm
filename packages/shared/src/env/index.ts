import { z } from 'zod'

/**
 * API 环境变量验证 Schema
 */
export const apiEnvSchema = z.object({
  // Server
  NODE_ENV: z.enum(['development', 'production', 'test']).default('development'),
  PORT: z.string().default('3001').transform(Number),
  HOST: z.string().default('0.0.0.0'),
  LOG_LEVEL: z.enum(['fatal', 'error', 'warn', 'info', 'debug', 'trace']).default('info'),

  // Database
  DATABASE_URL: z.string().url().min(1, 'DATABASE_URL is required'),

  // Redis
  REDIS_URL: z.string().url().default('redis://localhost:6379'),

  // JWT
  JWT_SECRET: z.string().min(32, 'JWT_SECRET must be at least 32 characters'),

  // CORS
  CORS_ORIGIN: z.string().url().default('http://localhost:3000'),

  // API
  API_SECRET: z.string().min(32, 'API_SECRET must be at least 32 characters'),

  // OSS (Optional)
  OSS_REGION: z.string().optional(),
  OSS_ACCESS_KEY_ID: z.string().optional(),
  OSS_ACCESS_KEY_SECRET: z.string().optional(),
  OSS_BUCKET: z.string().optional(),
  OSS_CDN_URL: z.string().url().optional(),

  // AI Service (Optional)
  SENSENOVA_API_KEY: z.string().optional(),
  SENSENOVA_API_URL: z.string().url().optional(),
  AI_ENABLED: z.string().transform(val => val === 'true').default('false'),
})

/**
 * Web 环境变量验证 Schema
 */
export const webEnvSchema = z.object({
  // NextAuth
  NEXTAUTH_URL: z.string().url().default('http://localhost:3000'),
  NEXTAUTH_SECRET: z.string().min(32, 'NEXTAUTH_SECRET must be at least 32 characters'),

  // API
  NEXT_PUBLIC_API_URL: z.string().url().default('http://localhost:3001'),
})

/**
 * 验证并解析环境变量
 */
export function validateEnv<T extends z.ZodSchema>(
  schema: T,
  env: NodeJS.ProcessEnv = process.env
): z.infer<T> {
  const parsed = schema.safeParse(env)

  if (!parsed.success) {
    console.error('❌ Invalid environment variables:')
    console.error(JSON.stringify(parsed.error.format(), null, 2))
    throw new Error('Environment validation failed')
  }

  return parsed.data
}

// 类型导出
export type ApiEnv = z.infer<typeof apiEnvSchema>
export type WebEnv = z.infer<typeof webEnvSchema>
