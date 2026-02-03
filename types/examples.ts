// Example usage of TypeScript types
// This file demonstrates how to use the defined types in your application

import {
  Product,
  User,
  Order,
  CartItem,
  Address,
  Brand,
  LocalizedText,
  OrderStatus,
  UserTier
} from './index';

// Example: Component Props
export interface ProductCardProps {
  product: Product;
  onAddToCart: (product: Product) => void;
  onViewDetails: (productId: number) => void;
}

export interface UserProfileProps {
  user: User;
  onUpdateProfile: (updates: Partial<User>) => void;
}

export interface OrderCardProps {
  order: Order;
  onViewOrder: (orderId: string) => void;
  onTrackOrder: (orderId: string) => void;
}

// Example: API Functions
export const getProducts = async (filters: Partial<Product>): Promise<Product[]> => {
  // API implementation
  return [];
};

export const createUser = async (userData: Omit<User, 'id' | 'createdAt' | 'updatedAt'>): Promise<User> => {
  // API implementation
  return {} as User;
};

export const createOrder = async (orderData: Omit<Order, 'id' | 'createdAt' | 'updatedAt'>): Promise<Order> => {
  // API implementation
  return {} as Order;
};

// Example: State Management
export interface AppState {
  user: User | null;
  cart: CartItem[];
  orders: Order[];
  loading: boolean;
  error: string | null;
}

// Example: Form Validation
export const validateUser = (user: Partial<User>): string[] => {
  const errors: string[] = [];

  if (!user.name || user.name.trim().length < 2) {
    errors.push('Name must be at least 2 characters');
  }

  if (!user.email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(user.email)) {
    errors.push('Valid email is required');
  }

  if (!user.phone || !/^(01|\+201)[0-9]{8,10}$/.test(user.phone)) {
    errors.push('Valid Egyptian mobile number is required');
  }

  return errors;
};

// Example: Type Guards
export const isUser = (obj: any): obj is User => {
  return obj &&
    typeof obj.id === 'string' &&
    typeof obj.name === 'string' &&
    typeof obj.email === 'string' &&
    typeof obj.phone === 'string' &&
    ['Bronze', 'Silver', 'Gold', 'Platinum'].includes(obj.tier);
};

export const isProduct = (obj: any): obj is Product => {
  return obj &&
    typeof obj.id === 'number' &&
    typeof obj.brand === 'string' &&
    typeof obj.name === 'object' &&
    typeof obj.price === 'number';
};

// Example: Sample Data
export const sampleProduct: Product = {
  id: 1,
  brand: {
    id: 1,
    nameAr: "سوم باي مي",
    nameEn: "Some By Mi",
    logo: null
  },
  category: {
    id: 1,
    nameAr: "سيروم",
    nameEn: "Serums",
    image: null,
    parentId: null
  },
  nameAr: "سيروم ريتينول 2.5%",
  nameEn: "Retinol Serum 2.5%",
  price: 590,
  averageRating: 4.7,
  image: "/products/retinol-serum-1.jpg",
  images: [
    "/products/retinol-serum-1.jpg",
    "/products/retinol-serum-2.jpg"
  ],
  skinTypes: ["oily", "combination", "normal"],
  onSale: true,
  inStock: true,
  stock: 50,
  sku: "SBM-RET-001",
  descriptionAr: "سيروم ريتينول متقدم لمكافحة الشيخوخة وتجديد البشرة",
  descriptionEn: "Advanced retinol serum for anti-aging and skin renewal",
  usage: {
    en: "Apply 2-3 drops at night after cleansing",
    ar: "يُطبق 2-3 قطرات ليلاً بعد التنظيف"
  },
  ingredients: ["Retinol 2.5%", "Hyaluronic Acid", "Niacinamide"],
  createdAt: "2024-01-15T10:30:00Z",
  updatedAt: "2024-01-15T10:30:00Z"
};

export const sampleUser: User = {
  id: "user-123",
  name: "Salma Hassan",
  email: "salma@example.com",
  phone: "+201012345678",
  avatar: null,
  tier: "Silver",
  points: 880,
  nextTierAt: 1000,
  isEmailVerified: true,
  isPhoneVerified: true,
  isActive: true,
  createdAt: "2024-01-01T00:00:00Z",
  updatedAt: "2024-01-15T10:30:00Z",
  lastLoginAt: "2024-01-15T10:30:00Z"
};

export const sampleOrder: Order = {
  id: "order-123",
  userId: "user-123",
  orderNumber: "SFS-2024-001",
  status: "Placed",
  items: [
    {
      id: "item-1",
      productId: "prod-1",
      variantId: "var-1",
      variant: "50ml",
      quantity: 2,
      unitPrice: 590,
      totalPrice: 1180,
      img: "/products/retinol-serum.jpg",
      name: {
        en: "Retinol Serum",
        ar: "سيروم ريتينول"
      },
      brand: "some-by-mi",
      sku: "SBM-RET-001"
    }
  ],
  itemCount: 2,
  subtotal: 1180,
  discount: 0,
  shipping: 49,
  tax: 0,
  total: 1229,
  currency: "EGP",
  shippingAddress: {
    firstName: "Ahmed",
    lastName: "Hassan",
    phone: "+201012345678",
    email: "ahmed@example.com",
    city: "Cairo",
    district: "Zamalek",
    street: "26 July Street",
    building: "15",
    floor: "3",
    apt: "A"
  },
  payment: {
    id: "pay-1",
    orderId: "order-123",
    method: "card",
    status: "completed",
    amount: 1229,
    currency: "EGP",
    transactionId: "txn-123456",
    processedAt: "2024-01-15T10:35:00Z"
  },
  date: "2024-01-15T10:30:00Z",
  stages: ["Placed", "Confirmed"],
  createdAt: "2024-01-15T10:30:00Z",
  updatedAt: "2024-01-15T10:35:00Z"
};

// Example: Utility Functions
export const formatPrice = (price: number, currency: string = 'EGP'): string => {
  return new Intl.NumberFormat('ar-EG', {
    style: 'currency',
    currency: currency,
    maximumFractionDigits: 0,
  }).format(price);
};

export const getLocalizedText = (text: LocalizedText, language: 'ar' | 'en'): string => {
  return language === 'ar' ? text.ar : text.en;
};

export const getUserTierColor = (tier: UserTier): string => {
  const colors = {
    Bronze: '#CD7F32',
    Silver: '#C0C0C0',
    Gold: '#FFD700',
    Platinum: '#E5E4E2'
  };
  return colors[tier];
};

export const getOrderStatusColor = (status: OrderStatus): string => {
  const colors = {
    Placed: '#3B82F6',
    Confirmed: '#10B981',
    Processing: '#F59E0B',
    Shipped: '#8B5CF6',
    'Out for Delivery': '#06B6D4',
    Delivered: '#059669',
    Returned: '#EF4444',
    Canceled: '#6B7280',
    Refunded: '#DC2626'
  };
  return colors[status] || '#6B7280';
};
