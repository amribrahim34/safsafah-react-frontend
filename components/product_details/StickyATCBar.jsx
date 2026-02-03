
import React, { useEffect, useState } from "react";
import { Trash2 } from "lucide-react";

export default function StickyATCBar({ brand, lang, title, price, onAdd, cartItem, onIncrement, onDecrement, isLoading }) {
  const [visible, setVisible] = useState(false);
  // useEffect(()=>{
  //   const onScroll = ()=> setVisible(window.scrollY>500);
  //   window.addEventListener('scroll', onScroll);
  //   return ()=> window.removeEventListener('scroll', onScroll);
  // },[]);
  if (!visible) return null;
  return (
    <div className="fixed bottom-0 inset-x-0 z-50 bg-white/95 backdrop-blur border-t border-neutral-200">
      <div className="max-w-7xl mx-auto px-4 py-3 flex items-center gap-3">
        <div className="flex-1 truncate"><span className="font-semibold">{title}</span> · <span className="text-neutral-700">{new Intl.NumberFormat('en-EG', { style: 'currency', currency: 'EGP', maximumFractionDigits: 0 }).format(price)}</span></div>

        {/* Show quantity controller if item is in cart */}
        {cartItem ? (
          <div className="flex items-center border rounded-2xl overflow-hidden" style={{ borderColor: brand.primary }}>
            <button
              className="px-3 py-2 hover:bg-neutral-100 transition-colors disabled:opacity-50"
              onClick={onDecrement}
              disabled={isLoading}
              style={{ color: (cartItem?.quantity || 0) <= 1 ? '#ef4444' : brand.primary }}
            >
              {(cartItem?.quantity || 0) <= 1 ? (
                <Trash2 className="w-4 h-4" />
              ) : (
                '–'
              )}
            </button>
            <div className="px-4 py-2 min-w-[40px] text-center font-semibold" style={{ color: brand.primary }}>
              {cartItem.quantity}
            </div>
            <button
              className="px-3 py-2 hover:bg-neutral-100 transition-colors disabled:opacity-50"
              onClick={onIncrement}
              disabled={isLoading}
              style={{ color: brand.primary }}
            >
              +
            </button>
          </div>
        ) : (
          <button
            onClick={onAdd}
            disabled={isLoading}
            className="px-5 py-3 rounded-2xl text-white font-semibold disabled:opacity-50"
            style={{ background: brand.primary }}
          >
            {isLoading
              ? (lang === "ar" ? "جاري الإضافة..." : "Adding...")
              : (lang === "ar" ? "أضِف إلى السلة" : "Add to cart")
            }
          </button>
        )}
      </div>
    </div>
  );
}