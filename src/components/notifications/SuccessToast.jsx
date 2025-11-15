import React, { useEffect } from "react";

/**
 * Success toast notification that auto-dismisses
 */
export default function SuccessToast({ message, onClose, duration = 3000 }) {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, duration);

    return () => clearTimeout(timer);
  }, [duration, onClose]);

  return (
    <div className="fixed top-20 left-1/2 -translate-x-1/2 z-50 animate-in fade-in slide-in-from-top-2 duration-300">
      <div className="bg-green-500 text-white px-6 py-4 rounded-2xl shadow-lg flex items-center gap-3 min-w-[300px] max-w-md">
        <div className="text-2xl">✓</div>
        <div className="flex-1 font-semibold">{message}</div>
      </div>
    </div>
  );
}
