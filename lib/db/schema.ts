import {
  pgTable,
  serial,
  varchar,
  text,
  timestamp,
  json,
} from 'drizzle-orm/pg-core';

// Tabela para solicitações de contato geral
export const contactRequests = pgTable('contact_requests', {
  id: serial('id').primaryKey(),
  name: varchar('name', { length: 100 }).notNull(),
  email: varchar('email', { length: 255 }).notNull(),
  message: text('message').notNull(),
  createdAt: timestamp('created_at').notNull().defaultNow(),
  status: varchar('status', { length: 20 }).notNull().default('pending'),
});

// Tabela para solicitações de orçamento mais detalhadas
export const quoteRequests = pgTable('quote_requests', {
  id: serial('id').primaryKey(),
  name: varchar('name', { length: 100 }).notNull(),
  email: varchar('email', { length: 255 }).notNull(),
  phone: varchar('phone', { length: 20 }),
  websiteType: varchar('website_type', { length: 50 }),
  features: json('features').$type<string[]>(),
  budget: varchar('budget', { length: 50 }),
  timeline: varchar('timeline', { length: 50 }),
  message: text('message').notNull(),
  createdAt: timestamp('created_at').notNull().defaultNow(),
  status: varchar('status', { length: 20 }).notNull().default('new'),
  notificationSent: varchar('notification_sent', { length: 20 }).default('pending'),
});

export type ContactRequest = typeof contactRequests.$inferSelect;
export type NewContactRequest = typeof contactRequests.$inferInsert;

export type QuoteRequest = typeof quoteRequests.$inferSelect;
export type NewQuoteRequest = typeof quoteRequests.$inferInsert;
