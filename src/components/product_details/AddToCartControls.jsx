import React from "react";
import { Trash2 } from "lucide-react";
import { useProductCart } from "../../hooks/useProductCart";

export default function AddToCartControls({ product, brand, lang, onSuccess }) {
  const {
    cartItem,
    isLoading,
    handleAddToCart,
    handleIncrement,
    handleDecrement,
  } = useProductCart(product);

  const onAddClick = () => {
    handleAddToCart(onSuccess);
  };

  return (
    <div className="mt-5">
      <div className="flex items-center gap-3">
        {/* Show quantity controller only if item is in cart */}
        {cartItem && (
          <div className="flex items-center border rounded-2xl overflow-hidden" style={{borderColor:brand.primary}}>
            <button
              className="px-3 py-2 hover:bg-neutral-100 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              onClick={handleDecrement}
              disabled={isLoading}
              style={{ color: (cartItem?.quantity || 0) <= 1 ? '#ef4444' : brand.primary }}
            >
              {(cartItem?.quantity || 0) <= 1 ? (
                <Trash2 className="w-4 h-4" />
              ) : (
                '–'
              )}
            </button>
            <div className="px-4 py-2 min-w-[40px] text-center font-semibold" style={{color:brand.primary}}>
              {cartItem.quantity}
            </div>
            <button
              className="px-3 py-2 hover:bg-neutral-100 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              onClick={handleIncrement}
              disabled={isLoading || (product.stock ? cartItem.quantity >= product.stock : false)}
              style={{color:brand.primary}}
            >
              +
            </button>
          </div>
        )}

        {/* Add to cart button - hide when item is already in cart */}
        {!cartItem && (
          <button
            onClick={onAddClick}
            disabled={isLoading || (product.stock && product.stock < 1)}
            className="px-6 py-3 rounded-2xl text-white font-semibold disabled:opacity-50 disabled:cursor-not-allowed"
            style={{background:brand.primary}}
          >
            {isLoading
              ? (lang==="ar"?"جاري الإضافة...":"Adding...")
              : (product.stock && product.stock < 1)
                ? (lang==="ar"?"غير متوفر":"Out of stock")
                : (lang==="ar"?"أضِف إلى السلة":"Add to cart")
            }
          </button>
        )}

        <button className="px-4 py-3 rounded-2xl border font-semibold" style={{borderColor:brand.primary, color:brand.primary}}>
          {lang==="ar"?"أضف للمفضلة":"Add to wishlist"}
        </button>
      </div>

      {/* Stock warning when at max */}
      {cartItem && product.stock && cartItem.quantity >= product.stock && (
        <div className="mt-2 text-sm text-amber-600">
          {lang==="ar"?`الحد الأقصى المتاح: ${product.stock}`:`Maximum available: ${product.stock}`}
        </div>
      )}
    </div>
  );
}
