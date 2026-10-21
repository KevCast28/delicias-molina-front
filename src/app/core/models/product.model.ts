export interface Product {
  id: number;
  productName: string;
  description: string;
  basePrice: number;
  imageUrl: string;
  categoryName: string;
  offerTitle: string | null;
}

export interface ProductRequest {
  productName: string;
  description: string;
  basePrice: number;
  imageUrl: string;
  categoryId: number;
  offerId: number | null;
}
