import React from "react";
import { ArrowRight, Download, RefreshCcw } from "lucide-react";
import { IMG } from "../../content/images";

const DEMO = [
  { id:"ORD-5821", date:"2025-09-20", total:1590, status:"Delivered",
    items:[{img:IMG.bannerTall},{img:IMG.cream}] },
  { id:"ORD-5799", date:"2025-09-05", total:760, status:"Out for Delivery",
    items:[{img:IMG.cream}] },
];

export default function OrdersList({ brand, lang="ar" }) {
  const isRTL = lang==="ar";
  const fmt = (n)=> new Intl.NumberFormat(isRTL?"ar-EG":"en-EG",{style:"currency",currency:"EGP",maximumFractionDigits:0}).format(n);

  return (
    <section className="rounded-3xl border border-neutral-200 p-4 bg-white">
      <div className="flex items-center justify-between mb-3">
        <h3 className="text-lg font-extrabold">{isRTL?"طلباتي":"My orders"}</h3>
        <a href="/orders" className="text-sm font-semibold" style={{color:brand.primary}}>
          {isRTL?"عرض الكل":"View all"} <ArrowRight className="inline w-3.5 h-3.5" />
        </a>
      </div>

      <div className="space-y-3">
        {DEMO.map(o=>(
          <article key={o.id} className="rounded-2xl border border-neutral-200 p-3">
            <div className="flex items-center justify-between gap-3">
              <div className="text-sm font-semibold">{o.id}</div>
              <div className="text-xs text-neutral-600">{new Date(o.date).toLocaleDateString(isRTL?"ar-EG":"en-EG")}</div>
            </div>
            <div className="flex items-center gap-2 mt-2">
              {o.items.slice(0,4).map((it,i)=>(
                <div key={i} className="w-10 h-10 rounded-lg overflow-hidden border">
                  <img src={it.img} alt="" className="w-full h-full object-cover" />
                </div>
              ))}
              {o.items.length>4 && <div className="text-xs text-neutral-600">+{o.items.length-4}</div>}
              <div className="ms-auto text-sm font-extrabold">{fmt(o.total)}</div>
            </div>

            <div className="mt-2 flex items-center gap-2 text-xs">
              <span className="px-2 py-1 rounded-full border bg-neutral-50">{isRTL?statusAr(o.status):o.status}</span>
              <div className="ms-auto flex items-center gap-2">
                <button className="px-3 py-1.5 rounded-xl border text-sm hover:bg-neutral-50"><Download className="inline w-4 h-4" /> {isRTL?"الفاتورة":"Invoice"}</button>
                <button className="px-3 py-1.5 rounded-xl text-white text-sm" style={{background:brand.primary}}><RefreshCcw className="inline w-4 h-4" /> {isRTL?"إعادة الشراء":"Reorder"}</button>
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
const statusAr = (s)=>({Delivered:"تم التسليم","Out for Delivery":"خارج للتسليم",Packed:"تم التجهيز",Placed:"تم الطلب"}[s]||s);
