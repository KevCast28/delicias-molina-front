export interface Offer {
  id: number;
  offerTitle: string;
  decription: string;
  discountPercentage: number;
  startDate: string;
  endDate: string;
  isActive: boolean;
}

export interface OfferRequest {
  offerTitle: string;
  description: string;
  discountPercentage: number;
  startDate: string;
  endDate: string;
  isActive: boolean;
}
