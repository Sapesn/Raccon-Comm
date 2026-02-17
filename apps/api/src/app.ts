import Fastify from 'fastify'
import cors from '@fastify/cors'
import jwt from '@fastify/jwt'
import multipart from '@fastify/multipart'
import rateLimit from '@fastify/rate-limit'
import { validateEnv, apiEnvSchema } from '@raccoon-kb/shared'
import { errorHandler } from './middleware/error-handler'

// 验证环境变量
export const env = validateEnv(apiEnvSchema)

const fastify = Fastify({
  logger: {
    level: env.LOG_LEVEL,
  },
})

// 注册错误处理器
fastify.setErrorHandler(errorHandler)

// 注册插件
await fastify.register(cors, {
  origin: env.CORS_ORIGIN,
  credentials: true,
})

await fastify.register(jwt, {
  secret: env.JWT_SECRET,
})

await fastify.register(multipart, {
  limits: {
    fileSize: 5 * 1024 * 1024, // 5MB
  },
})

await fastify.register(rateLimit, {
  max: 100,
  timeWindow: '1 minute',
})

// 健康检查
fastify.get('/health', async () => {
  return { status: 'ok', timestamp: new Date().toISOString() }
})

// 根路由
fastify.get('/', async () => {
  return {
    name: '小浣熊知识库 API',
    version: '0.1.0',
    status: 'running',
  }
})

// TODO: 注册业务路由
// await fastify.register(authRoutes, { prefix: '/api/auth' })
// await fastify.register(kbRoutes, { prefix: '/api/kb' })
// await fastify.register(documentRoutes, { prefix: '/api/documents' })

export default fastify
