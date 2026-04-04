import { APIGatewayProxyEventV2, APIGatewayProxyResultV2 } from 'aws-lambda';
import { getUsers } from './users.service';

export const listUsers = async (_event: APIGatewayProxyEventV2): Promise<APIGatewayProxyResultV2> => {
  const data = getUsers();

  return {
    statusCode: 200,
    body: JSON.stringify(data),
  };
};
