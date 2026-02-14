import { pgTable, uuid, varchar, text, jsonb, timestamp, integer, index } from 'drizzle-orm/pg-core'
import { relations } from 'drizzle-orm'
import { users } from './users'
import { knowledgeBases } from './knowledge-bases'
import { comments } from './comments'
import { reactions } from './reactions'

export const documents = pgTable(
  'documents',
  {
    id: uuid('id').primaryKey().defaultRandom(),
    kbId: uuid('kb_id')
      .notNull()
      .references(() => knowledgeBases.id, { onDelete: 'cascade' }),
    parentId: uuid('parent_id').references(() => documents.id, { onDelete: 'set null' }),
    authorId: uuid('author_id')
      .notNull()
      .references(() => users.id, { onDelete: 'cascade' }),
    title: varchar('title', { length: 500 }).notNull(),
    content: jsonb('content'),
    contentText: text('content_text'),
    status: varchar('status', { length: 20 }).notNull().default('draft'),
    position: integer('position').notNull().default(0),
    createdAt: timestamp('created_at').defaultNow().notNull(),
    updatedAt: timestamp('updated_at').defaultNow().notNull(),
  },
  (table) => ({
    kbIdIdx: index('documents_kb_id_idx').on(table.kbId),
    parentIdIdx: index('documents_parent_id_idx').on(table.parentId),
    authorIdIdx: index('documents_author_id_idx').on(table.authorId),
    titleIdx: index('documents_title_idx').on(table.title),
    kbStatusIdx: index('documents_kb_status_idx').on(table.kbId, table.status),
  })
)

export const documentsRelations = relations(documents, ({ one, many }) => ({
  knowledgeBase: one(knowledgeBases, {
    fields: [documents.kbId],
    references: [knowledgeBases.id],
  }),
  author: one(users, {
    fields: [documents.authorId],
    references: [users.id],
  }),
  parent: one(documents, {
    fields: [documents.parentId],
    references: [documents.id],
    relationName: 'document_tree',
  }),
  children: many(documents, {
    relationName: 'document_tree',
  }),
  comments: many(comments),
  reactions: many(reactions),
}))

export type Document = typeof documents.$inferSelect
export type NewDocument = typeof documents.$inferInsert
