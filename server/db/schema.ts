import { desc } from "drizzle-orm";
import { boolean, index, pgTable, pgTableCreator, serial, text, timestamp, varchar, vector  } from "drizzle-orm/pg-core";

const createTable = pgTableCreator((name) => `website_${name}`);

export const users = createTable('users', {
  id:  varchar("id", { length: 256 }).primaryKey(),
  full_name: text('full_name'),
  email: varchar('email', { length: 256 }).notNull().unique(),
  created_at: timestamp('created_at').defaultNow(),
});

export const chats = createTable('chats', {
  id: serial('id').primaryKey(),
  message_id: serial('message_id').notNull().references(() => messages.id),
  name: varchar('name', { length: 50 }).notNull(),
});

export const messages = createTable('messages', {
  id: serial('id').primaryKey(),
  user_id: varchar("user_id", { length: 256 }).notNull().references(() => users.id),
  body: text('body').notNull(),
  attachments: varchar('attachments', { length: 256 }).array(),
});

/*
export const function_packs = createTable('function_packs', {
  id: serial('id').primaryKey(),
  function_id: serial('function_id').notNull().references(() => functions.id),
  name: varchar('name', { length: 256 }).notNull(),
  description: text('description').notNull(),
});

export const functions = createTable('functions', {
  id: serial('id').primaryKey(),
  name: varchar('name', { length: 256 }).notNull(),
  description: text('description').notNull(),
  documentation: varchar('queries', { length: 512 }).array(),
  queries: varchar('queries', { length: 256 }).array(),
});

export const functions_vdb = createTable(
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
*/