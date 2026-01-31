import React, { useState, useEffect } from "react";
import { Star } from "lucide-react";
import { productsService } from "../../lib/api/services/products.service";

export default function AddReview({ product, brand, lang, onSuccess, userReview }) {
  const [rating, setRating] = useState(0);
  const [hoveredRating, setHoveredRating] = useState(0);
  const [comment, setComment] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState(null);
  const [showForm, setShowForm] = useState(false);

  const isEditing = !!userReview;

  // Populate form with existing review data when editing
  useEffect(() => {
    if (userReview) {
      setRating(userReview.rating || 0);
      setComment(userReview.comment || "");
      setShowForm(true); // Auto-open form if user has a review
    }
  }, [userReview]);

  if (!product?.canAddRating) {
    return null;
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    // Validation
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
        // Update existing review
        await productsService.updateReview(userReview.id, rating, comment.trim());
      } else {
        // Create new review
        await productsService.submitReview(product.id, rating, comment.trim());
      }

      // Reset form if creating new review
      if (!isEditing) {
        setRating(0);
        setComment("");
        setShowForm(false);
      }

      // Callback for success
      if (onSuccess) {
        onSuccess();
      }

      // Show success message (you could use a toast notification instead)
      alert(
        lang === "ar"
          ? isEditing
            ? "تم تحديث المراجعة بنجاح!"
            : "تم إرسال المراجعة بنجاح!"
          : isEditing
          ? "Review updated successfully!"
          : "Review submitted successfully!"
      );
    } catch (err) {
      console.error("Failed to submit review:", err);
      setError(
        lang === "ar"
          ? isEditing
            ? "فشل في تحديث المراجعة. الرجاء المحاولة مرة أخرى."
            : "فشل في إرسال المراجعة. الرجاء المحاولة مرة أخرى."
          : isEditing
          ? "Failed to update review. Please try again."
          : "Failed to submit review. Please try again."
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
            ? isEditing
              ? "تعديل المراجعة"
              : "اكتب مراجعة"
            : isEditing
            ? "Edit Review"
            : "Write a Review"}
        </button>
      </div>
    );
  }

  return (
    <div className="mt-4 border border-neutral-200 rounded-2xl p-4">
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-bold text-lg">
          {lang === "ar"
            ? isEditing
              ? "تعديل مراجعتك"
              : "اكتب مراجعتك"
            : isEditing
            ? "Edit Your Review"
            : "Write Your Review"}
        </h3>
        <button
          onClick={() => setShowForm(false)}
          className="text-neutral-600 hover:text-neutral-900 text-2xl leading-none"
        >
          ×
        </button>
      </div>

      <form onSubmit={handleSubmit}>
        {/* Star Rating Input */}
        <div className="mb-4">
          <label className="block text-sm font-semibold mb-2">
            {lang === "ar" ? "التقييم" : "Rating"}
            <span className="text-red-500 ml-1">*</span>
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
              <span className="ml-2 text-sm text-neutral-600">
                {rating} {lang === "ar" ? "نجوم" : "stars"}
              </span>
            )}
          </div>
        </div>

        {/* Comment Textarea */}
        <div className="mb-4">
          <label className="block text-sm font-semibold mb-2">
            {lang === "ar" ? "المراجعة" : "Your Review"}
            <span className="text-red-500 ml-1">*</span>
          </label>
          <textarea
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            placeholder={
              lang === "ar"
                ? "شارك تجربتك مع هذا المنتج..."
                : "Share your experience with this product..."
            }
            className="w-full px-4 py-3 border border-neutral-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-opacity-50 resize-none"
            style={{ focusRingColor: brand.primary }}
            rows={4}
            maxLength={500}
            disabled={isSubmitting}
          />
          <div className="text-xs text-neutral-500 mt-1 text-right">
            {comment.length}/500
          </div>
        </div>

        {/* Error Message */}
        {error && (
          <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-xl text-red-700 text-sm">
            {error}
          </div>
        )}

        {/* Submit Buttons */}
        <div className="flex items-center gap-3">
          <button
            type="submit"
            disabled={isSubmitting}
            className="px-6 py-3 rounded-2xl text-white font-semibold disabled:opacity-50 disabled:cursor-not-allowed"
            style={{ background: brand.primary }}
          >
            {isSubmitting
              ? lang === "ar"
                ? isEditing
                  ? "جاري التحديث..."
                  : "جاري الإرسال..."
                : isEditing
                ? "Updating..."
                : "Submitting..."
              : lang === "ar"
              ? isEditing
                ? "تحديث المراجعة"
                : "إرسال المراجعة"
              : isEditing
              ? "Update Review"
              : "Submit Review"}
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
