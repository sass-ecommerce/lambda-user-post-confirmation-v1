import { EventBridgeEvent } from 'aws-lambda';

export interface ProductCreatedDetail {
  id: string;
  tenantId: string;
  categoryId: string;
  name: string;
  basePrice: number;
  isActive: boolean;
}

export interface ProductImage {
  s3Key: string;
  filename: string;
}

export interface ProductImageDetail {
  id: string;
  tenantId: string;
  images: ProductImage[];
}

export type ProductEvent =
  | EventBridgeEvent<'product.created', ProductCreatedDetail>
  | EventBridgeEvent<'product.image', ProductImageDetail>;
