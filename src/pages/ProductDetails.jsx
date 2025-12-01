// src/pages/product/ProductPage.jsx
import React, { useMemo, useState, useEffect, useRef } from "react";
import { useParams } from "react-router-dom";
import { Trash2 } from "lucide-react";
import { BRAND } from "../content/brand";
import { COPY } from "../content/copy";
import { IMG } from "../content/images";
import { useDir } from "../hooks/useDir";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { fetchProductById } from "../store/slices/productsSlice";
import { addToCart as addToCartAction, updateCartItem, removeFromCart, fetchCart } from "../store/slices/cartsSlice";

// site chrome
import PromoBar from "../components/header/PromoBar";
import Header from "../components/header/Header";
import Footer from "../components/footer/Footer";
import BottomTabs from "../components/appchrome/BottomTabs";
import FloatingCart from "../components/appchrome/FloatingCart";
import ProductGrid from "../components/products/ProductGrid";

// local product components
import ImageGallery from "../components/product_details/ImageGallery";
import VariantSelector from "../components/product_details/VariantSelector";
import TrustBadges from "../components/product_details/TrustBadges";
import RatingBreakdown from "../components/product_details/RatingBreakdown";
import Reviews from "../components/product_details/Reviews";
import DeliveryETA from "../components/product_details/DeliveryETA";
import StickyATCBar from "../components/product_details/StickyATCBar";
import BundleOffers from "../components/product_details/BundleOffers";
import RecentlyViewed from "../components/product_details/RecentlyViewed";
import MiniCart from "../components/product_details/MiniCart";
import ExitIntentModal from "../components/product_details/ExitIntentModal";
import Stars from "../components/ui/Stars";

// ---- Page ----
export default function ProductPage(){
  const { id } = useParams();
  const dispatch = useAppDispatch();
  const { currentProduct: product, isLoadingProduct, error } = useAppSelector((state) => state.products);
  const { cart, isLoading: isAddingToCart } = useAppSelector((state) => state.cart);

  const [lang,setLang] = useState("ar");
  const T = useMemo(()=> COPY[lang], [lang]);
  useDir(lang);

  const [showReviews, setShowReviews] = useState(false);
  const [miniCartOpen, setMiniCartOpen] = useState(false);

  const priceFmt = new Intl.NumberFormat(lang==="ar"?"ar-EG":"en-EG",{ style:"currency", currency:"EGP", maximumFractionDigits:0 }).format;

  // Check if product is already in cart
  const cartItem = cart?.items.find((item) => item.productId === product?.id);

  // Fetch product and cart on mount
  useEffect(() => {
    if (id) {
      dispatch(fetchProductById(id));
    }
    dispatch(fetchCart());
  }, [id, dispatch]);

  const addToCart = async () => {
    if (!product) return;

    try {
      await dispatch(addToCartAction({
        productId: product.id,
        quantity: 1,
      })).unwrap();

      // Show mini cart on success
      setMiniCartOpen(true);
    } catch (error) {
      console.error('Failed to add to cart:', error);
    }
  };

  const handleIncrement = async () => {
    if (!product || !cartItem) return;

    const newQuantity = (cartItem.quantity || 0) + 1;

    // Check stock limit
    if (product.stock && newQuantity > product.stock) {
      return;
    }

    try {
      await dispatch(updateCartItem({
        itemId: cartItem.productId,
        quantity: newQuantity
      })).unwrap();
    } catch (error) {
      console.error('Failed to update cart:', error);
    }
  };

  const handleDecrement = async () => {
    if (!product || !cartItem) return;

    const currentQty = cartItem.quantity || 0;

    // If quantity is 1, remove the item instead of decrementing
    if (currentQty <= 1) {
      try {
        await dispatch(removeFromCart(cartItem.productId)).unwrap();
      } catch (error) {
        console.error('Failed to remove from cart:', error);
      }
      return;
    }

    const newQuantity = currentQty - 1;
    try {
      await dispatch(updateCartItem({
        itemId: cartItem.productId,
        quantity: newQuantity
      })).unwrap();
    } catch (error) {
      console.error('Failed to update cart:', error);
    }
  };

  // Loading state
  if (isLoadingProduct) {
    return (
      <div className="min-h-screen bg-white text-neutral-900">
        <PromoBar text={T.promo} lang={lang} onToggleLang={()=>setLang(lang==="ar"?"en":"ar")} brand={BRAND} />
        <Header brand={BRAND} searchPlaceholder={T.search} lang={lang} />
        <div className="max-w-7xl mx-auto px-4 py-12 text-center">
          <div className="text-xl">{lang === "ar" ? "جاري التحميل..." : "Loading..."}</div>
        </div>
        <Footer brand={BRAND} lang={lang} copy={T} />
      </div>
    );
  }

  // Error state
  if (error || !product) {
    return (
      <div className="min-h-screen bg-white text-neutral-900">
        <PromoBar text={T.promo} lang={lang} onToggleLang={()=>setLang(lang==="ar"?"en":"ar")} brand={BRAND} />
        <Header brand={BRAND} searchPlaceholder={T.search} lang={lang} />
        <div className="max-w-7xl mx-auto px-4 py-12 text-center">
          <div className="text-xl text-red-600">{lang === "ar" ? "فشل تحميل المنتج" : "Failed to load product"}</div>
          {error && <div className="text-sm text-neutral-600 mt-2">{error}</div>}
        </div>
        <Footer brand={BRAND} lang={lang} copy={T} />
      </div>
    );
  }

  // Build product data for display
  const productTitle = lang === "ar" ? product.nameAr : product.nameEn;
  const productDescription = lang === "ar" ? product.descriptionAr : product.descriptionEn;
  const brandName = lang === "ar" ? product.brand.nameAr : product.brand.nameEn;
  const categoryName = lang === "ar" ? product.category.nameAr : product.category.nameEn;
  const rating = product.averageRating || 0;
  const reviewCount = product.reviews?.length || 0;

  // Build images array
  const images = product.image ? [
    { src: product.image, alt: productTitle }
  ] : [
    { src: IMG.serum, alt: productTitle }
  ];

  return (
    <div className="min-h-screen bg-white text-neutral-900">
      <PromoBar text={T.promo} lang={lang} onToggleLang={()=>setLang(lang==="ar"?"en":"ar")} brand={BRAND} />
      <Header brand={BRAND} searchPlaceholder={T.search} lang={lang} />

      {/* Hook Phase — Emotional Engagement */}
      <section className="max-w-7xl mx-auto px-4 py-6 grid md:grid-cols-2 gap-6">
        {/* Gallery with swipe + hover zoom */}
        <ImageGallery images={images} brand={BRAND} />

        {/* Product Summary */}
        <div>
          <div className="text-sm text-neutral-600 mb-1">{brandName} · {categoryName}</div>
          <h1 className="text-2xl md:text-3xl font-extrabold">{productTitle}</h1>

          {/* Rating + count */}
          {rating > 0 && (
            <div className="mt-3 flex items-center gap-2">
              <Stars rating={rating} />
              <span className="text-sm text-neutral-600">{rating.toFixed(1)} · {reviewCount} {lang==="ar"?"تقييم":"ratings"}</span>
              {reviewCount > 0 && (
                <button className="text-sm underline" onClick={()=>setShowReviews(true)}>
                  {lang==="ar"?"قراءة المراجعات":"Read reviews"}
                </button>
              )}
            </div>
          )}

          {/* Price, installment, stock */}
          <div className="mt-4 flex items-center gap-3 flex-wrap">
            <div className="text-2xl font-black">{priceFmt(product.price)}</div>
            <span className="text-sm px-2 py-1 rounded-full" style={{background:BRAND.light+"22", color:BRAND.dark}}>
              {lang==="ar"?"توصيل مجاني فوق 500 جنيه":"Free delivery over 500 EGP"}
            </span>
          </div>
          {product.stock && (
            <div className={`mt-1 text-sm ${lang==='ar'?'text-right':''}`}>
              {lang==="ar"?`المتاح بالمخزون: ${product.stock}`:`Only ${product.stock} left in stock!`}
            </div>
          )}
          <div className="mt-1 text-sm text-neutral-600">{lang==="ar"?"تقسيط متاح عبر ValU/Bank":"Installments available via ValU/Bank*"}</div>

          {/* SKU */}
          <div className="mt-2 text-xs text-neutral-500">
            {lang === "ar" ? "رمز المنتج: " : "SKU: "}{product.sku}
          </div>

          {/* CTAs */}
          <div className="mt-5">
            <div className="flex items-center gap-3">
              {/* Show quantity controller only if item is in cart */}
              {cartItem && (
                <div className="flex items-center border rounded-2xl overflow-hidden" style={{borderColor:BRAND.primary}}>
                  <button
                    className="px-3 py-2 hover:bg-neutral-100 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                    onClick={handleDecrement}
                    disabled={isAddingToCart}
                    style={{ color: (cartItem?.quantity || 0) <= 1 ? '#ef4444' : BRAND.primary }}
                  >
                    {(cartItem?.quantity || 0) <= 1 ? (
                      <Trash2 className="w-4 h-4" />
                    ) : (
                      '–'
                    )}
                  </button>
                  <div className="px-4 py-2 min-w-[40px] text-center font-semibold" style={{color:BRAND.primary}}>
                    {cartItem.quantity}
                  </div>
                  <button
                    className="px-3 py-2 hover:bg-neutral-100 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                    onClick={handleIncrement}
                    disabled={isAddingToCart || (product.stock ? cartItem.quantity >= product.stock : false)}
                    style={{color:BRAND.primary}}
                  >
                    +
                  </button>
                </div>
              )}

              {/* Add to cart button - hide when item is already in cart */}
              {!cartItem && (
                <button
                  onClick={addToCart}
                  disabled={isAddingToCart || (product.stock && product.stock < 1)}
                  className="px-6 py-3 rounded-2xl text-white font-semibold disabled:opacity-50 disabled:cursor-not-allowed"
                  style={{background:BRAND.primary}}
                >
                  {isAddingToCart
                    ? (lang==="ar"?"جاري الإضافة...":"Adding...")
                    : (product.stock && product.stock < 1)
                      ? (lang==="ar"?"غير متوفر":"Out of stock")
                      : (lang==="ar"?"أضِف إلى السلة":"Add to cart")
                  }
                </button>
              )}

              <button className="px-4 py-3 rounded-2xl border font-semibold" style={{borderColor:BRAND.primary, color:BRAND.primary}}>
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

          {/* Trust + Delivery + COD */}
          <div className="mt-6 grid gap-3 grid-cols-1 sm:grid-cols-2 lg:grid-cols-[repeat(auto-fit,minmax(260px,1fr))]">
            {/* <TrustBadges brand={BRAND} lang={lang} flow /> */}
            <DeliveryETA brand={BRAND} lang={lang} className="h-full"  />
            <div className="rounded-2xl border border-neutral-200 p-3 text-sm h-full">
              <div className="font-semibold">{lang==="ar"?"الدفع عند الاستلام":"Cash on Delivery"}</div>
              <div className="text-neutral-600">{lang==="ar"?"إرجاع مجاني خلال 14 يوم":"Free returns within 14 days"}</div>
            </div>
          </div>

          {/* Description */}
          {productDescription && (
            <div className="mt-6">
              <div className="font-bold mb-1">{lang==="ar"?"الوصف":"Description"}</div>
              <p className="text-neutral-700 text-sm">{productDescription}</p>
            </div>
          )}
        </div>
      </section>

      {/* Trust Phase — Reviews (folded by default) */}
      {reviewCount > 0 && (
        <section className="max-w-7xl mx-auto px-4 pb-8">
          <div className="rounded-3xl border border-neutral-200 p-4">
            <div className="flex items-center justify-between">
              <div className="font-bold text-lg">{lang==="ar"?"آراء العملاء":"Customer reviews"}</div>
              <button onClick={()=>setShowReviews(s=>!s)} className="text-sm underline">
                {showReviews ? (lang==="ar"?"إخفاء":"Hide") : (lang==="ar"?"عرض المراجعات":"Show reviews")}
              </button>
            </div>
            {showReviews && (
              <div className="mt-4 grid md:grid-cols-3 gap-6">
                <div>
                  <RatingBreakdown brand={BRAND} lang={lang} rating={rating} count={reviewCount} />
                </div>
                <div className="md:col-span-2">
                  <Reviews brand={BRAND} lang={lang} />
                </div>
              </div>
            )}
          </div>
        </section>
      )}

      {/* Post-Intent — Recently viewed / Similar */}
      <section className="max-w-7xl mx-auto px-4 pb-12">
        <RecentlyViewed brand={BRAND} lang={lang} />
      </section>

      <Footer brand={BRAND} lang={lang} copy={T} />
      <FloatingCart brand={BRAND} />
      <BottomTabs labels={{ home: lang==="ar"?"الرئيسية":"Home", cats: lang==="ar"?"الفئات":"Categories", cart: lang==="ar"?"السلة":"Bag", wish: lang==="ar"?"المفضلة":"Wishlist", account: lang==="ar"?"حسابي":"Account" }} />

      <StickyATCBar
        brand={BRAND}
        lang={lang}
        title={productTitle}
        price={product.price}
        onAdd={addToCart}
        cartItem={cartItem}
        onIncrement={handleIncrement}
        onDecrement={handleDecrement}
        isLoading={isAddingToCart}
      />
      <MiniCart open={miniCartOpen} onClose={()=>setMiniCartOpen(false)} brand={BRAND} lang={lang} />
      <ExitIntentModal brand={BRAND} lang={lang} />
    </div>
  );
}
