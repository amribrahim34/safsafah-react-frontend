export type UIOrderStatus = 'In Progress' | 'Shipped' | 'Delivered' | 'Canceled' | 'Returned';

export type UIStage = 'Placed' | 'Confirmed' | 'Shipped' | 'Delivered' | 'Canceled';

export interface UIOrderItem {
  id: number;
  name: { en: string; ar: string };
  variant: string;
  qty: number;
  price: number;
  img: string;
  reviewed: boolean;
}

export interface UIReturnInfo {
  state: string;
  amount?: number;
}

export interface UIOrder {
  id: string;
  rawId: number;
  date: string;
  addrShort: string;
  payment: string;
  stages: UIStage[];
  eta: string | null;
  subtotal: number;
  shipping: number;
  discount: number;
  total: number;
  items: UIOrderItem[];
  status: UIOrderStatus;
  returnInfo: UIReturnInfo | null;
}

export interface TabCounts {
  all: number;
  progress: number;
  shipped: number;
  delivered: number;
  canceled: number;
}

export interface BrandConfig {
  primary: string;
  dark?: string;
  light?: string;
}
