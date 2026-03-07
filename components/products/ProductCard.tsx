import { useState, useEffect } from "react";
import { Star, Plus, Minus, Trash2 } from "lucide-react";
import Link from "next/link";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { addToCart, updateCartItem, removeFromCart } from "@/store/slices/cartsSlice";

interface ProductCardProps {
  id: number;
  slugAr?: string;
  slugEn?: string;
  nameAr: string;
  nameEn: string;
  brandNameAr?: string;
  brandNameEn?: string;
  price: number;
  rating?: number;
  image: string;
  lang: string;
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
  brandNameAr,
  brandNameEn,
  price,
  rating = 0,
  image,
  lang,
  brand
}: ProductCardProps) {
  const dispatch = useAppDispatch();
  const cart = useAppSelector((state) => state.cart.cart);
  const isLoading = useAppSelector((state) => state.cart.isLoading);

  // Check if product is already in cart
  const cartItem = cart?.items?.find((item: any) => item.productId === id);
  const [localQuantity, setLocalQuantity] = useState(cartItem?.quantity || 1);

  // Sync localQuantity with cartItem quantity when cart updates
  useEffect(() => {
    if (cartItem?.quantity) {
      setLocalQuantity(cartItem.quantity);
    }
  }, [cartItem?.quantity]);

  const priceFmt = new Intl.NumberFormat(
    lang === "ar" ? "ar-EG" : "en-EG",
    { style: "currency", currency: "EGP", maximumFractionDigits: 0 }
  ).format(price);

  const handleAddToCart = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    e.stopPropagation();

    try {
      await dispatch(addToCart({
        productId: id,
        quantity: 1
      })).unwrap();
      setLocalQuantity(1);
    } catch (error) {
      console.error('Failed to add to cart:', error);
    }
  };

  const handleIncrement = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    e.stopPropagation();

    if (!cartItem) return;

    const newQuantity = (cartItem.quantity || 0) + 1;
    try {
      await dispatch(updateCartItem({
        itemId: cartItem.id, // Use cart item ID, not product ID
        quantity: newQuantity
      })).unwrap();
      setLocalQuantity(newQuantity);
    } catch (error) {
      console.error('Failed to update cart:', error);
    }
  };

  const handleDecrement = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    e.stopPropagation();

    if (!cartItem) return;

    const currentQty = cartItem.quantity || 0;

    // If quantity is 1, delete the item instead of decrementing
    if (currentQty <= 1) {
      await handleDelete(e);
      return;
    }

    const newQuantity = currentQty - 1;
    try {
      await dispatch(updateCartItem({
        itemId: cartItem.id, // Use cart item ID, not product ID
        quantity: newQuantity
      })).unwrap();
      setLocalQuantity(newQuantity);
    } catch (error) {
      console.error('Failed to update cart:', error);
    }
  };

  const handleDelete = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    e.stopPropagation();

    if (!cartItem) return;

    try {
      await dispatch(removeFromCart(cartItem.id)).unwrap();
      setLocalQuantity(1);
    } catch (error) {
      console.error('Failed to remove from cart:', error);
    }
  };

  const handleQuantityChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    e.stopPropagation();

    const value = parseInt(e.target.value);
    if (isNaN(value) || value < 1) return;

    setLocalQuantity(value);
  };

  const handleQuantityBlur = async (e: React.FocusEvent<HTMLInputElement>) => {
    e.preventDefault();

    if (!cartItem) return;

    const value = parseInt(e.target.value);
    if (isNaN(value) || value < 1 || value === cartItem.quantity) {
      setLocalQuantity(cartItem.quantity || 1);
      return;
    }

    try {
      await dispatch(updateCartItem({
        itemId: cartItem.id, // Use cart item ID, not product ID
        quantity: value
      })).unwrap();
    } catch (error) {
      console.error('Failed to update cart:', error);
      setLocalQuantity(cartItem.quantity || 1);
    }
  };

  return (
    <Link
      href={`/product/${lang === 'ar' ? (slugAr ?? id) : (slugEn ?? id)}`}
      className="flex flex-col rounded-2xl bg-white border border-neutral-200 overflow-hidden hover:shadow-lg transition-shadow duration-200"
    >
      <img src={image} alt="product" className="w-full h-36 sm:h-56 object-cover" loading="lazy" />
      <div className="p-2 sm:p-3 flex flex-col flex-1">
        {/* Brand name */}
        {(brandNameAr || brandNameEn) && (
          <div className="text-xs mb-0.5 font-bold" style={{ color: brand.primary }}>
            {lang === "ar" ? brandNameAr : brandNameEn}
          </div>
        )}

        {/* Name — grows to fill available space, pushing everything below down */}
        <div className="flex-1">
          <div className="font-bold">{lang === "ar" ? nameAr : nameEn}</div>
        </div>

        {/* Stars + price + cart — always pinned to the bottom */}
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
            /* Add to cart button */
            <button
              onClick={handleAddToCart}
              disabled={isLoading}
              className="w-full rounded-xl text-white text-sm px-3 py-2 hover:opacity-90 transition-opacity disabled:opacity-50"
              style={{ background: brand.primary }}
            >
              {isLoading ? "..." : (lang === "ar" ? "أضف" : <><span className="sm:hidden">Add</span><span className="hidden sm:inline">Add to cart</span></>)}
            </button>
          ) : (
            /* Quantity controls */
            <div
              className="flex items-center gap-2 border rounded-xl overflow-hidden w-full justify-between"
              style={{ borderColor: brand.primary }}
              onClick={(e) => e.preventDefault()}
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
                value={localQuantity}
                onChange={handleQuantityChange}
                onBlur={handleQuantityBlur}
                onClick={(e) => e.stopPropagation()}
                disabled={isLoading}
                className="w-10 text-center font-semibold text-sm border-0 focus:outline-none appearance-none [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
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
    </Link>
  );
}
