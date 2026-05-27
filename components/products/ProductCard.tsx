import { Star, Plus, Check, Sparkles, Heart } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { addToCart } from "@/store/slices/cartsSlice";
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

  const priceFmt = new Intl.NumberFormat(
    lang === "ar" ? "ar-EG" : "en-EG",
    { style: "currency", currency: "EGP", maximumFractionDigits: 0 }
  ).format(price);

  const productUrl = getLocalizedPath(`/product/${lang === 'ar' ? (slugAr ?? id) : (slugEn ?? id)}`, lang);

  const handleAddToCart = async () => {
    try {
      await dispatch(addToCart({ productId: id, quantity: 1 })).unwrap();
    } catch (error) {
      console.error('Failed to add to cart:', error);
    }
  };

  return (
    <div
      className="flex flex-col rounded-2xl bg-white overflow-hidden shadow-lg "
      style={{
        border: isRecommended
          ? `2px solid ${brand.primary}`
          : isInWishlist
          ? "2px solid #ef4444"
          : "",
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
              className="text-xs lg:text-base lg:font-bold mb-0.5 "
              style={{ color: brand.primary }}
            >
              {lang === "ar" ? brandNameAr : brandNameEn}
            </Link>
          ) : (
            <div className="text-xs mb-0.5 " style={{ color: brand.primary }}>
              {lang === "ar" ? brandNameAr : brandNameEn}
            </div>
          )
        )}

        {/* Name */}
        <div className="flex-1 min-w-0">
          <Link href={productUrl} className=" text-xs lg:text-base font-bold line-clamp-2">
            {lang === "ar" ? nameAr : nameEn}
          </Link>
        </div>

        {/* Stars + price + cart */}
        <div className="mt-auto pt-2">
          {/* Stars */}
          <div className="flex items-center gap-1 text-amber-500 mb-1">
            {rating ? (
              <>
                <Star className="w-4 h-4 fill-current" />
                <span className="ms-1 text-xs text-neutral-600">{rating}</span>
              </>
            ) : null}
          </div>

          <div className="flex justify-between items-center">
            {/* Price */}
            <div className="text-sm lg:text-base font-bold">{priceFmt}</div>

            {!cartItem ? (
              <button
                onClick={handleAddToCart}
                disabled={isLoading}
                className="rounded text-white md:px-3 md:py-2 px-2 py-1 hover:opacity-90 transition-opacity disabled:opacity-50 flex"
                style={{ background: brand.primary }}
              >
                {isLoading ? "..." : <Plus className="w-4 h-4" />}
              </button>
            ) : (
              <Link
                href={getLocalizedPath('/cart', lang)}
                className="flex items-center gap-1 rounded text-white md:px-3 md:py-2 px-2 py-1 text-xs font-semibold hover:opacity-90 transition-opacity"
                style={{ background: '#8DA78A' }}
              >
                <Check className="w-4 h-4" />
                <span className="hidden sm:inline">
                  {lang === 'ar' ? 'في السلة' : 'In Cart'}
                </span>
              </Link>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
