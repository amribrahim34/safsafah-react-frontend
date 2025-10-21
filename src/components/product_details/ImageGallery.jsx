
// ImageGallery.jsx
import React, { useRef, useState } from "react";

export default function ImageGallery({ images, brand }){
  const scroller = useRef(null);
  const [active, setActive] = useState(0);
  const go = (i)=>{ setActive(i); scroller.current?.scrollTo({ left: i * scroller.current.clientWidth, behavior: 'smooth' }); };

  return (
    <div>
      <div ref={scroller} className="w-full h-[56vh] md:h-[64vh] rounded-3xl overflow-hidden border border-neutral-200 snap-x snap-mandatory flex no-scrollbar relative">
        {images.map((img, i)=> (
          <div key={i} className="min-w-full snap-start group relative">
            <img src={img.src} alt={img.alt} className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-[1.03]" />
            {/* before/after reveal demo */}
          </div>
        ))}
        {/* dots */}
        <div className="absolute bottom-3 inset-x-0 flex justify-center gap-2">
          {images.map((_,i)=> (
            <button key={i} onClick={()=>go(i)} className={`w-2 h-2 rounded-full ${i===active?'bg-white':'bg-white/50'}`} />
          ))}
        </div>
      </div>
      {/* thumbs */}
      <div className="mt-3 flex gap-2">
        {images.map((img,i)=> (
          <button key={i} onClick={()=>go(i)} className={`w-16 h-16 rounded-xl overflow-hidden border ${i===active? 'border-neutral-900':'border-neutral-200'}`}>
            <img src={img.src} alt={img.alt} className="w-full h-full object-cover" />
          </button>
        ))}
      </div>
    </div>
  );
}
