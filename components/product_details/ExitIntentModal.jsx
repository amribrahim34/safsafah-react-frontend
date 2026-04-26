
import React, { useEffect, useState } from "react";

export default function ExitIntentModal({ brand, lang }){
  const [show,setShow] = useState(false);
  useEffect(()=>{
    const hasSeenModal = sessionStorage.getItem('exit_intent_seen');
    if (hasSeenModal) return;

    const onLeave = (e)=>{ 
      setShow(true); 
      sessionStorage.setItem('exit_intent_seen', 'true');
      document.removeEventListener('mouseleave', onLeave);
    };
    document.addEventListener('mouseleave', onLeave);
    return ()=> document.removeEventListener('mouseleave', onLeave);
  },[]);
  if(!show) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/40" onClick={()=>setShow(false)} />
      <div className="relative max-w-md w-full rounded-3xl bg-white p-6 text-center shadow-2xl">
        <button 
          type="button"
          onClick={() => setShow(false)}
          className={`absolute top-4 ${lang === 'ar' ? 'left-4' : 'right-4'} text-neutral-400 hover:text-neutral-600 transition-colors`}
          aria-label="Close"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
        <div className="text-2xl font-black mb-1 mt-2">{lang==="ar"?"خصم 10% على طلبك":"Get 10% off"}</div>
          <div className="text-neutral-600 mb-4">{lang==="ar"?"اشترك ليصلك عرض التوهّج الخاص بك.":"Subscribe to receive your glow deal."}</div>
          <form className="flex gap-2" onSubmit={(e)=>e.preventDefault()}>
            <input type="email" required className="flex-1 rounded-2xl border border-neutral-300 px-3 py-2" placeholder={lang==="ar"?"بريدك الإلكتروني":"Your email"} />
            <button className="px-4 py-2 rounded-2xl text-white font-semibold" style={{background:brand.primary}}>{lang==="ar"?"اشترك":"Subscribe"}</button>
          </form>
        </div>
      </div>
  );
}