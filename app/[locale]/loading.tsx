"use client";

import { useParams } from "next/navigation";
import PageLoader from "@/components/ui/PageLoader";

export default function LocaleLoading() {
  const params = useParams();
  const lang = params?.locale === "en" ? "en" : "ar";

  return <PageLoader message={lang === "en" ? "Loading…" : "جاري التحميل…"} />;
}
