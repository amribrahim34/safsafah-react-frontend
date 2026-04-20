'use client';

import { useMemo } from "react";
import { useAppSelector } from "@/store/hooks";
import AddReview from "./AddReview";
import type { Product } from "@/types/models/product";
import type { BrandColors, LocalReview } from "../types";

interface AuthGatedReviewProps {
  product: Product;
  brand: BrandColors;
  lang: string;
  reviews: LocalReview[];
}

export default function AuthGatedReview({ product, brand, lang, reviews }: AuthGatedReviewProps) {
  const { isAuthenticated, user } = useAppSelector((state) => state.auth) as {
    isAuthenticated: boolean;
    user: { id: string } | null;
  };

  const userReview = useMemo<LocalReview | null>(() => {
    if (!user || !reviews.length) return null;
    return reviews.find((r) => r.userId === user.id || r.user_id === user.id) ?? null;
  }, [user, reviews]);

  if (!isAuthenticated) return null;

  return <AddReview product={product} brand={brand} lang={lang} userReview={userReview} />;
}
