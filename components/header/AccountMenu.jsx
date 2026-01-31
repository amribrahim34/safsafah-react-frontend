import React, { useEffect, useRef } from "react";
import Link from "next/link";

export default function AccountMenu({ lang, brand, user, onClose, onLogout }) {
  const ref = useRef(null);

  // close on outside click / Esc
  useEffect(() => {
    const onClick = (e) => { if (ref.current && !ref.current.contains(e.target)) onClose?.(); };
    const onKey = (e) => { if (e.key === "Escape") onClose?.(); };
    document.addEventListener("mousedown", onClick);
    document.addEventListener("keydown", onKey);
    return () => { document.removeEventListener("mousedown", onClick); document.removeEventListener("keydown", onKey); };
  }, [onClose]);

  return (
    <div
      ref={ref}
      className="absolute right-0 mt-2 w-64 rounded-2xl border border-neutral-200 bg-white shadow-lg p-2"
    >
      {user ? (
        <>
          <div className="px-2 py-2 rounded-xl bg-neutral-50">
            <div className="text-sm font-semibold truncate">{user.name}</div>
            <div className="text-xs text-neutral-600 truncate">{user.email}</div>
          </div>
          <div className="mt-2 grid">
            <MenuLink to="/account" label={lang === "ar" ? "حسابي" : "My account"} />
            <MenuLink to="/orders" label={lang === "ar" ? "طلباتي" : "My orders"} />
            <MenuLink to="/addresses" label={lang === "ar" ? "العناوين" : "Addresses"} />
            <MenuLink to="/wishlist" label={lang === "ar" ? "المفضلة" : "Wishlist"} />
          </div>
          <button
            onClick={() => { onLogout?.(); onClose?.(); }}
            className="mt-2 w-full px-3 py-2 rounded-xl text-sm font-semibold text-white"
            style={{ background: brand.primary }}
          >
            {lang === "ar" ? "تسجيل الخروج" : "Sign out"}
          </button>
        </>
      ) : (
        <>
          <div className="px-2 py-2 text-sm text-neutral-700">
            {lang === "ar" ? "أنت غير مسجل الدخول." : "You’re not signed in."}
          </div>
          <div className="grid gap-2">
            <Link
              href="/login"
              onClick={onClose}
              className="w-full px-3 py-2 rounded-xl text-center text-sm font-semibold text-white"
              style={{ background: brand.primary }}
            >
              {lang === "ar" ? "تسجيل الدخول" : "Sign in"}
            </Link>
            <Link
              href="/signup"
              onClick={onClose}
              className="w-full px-3 py-2 rounded-xl text-center text-sm font-semibold border"
              style={{ borderColor: brand.primary, color: brand.primary }}
            >
              {lang === "ar" ? "إنشاء حساب" : "Create account"}
            </Link>
          </div>
        </>
      )}
    </div>
  );
}

function MenuLink({ to, label }) {
  return (
    <Link
      href={to}
      className="px-3 py-2 rounded-xl text-sm hover:bg-neutral-50"
    >
      {label}
    </Link>
  );
}
