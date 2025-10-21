import { Search } from "lucide-react";
import logo from "../../assets/safsafah-logo.png";

export default function Header({ brand, searchPlaceholder }) {
  return (
    <header className="sticky top-0 z-40 bg-white/85 backdrop-blur supports-[backdrop-filter]:bg-white/70">
      <div className="max-w-7xl mx-auto px-4 py-3 flex items-center gap-3">
        <img src={logo} alt="SAFSAFAH" className="w-10 h-10 rounded-2xl object-contain" />
        <div className="font-extrabold text-xl tracking-tight">SAFSAFAH</div>
        <div className="flex-1" />
        <div className="relative w-1/2 hidden md:block">
          <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 opacity-60" />
          <input className="w-full rounded-2xl border border-neutral-200 bg-white/80 px-4 py-2 pl-9 focus:outline-none focus:ring-2"
                 style={{ outlineColor: brand.primary }}
                 placeholder={searchPlaceholder} />
        </div>
      </div>
      <div className="md:hidden px-4 pb-3">
        <div className="relative">
          <Search className="w-5 h-5 absolute left-3 top-1/2 -translate-y-1/2 opacity-60" />
          <input className="w-full rounded-2xl border border-neutral-200 bg-white px-4 py-3 pl-10 focus:outline-none focus:ring-2"
                 style={{ outlineColor: brand.primary }}
                 placeholder={searchPlaceholder} />
        </div>
      </div>
    </header>
  );
}
