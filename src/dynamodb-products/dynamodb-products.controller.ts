import { APIGatewayProxyEventV2, APIGatewayProxyResultV2 } from 'aws-lambda';
import { DynamoDBClient } from '@aws-sdk/client-dynamodb';
import { DynamoDBDocumentClient, GetCommand, QueryCommand } from '@aws-sdk/lib-dynamodb';

const client = new DynamoDBClient({ region: process.env.REGION });
const dynamo = DynamoDBDocumentClient.from(client);

const TABLE_NAME = process.env.DYNAMODB_TABLE_PRODUCTS!;

export const dynamodbProducts = async (
  event: APIGatewayProxyEventV2,
): Promise<APIGatewayProxyResultV2> => {
  console.log(JSON.stringify({ event }));
  const id = event.pathParameters?.id;
  const tenantId = event.queryStringParameters?.tenantId;

  console.log(JSON.stringify({ requestId: event.requestContext.requestId, id, tenantId }));

  if (!tenantId) {
    console.log(JSON.stringify({ requestId: event.requestContext.requestId, error: 'missing tenantId' }));
    return {
      statusCode: 400,
      body: JSON.stringify({ message: 'Provide tenantId as query parameter' }),
    };
  }

  if (id) {
    const result = await dynamo.send(
      new GetCommand({
        TableName: TABLE_NAME,
        Key: { tenantId, id },
      }),
    );

    if (!result.Item) {
      console.log(JSON.stringify({ requestId: event.requestContext.requestId, tenantId, id, found: false }));
      return {
        statusCode: 404,
        body: JSON.stringify({ message: 'Product not found' }),
      };
    }

    console.log(JSON.stringify({ requestId: event.requestContext.requestId, tenantId, id, found: true }));
    return { statusCode: 200, body: JSON.stringify(result.Item) };
  }

  const result = await dynamo.send(
    new QueryCommand({
      TableName: TABLE_NAME,
      KeyConditionExpression: 'tenantId = :tenantId',
      ExpressionAttributeValues: { ':tenantId': tenantId },
    }),
  );

  const count = result.Items?.length ?? 0;
  console.log(JSON.stringify({ requestId: event.requestContext.requestId, tenantId, count }));
  return { statusCode: 200, body: JSON.stringify(result.Items ?? []) };
};
