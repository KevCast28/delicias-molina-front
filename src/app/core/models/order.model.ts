export type OrderType = 'STANDARD' | 'CUSTOM';

export type OrderStatus =
| 'PENDING'
| 'QUOTED'
| 'ACCEPTED'
| 'CANCELLED'
| 'DELIVERED';

export interface OrderItem {
  productId: number;
  productName: string;
  quantity: number;
  unitPrice: number;
  subtotal: number;
}

export interface Order {
  id: number;
  clientName: string;
  telephone: string;
  orderType: OrderType;
  flavor: string | null;
  peopleQuantity: number | null;
  imageReference: string | null;
  comments: string | null;
  customQuotedPrice: number | null;
  total: number | null;
  deliveryDate: string;
  orderStatus: OrderStatus;
  items: OrderItem[];
}

export interface OrderItemRequest {
  productId: number;
  quantity: number;
}

export interface OrderRequest {
  clientName: string;
  telephone: string;
  orderType: OrderType;
  deliveryDate: string;
  comments?: string | null;
  items: OrderItemRequest[];

  flavor?: string | null;
  peopleQuantity?: number | null;
  imageReference?: string | null;
}
