import { categories, type Product } from './catalog';

type ApiProduct = {
  id: string;
  name: string;
  description: string | null;
  brand: string | null;
  category: string | null;
  price: string | number;
  currency?: string;
  imageUrl: string | null;
  imageAlt?: string | null;
  isFeatured?: boolean;
};

type CataloguePayload = { data?: ApiProduct[] };

export function isUuid(value: string): boolean {
  return /^[0-9a-f]{8}-[0-9a-f]{4}-[1-8][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(value);
}

export function mapApiProduct(row: ApiProduct): Product {
  const category = row.category || 'Accessoires';
  const fallbackImage = categories.find((item) => item.name === category)?.image ?? categories[0].image;
  const price = Number(row.price);

  return {
    id: row.id,
    name: row.name,
    brand: row.brand || 'CTRL-TECH',
    category,
    price: Number.isFinite(price) && price >= 0 ? price : 0,
    description: row.description || 'Fiche produit à compléter.',
    specs: [],
    image: row.imageUrl || fallbackImage,
    featured: Boolean(row.isFeatured),
  };
}

export async function fetchCatalogueProducts(options: {
  q?: string;
  category?: string;
  id?: string;
  signal?: AbortSignal;
} = {}): Promise<Product[]> {
  const params = new URLSearchParams({ limit: options.id ? '1' : '50' });
  if (options.q) params.set('q', options.q);
  if (options.category) params.set('category', options.category);
  if (options.id) params.set('id', options.id);

  const response = await fetch(`/api/products?${params.toString()}`, { signal: options.signal });
  if (!response.ok) throw new Error(`Catalogue API unavailable (${response.status})`);

  const payload = await response.json() as CataloguePayload;
  if (!Array.isArray(payload.data)) throw new Error('Invalid catalogue API response');

  const unique = new Map<string, Product>();
  for (const row of payload.data) {
    if (!row || typeof row.id !== 'string' || typeof row.name !== 'string') continue;
    if (!unique.has(row.id)) unique.set(row.id, mapApiProduct(row));
  }
  return [...unique.values()];
}
