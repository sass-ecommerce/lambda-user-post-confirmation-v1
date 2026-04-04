
import { APIGatewayProxyEventV2 } from 'aws-lambda';
import { listUsers } from '../../src/users/users.controller';

const mockEvent = {} as APIGatewayProxyEventV2;

describe('listUsers controller', () => {
  it('returns status 200', async () => {
    const result = await listUsers(mockEvent);
    expect(result).toMatchObject({ statusCode: 200 });
  });

  it('body contains an array of users', async () => {
    const result = await listUsers(mockEvent);
    const body = JSON.parse((result as { body: string }).body);
    expect(Array.isArray(body)).toBe(true);
  });
});
