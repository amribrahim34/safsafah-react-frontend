import React, { useEffect, useState } from "react";
import { productsService } from "@/lib/api/services/products.service";
import CartButton from "@/components/products/CartButton";
import WishlistButton from "@/components/products/WishlistButton";

export default function WishlistGrid({ brand, lang = "ar" }) {
  const isRTL = lang === "ar";

  const [items, setItems] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const fmt = (n) =>
    new Intl.NumberFormat(isRTL ? "ar-EG" : "en-EG", {
      style: "currency",
      currency: "EGP",
      maximumFractionDigits: 0,
    }).format(n);

  useEffect(() => {
    const fetchWishlist = async () => {
      try {
        setIsLoading(true);
        setError(null);
        const data = await productsService.getWishlist();
        setItems(data);
      } catch (err) {
        setError(err.message || "Failed to load wishlist");
      } finally {
        setIsLoading(false);
      }
    };

    fetchWishlist();
  }, []);

  return (
    <section className="rounded-3xl border border-neutral-200 p-4 bg-white">
      <div className="text-lg font-extrabold mb-3">
        {isRTL ? "المفضلة" : "Wishlist"}
      </div>

      {isLoading && (
        <div className="flex justify-center py-8">
          <div
            className="animate-spin rounded-full h-8 w-8 border-b-2"
            style={{ borderColor: brand.primary }}
          />
        </div>
      )}

      {!isLoading && error && (
        <p className="text-sm text-red-500 text-center py-4">{error}</p>
      )}

      {!isLoading && !error && items.length === 0 && (
        <p className="text-sm text-neutral-500 text-center py-4">
          {isRTL ? "قائمة المفضلة فارغة" : "Your wishlist is empty"}
        </p>
      )}

      {!isLoading && !error && items.length > 0 && (
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
          {items.map((product) => (
            <article
              key={product?.id}
              className="rounded-2xl border border-neutral-200 overflow-hidden"
            >
              <div className="h-36 md:h-48 overflow-hidden">
                <img
                  src={product?.image ?? "/placeholder-product.png"}
                  alt={isRTL ? product?.nameAr : product?.nameEn}
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    e.currentTarget.src = "/placeholder-product.png";
                  }}
                />
              </div>

              <div className="p-3">
                <div className="text-sm font-semibold line-clamp-2">
                  {isRTL ? product?.nameAr : product?.nameEn}
                </div>
                <div className="text-sm font-extrabold mt-1">
                  {fmt(product?.price)}
                </div>

                <div className="mt-2 flex gap-2">
                  <CartButton product={product} brand={brand} lang={lang} />
                  <WishlistButton product={product} brand={brand} lang={lang} initialIsInWishlist={true} />
                </div>
              </div>
            </article>
          ))}
        </div>
      )}
    </section>
  );
}
