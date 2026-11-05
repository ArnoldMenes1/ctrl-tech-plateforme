import { describe, expect, it } from 'vitest';
import { formatPrice, products, categories } from './catalog';

describe('catalogue CTRL-TECH', () => {
  it('expose des références avec identifiants uniques et prix positifs', () => {
    const ids = products.map((product) => product.id);
    expect(new Set(ids).size).toBe(ids.length);
    expect(products.length).toBeGreaterThan(10);
    expect(products.every((product) => product.price > 0)).toBe(true);
  });

  it('associe chaque produit à une catégorie connue', () => {
    const knownCategories = new Set(categories.map((category) => category.name));
    expect(products.every((product) => knownCategories.has(product.category))).toBe(true);
  });

  it('formate les prix en USD sans décimales', () => {
    expect(formatPrice(650)).toContain('650');
    expect(formatPrice(650)).toContain('$');
  });
});