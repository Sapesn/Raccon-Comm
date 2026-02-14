import { pgTable, uuid, varchar, text, timestamp, index } from 'drizzle-orm/pg-core'
import { relations } from 'drizzle-orm'
import { users } from './users'
import { documents } from './documents'
import { permissions } from './permissions'

export const knowledgeBases = pgTable(
  'knowledge_bases',
  {
    id: uuid('id').primaryKey().defaultRandom(),
    ownerId: uuid('owner_id')
      .notNull()
      .references(() => users.id, { onDelete: 'cascade' }),
    name: varchar('name', { length: 200 }).notNull(),
    slug: varchar('slug', { length: 100 }).notNull(),
    description: text('description'),
    icon: varchar('icon', { length: 50 }),
    visibility: varchar('visibility', { length: 20 }).notNull().default('private'),
    createdAt: timestamp('created_at').defaultNow().notNull(),
    updatedAt: timestamp('updated_at').defaultNow().notNull(),
  },
  (table) => ({
    ownerIdIdx: index('kb_owner_id_idx').on(table.ownerId),
    slugIdx: index('kb_slug_idx').on(table.slug),
    ownerSlugIdx: index('kb_owner_slug_idx').on(table.ownerId, table.slug),
  })
)

export const knowledgeBasesRelations = relations(knowledgeBases, ({ one, many }) => ({
  owner: one(users, {
    fields: [knowledgeBases.ownerId],
    references: [users.id],
  }),
  documents: many(documents),
  permissions: many(permissions),
}))

export type KnowledgeBase = typeof knowledgeBases.$inferSelect
export type NewKnowledgeBase = typeof knowledgeBases.$inferInsert
