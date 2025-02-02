import { desc } from "drizzle-orm";
import { boolean, index, pgTable, serial, text, timestamp, varchar, vector  } from "drizzle-orm/pg-core";

export const users = pgTable('users', {
  id: serial('id').primaryKey(),
  fullName: text('full_name').notNull(),
  email: varchar('email', { length: 256 }).notNull().unique(),
  createdAt: timestamp('created_at').defaultNow(),
});

export const chats = pgTable('chats', {
  id: serial('id').primaryKey(),
  message_id: serial('message_id').notNull().references(() => messages.id),
  name: varchar('name', { length: 50 }).notNull(),
});

export const messages = pgTable('messages', {
  id: serial('id').primaryKey(),
  user_id: serial('user_id').notNull().references(() => users.id),
  body: text('body').notNull(),
  attachments: varchar('attachments', { length: 256 }).array(),
});

export const function_packs = pgTable('function_packs', {
  id: serial('id').primaryKey(),
  function_id: serial('function_id').notNull().references(() => functions.id),
  name: varchar('name', { length: 256 }).notNull(),
  description: text('description').notNull(),
});

export const functions = pgTable('functions', {
  id: serial('id').primaryKey(),
  name: varchar('name', { length: 256 }).notNull(),
  description: text('description').notNull(),
  documentation: varchar('queries', { length: 512 }).array(),
  queries: varchar('queries', { length: 256 }).array(),
});

export const functions_vdb = pgTable(
  'functions_vdb',
  {
    id: serial('id').primaryKey(),
    function_id: serial('function_id').notNull().references(() => functions.id),
    embedding: vector('embedding', { dimensions: 1536 }),
  },
  (table) => ({
    embeddingIndex: index('embeddingIndex').using('hnsw', table.embedding.op('vector_cosine_ops')),
  }),
);