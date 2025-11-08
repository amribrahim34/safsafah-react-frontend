import { Star } from "lucide-react";
import { Link } from "react-router-dom";

export default function ProductCard({ id, nameAr, nameEn, price, rating = 0, image, lang, brand }) {
  const priceFmt = new Intl.NumberFormat(lang === "ar" ? "ar-EG" : "en-EG", { style: "currency", currency: "EGP", maximumFractionDigits: 0 }).format(price);

  const handleAddToCart = (e) => {
    e.preventDefault();
    e.stopPropagation();
    // TODO: Implement add to cart functionality
    console.log('Add to cart:', id);
  };

  return (
    <Link to={`/product/${id}`} className="block rounded-2xl bg-white border border-neutral-200 overflow-hidden hover:shadow-lg transition-shadow duration-200">
      <img src={image} alt="product" className="w-full h-56 object-cover" loading="lazy" />
      <div className="p-3">
        <div className="font-semibold min-h-[3rem]">{lang === "ar" ? nameAr : nameEn}</div>
        <div className="mt-1 flex items-center gap-1 text-amber-500">
          {Array.from({ length: 5 }).map((_, i) => (<Star key={i} className={`w-4 h-4 ${i < Math.round(rating) ? "fill-current" : "opacity-30"}`} />))}
          <span className="ms-1 text-xs text-neutral-600">{rating}</span>
        </div>
        <div className="mt-2 flex items-center justify-between">
          <div className="font-extrabold">{priceFmt}</div>
          <button 
            onClick={handleAddToCart}
            className="rounded-xl text-white text-sm px-3 py-2 hover:opacity-90 transition-opacity" 
            style={{ background: brand.primary }}
          >
            {lang === "ar" ? "أضف" : "Add"}
          </button>
        </div>
      </div>
    </Link>
  );
}
