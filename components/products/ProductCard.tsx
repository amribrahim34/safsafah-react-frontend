import { useState } from "react";
import { Star, Plus, Minus, Trash2, Sparkles, Heart } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { addToCart, updateCartItem, removeFromCart } from "@/store/slices/cartsSlice";
import { useParams } from "next/navigation";
import { getLocalizedPath } from "@/lib/locale-navigation";

interface ProductCardProps {
  id: number;
  slugAr?: string;
  slugEn?: string;
  nameAr: string;
  nameEn: string;
  brandId?: number;
  brandNameAr?: string;
  brandNameEn?: string;
  price: number;
  rating?: number;
  image: string;
  isRecommended?: boolean;
  isInWishlist?: boolean;
  brand: {
    primary: string;
    dark: string;
    light: string;
  };
}

export default function ProductCard({
  id,
  slugAr,
  slugEn,
  nameAr,
  nameEn,
  brandId,
  brandNameAr,
  brandNameEn,
  price,
  rating = 0,
  image,
  isRecommended = false,
  isInWishlist = false,
  brand
}: ProductCardProps) {
  const dispatch = useAppDispatch();
  const cart = useAppSelector((state) => state.cart.cart);
  const isLoading = useAppSelector((state) => state.cart.isLoading);
  const params = useParams();
  const locale = params?.locale as string | undefined;
  const lang = (locale === 'en' || locale === 'ar') ? locale : 'ar';

  const cartItem = cart?.items?.find(
    (item: { productId: number; id: number; quantity: number }) => item.productId === id
  );

  // null means "show cartItem.quantity"; non-null means user is actively typing
  const [pendingQuantity, setPendingQuantity] = useState<number | null>(null);
  const inputValue = pendingQuantity !== null ? pendingQuantity : (cartItem?.quantity ?? 1);

  const priceFmt = new Intl.NumberFormat(
    lang === "ar" ? "ar-EG" : "en-EG",
    { style: "currency", currency: "EGP", maximumFractionDigits: 0 }
  ).format(price);

  const productUrl = getLocalizedPath(`/product/${lang === 'ar' ? (slugAr ?? id) : (slugEn ?? id)}`, lang);

  const handleAddToCart = async () => {
    try {
      await dispatch(addToCart({ productId: id, quantity: 1 })).unwrap();
      setPendingQuantity(null);
    } catch (error) {
      console.error('Failed to add to cart:', error);
    }
  };

  const handleIncrement = async () => {
    if (!cartItem) return;
    const newQuantity = (cartItem.quantity || 0) + 1;
    try {
      await dispatch(updateCartItem({ itemId: cartItem.id, quantity: newQuantity })).unwrap();
      setPendingQuantity(null);
    } catch (error) {
      console.error('Failed to update cart:', error);
    }
  };

  const handleDelete = async () => {
    if (!cartItem) return;
    try {
      await dispatch(removeFromCart(cartItem.id)).unwrap();
      setPendingQuantity(null);
    } catch (error) {
      console.error('Failed to remove from cart:', error);
    }
  };

  const handleDecrement = async () => {
    if (!cartItem) return;
    if ((cartItem.quantity || 0) <= 1) {
      await handleDelete();
      return;
    }
    const newQuantity = (cartItem.quantity || 0) - 1;
    try {
      await dispatch(updateCartItem({ itemId: cartItem.id, quantity: newQuantity })).unwrap();
      setPendingQuantity(null);
    } catch (error) {
      console.error('Failed to update cart:', error);
    }
  };

  const handleQuantityChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value);
    if (isNaN(value) || value < 1) return;
    setPendingQuantity(value);
  };

  const handleQuantityBlur = async (e: React.FocusEvent<HTMLInputElement>) => {
    if (!cartItem) return;
    const value = parseInt(e.target.value);
    if (isNaN(value) || value < 1 || value === cartItem.quantity) {
      setPendingQuantity(null);
      return;
    }
    try {
      await dispatch(updateCartItem({ itemId: cartItem.id, quantity: value })).unwrap();
      setPendingQuantity(null);
    } catch (error) {
      console.error('Failed to update cart:', error);
      setPendingQuantity(null);
    }
  };

  return (
    <div
      className="flex flex-col rounded-2xl bg-white overflow-hidden hover:shadow-lg transition-shadow duration-200"
      style={{
        border: isRecommended
          ? `2px solid ${brand.primary}`
          : isInWishlist
          ? "2px solid #ef4444"
          : "1px solid #e5e7eb",
      }}
    >
      {/* Product image */}
      <Link href={productUrl}>
        <div className="relative h-36 sm:h-56">
          {image ? (
            <Image
              src={image}
              alt={lang === "ar" ? nameAr : nameEn}
              fill
              className="object-contain"
              loading="lazy"
            />
          ) : null}

          {isRecommended && (
            <div
              className="absolute top-2 end-2 flex items-center gap-1 text-white text-xs font-bold px-2 py-1 rounded-full shadow"
              style={{ backgroundColor: brand.primary }}
            >
              <Sparkles className="w-3 h-3" />
              <span>{lang === "ar" ? "موصى به" : "Recommended"}</span>
            </div>
          )}

          {isInWishlist && (
            <div className="absolute top-2 start-2 bg-white rounded-full p-1.5 shadow">
              <Heart className="w-4 h-4 fill-red-500 text-red-500" />
            </div>
          )}
        </div>
      </Link>

      <div className="p-2 sm:p-3 flex flex-col flex-1">
        {/* Brand name */}
        {(brandNameAr || brandNameEn) && (
          brandId ? (
            <Link
              href={getLocalizedPath(`/catalog?brandIds=${brandId}`, lang)}
              className="text-xs mb-0.5 font-bold"
              style={{ color: brand.primary }}
            >
              {lang === "ar" ? brandNameAr : brandNameEn}
            </Link>
          ) : (
            <div className="text-xs mb-0.5 font-bold" style={{ color: brand.primary }}>
              {lang === "ar" ? brandNameAr : brandNameEn}
            </div>
          )
        )}

        {/* Name */}
        <div className="flex-1">
          <Link href={productUrl} className="font-bold">
            {lang === "ar" ? nameAr : nameEn}
          </Link>
        </div>

        {/* Stars + price + cart */}
        <div className="mt-auto pt-2">
          {/* Stars */}
          <div className="flex items-center gap-1 text-amber-500 mb-1">
            {Array.from({ length: 5 }).map((_, i) => (
              <Star
                key={i}
                className={`w-4 h-4 ${i < Math.round(rating) ? "fill-current" : "opacity-30"}`}
              />
            ))}
            <span className="ms-1 text-xs text-neutral-600">{rating}</span>
          </div>

          {/* Price */}
          <div className="font-extrabold mb-2">{priceFmt}</div>

          {!cartItem ? (
            <button
              onClick={handleAddToCart}
              disabled={isLoading}
              className="w-full rounded-xl text-white text-sm px-3 py-2 hover:opacity-90 transition-opacity disabled:opacity-50"
              style={{ background: brand.primary }}
            >
              {isLoading ? "..." : (lang === "ar" ? "أضف" : <><span className="sm:hidden">Add</span><span className="hidden sm:inline">Add to cart</span></>)}
            </button>
          ) : (
            <div
              className="flex items-center gap-2 border rounded-xl overflow-hidden w-full justify-between"
              style={{ borderColor: brand.primary }}
            >
              <button
                onClick={handleDecrement}
                disabled={isLoading}
                className="p-2 hover:bg-neutral-100 transition-colors disabled:opacity-50"
                style={{ color: (cartItem?.quantity || 0) <= 1 ? '#ef4444' : brand.primary }}
              >
                {(cartItem?.quantity || 0) <= 1 ? (
                  <Trash2 className="w-4 h-4" />
                ) : (
                  <Minus className="w-4 h-4" />
                )}
              </button>

              <input
                type="number"
                min="1"
                value={inputValue}
                onChange={handleQuantityChange}
                onBlur={handleQuantityBlur}
                disabled={isLoading}
                className="w-10 text-center font-semibold text-sm border-0 focus:outline-none appearance-none [appearance:textfield] [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
                style={{ color: brand.primary }}
              />

              <button
                onClick={handleIncrement}
                disabled={isLoading}
                className="p-2 hover:bg-neutral-100 transition-colors disabled:opacity-50"
                style={{ color: brand.primary }}
              >
                <Plus className="w-4 h-4" />
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
