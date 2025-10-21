
import React, { useEffect, useState } from "react";

export default function StickyATCBar({ brand, lang, title, price, onAdd }){
  const [visible, setVisible] = useState(false);
  useEffect(()=>{
    const onScroll = ()=> setVisible(window.scrollY>500);
    window.addEventListener('scroll', onScroll);
    return ()=> window.removeEventListener('scroll', onScroll);
  },[]);
  if(!visible) return null;
  return (
    <div className="fixed bottom-0 inset-x-0 z-50 bg-white/95 backdrop-blur border-t border-neutral-200">
      <div className="max-w-7xl mx-auto px-4 py-3 flex items-center gap-3">
        <div className="flex-1 truncate"><span className="font-semibold">{title}</span> · <span className="text-neutral-700">{new Intl.NumberFormat('en-EG',{style:'currency',currency:'EGP',maximumFractionDigits:0}).format(price)}</span></div>
        <button onClick={onAdd} className="px-5 py-3 rounded-2xl text-white font-semibold" style={{background:brand.primary}}>
          {lang==="ar"?"أضِف إلى السلة":"Add to cart"}
        </button>
      </div>
    </div>
  );
}