import React, { useState } from "react";

export default function SettingsPanel({ brand, lang="ar", user }) {
  const isRTL = lang==="ar";
  const [notif, setNotif] = useState({ sms:true, email:true, whatsapp:false });
  const [language, setLanguage] = useState(lang);

  return (
    <section className="rounded-3xl border border-neutral-200 p-4 bg-white">
      <div className="text-lg font-extrabold mb-2">{isRTL?"الإعدادات":"Settings"}</div>

      <div className="grid gap-3">
        <Row label={isRTL?"اللغة":"Language"}>
          <select value={language} onChange={(e)=>setLanguage(e.target.value)} className="rounded-xl border px-2 py-1.5">
            <option value="ar">العربية</option>
            <option value="en">English</option>
          </select>
        </Row>

        <Row label={isRTL?"الإشعارات":"Notifications"}>
          <label className="text-sm flex items-center gap-2"><input type="checkbox" checked={notif.sms} onChange={e=>setNotif({...notif,sms:e.target.checked})} /> SMS</label>
          <label className="text-sm flex items-center gap-2"><input type="checkbox" checked={notif.email} onChange={e=>setNotif({...notif,email:e.target.checked})} /> Email</label>
          <label className="text-sm flex items-center gap-2"><input type="checkbox" checked={notif.whatsapp} onChange={e=>setNotif({...notif,whatsapp:e.target.checked})} /> WhatsApp</label>
        </Row>

        <div className="flex gap-2">
          <button className="px-3 py-2 rounded-xl border text-sm">{isRTL?"تعديل البيانات":"Edit info"}</button>
          <button className="px-3 py-2 rounded-xl border text-sm">{isRTL?"حذف الحساب":"Delete account"}</button>
          <a href="/logout" className="px-3 py-2 rounded-xl text-white text-sm" style={{background:brand.primary}}>
            {isRTL?"تسجيل الخروج":"Logout"}
          </a>
        </div>
      </div>
    </section>
  );
}

function Row({ label, children }) {
  return (
    <div className="rounded-2xl border border-neutral-200 p-3 bg-neutral-50">
      <div className="text-sm font-semibold mb-2">{label}</div>
      <div className="flex flex-wrap gap-3">{children}</div>
    </div>
  );
}
