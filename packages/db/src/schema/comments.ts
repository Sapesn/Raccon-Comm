import { pgTable, uuid, text, timestamp, index } from 'drizzle-orm/pg-core'
import { relations } from 'drizzle-orm'
import { users } from './users'
import { documents } from './documents'
import { reactions } from './reactions'

export const comments = pgTable(
  'comments',
  {
    id: uuid('id').primaryKey().defaultRandom(),
    documentId: uuid('document_id')
      .notNull()
      .references(() => documents.id, { onDelete: 'cascade' }),
    authorId: uuid('author_id')
      .notNull()
      .references(() => users.id, { onDelete: 'cascade' }),
    parentId: uuid('parent_id').references(() => comments.id, { onDelete: 'cascade' }),
    content: text('content').notNull(),
    createdAt: timestamp('created_at').defaultNow().notNull(),
  },
  (table) => ({
    documentIdIdx: index('comments_document_id_idx').on(table.documentId),
    parentIdIdx: index('comments_parent_id_idx').on(table.parentId),
    authorIdIdx: index('comments_author_id_idx').on(table.authorId),
  })
)

export const commentsRelations = relations(comments, ({ one, many }) => ({
  document: one(documents, {
    fields: [comments.documentId],
    references: [documents.id],
  }),
  author: one(users, {
    fields: [comments.authorId],
    references: [users.id],
  }),
  parent: one(comments, {
    fields: [comments.parentId],
    references: [comments.id],
    relationName: 'comment_tree',
  }),
  replies: many(comments, {
    relationName: 'comment_tree',
  }),
  reactions: many(reactions),
}))

export type Comment = typeof comments.$inferSelect
export type NewComment = typeof comments.$inferInsert
