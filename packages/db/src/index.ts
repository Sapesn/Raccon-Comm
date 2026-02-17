import { drizzle } from 'drizzle-orm/postgres-js'
import postgres from 'postgres'
import * as schema from './schema'

const connectionString =
  process.env.DATABASE_URL || 'postgresql://postgres:password@localhost:5432/raccoon_kb'

// 用于查询 - 配置连接池
const queryClient = postgres(connectionString, {
  max: 10, // 最大连接数
  idle_timeout: 20, // 空闲连接超时 (秒)
  connect_timeout: 10, // 连接超时 (秒)
  onnotice: () => {}, // 禁用 NOTICE 日志
})

export const db = drizzle(queryClient, { schema })

// 用于迁移 - 单连接
export const migrationClient = postgres(connectionString, { max: 1 })

// 优雅关闭
export async function closeDatabase() {
  await queryClient.end()
  await migrationClient.end()
}

// 导出所有 schema
export * from './schema'
