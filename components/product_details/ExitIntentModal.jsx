
import React, { useEffect, useState } from "react";

export default function ExitIntentModal({ brand, lang }){
  const [show,setShow] = useState(false);
  useEffect(()=>{
    const onLeave = (e)=>{ setShow(true); };
    document.addEventListener('mouseleave', onLeave);
    return ()=> document.removeEventListener('mouseleave', onLeave);
  },[]);
  if(!show) return null;
  return (
    <div className="fixed inset-0 z-40">
      <div className="absolute inset-0 bg-black/40" onClick={()=>setShow(false)} />
      <div className="absolute inset-0 flex items-center justify-center p-4">
        <div className="max-w-md w-full rounded-3xl bg-white p-6 text-center">
          <div className="text-2xl font-black mb-1">{lang==="ar"?"خصم 10% على طلبك":"Get 10% off"}</div>
          <div className="text-neutral-600 mb-4">{lang==="ar"?"اشترك ليصلك عرض التوهّج الخاص بك.":"Subscribe to receive your glow deal."}</div>
          <form className="flex gap-2" onSubmit={(e)=>e.preventDefault()}>
            <input type="email" required className="flex-1 rounded-2xl border border-neutral-300 px-3 py-2" placeholder={lang==="ar"?"بريدك الإلكتروني":"Your email"} />
            <button className="px-4 py-2 rounded-2xl text-white font-semibold" style={{background:brand.primary}}>{lang==="ar"?"اشترك":"Subscribe"}</button>
          </form>
        </div>
      </div>
    </div>
  );
}