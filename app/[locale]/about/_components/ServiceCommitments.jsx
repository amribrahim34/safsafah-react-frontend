import React from "react";
import { Clock, Truck, RotateCcw, CreditCard } from "lucide-react";

export default function ServiceCommitments({ brand, t }) {
  return (
    <section className="py-8 md:py-10">
      <h3 className="text-xl md:text-2xl font-extrabold mb-4">{t.heading}</h3>
      <div className="grid md:grid-cols-2 gap-3">
        <Card icon={Truck} title={t.delivery.title} text={t.delivery.text} brand={brand} />
        <Card icon={CreditCard} title={t.payment.title} text={t.payment.text} brand={brand} />
        <Card icon={RotateCcw} title={t.returns.title} text={t.returns.text} brand={brand} />
        <Card icon={Clock} title={t.response.title} text={t.response.text} brand={brand} />
      </div>
      <p className="text-xs text-neutral-600 mt-3">{t.disclaimer}</p>
    </section>
  );
}

function Card({ icon: Icon, title, text, brand }) {
  return (
    <div className="rounded-2xl border border-neutral-200 p-4 bg-neutral-50">
      <Icon className="w-5 h-5" style={{ color: brand.primary }} />
      <div className="mt-1 font-bold">{title}</div>
      <p className="text-sm text-neutral-700 mt-1">{text}</p>
    </div>
  );
}
