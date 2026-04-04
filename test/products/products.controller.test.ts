
import { APIGatewayProxyEventV2 } from 'aws-lambda';
import { listProducts } from '../../src/products/products.controller';

const mockEvent = {} as APIGatewayProxyEventV2;

describe('listProducts controller', () => {
  it('returns status 200', async () => {
    const result = await listProducts(mockEvent);
    expect(result).toMatchObject({ statusCode: 200 });
  });

  it('body contains an array of products', async () => {
    const result = await listProducts(mockEvent);
    const body = JSON.parse((result as { body: string }).body);
    expect(Array.isArray(body)).toBe(true);
  });
});
