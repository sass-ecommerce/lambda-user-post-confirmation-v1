import { EventBridgeEvent } from 'aws-lambda';

export interface CategoryAncestor {
  id: string;
  parentId: string | null;
  name: string;
  slug: string;
}

export interface ProductCreatedDetail {
  productId: string;
  tenantId: string;
  categoryId: string;
  category: CategoryAncestor[];
  name: string;
  basePrice: number;
  isActive: boolean;
  attributes: Record<string, string>;
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
