import { EventBridgeEvent } from 'aws-lambda';
import { DynamoDBClient } from '@aws-sdk/client-dynamodb';
import { DynamoDBDocumentClient, PutCommand } from '@aws-sdk/lib-dynamodb';

interface ProductCreatedDetail {
  id: string;
  tenantId: string;
  categoryId: string;
  name: string;
  basePrice: number;
  isActive: boolean;
}

const client = new DynamoDBClient({ region: process.env.REGION });
const dynamo = DynamoDBDocumentClient.from(client);

export const eventBridgeProducts = async (
  event: EventBridgeEvent<'product.created', ProductCreatedDetail>,
): Promise<void> => {
  console.log(JSON.stringify(event, null, 2));

  const { id, tenantId, categoryId, name, basePrice, isActive } = event.detail;

  await dynamo.send(
    new PutCommand({
      TableName: process.env.DYNAMODB_TABLE_PRODUCTS,
      Item: { id, tenantId, categoryId, name, basePrice, isActive },
    }),
  );
};
