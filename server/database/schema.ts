import { relations } from 'drizzle-orm'
import { integer, sqliteTable, text } from 'drizzle-orm/sqlite-core'

export const materials = sqliteTable('materials', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  name: text('name').notNull(),
  price: integer('price').notNull(),
  createdAt: integer('created_at', { mode: 'timestamp' }).notNull(),
})

export const transactions = sqliteTable('transactions', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  materialId: integer('material_id').references(() => materials.id),
  year: integer('year').notNull(),
  month: integer('month').notNull(),
  startingBalance: integer('starting_balance').notNull(),
  endingBalance: integer('ending_balance').notNull(),
  receiptsAccountable: integer('receipts_accountable').notNull(),
  receiptsWarehouse: integer('receipts_warehouse').notNull(),
  issuesProduction: integer('issues_production').notNull(),
  createdAt: integer('created_at', { mode: 'timestamp' }).notNull(),
})

export const materialsRelation = relations(materials, ({ many }) => ({
  transactions: many(transactions),
}))

export const transactionsRelation = relations(transactions, ({ one }) => ({
  material: one(materials, {
    fields: [transactions.materialId],
    references: [materials.id],
  }),
}))
