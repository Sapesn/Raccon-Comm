import { pgTable, uuid, varchar, timestamp, index, unique } from 'drizzle-orm/pg-core'
import { relations } from 'drizzle-orm'
import { users } from './users'
import { knowledgeBases } from './knowledge-bases'

export const permissions = pgTable(
  'permissions',
  {
    id: uuid('id').primaryKey().defaultRandom(),
    userId: uuid('user_id')
      .notNull()
      .references(() => users.id, { onDelete: 'cascade' }),
    resourceType: varchar('resource_type', { length: 50 }).notNull(),
    resourceId: uuid('resource_id').notNull(),
    permission: varchar('permission', { length: 20 }).notNull(),
    createdAt: timestamp('created_at').defaultNow().notNull(),
  },
  (table) => ({
    userResourceIdx: index('permissions_user_resource_idx').on(
      table.userId,
      table.resourceType,
      table.resourceId
    ),
    resourceIdx: index('permissions_resource_idx').on(table.resourceType, table.resourceId),
    uniqueUserResource: unique('permissions_user_resource_unique').on(
      table.userId,
      table.resourceType,
      table.resourceId
    ),
  })
)

export const permissionsRelations = relations(permissions, ({ one }) => ({
  user: one(users, {
    fields: [permissions.userId],
    references: [users.id],
  }),
}))

export type Permission = typeof permissions.$inferSelect
export type NewPermission = typeof permissions.$inferInsert
