import { useEffect } from "react";
export function useDir(lang) {
  useEffect(() => {
    document.documentElement.dir = lang === "ar" ? "rtl" : "ltr";
  }, [lang]);
}
