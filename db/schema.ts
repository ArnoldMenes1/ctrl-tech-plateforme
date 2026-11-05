import { boolean, check, index, integer, jsonb, numeric, pgTable, text, timestamp, uniqueIndex, uuid, varchar, pgEnum, type AnyPgColumn } from 'drizzle-orm/pg-core';
import { sql } from 'drizzle-orm';

export const productStatus = pgEnum('product_status', ['draft', 'published', 'archived']);
export const inventoryMovementType = pgEnum('inventory_movement_type', ['receipt', 'sale', 'reservation', 'release', 'adjustment', 'return']);

export const brands = pgTable('brands', {
  id: uuid('id').defaultRandom().primaryKey(),
  name: varchar('name', { length: 120 }).notNull(),
  slug: varchar('slug', { length: 140 }).notNull(),
  createdAt: timestamp('created_at', { withTimezone: true }).defaultNow().notNull(),
}, (table) => [uniqueIndex('brands_slug_uq').on(table.slug)]);

export const categories = pgTable('categories', {
  id: uuid('id').defaultRandom().primaryKey(),
  parentId: uuid('parent_id').references((): AnyPgColumn => categories.id, { onDelete: 'set null' }),
  name: varchar('name', { length: 120 }).notNull(),
  slug: varchar('slug', { length: 140 }).notNull(),
  description: text('description'),
  sortOrder: integer('sort_order').default(0).notNull(),
  isActive: boolean('is_active').default(true).notNull(),
  createdAt: timestamp('created_at', { withTimezone: true }).defaultNow().notNull(),
}, (table) => [uniqueIndex('categories_slug_uq').on(table.slug), index('categories_parent_idx').on(table.parentId)]);

export const products = pgTable('products', {
  id: uuid('id').defaultRandom().primaryKey(),
  brandId: uuid('brand_id').references(() => brands.id, { onDelete: 'set null' }),
  categoryId: uuid('category_id').references(() => categories.id, { onDelete: 'set null' }),
  name: varchar('name', { length: 220 }).notNull(),
  slug: varchar('slug', { length: 240 }).notNull(),
  description: text('description'),
  status: productStatus('status').default('draft').notNull(),
  isFeatured: boolean('is_featured').default(false).notNull(),
  createdAt: timestamp('created_at', { withTimezone: true }).defaultNow().notNull(),
  updatedAt: timestamp('updated_at', { withTimezone: true }).defaultNow().notNull(),
}, (table) => [
  uniqueIndex('products_slug_uq').on(table.slug),
  index('products_status_idx').on(table.status),
  index('products_category_idx').on(table.categoryId),
  index('products_brand_idx').on(table.brandId),
]);

export const productVariants = pgTable('product_variants', {
  id: uuid('id').defaultRandom().primaryKey(),
  productId: uuid('product_id').notNull().references(() => products.id, { onDelete: 'cascade' }),
  sku: varchar('sku', { length: 80 }).notNull(),
  label: varchar('label', { length: 180 }),
  price: numeric('price', { precision: 12, scale: 2 }).notNull(),
  currency: varchar('currency', { length: 3 }).default('USD').notNull(),
  attributes: jsonb('attributes').$type<Record<string, string>>().default({}).notNull(),
  isActive: boolean('is_active').default(true).notNull(),
  createdAt: timestamp('created_at', { withTimezone: true }).defaultNow().notNull(),
}, (table) => [
  uniqueIndex('product_variants_sku_uq').on(table.sku),
  index('product_variants_product_idx').on(table.productId),
  check('product_variants_price_nonnegative', sql`${table.price} >= 0`),
]);

export const productImages = pgTable('product_images', {
  id: uuid('id').defaultRandom().primaryKey(),
  productId: uuid('product_id').notNull().references(() => products.id, { onDelete: 'cascade' }),
  variantId: uuid('variant_id').references(() => productVariants.id, { onDelete: 'cascade' }),
  url: text('url').notNull(),
  altText: varchar('alt_text', { length: 240 }),
  position: integer('position').default(0).notNull(),
  isPrimary: boolean('is_primary').default(false).notNull(),
  createdAt: timestamp('created_at', { withTimezone: true }).defaultNow().notNull(),
}, (table) => [index('product_images_product_idx').on(table.productId)]);

export const inventoryItems = pgTable('inventory_items', {
  id: uuid('id').defaultRandom().primaryKey(),
  variantId: uuid('variant_id').notNull().references(() => productVariants.id, { onDelete: 'cascade' }),
  quantityOnHand: integer('quantity_on_hand').default(0).notNull(),
  quantityReserved: integer('quantity_reserved').default(0).notNull(),
  lowStockThreshold: integer('low_stock_threshold').default(1).notNull(),
  updatedAt: timestamp('updated_at', { withTimezone: true }).defaultNow().notNull(),
}, (table) => [
  uniqueIndex('inventory_items_variant_uq').on(table.variantId),
  check('inventory_on_hand_nonnegative', sql`${table.quantityOnHand} >= 0`),
  check('inventory_reserved_nonnegative', sql`${table.quantityReserved} >= 0`),
  check('inventory_reserved_lte_on_hand', sql`${table.quantityReserved} <= ${table.quantityOnHand}`),
]);

export const inventoryMovements = pgTable('inventory_movements', {
  id: uuid('id').defaultRandom().primaryKey(),
  inventoryItemId: uuid('inventory_item_id').notNull().references(() => inventoryItems.id, { onDelete: 'cascade' }),
  type: inventoryMovementType('type').notNull(),
  quantityDelta: integer('quantity_delta').notNull(),
  note: text('note'),
  actorClerkId: varchar('actor_clerk_id', { length: 160 }),
  createdAt: timestamp('created_at', { withTimezone: true }).defaultNow().notNull(),
}, (table) => [index('inventory_movements_item_created_idx').on(table.inventoryItemId, table.createdAt)]);

export type Product = typeof products.$inferSelect;
export type NewProduct = typeof products.$inferInsert;
