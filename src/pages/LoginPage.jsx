import React, { useMemo, useState } from "react";
import { BRAND } from "../content/brand";
import { COPY } from "../content/copy";
import { useDir } from "../hooks/useDir";
import { IMG } from "../content/images";

export default function LoginPage() {
  const [lang, setLang] = useState("ar");
  const T = useMemo(() => COPY[lang], [lang]);
  useDir(lang);
  const isRTL = lang === "ar";

  // form state
  const [mode, setMode] = useState("email"); // "email" | "mobile"
  const [identifier, setIdentifier] = useState("");
  const [password, setPassword] = useState("");
  const [showPw, setShowPw] = useState(false);
  const [err, setErr] = useState("");

  const validate = () => {
    if (mode === "email") {
      const ok = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(identifier.trim());
      if (!ok) return isRTL ? "أدخل بريدًا إلكترونيًا صحيحًا" : "Enter a valid email address";
    } else {
      const ok = /^(01|\+201)[0-9]{8,10}$/.test(identifier.trim()); // Egypt
      if (!ok) return isRTL ? "أدخل رقم موبايل صحيحًا" : "Enter a valid mobile number";
    }
    if (password.length < 6) return isRTL ? "كلمة المرور يجب أن تكون 6 أحرف على الأقل" : "Password must be at least 6 characters";
    return "";
  };

  const submit = (e) => {
    e.preventDefault();
    const v = validate();
    if (v) return setErr(v);
    setErr("");
    // TODO: call /auth/login
    console.log("LOGIN", { mode, identifier, password });
    alert(isRTL ? "تم تسجيل الدخول (تجريبي)" : "Logged in (demo)");
  };

  return (
    <div className="min-h-screen bg-white text-neutral-900">
      {/* Split auth layout: image + form (no header/footer) */}
      <div className="grid min-h-screen md:grid-cols-2">
        {/* Visual side */}
        <aside className="relative hidden md:block">
          <img
            src={IMG.bannerWide}
            alt="Skincare visual"
            className="absolute inset-0 w-full h-full object-cover"
          />
          <div
            className="absolute inset-0"
            style={{ background: "linear-gradient(180deg, rgba(0,0,0,0.15) 0%, rgba(0,0,0,0.35) 100%)" }}
          />
          <div className="absolute bottom-8 left-8 right-8 text-white">
            <div className="text-3xl font-black tracking-tight">SAFSAFAH</div>
            <p className="mt-1 text-sm opacity-90">
              {isRTL ? "دخول سريع لإدارة طلباتك وتتبع الشحن." : "Sign in to manage orders and track delivery."}
            </p>
          </div>
        </aside>

        {/* Form side */}
        <main className="flex flex-col">
          {/* simple top bar with language switch */}
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
            {/* wider container on desktop */}
            <div className="w-full max-w-xl md:max-w-[42rem] mx-auto px-5">
              <h1 className="text-2xl md:text-3xl font-extrabold">
                {isRTL ? "تسجيل الدخول" : "Sign in"}
              </h1>
              <p className="text-neutral-600 mt-1 mb-6">
                {isRTL ? "استخدم البريد الإلكتروني أو الموبايل. بدون رمز تحقق." : "Use email or mobile. No OTP needed."}
              </p>

              {/* mode pills */}
              <div className="inline-flex rounded-2xl border border-neutral-200 p-1 mb-4 bg-neutral-50">
                <button
                  type="button"
                  onClick={() => setMode("email")}
                  className={`px-3 py-2 rounded-xl text-sm font-semibold ${mode === "email" ? "text-white" : ""}`}
                  style={{ background: mode === "email" ? BRAND.primary : "transparent", color: mode === "email" ? "#fff" : undefined }}
                >
                  {isRTL ? "البريد الإلكتروني" : "Email"}
                </button>
                <button
                  type="button"
                  onClick={() => setMode("mobile")}
                  className={`px-3 py-2 rounded-xl text-sm font-semibold ${mode === "mobile" ? "text-white" : ""}`}
                  style={{ background: mode === "mobile" ? BRAND.primary : "transparent", color: mode === "mobile" ? "#fff" : undefined }}
                >
                  {isRTL ? "الموبايل" : "Mobile"}
                </button>
              </div>

              <form
                onSubmit={submit}
                className="rounded-3xl border border-neutral-200 p-4 md:p-6 bg-white"
              >
                {/* two-column on wide screens to feel airier */}
                <div className="grid gap-4 md:grid-cols-2">
                  {/* identifier spans 2 cols on mobile; 1 on desktop */}
                  <label className="md:col-span-2">
                    <div className="text-sm font-semibold mb-1">
                      {mode === "email" ? (isRTL ? "البريد الإلكتروني" : "Email") : (isRTL ? "رقم الموبايل" : "Mobile number")}
                    </div>
                    <input
                      value={identifier}
                      onChange={(e) => setIdentifier(e.target.value)}
                      inputMode={mode === "email" ? "email" : "tel"}
                      placeholder={
                        mode === "email"
                          ? (isRTL ? "name@example.com" : "name@example.com")
                          : (isRTL ? "01xxxxxxxxx أو +201xxxxxxxxx" : "01xxxxxxxxx or +201xxxxxxxxx")
                      }
                      className={`w-full rounded-2xl border border-neutral-300 px-3 py-3 ${isRTL ? "text-right" : ""}`}
                      style={{ outlineColor: BRAND.primary }}
                    />
                  </label>

                  {/* password */}
                  <label className="md:col-span-2">
                    <div className="flex items-center justify-between">
                      <div className="text-sm font-semibold mb-1">{isRTL ? "كلمة المرور" : "Password"}</div>
                      <a href="/forgot" className="text-xs underline text-neutral-700">
                        {isRTL ? "نسيت كلمة المرور؟" : "Forgot password?"}
                      </a>
                    </div>
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
                  </label>
                </div>

                {err && <div className="text-sm text-red-600 mt-2">{err}</div>}

                <button
                  type="submit"
                  className="w-full mt-4 md:mt-6 px-5 py-3 rounded-2xl text-white font-semibold"
                  style={{ background: BRAND.primary }}
                >
                  {isRTL ? "تسجيل الدخول" : "Sign in"}
                </button>

                <div className="text-xs text-neutral-600 mt-2">
                  {isRTL
                    ? "بالمتابعة أنت توافق على الشروط وسياسة الخصوصية."
                    : "By continuing you agree to the Terms & Privacy Policy."}
                </div>
              </form>

              <div className="text-sm text-neutral-700 mt-4">
                {isRTL ? "لا تملك حسابًا؟" : "Don’t have an account?"}{" "}
                <a href="/signup" className="font-semibold" style={{ color: BRAND.primary }}>
                  {isRTL ? "إنشاء حساب" : "Create one"}
                </a>
              </div>
            </div>
          </div>
        </main>

        {/* Mobile hero image at the top (shows when md:hidden) */}
        <div className="md:hidden relative h-48">
          <img src={IMG.bannerTall} alt="Skincare" className="absolute inset-0 w-full h-full object-cover" />
          <div className="absolute inset-0 bg-black/25" />
        </div>
      </div>
    </div>
  );
}
