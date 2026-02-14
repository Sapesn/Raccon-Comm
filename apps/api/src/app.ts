import Fastify from 'fastify'
import cors from '@fastify/cors'
import jwt from '@fastify/jwt'
import multipart from '@fastify/multipart'
import rateLimit from '@fastify/rate-limit'

const fastify = Fastify({
  logger: {
    level: process.env.LOG_LEVEL || 'info',
  },
})

// 注册插件
await fastify.register(cors, {
  origin: process.env.CORS_ORIGIN || 'http://localhost:3000',
  credentials: true,
})

await fastify.register(jwt, {
  secret: process.env.JWT_SECRET || 'your-secret-key-change-this',
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
