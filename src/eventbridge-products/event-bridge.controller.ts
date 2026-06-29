import { DynamoDBClient } from '@aws-sdk/client-dynamodb';
import {
  DynamoDBDocumentClient,
  GetCommand,
  PutCommand,
  UpdateCommand,
} from '@aws-sdk/lib-dynamodb';
import {
  ProductCreatedDetail,
  ProductEvent,
  ProductImage,
  ProductImageDetail,
} from './event-bridge.types';

const client = new DynamoDBClient({ region: process.env.REGION });
const dynamo = DynamoDBDocumentClient.from(client);

const TABLE_NAME = process.env.DYNAMODB_TABLE_PRODUCTS!;

async function handleProductCreated(detail: ProductCreatedDetail): Promise<void> {
  const { id, tenantId, categoryId, name, basePrice, isActive } = detail;

  await dynamo.send(
    new PutCommand({
      TableName: TABLE_NAME,
      Item: { id, tenantId, categoryId, name, basePrice, isActive, images: [] },
    }),
  );
}

async function handleProductImage(detail: ProductImageDetail): Promise<void> {
  console.log(JSON.stringify({ message: 'handleProductImage', detail }));
  const { tenantId, images, productId } = detail;

  const { Item } = await dynamo.send(
    new GetCommand({
      TableName: TABLE_NAME,
      Key: { tenantId, id: productId },
    }),
  );

  if (!Item) {
    console.log(JSON.stringify({ message: 'product not found', tenantId, productId }));
    return;
  }

  const existingImages: ProductImage[] = Item.images ?? [];
  const mergedImages = [...existingImages, ...images];

  await dynamo.send(
    new UpdateCommand({
      TableName: TABLE_NAME,
      Key: { tenantId, id: productId },
      UpdateExpression: 'SET images = :images',
      ExpressionAttributeValues: { ':images': mergedImages },
    }),
  );
}

export const eventBridgeProducts = async (event: ProductEvent): Promise<void> => {
  console.log(JSON.stringify(event, null, 2));

  switch (event['detail-type']) {
    case 'product.created':
      await handleProductCreated(event.detail);
      break;
    case 'product.image.added':
      await handleProductImage(event.detail);
      break;
  }
};
