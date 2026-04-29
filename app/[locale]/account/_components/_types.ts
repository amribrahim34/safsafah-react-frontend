export interface BrandConfig {
  primary: string;
  dark: string;
  light: string;
}

export interface OverviewHeaderTranslations {
  greeting: string;
  orders: string;
  wishlist: string;
  rewards: string;
  upload: string;
}

export interface OrdersListTranslations {
  title: string;
  loading: string;
  error: string;
  empty: string;
  viewAll: string;
  statuses: Record<string, string>;
}

export interface WishlistGridTranslations {
  title: string;
  empty: string;
}

export interface BeautyProfileTranslations {
  title: string;
  skinType: string;
  concerns: string;
  preferred: string;
  avoided: string;
  allergies: string;
  cta: string;
  empty: string;
}

export interface AddressesTranslations {
  title: string;
  loading: string;
  error: string;
  empty: string;
  manage: string;
  fallback: string;
}

export interface RewardsTranslations {
  title: string;
  points: string;
  balance: string;
  toNext: string;
  redeem: string;
  rate: string;
}

export interface SettingsTranslations {
  title: string;
  notifications: string;
  editInfo: string;
  logout: string;
}

export interface SupportTranslations {
  title: string;
  whatsapp: string;
  customerService: string;
}

export interface RecentlyViewedTranslations {
  title: string;
}
