import { useState } from "react";

/**
 * Custom hook for checkout form validation
 */
export function useCheckoutValidation(lang) {
  const [fieldErrors, setFieldErrors] = useState({
    fullName: "",
    mobile: "",
    address: "",
  });

  // Improved Egyptian mobile validation
  const validateEgyptianMobile = (number) => {
    // Remove any spaces or special characters
    const cleaned = number.replace(/[\s\-\(\)]/g, "");

    // Egyptian mobile format: starts with 010, 011, 012, or 015, followed by 8 digits (total 11 digits)
    const egyptianMobileRegex = /^(010|011|012|015)\d{8}$/;

    return egyptianMobileRegex.test(cleaned);
  };

  // Validate individual fields
  const validateField = (field, value) => {
    switch (field) {
      case "fullName":
        if (!value.trim()) {
          return lang === "ar" ? "يجب إدخال الاسم" : "Name is required";
        }
        if (value.trim().length < 2) {
          return lang === "ar"
            ? "الاسم يجب أن يكون حرفين على الأقل"
            : "Name must be at least 2 characters";
        }
        return "";

      case "mobile":
        if (!value.trim()) {
          return lang === "ar"
            ? "يجب إدخال رقم الموبايل"
            : "Mobile number is required";
        }
        if (!validateEgyptianMobile(value)) {
          return lang === "ar"
            ? "رقم الموبايل غير صحيح. يجب أن يبدأ بـ 010 أو 011 أو 012 أو 015 ويتكون من 11 رقم"
            : "Invalid mobile number. Must start with 010, 011, 012, or 015 and be 11 digits";
        }
        return "";

      case "address":
        if (!value.trim()) {
          return lang === "ar" ? "يجب إدخال العنوان" : "Address is required";
        }
        if (value.trim().length < 8) {
          return lang === "ar"
            ? "العنوان قصير جداً. يرجى إدخال عنوان تفصيلي (8 أحرف على الأقل)"
            : "Address too short. Please enter a detailed address (at least 8 characters)";
        }
        return "";

      default:
        return "";
    }
  };

  const getValidationError = (fullName, mobile, address) => {
    const fullNameError = validateField("fullName", fullName);
    if (fullNameError) return fullNameError;

    const mobileError = validateField("mobile", mobile);
    if (mobileError) return mobileError;

    const addressError = validateField("address", address);
    if (addressError) return addressError;

    return "";
  };

  const isFormValid = (fullName, mobile, address) => {
    return (
      fullName.trim().length >= 2 &&
      validateEgyptianMobile(mobile) &&
      address.trim().length >= 8
    );
  };

  const clearFieldError = (field) => {
    setFieldErrors((prev) => ({ ...prev, [field]: "" }));
  };

  const setFieldError = (field, error) => {
    setFieldErrors((prev) => ({ ...prev, [field]: error }));
  };

  return {
    fieldErrors,
    validateField,
    getValidationError,
    isFormValid,
    clearFieldError,
    setFieldError,
  };
}
