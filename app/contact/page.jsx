import React, { useMemo, useRef, useState } from "react";
import { BRAND } from "../../content/brand";
import { COPY } from "../../content/copy";
import { useDir } from "../../hooks/useDir";

import PromoBar from "../../components/header/PromoBar";
import Header from "../../components/header/Header";
import Footer from "../../components/footer/Footer";
import BottomTabs from "../../components/appchrome/BottomTabs";

// Reuse existing About blocks for consistency
import QuickFAQ from "../../components/about/QuickFAQ";

import { Mail, Phone, Send, Upload } from "lucide-react";
import { SiWhatsapp } from "react-icons/si";

export default function ContactUs() {
  // Bilingual UX (AR/EN)
  const [lang, setLang] = useState("ar");
  const t = useMemo(() => COPY[lang] || {}, [lang]);
  const isRTL = lang === "ar";
  useDir(lang);

  // Contact data shown on UI
  const CONTACT = {
    whatsapp: "201000000000", // number without +
    mobile: "+20 10 0000 0000", // public mobile instead of hotline
    email: "support@example.com",
  };

  // Form state + validation
  const [form, setForm] = useState({ name: "", phone: "", message: "" });
  const [files, setFiles] = useState([]); // FileList-like array
  const [status, setStatus] = useState({ type: "idle", msg: "" });
  const fileInputRef = useRef(null);

  const onChange = (e) => {
    const { name, value } = e.target;
    setForm((f) => ({ ...f, [name]: value }));
  };

  const onFiles = (e) => {
    const f = Array.from(e.target.files || []);
    // Simple guard: 10MB per file, max 5 files
    const TOO_BIG = f.find((x) => x.size > 10 * 1024 * 1024);
    if (TOO_BIG) {
      setStatus({ type: "error", msg: isRTL ? "الملف أكبر من 10MB" : "Attachment exceeds 10MB" });
      return;
    }
    if (f.length > 5) {
      setStatus({ type: "error", msg: isRTL ? "بحد أقصى 5 ملفات" : "Max 5 attachments" });
      return;
    }
    setStatus({ type: "idle", msg: "" });
    setFiles(f);
  };

  const validate = () => {
    const errors = [];
    if (!form.name || form.name.trim().length < 2)
      errors.push(isRTL ? "اكتبي اسمك الصحيح" : "Please enter a valid name");
    const egMobile = /^(010|011|012|015)\d{8}$/; // basic EG mobile
    const digits = form.phone.replace(/\D/g, "");
    if (!egMobile.test(digits))
      errors.push(isRTL ? "رقم الموبايل غير صحيح" : "Invalid Egyptian mobile number");
    if (!form.message || form.message.trim().length < 10)
      errors.push(isRTL ? "اكتبي رسالتك بوضوح (10 أحرف على الأقل)" : "Message must be at least 10 characters");
    return errors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus({ type: "idle", msg: "" });
    const errors = validate();
    if (errors.length) {
      setStatus({ type: "error", msg: errors.join(" • ") });
      return;
    }

    // Prefer real submission via backend if available
    const fd = new FormData();
    fd.set("name", form.name);
    fd.set("phone", form.phone);
    fd.set("message", form.message);
    files.forEach((f, i) => fd.append("attachments", f, f.name));

    try {
      const res = await fetch("/api/contact", { method: "POST", body: fd });
      if (!res.ok) throw new Error("Bad status");
      setStatus({ type: "success", msg: isRTL ? "تم إرسال الرسالة بنجاح ✅" : "Message sent successfully ✅" });
      setForm({ name: "", phone: "", message: "" });
      setFiles([]);
      if (fileInputRef.current) fileInputRef.current.value = "";
      return;
    } catch (_) {
      // Graceful fallback to mailto WITHOUT attachments
      const subject = encodeURIComponent(
        (isRTL ? "رسالة من الموقع" : "Website Message") + ` — ${form.name}`
      );
      const body = encodeURIComponent(
        // Include BOTH languages in the email body
        `Name: ${form.name}\nMobile: ${form.phone}\n\nMessage (EN):\n${form.message}\n\n` +
          `الاسم: ${form.name}\nالموبايل: ${form.phone}\n\nالرسالة (AR):\n${form.message}`
      );
      window.location.href = `mailto:${CONTACT.email}?subject=${subject}&body=${body}`;
      setStatus({
        type: "success",
        msg: isRTL
          ? "فتحنا البريد لإرسال رسالتك (المرفقات غير مدعومة عبر الإيميل المباشر)."
          : "Opened your email client (attachments not supported via mailto).",
      });
      setForm({ name: "", phone: "", message: "" });
      setFiles([]);
      if (fileInputRef.current) fileInputRef.current.value = "";
    }
  };

  const labels = {
    whatsapp: isRTL ? "واتساب" : "WhatsApp",
    mobile: isRTL ? "موبايل" : "Mobile",
    email: isRTL ? "البريد الإلكتروني" : "Email",
    attachments: isRTL ? "مرفقات (اختياري)" : "Attachments (optional)",
    chooseFiles: isRTL ? "اختيار ملفات" : "Choose files",
    dropHint: isRTL ? "اسحبي الملفات هنا أو اضغطي للاختيار" : "Drag files here or click to choose",
  };

  return (
    <div className="min-h-screen bg-white text-neutral-900">
      <PromoBar
        text={t.promo}
        lang={lang}
        onToggleLang={() => setLang(isRTL ? "en" : "ar")}
        brand={BRAND}
      />
      <Header brand={BRAND} searchPlaceholder={t.search} lang={lang} />

      <main className="max-w-7xl mx-auto">
        {/* Page header */}
        <header className="px-4 pt-6 pb-4">
          <h1 className="text-2xl md:text-3xl font-extrabold">
            {isRTL ? "تواصلِي معنا" : "Contact Us"}
          </h1>
          <p className="text-neutral-600 mt-1">
            {isRTL
              ? "موقعنا يدعم العربية والإنجليزية — بنرد بأسرع ما يمكن خلال مواعيد العمل."
              : "Site supports English & Arabic — we reply during business hours."}
          </p>
        </header>

        {/* Quick access actions */}
        <section className="px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3 md:gap-4">
            <a
              href={`https://wa.me/${CONTACT.whatsapp}`}
              className="rounded-2xl border border-neutral-200 p-4 flex items-center gap-3 bg-neutral-50 hover:bg-neutral-100 transition"
            >
              <div className="shrink-0 rounded-xl p-2 border"><SiWhatsapp className="w-5 h-5" /></div>
              <div>
                <div className="font-bold">{labels.whatsapp}</div>
                <div className="text-sm text-neutral-600">{`+${CONTACT.whatsapp}`}</div>
              </div>
            </a>
            <a
              href={`tel:${CONTACT.mobile.replace(/\s/g, "")}`}
              className="rounded-2xl border border-neutral-200 p-4 flex items-center gap-3 bg-neutral-50 hover:bg-neutral-100 transition"
            >
              <div className="shrink-0 rounded-xl p-2 border"><Phone className="w-5 h-5" /></div>
              <div>
                <div className="font-bold">{labels.mobile}</div>
                <div className="text-sm text-neutral-600">{CONTACT.mobile}</div>
              </div>
            </a>
            <a
              href={`mailto:${CONTACT.email}`}
              className="rounded-2xl border border-neutral-200 p-4 flex items-center gap-3 bg-neutral-50 hover:bg-neutral-100 transition"
            >
              <div className="shrink-0 rounded-xl p-2 border"><Mail className="w-5 h-5" /></div>
              <div>
                <div className="font-bold">{labels.email}</div>
                <div className="text-sm text-neutral-600">{CONTACT.email}</div>
              </div>
            </a>
          </div>
        </section>

        {/* Form + Info */}
        <section className="px-4 py-6 md:py-8 grid md:grid-cols-12 gap-5 items-start">
          {/* Form */}
          <div className="md:col-span-7">
            <form onSubmit={handleSubmit} className="rounded-3xl border border-neutral-200 p-5 md:p-6 bg-white">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="name" className="block text-sm font-bold mb-1">
                    {isRTL ? "الاسم" : "Name"}
                  </label>
                  <input
                    id="name"
                    name="name"
                    type="text"
                    value={form.name}
                    onChange={onChange}
                    placeholder={isRTL ? "اكتبي اسمك" : "Your name"}
                    className="w-full rounded-2xl border border-neutral-300 px-3 py-2 focus:outline-none focus:ring-2"
                    style={{ outlineColor: BRAND.primary }}
                    dir={isRTL ? "rtl" : "ltr"}
                    required
                  />
                </div>
                <div>
                  <label htmlFor="phone" className="block text-sm font-bold mb-1">
                    {isRTL ? "رقم الموبايل" : "Mobile"}
                  </label>
                  <input
                    id="phone"
                    name="phone"
                    type="tel"
                    inputMode="tel"
                    value={form.phone}
                    onChange={onChange}
                    placeholder={isRTL ? "01X XXXXXXXX / +20" : "+20 1X XXXXXXXX / 01X"}
                    className="w-full rounded-2xl border border-neutral-300 px-3 py-2 focus:outline-none focus:ring-2"
                    style={{ outlineColor: BRAND.primary }}
                    dir={isRTL ? "rtl" : "ltr"}
                    required
                  />
                </div>
              </div>

              <div className="mt-4">
                <label htmlFor="message" className="block text-sm font-bold mb-1">
                  {isRTL ? "رسالتك" : "Message"}
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows={6}
                  value={form.message}
                  onChange={onChange}
                  placeholder={isRTL ? "اكتبي تفاصيلك بالعربي أو بالإنجليزي" : "Write your details in EN or AR"}
                  className="w-full rounded-2xl border border-neutral-300 px-3 py-2 focus:outline-none focus:ring-2"
                  style={{ outlineColor: BRAND.primary }}
                  dir={isRTL ? "rtl" : "ltr"}
                  required
                />
              </div>

              {/* Attachments (styled) */}
              <div className="mt-4">
                <label className="block text-sm font-bold mb-2" htmlFor="attachments">
                  {labels.attachments}
                </label>
                <div
                  className="rounded-2xl border-2 border-dashed border-neutral-300 bg-neutral-50 p-4"
                >
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                    <div className="text-sm text-neutral-600">
                      {labels.dropHint}
                    </div>
                    <button
                      type="button"
                      onClick={() => fileInputRef.current?.click()}
                      className="inline-flex items-center gap-2 px-4 py-2 rounded-xl border border-neutral-300 bg-white hover:bg-neutral-100 text-sm font-semibold"
                    >
                      <Upload className="w-4 h-4" /> {labels.chooseFiles}
                    </button>
                  </div>
                  <input
                    id="attachments"
                    ref={fileInputRef}
                    type="file"
                    multiple
                    accept="image/*,application/pdf"
                    onChange={onFiles}
                    className="hidden"
                  />

                  {files.length > 0 && (
                    <ul className="mt-3 text-sm text-neutral-700 space-y-1">
                      {files.map((f, i) => (
                        <li key={i} className="flex items-center gap-2">
                          <Upload className="w-4 h-4" /> <span>{f.name}</span>
                          <span className="text-neutral-500">({(f.size / 1024 / 1024).toFixed(2)} MB)</span>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
                <p className="text-xs text-neutral-500 mt-2">
                  {isRTL ? "مسموح PNG/JPG/PDF حتى 10MB لكل ملف، بحد أقصى 5 ملفات." : "Allowed PNG/JPG/PDF up to 10MB per file, max 5 files."}
                </p>
              </div>

              {status.type !== "idle" && (
                <div
                  className={`mt-3 text-sm rounded-2xl px-3 py-2 border ${
                    status.type === "error"
                      ? "bg-red-50 border-red-200 text-red-700"
                      : "bg-green-50 border-green-200 text-green-700"
                  }`}
                  role={status.type === "error" ? "alert" : "status"}
                >
                  {status.msg}
                </div>
              )}

              <div className="mt-4">
                <button
                  type="submit"
                  className="inline-flex items-center gap-2 px-5 py-2.5 text-white font-semibold rounded-2xl shadow-sm"
                  style={{ background: BRAND.primary }}
                >
                  <Send className="w-4 h-4" /> {isRTL ? "إرسال" : "Send"}
                </button>
              </div>
            </form>
          </div>

          {/* Info / Hours / Tips */}
          <aside className="md:col-span-5">
            <div className="rounded-3xl border border-neutral-200 p-5 md:p-6 bg-neutral-50">
              <div className="text-lg font-extrabold">{isRTL ? "مواعيد الرد" : "Response Hours"}</div>
              <p className="text-neutral-700 mt-1 text-sm">
                {isRTL
                  ? "السبت – الخميس: 10 صباحًا إلى 6 مساءً. الجمعة: إجازة."
                  : "Sat – Thu: 10:00–18:00. Fri: Closed."}
              </p>
              <hr className="my-4" />
              <div className="text-lg font-extrabold">{isRTL ? "نصائح لتسريع الدعم" : "Tips to speed support"}</div>
              <ul className="list-disc ms-5 text-sm text-neutral-700 mt-1 space-y-1">
                <li>{isRTL ? "اذكري رقم الطلب إن وُجد." : "Include your order ID if applicable."}</li>
                <li>{isRTL ? "ارفقي صور/ملفات للمشكلة (حتى 10MB لكل ملف)." : "Attach photos/files (up to 10MB each)."}</li>
                <li>{isRTL ? "اختاري وسيلة تواصل واحدة لتجنّب الازدواج." : "Use a single channel to avoid duplicates."}</li>
              </ul>
            </div>
          </aside>
        </section>

        {/* Keep UX parity with About page */}
        <section className="px-4 pb-10">
          <QuickFAQ brand={BRAND} />
        </section>
      </main>

      <Footer brand={BRAND} lang={lang} copy={t} />
      <BottomTabs
        labels={{
          home: isRTL ? "الرئيسية" : "Home",
          cats: isRTL ? "الفئات" : "Categories",
          cart: isRTL ? "السلة" : "Bag",
          wish: isRTL ? "المفضلة" : "Wishlist",
          account: isRTL ? "حسابي" : "Account",
        }}
      />
    </div>
  );
}
