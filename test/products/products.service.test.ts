
import { getProducts } from '../../src/products/products.service';

describe('getProducts', () => {
  it('returns a list of products', () => {
    const result = getProducts();
    expect(Array.isArray(result)).toBe(true);
    expect(result.length).toBeGreaterThan(0);
  });

  it('each product has id, name, and price', () => {
    const result = getProducts();
    for (const product of result) {
      expect(product).toHaveProperty('id');
      expect(product).toHaveProperty('name');
      expect(product).toHaveProperty('price');
    }
  });
});
