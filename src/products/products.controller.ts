import { APIGatewayProxyEventV2, APIGatewayProxyResultV2 } from 'aws-lambda';
import { getProducts } from './products.service';

export const listProducts = async (_event: APIGatewayProxyEventV2): Promise<APIGatewayProxyResultV2> => {
  const data = getProducts();

  return {
    statusCode: 200,
    body: JSON.stringify(data),
  };
};
