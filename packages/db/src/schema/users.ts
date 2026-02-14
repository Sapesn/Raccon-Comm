import { pgTable, uuid, varchar, text, timestamp, index } from 'drizzle-orm/pg-core'
import { relations } from 'drizzle-orm'

export const users = pgTable(
  'users',
  {
    id: uuid('id').primaryKey().defaultRandom(),
    email: varchar('email', { length: 255 }).notNull().unique(),
    passwordHash: varchar('password_hash', { length: 255 }),
    displayName: varchar('display_name', { length: 100 }).notNull(),
    avatarUrl: text('avatar_url'),
    role: varchar('role', { length: 20 }).notNull().default('member'),
    status: varchar('status', { length: 20 }).notNull().default('active'),
    createdAt: timestamp('created_at').defaultNow().notNull(),
    updatedAt: timestamp('updated_at').defaultNow().notNull(),
  },
  (table) => ({
    emailIdx: index('users_email_idx').on(table.email),
  })
)

export const usersRelations = relations(users, ({ many }) => ({
  knowledgeBases: many(knowledgeBases),
  documents: many(documents),
  comments: many(comments),
  permissions: many(permissions),
  reactions: many(reactions),
}))

export type User = typeof users.$inferSelect
export type NewUser = typeof users.$inferInsert
