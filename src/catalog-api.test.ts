import { describe, expect, it } from 'vitest';
import { isUuid, mapApiProduct } from './catalog-api';

describe('adaptateur API du catalogue', () => {
  it('valide les identifiants UUID avant de demander une fiche distante', () => {
    expect(isUuid('550e8400-e29b-41d4-a716-446655440000')).toBe(true);
    expect(isUuid('iphone-15')).toBe(false);
  });

  it('convertit les lignes API vers le modèle de la boutique', () => {
    const product = mapApiProduct({
      id: '550e8400-e29b-41d4-a716-446655440000',
      name: 'Laptop CTRL',
      description: null,
      brand: 'CTRL-TECH',
      category: 'Ordinateurs',
      price: '1299.00',
      currency: 'USD',
      imageUrl: null,
      isFeatured: true,
    });
    expect(product.price).toBe(1299);
    expect(product.featured).toBe(true);
    expect(product.description).toContain('compléter');
    expect(product.image).toContain('images.unsplash.com');
  });

  it('remplace un prix invalide par une valeur non exploitable', () => {
    const product = mapApiProduct({
      id: '550e8400-e29b-41d4-a716-446655440000',
      name: 'Produit',
      description: null,
      brand: null,
      category: null,
      price: 'not-a-price',
      imageUrl: null,
    });
    expect(product.price).toBe(0);
  });
});
