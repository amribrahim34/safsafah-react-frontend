import Image from "next/image";
import logo from "../../assets/safsafah-logo.png";

interface PageLoaderProps {
  /** Optional message shown under the logo. */
  message?: string;
  /** Fill the viewport (route-level loader) vs. inline in a section. */
  fullScreen?: boolean;
}

/**
 * Branded loading indicator: the SAFSAFAH mark pulsing inside a spinning
 * brand-colored ring. Use `fullScreen` for route-level `loading.tsx`, or
 * drop it inline for section-level Suspense fallbacks.
 */
export default function PageLoader({ message, fullScreen = true }: PageLoaderProps) {
  return (
    <div
      className={
        fullScreen
          ? "fixed inset-0 z-50 flex flex-col items-center justify-center bg-brand-cream"
          : "flex flex-col items-center justify-center py-16"
      }
      role="status"
      aria-live="polite"
    >
      <div className="relative h-24 w-24">
        {/* Spinning brand ring */}
        <div className="absolute inset-0 rounded-full border-4 border-brand/15" />
        <div className="absolute inset-0 animate-spin rounded-full border-4 border-transparent border-t-brand" />
        {/* Pulsing logo */}
        <div className="absolute inset-2 flex items-center justify-center">
          <Image
            src={logo}
            alt="SAFSAFAH"
            width={72}
            height={72}
            priority
            className="h-16 w-16 animate-pulse rounded-full object-contain"
          />
        </div>
      </div>

      {message && (
        <p className="mt-5 text-sm font-medium text-brand-charcoal/70">{message}</p>
      )}
      <span className="sr-only">Loading</span>
    </div>
  );
}
