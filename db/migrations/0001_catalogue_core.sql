DO $$ BEGIN
  CREATE TYPE product_status AS ENUM ('draft', 'published', 'archived');
EXCEPTION WHEN duplicate_object THEN NULL;
END $$;

--> statement-breakpoint
DO $$ BEGIN
  CREATE TYPE inventory_movement_type AS ENUM ('receipt', 'sale', 'reservation', 'release', 'adjustment', 'return');
EXCEPTION WHEN duplicate_object THEN NULL;
END $$;

--> statement-breakpoint
CREATE TABLE IF NOT EXISTS brands (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name varchar(120) NOT NULL,
  slug varchar(140) NOT NULL,
  created_at timestamptz NOT NULL DEFAULT now()
);
--> statement-breakpoint
CREATE UNIQUE INDEX IF NOT EXISTS brands_slug_uq ON brands(slug);

--> statement-breakpoint
CREATE TABLE IF NOT EXISTS categories (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  parent_id uuid REFERENCES categories(id) ON DELETE SET NULL,
  name varchar(120) NOT NULL,
  slug varchar(140) NOT NULL,
  description text,
  sort_order integer NOT NULL DEFAULT 0,
  is_active boolean NOT NULL DEFAULT true,
  created_at timestamptz NOT NULL DEFAULT now()
);
--> statement-breakpoint
CREATE UNIQUE INDEX IF NOT EXISTS categories_slug_uq ON categories(slug);
--> statement-breakpoint
CREATE INDEX IF NOT EXISTS categories_parent_idx ON categories(parent_id);

--> statement-breakpoint
CREATE TABLE IF NOT EXISTS products (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  brand_id uuid REFERENCES brands(id) ON DELETE SET NULL,
  category_id uuid REFERENCES categories(id) ON DELETE SET NULL,
  name varchar(220) NOT NULL,
  slug varchar(240) NOT NULL,
  description text,
  status product_status NOT NULL DEFAULT 'draft',
  is_featured boolean NOT NULL DEFAULT false,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);
--> statement-breakpoint
CREATE UNIQUE INDEX IF NOT EXISTS products_slug_uq ON products(slug);
--> statement-breakpoint
CREATE INDEX IF NOT EXISTS products_status_idx ON products(status);
--> statement-breakpoint
CREATE INDEX IF NOT EXISTS products_category_idx ON products(category_id);
--> statement-breakpoint
CREATE INDEX IF NOT EXISTS products_brand_idx ON products(brand_id);

--> statement-breakpoint
CREATE TABLE IF NOT EXISTS product_variants (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  product_id uuid NOT NULL REFERENCES products(id) ON DELETE CASCADE,
  sku varchar(80) NOT NULL,
  label varchar(180),
  price numeric(12,2) NOT NULL CHECK (price >= 0),
  currency varchar(3) NOT NULL DEFAULT 'USD',
  attributes jsonb NOT NULL DEFAULT '{}'::jsonb,
  is_active boolean NOT NULL DEFAULT true,
  created_at timestamptz NOT NULL DEFAULT now()
);
--> statement-breakpoint
CREATE UNIQUE INDEX IF NOT EXISTS product_variants_sku_uq ON product_variants(sku);
--> statement-breakpoint
CREATE INDEX IF NOT EXISTS product_variants_product_idx ON product_variants(product_id);

--> statement-breakpoint
CREATE TABLE IF NOT EXISTS product_images (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  product_id uuid NOT NULL REFERENCES products(id) ON DELETE CASCADE,
  variant_id uuid REFERENCES product_variants(id) ON DELETE CASCADE,
  url text NOT NULL,
  alt_text varchar(240),
  position integer NOT NULL DEFAULT 0,
  is_primary boolean NOT NULL DEFAULT false,
  created_at timestamptz NOT NULL DEFAULT now()
);
--> statement-breakpoint
CREATE INDEX IF NOT EXISTS product_images_product_idx ON product_images(product_id);

--> statement-breakpoint
CREATE TABLE IF NOT EXISTS inventory_items (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  variant_id uuid NOT NULL REFERENCES product_variants(id) ON DELETE CASCADE,
  quantity_on_hand integer NOT NULL DEFAULT 0 CHECK (quantity_on_hand >= 0),
  quantity_reserved integer NOT NULL DEFAULT 0 CHECK (quantity_reserved >= 0),
  low_stock_threshold integer NOT NULL DEFAULT 1,
  updated_at timestamptz NOT NULL DEFAULT now(),
  CONSTRAINT inventory_reserved_lte_on_hand CHECK (quantity_reserved <= quantity_on_hand)
);
--> statement-breakpoint
CREATE UNIQUE INDEX IF NOT EXISTS inventory_items_variant_uq ON inventory_items(variant_id);

--> statement-breakpoint
CREATE TABLE IF NOT EXISTS inventory_movements (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  inventory_item_id uuid NOT NULL REFERENCES inventory_items(id) ON DELETE CASCADE,
  type inventory_movement_type NOT NULL,
  quantity_delta integer NOT NULL,
  note text,
  actor_clerk_id varchar(160),
  created_at timestamptz NOT NULL DEFAULT now()
);
--> statement-breakpoint
CREATE INDEX IF NOT EXISTS inventory_movements_item_created_idx ON inventory_movements(inventory_item_id, created_at);
