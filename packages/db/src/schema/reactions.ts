import { pgTable, uuid, varchar, timestamp, index, unique } from 'drizzle-orm/pg-core'
import { relations } from 'drizzle-orm'
import { users } from './users'

export const reactions = pgTable(
  'reactions',
  {
    id: uuid('id').primaryKey().defaultRandom(),
    userId: uuid('user_id')
      .notNull()
      .references(() => users.id, { onDelete: 'cascade' }),
    targetType: varchar('target_type', { length: 50 }).notNull(),
    targetId: uuid('target_id').notNull(),
    reactionType: varchar('reaction_type', { length: 50 }).notNull(),
    createdAt: timestamp('created_at').defaultNow().notNull(),
  },
  (table) => ({
    targetIdx: index('reactions_target_idx').on(table.targetType, table.targetId),
    userTargetIdx: index('reactions_user_target_idx').on(table.userId, table.targetType, table.targetId),
    uniqueUserTarget: unique('reactions_user_target_unique').on(
      table.userId,
      table.targetType,
      table.targetId,
      table.reactionType
    ),
  })
)

export const reactionsRelations = relations(reactions, ({ one }) => ({
  user: one(users, {
    fields: [reactions.userId],
    references: [users.id],
  }),
}))

export type Reaction = typeof reactions.$inferSelect
export type NewReaction = typeof reactions.$inferInsert
