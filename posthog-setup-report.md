<wizard-report>
# PostHog post-wizard report

The wizard has completed a deep integration of PostHog analytics into the Safsafah Next.js App Router project. PostHog is initialized via `instrumentation-client.ts` (the recommended approach for Next.js 15.3+), with a reverse proxy configured in `next.config.ts` to improve event delivery reliability. A server-side PostHog client is available via `lib/posthog-server.ts` for use in API routes. Environment variables are stored in `.env.local`. Event tracking covers the full e-commerce conversion funnel — from product views through to order completion — as well as user identification on login/signup and wishlist engagement.

| Event | Description | File |
|-------|-------------|------|
| `user_signed_up` | User successfully completed registration | `app/[locale]/signup/_hooks/useSignupForm.ts` |
| `user_logged_in` | User successfully logged in | `app/[locale]/login/_hooks/useLoginForm.ts` |
| `product_viewed` | User viewed a product detail page (top of conversion funnel) | `app/[locale]/product/[slug]/page.tsx` |
| `product_added_to_cart` | User added a product to the cart | `hooks/useProductCart.js` |
| `product_removed_from_cart` | User removed a product from the cart | `hooks/useProductCart.js` |
| `wishlist_item_added` | User added a product to their wishlist | `hooks/useWishlist.js` |
| `wishlist_item_removed` | User removed a product from their wishlist | `hooks/useWishlist.js` |
| `checkout_started` | User clicked checkout from the cart page | `app/[locale]/cart/page.jsx` |
| `promo_code_applied` | User successfully applied a promo code | `app/[locale]/cart/page.jsx` |
| `order_placed` | User successfully placed an order | `app/[locale]/checkout/page.jsx` |
| `order_placement_failed` | Order placement failed with an error | `app/[locale]/checkout/page.jsx` |

## Next steps

We've built some insights and a dashboard for you to keep an eye on user behavior, based on the events we just instrumented:

- **Dashboard — Analytics basics**: https://us.posthog.com/project/383890/dashboard/1473005
- **Purchase Conversion Funnel** (product viewed → add to cart → checkout → order): https://us.posthog.com/project/383890/insights/LQ4GvJ5K
- **New User Signups** (daily trend): https://us.posthog.com/project/383890/insights/KGc944ei
- **Orders Placed Over Time** (orders vs failures): https://us.posthog.com/project/383890/insights/nINCe3K7
- **Cart Abandonment Rate** (checkout started vs order placed): https://us.posthog.com/project/383890/insights/mX5xUZmA
- **Wishlist & Cart Engagement** (product engagement signals): https://us.posthog.com/project/383890/insights/OY0BeAHx

### Agent skill

We've left an agent skill folder in your project. You can use this context for further agent development when using Claude Code. This will help ensure the model provides the most up-to-date approaches for integrating PostHog.

</wizard-report>
