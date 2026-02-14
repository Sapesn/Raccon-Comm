import { drizzle } from 'drizzle-orm/postgres-js'
import postgres from 'postgres'
import * as schema from './schema'

const connectionString = process.env.DATABASE_URL || 'postgresql://postgres:password@localhost:5432/raccoon_kb'

// 用于查询
const queryClient = postgres(connectionString)
export const db = drizzle(queryClient, { schema })

// 用于迁移
export const migrationClient = postgres(connectionString, { max: 1 })
