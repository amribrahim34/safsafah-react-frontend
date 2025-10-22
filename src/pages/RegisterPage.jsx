import React, { useMemo, useState } from "react";
import { BRAND } from "../content/brand";
import { COPY } from "../content/copy";
import { useDir } from "../hooks/useDir";
import { IMG } from "../content/images";

export default function RegisterPage() {
  const [lang, setLang] = useState("ar");
  const T = useMemo(() => COPY[lang], [lang]);
  useDir(lang);
  const isRTL = lang === "ar";

  // form
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [mobile, setMobile] = useState("");
  const [password, setPassword] = useState("");
  const [showPw, setShowPw] = useState(false);
  const [agree, setAgree] = useState(true);
  const [err, setErr] = useState("");

  const validate = () => {
    if (name.trim().split(" ").length < 2)
      return isRTL ? "اكتب الاسم بالكامل" : "Enter full name";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim()))
      return isRTL ? "بريد إلكتروني غير صالح" : "Invalid email";
    if (!/^(01|\+201)[0-9]{8,10}$/.test(mobile.trim()))
      return isRTL ? "رقم موبايل غير صالح" : "Invalid mobile number";
    if (password.length < 6)
      return isRTL ? "كلمة المرور 6 أحرف على الأقل" : "Password must be at least 6 characters";
    if (!agree)
      return isRTL ? "يجب الموافقة على الشروط" : "You must agree to the terms";
    return "";
  };

  const submit = (e) => {
    e.preventDefault();
    const v = validate();
    if (v) return setErr(v);
    setErr("");
    // TODO: POST /auth/register { name, email, mobile, password }
    console.log("REGISTER", { name, email, mobile, password });
    alert(isRTL ? "تم إنشاء الحساب (تجريبي)" : "Account created (demo)");
  };

  return (
    <div className="min-h-screen bg-white text-neutral-900">
      {/* Split layout: image (desktop) + form; no header/footer */}
      <div className="grid min-h-screen md:grid-cols-2">
        {/* Visual side (desktop) */}
        <aside className="relative hidden md:block">
          <img src={IMG.bannerWide} alt="Skincare visual" className="absolute inset-0 w-full h-full object-cover" />
          <div className="absolute inset-0 bg-black/30" />
          <div className="absolute bottom-8 left-8 right-8 text-white">
            <div className="text-3xl font-black tracking-tight">SAFSAFAH</div>
            <p className="mt-1 text-sm opacity-90">
              {isRTL ? "انضمي إلى مجتمع الجمال في مصر." : "Join Egypt’s beauty community."}
            </p>
          </div>
        </aside>

        {/* Form side */}
        <main className="flex flex-col">
          {/* Top bar: language switch */}
          <div className="flex items-center justify-end px-5 py-4">
            <button
              onClick={() => setLang(isRTL ? "en" : "ar")}
              className="text-sm px-3 py-1.5 rounded-xl border"
              style={{ borderColor: BRAND.primary, color: BRAND.primary }}
            >
              {isRTL ? "English" : "العربية"}
            </button>
          </div>

          <div className="flex-1 flex items-center">
            <div className="w-full max-w-xl md:max-w-[42rem] mx-auto px-5">
              <h1 className="text-2xl md:text-3xl font-extrabold">
                {isRTL ? "إنشاء حساب" : "Create account"}
              </h1>
              <p className="text-neutral-600 mt-1 mb-6">
                {isRTL ? "سجّل باسمك وبريدك أو رقم موبايلك." : "Sign up with your name, email and mobile."}
              </p>

              <form onSubmit={submit} className="rounded-3xl border border-neutral-200 p-4 md:p-6 bg-white">
                <div className="grid gap-4 md:grid-cols-2">
                  {/* Name (full) */}
                  <label className="md:col-span-2">
                    <div className="text-sm font-semibold mb-1">{isRTL ? "الاسم بالكامل" : "Full name"}</div>
                    <input
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder={isRTL ? "الاسم الأول واسم العائلة" : "First & last name"}
                      className={`w-full rounded-2xl border border-neutral-300 px-3 py-3 ${isRTL ? "text-right" : ""}`}
                      style={{ outlineColor: BRAND.primary }}
                    />
                  </label>

                  {/* Email */}
                  <label>
                    <div className="text-sm font-semibold mb-1">{isRTL ? "البريد الإلكتروني" : "Email"}</div>
                    <input
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      inputMode="email"
                      placeholder="name@example.com"
                      className={`w-full rounded-2xl border border-neutral-300 px-3 py-3 ${isRTL ? "text-right" : ""}`}
                      style={{ outlineColor: BRAND.primary }}
                    />
                  </label>

                  {/* Mobile */}
                  <label>
                    <div className="text-sm font-semibold mb-1">{isRTL ? "رقم الموبايل" : "Mobile number"}</div>
                    <input
                      value={mobile}
                      onChange={(e) => setMobile(e.target.value)}
                      inputMode="tel"
                      placeholder={isRTL ? "01xxxxxxxxx أو +201xxxxxxxxx" : "01xxxxxxxxx or +201xxxxxxxxx"}
                      className={`w-full rounded-2xl border border-neutral-300 px-3 py-3 ${isRTL ? "text-right" : ""}`}
                      style={{ outlineColor: BRAND.primary }}
                    />
                  </label>

                  {/* Password (spans 2) */}
                  <label className="md:col-span-2">
                    <div className="text-sm font-semibold mb-1">{isRTL ? "كلمة المرور" : "Password"}</div>
                    <div className="relative">
                      <input
                        type={showPw ? "text" : "password"}
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder={isRTL ? "••••••••" : "••••••••"}
                        className="w-full rounded-2xl border border-neutral-300 px-3 py-3"
                        style={{ outlineColor: BRAND.primary }}
                      />
                      <button
                        type="button"
                        onClick={() => setShowPw((s) => !s)}
                        className={`absolute top-1/2 -translate-y-1/2 text-sm text-neutral-700 ${isRTL ? "left-3" : "right-3"}`}
                      >
                        {showPw ? (isRTL ? "إخفاء" : "Hide") : (isRTL ? "إظهار" : "Show")}
                      </button>
                    </div>
                    <div className="text-xs text-neutral-600 mt-1">
                      {isRTL ? "على الأقل 6 أحرف." : "At least 6 characters."}
                    </div>
                  </label>
                </div>

                {/* agree */}
                <label className="flex items-center gap-2 mt-4 text-sm">
                  <input type="checkbox" checked={agree} onChange={(e) => setAgree(e.target.checked)} />
                  <span>
                    {isRTL ? "أوافق على الشروط وسياسة الخصوصية" : "I agree to the Terms & Privacy Policy"}
                  </span>
                </label>

                {err && <div className="text-sm text-red-600 mt-2">{err}</div>}

                <button
                  type="submit"
                  className="w-full mt-4 md:mt-6 px-5 py-3 rounded-2xl text-white font-semibold"
                  style={{ background: BRAND.primary }}
                >
                  {isRTL ? "إنشاء حساب" : "Create account"}
                </button>

                <div className="text-sm text-neutral-700 mt-3">
                  {isRTL ? "لديك حساب؟" : "Already have an account?"}{" "}
                  <a href="/login" className="font-semibold" style={{ color: BRAND.primary }}>
                    {isRTL ? "تسجيل الدخول" : "Sign in"}
                  </a>
                </div>
              </form>
            </div>
          </div>
        </main>

        {/* Mobile hero (top strip) */}
        <div className="md:hidden relative h-40">
          <img src={IMG.bannerTall} alt="Skincare" className="absolute inset-0 w-full h-full object-cover" />
          <div className="absolute inset-0 bg-black/25" />
        </div>
      </div>
    </div>
  );
}
