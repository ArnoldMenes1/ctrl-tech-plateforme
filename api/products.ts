import { and, count, eq, ilike, or } from 'drizzle-orm';
import { z } from 'zod';
import { createDatabase } from '../db/client.js';
import { brands, categories, products, productVariants, productImages } from '../db/schema.js';

const querySchema = z.object({
  id: z.string().uuid().optional(),
  q: z.string().trim().max(100).optional(),
  category: z.string().trim().min(1).max(140).optional(),
  featured: z.enum(['true', 'false']).optional(),
  limit: z.coerce.number().int().min(1).max(50).default(24),
  offset: z.coerce.number().int().min(0).max(10_000).default(0),
});

function badRequest(message: string) {
  return Response.json({ error: message }, { status: 400 });
}

export default async function handler(request: Request) {
  if (request.method !== 'GET') {
    return Response.json({ error: 'Method not allowed.' }, { status: 405, headers: { Allow: 'GET' } });
  }

  const url = new URL(request.url);
  const parsed = querySchema.safeParse(Object.fromEntries(url.searchParams));
  if (!parsed.success) return badRequest('Invalid catalogue filters.');

  try {
    const { db } = createDatabase();
    const { id, q, category, featured, limit, offset } = parsed.data;
    const filters = [eq(products.status, 'published'), eq(productVariants.isActive, true)];

    if (id) filters.push(eq(products.id, id));
    if (category) filters.push(eq(categories.name, category));
    if (featured !== undefined) filters.push(eq(products.isFeatured, featured === 'true'));
    if (q) {
      const pattern = `%${q.replace(/[\\%_]/g, '\\$&')}%`;
      filters.push(or(
        ilike(products.name, pattern),
        ilike(products.description, pattern),
        ilike(brands.name, pattern),
        ilike(productVariants.sku, pattern),
      )!);
    }

    const where = and(...filters);
    const [rows, totals] = await Promise.all([
      db.select({
        id: products.id,
        name: products.name,
        slug: products.slug,
        description: products.description,
        isFeatured: products.isFeatured,
        brand: brands.name,
        category: categories.name,
        variantId: productVariants.id,
        sku: productVariants.sku,
        price: productVariants.price,
        currency: productVariants.currency,
        imageUrl: productImages.url,
        imageAlt: productImages.altText,
      })
        .from(products)
        .leftJoin(brands, eq(brands.id, products.brandId))
        .leftJoin(categories, eq(categories.id, products.categoryId))
        .innerJoin(productVariants, and(eq(productVariants.productId, products.id), eq(productVariants.isActive, true)))
        .leftJoin(productImages, and(eq(productImages.productId, products.id), eq(productImages.isPrimary, true)))
        .where(where)
        .orderBy(products.name, productVariants.sku)
        .limit(limit)
        .offset(offset),
      db.select({ total: count() })
        .from(products)
        .leftJoin(brands, eq(brands.id, products.brandId))
        .leftJoin(categories, eq(categories.id, products.categoryId))
        .innerJoin(productVariants, and(eq(productVariants.productId, products.id), eq(productVariants.isActive, true)))
        .where(where),
    ]);

    return Response.json({
      data: rows,
      pagination: { limit, offset, total: totals[0]?.total ?? 0, hasMore: offset + rows.length < (totals[0]?.total ?? 0) },
    }, { headers: { 'Cache-Control': 'public, s-maxage=30, stale-while-revalidate=60' } });
  } catch (error) {
    if (error instanceof Error && error.name === 'DatabaseConfigurationError') {
      return Response.json({ error: 'Catalogue API is not configured.' }, { status: 503 });
    }
    return Response.json({ error: 'Unable to load the catalogue.' }, { status: 500 });
  }
}
