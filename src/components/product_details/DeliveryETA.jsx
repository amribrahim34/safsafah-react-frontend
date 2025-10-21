
import React, { useState, useEffect } from "react";

export default function DeliveryETA({ brand, lang }){
  const [eta, setEta] = useState("");
  useEffect(()=>{
    // simple local ETA: Cairo 1-2d, others 2-4d
    const now = new Date();
    const addDays = (d)=>{ const t = new Date(now); t.setDate(t.getDate()+d); return t.toLocaleDateString('en-GB'); };
    setEta(`${addDays(2)}`);
  },[]);
  return (
    <div className="rounded-2xl border border-neutral-200 p-3 text-sm bg-white">
      <div className="font-semibold">{lang==="ar"?"التسليم المتوقع":"Estimated delivery"}</div>
      <div className="text-neutral-600">{lang==="ar"?`الوصول بحلول ${eta} (القاهرة/الجيزة)`: `Get it by ${eta} in Cairo/Giza`}</div>
    </div>
  );
}