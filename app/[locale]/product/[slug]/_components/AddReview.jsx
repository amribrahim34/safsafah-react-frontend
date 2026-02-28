'use client';

import React, { useState, useEffect } from "react";
import { Star } from "lucide-react";
import { productsService } from "@/lib/api/services/products.service";

/**
 * AddReview
 * Lets an authenticated user write or edit a review for the product.
 * Only renders if `product.canAddRating` is true (set by the backend).
 *
 * @param {Object}   product
 * @param {Object}   brand
 * @param {string}   lang        - "ar" | "en"
 * @param {Object}   userReview  - existing review (if any)
 * @param {Function} onSuccess   - called after successful submit/update
 */
export default function AddReview({ product, brand, lang, userReview, onSuccess }) {
  const [rating, setRating] = useState(0);
  const [hoveredRating, setHoveredRating] = useState(0);
  const [comment, setComment] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const [showForm, setShowForm] = useState(false);

  const isEditing = Boolean(userReview);

  // Populate form with existing review when editing
  useEffect(() => {
    if (userReview) {
      setRating(userReview.rating ?? 0);
      setComment(userReview.comment ?? "");
      setShowForm(true);
    }
  }, [userReview]);

  // Only render for purchasers who can rate
  if (!product?.canAddRating) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);

    if (rating === 0) {
      setError(lang === "ar" ? "الرجاء اختيار تقييم" : "Please select a rating");
      return;
    }
    if (!comment.trim()) {
      setError(lang === "ar" ? "الرجاء كتابة مراجعتك" : "Please enter your review");
      return;
    }

    setIsSubmitting(true);
    try {
      if (isEditing && userReview?.id) {
        await productsService.updateReview(userReview.id, rating, comment.trim());
      } else {
        await productsService.submitReview(product.id, rating, comment.trim());
        setRating(0);
        setComment("");
        setShowForm(false);
      }
      setSuccess(
        lang === "ar"
          ? isEditing ? "تم تحديث المراجعة بنجاح!" : "تم إرسال المراجعة بنجاح!"
          : isEditing ? "Review updated successfully!" : "Review submitted successfully!"
      );
      onSuccess?.();
    } catch (err) {
      console.error("Failed to submit review:", err);
      setError(
        lang === "ar"
          ? isEditing ? "فشل في تحديث المراجعة. الرجاء المحاولة مرة أخرى." : "فشل في إرسال المراجعة. الرجاء المحاولة مرة أخرى."
          : isEditing ? "Failed to update review. Please try again." : "Failed to submit review. Please try again."
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!showForm) {
    return (
      <div className="mt-4">
        <button
          onClick={() => setShowForm(true)}
          className="px-5 py-3 rounded-2xl border font-semibold hover:bg-neutral-50 transition-colors"
          style={{ borderColor: brand.primary, color: brand.primary }}
        >
          {lang === "ar"
            ? isEditing ? "تعديل المراجعة" : "اكتب مراجعة"
            : isEditing ? "Edit Review" : "Write a Review"}
        </button>
      </div>
    );
  }

  return (
    <div className="mt-4 border border-neutral-200 rounded-2xl p-4">
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-bold text-lg">
          {lang === "ar"
            ? isEditing ? "تعديل مراجعتك" : "اكتب مراجعتك"
            : isEditing ? "Edit Your Review" : "Write Your Review"}
        </h3>
        <button
          onClick={() => setShowForm(false)}
          className="text-neutral-600 hover:text-neutral-900 text-2xl leading-none"
          aria-label="Close"
        >
          ×
        </button>
      </div>

      <form onSubmit={handleSubmit}>
        {/* Star rating */}
        <div className="mb-4">
          <label className="block text-sm font-semibold mb-2">
            {lang === "ar" ? "التقييم" : "Rating"}
            <span className="text-red-500 ms-1">*</span>
          </label>
          <div className="flex items-center gap-1">
            {[1, 2, 3, 4, 5].map((star) => (
              <button
                key={star}
                type="button"
                onClick={() => setRating(star)}
                onMouseEnter={() => setHoveredRating(star)}
                onMouseLeave={() => setHoveredRating(0)}
                className="focus:outline-none transition-transform hover:scale-110"
                aria-label={`${star} star${star !== 1 ? "s" : ""}`}
              >
                <Star
                  className={`w-8 h-8 ${
                    star <= (hoveredRating || rating)
                      ? "fill-amber-400 text-amber-400"
                      : "text-neutral-300"
                  }`}
                />
              </button>
            ))}
            {rating > 0 && (
              <span className="ms-2 text-sm text-neutral-600">
                {rating} {lang === "ar" ? "نجوم" : "stars"}
              </span>
            )}
          </div>
        </div>

        {/* Comment textarea */}
        <div className="mb-4">
          <label className="block text-sm font-semibold mb-2">
            {lang === "ar" ? "المراجعة" : "Your Review"}
            <span className="text-red-500 ms-1">*</span>
          </label>
          <textarea
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            placeholder={
              lang === "ar"
                ? "شارك تجربتك مع هذا المنتج..."
                : "Share your experience with this product..."
            }
            className="w-full px-4 py-3 border border-neutral-300 rounded-xl focus:outline-none focus:ring-2 resize-none"
            rows={4}
            maxLength={500}
            disabled={isSubmitting}
          />
          <div className="text-xs text-neutral-500 mt-1 text-end">
            {comment.length}/500
          </div>
        </div>

        {/* Error / success messages */}
        {error && (
          <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-xl text-red-700 text-sm">
            {error}
          </div>
        )}
        {success && (
          <div className="mb-4 p-3 bg-green-50 border border-green-200 rounded-xl text-green-700 text-sm">
            {success}
          </div>
        )}

        {/* Actions */}
        <div className="flex items-center gap-3">
          <button
            type="submit"
            disabled={isSubmitting}
            className="px-6 py-3 rounded-2xl text-white font-semibold disabled:opacity-50 disabled:cursor-not-allowed"
            style={{ background: brand.primary }}
          >
            {isSubmitting
              ? lang === "ar" ? isEditing ? "جاري التحديث..." : "جاري الإرسال..." : isEditing ? "Updating..." : "Submitting..."
              : lang === "ar" ? isEditing ? "تحديث المراجعة" : "إرسال المراجعة" : isEditing ? "Update Review" : "Submit Review"}
          </button>
          <button
            type="button"
            onClick={() => setShowForm(false)}
            disabled={isSubmitting}
            className="px-6 py-3 rounded-2xl border border-neutral-300 font-semibold hover:bg-neutral-50 disabled:opacity-50"
          >
            {lang === "ar" ? "إلغاء" : "Cancel"}
          </button>
        </div>
      </form>
    </div>
  );
}
