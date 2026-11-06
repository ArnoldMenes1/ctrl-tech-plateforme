import { and, eq } from 'drizzle-orm';
import { neon } from '@neondatabase/serverless';
import { drizzle } from 'drizzle-orm/neon-http';
import { brands, categories, products, productVariants, productImages } from '../db/schema.js';

export default async function handler(request: Request) {
  if (request.method !== 'GET') {
    return Response.json({ error: 'Method not allowed' }, { status: 405, headers: { Allow: 'GET' } });
  }

  const databaseUrl = process.env.DATABASE_URL;
  if (!databaseUrl) {
    return Response.json({ error: 'Catalogue API is not configured.' }, { status: 503 });
  }

  try {
    const sql = neon(databaseUrl);
    const db = drizzle(sql);
    const rows = await db
      .select({
        id: products.id,
        name: products.name,
        slug: products.slug,
        description: products.description,
        isFeatured: products.isFeatured,
        brand: brands.name,
        category: categories.name,
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
      .where(eq(products.status, 'published'))
      .limit(100);

    return Response.json({ data: rows });
  } catch {
    return Response.json({ error: 'Unable to load the catalogue.' }, { status: 500 });
  }
}