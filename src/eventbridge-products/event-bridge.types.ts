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
  id: string;
  s3Key: string;
  isPrimary: boolean;
  sortOrder: number;
}

export interface ProductImageDetail {
  tenantId: string;
  productId: string;
  images: ProductImage[];
}

export type ProductEvent =
  | EventBridgeEvent<'product.created', ProductCreatedDetail>
  | EventBridgeEvent<'product.image.added', ProductImageDetail>;
