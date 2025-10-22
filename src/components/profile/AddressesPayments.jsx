import React from "react";

export default function AddressesPayments({ brand, lang="ar" }) {
  const isRTL = lang==="ar";
  const addrs = [
    { tag:isRTL?"🏠 المنزل":"🏠 Home", line:isRTL?"شارع التحرير، الدقي — الجيزة":"Tahrir St., Dokki — Giza" },
    { tag:isRTL?"🏢 العمل":"🏢 Work", line:isRTL?"التجمع الخامس — القاهرة الجديدة":"Tagamoa — New Cairo" },
  ];

  return (
    <section className="rounded-3xl border border-neutral-200 p-4 bg-white">
      <div className="text-lg font-extrabold mb-2">{isRTL?"العناوين والدفع":"Addresses & payment"}</div>

      <div className="space-y-2">
        {addrs.map((a,i)=>(
          <div key={i} className="rounded-2xl border border-neutral-200 p-3 bg-neutral-50">
            <div className="text-sm font-semibold">{a.tag}</div>
            <div className="text-sm text-neutral-700">{a.line}</div>
          </div>
        ))}
      </div>

      <div className="mt-3 text-sm text-neutral-600">
        {isRTL?"الطريقة الافتراضية: الدفع عند الاستلام":"Default method: Cash on Delivery"}
      </div>
      <div className="mt-2 flex gap-2">
        <a href="/addresses" className="px-3 py-1.5 rounded-xl border text-sm">{isRTL?"إدارة العناوين":"Manage addresses"}</a>
        <a href="/payment" className="px-3 py-1.5 rounded-xl border text-sm">{isRTL?"طرق الدفع":"Payment methods"}</a>
      </div>
    </section>
  );
}
