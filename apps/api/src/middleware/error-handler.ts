import type { FastifyError, FastifyReply, FastifyRequest } from 'fastify'

export async function errorHandler(
  error: FastifyError,
  request: FastifyRequest,
  reply: FastifyReply
) {
  request.log.error(error)

  // Zod 验证错误
  if (error.validation) {
    return reply.code(400).send({
      error: 'Validation Error',
      details: error.validation,
    })
  }

  // JWT 错误
  if (error.code === 'FST_JWT_NO_AUTHORIZATION_IN_HEADER') {
    return reply.code(401).send({ error: 'Missing authorization header' })
  }

  if (error.code === 'FST_JWT_AUTHORIZATION_TOKEN_INVALID') {
    return reply.code(401).send({ error: 'Invalid token' })
  }

  // 默认错误
  return reply.code(error.statusCode || 500).send({
    error: error.message || 'Internal Server Error',
  })
}
