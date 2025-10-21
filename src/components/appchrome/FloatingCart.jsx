import { ShoppingCart } from "lucide-react";

export default function FloatingCart({ brand }) {
  return (
    <a id="cart" href="#" className="fixed bottom-20 right-4 md:right-6 z-50 rounded-full text-white p-4 shadow-lg md:hidden" style={{ background: brand.primary }} aria-label="Cart">
      <ShoppingCart className="w-6 h-6" />
    </a>
  );
}
