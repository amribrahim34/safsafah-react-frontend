declare global {
  interface Window {
    fbq: (...args: unknown[]) => void;
    _fbq: unknown;
  }
}

type FbProduct = {
  id: number | string;
  nameEn?: string;
  nameAr?: string;
  price?: number;
};

const fbq = (...args: unknown[]) => {
  if (typeof window !== 'undefined' && typeof window.fbq === 'function') {
    window.fbq(...args);
  }
};

export const pageview = () => fbq('track', 'PageView');

export const viewContent = (product: FbProduct) =>
  fbq('track', 'ViewContent', {
    content_ids: [String(product.id)],
    content_type: 'product',
    content_name: product.nameEn || product.nameAr || '',
    value: product.price ?? 0,
    currency: 'EGP',
  });

export const addToCart = (product: FbProduct, quantity = 1) =>
  fbq('track', 'AddToCart', {
    content_ids: [String(product.id)],
    content_type: 'product',
    content_name: product.nameEn || product.nameAr || '',
    value: (product.price ?? 0) * quantity,
    currency: 'EGP',
  });

export const initiateCheckout = (value: number, numItems: number) =>
  fbq('track', 'InitiateCheckout', {
    value,
    num_items: numItems,
    currency: 'EGP',
  });

export const purchase = (orderId: number | string | undefined, value: number) =>
  fbq('track', 'Purchase', {
    value,
    currency: 'EGP',
    order_id: orderId,
  });

export const completeRegistration = () => fbq('track', 'CompleteRegistration');

export const search = (searchString: string) =>
  fbq('track', 'Search', { search_string: searchString });

export const addToWishlist = (product: FbProduct) =>
  fbq('track', 'AddToWishlist', {
    content_ids: [String(product.id)],
    content_type: 'product',
    content_name: product.nameEn || product.nameAr || '',
    value: product.price ?? 0,
    currency: 'EGP',
  });
