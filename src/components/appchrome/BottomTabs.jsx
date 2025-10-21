import { Home, Grid2X2, ShoppingCart, Heart, User2 } from "lucide-react";

export default function BottomTabs({ labels }) {
  return (
    <nav className="fixed bottom-0 inset-x-0 z-50 bg-white/95 backdrop-blur border-t border-neutral-200 md:hidden">
      <div className="grid grid-cols-5 text-xs">
        <a className="py-3 flex flex-col items-center gap-1" href="#home"><Home className="w-5 h-5"/><span>{labels.home}</span></a>
        <a className="py-3 flex flex-col items-center gap-1" href="#categories"><Grid2X2 className="w-5 h-5"/><span>{labels.cats}</span></a>
        <a className="py-3 flex flex-col items-center gap-1" href="#cart"><ShoppingCart className="w-5 h-5"/><span>{labels.cart}</span></a>
        <a className="py-3 flex flex-col items-center gap-1" href="#wishlist"><Heart className="w-5 h-5"/><span>{labels.wish}</span></a>
        <a className="py-3 flex flex-col items-center gap-1" href="#account"><User2 className="w-5 h-5"/><span>{labels.account}</span></a>
      </div>
    </nav>
  );
}
