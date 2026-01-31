/**
 * Environment Configuration
 *
 * Type-safe environment variable validation using Zod and @t3-oss/env-core.
 * All environment variables are validated at startup to catch configuration errors early.
 *
 * @see https://env.t3.gg/docs/core
 */

import { createEnv } from '@t3-oss/env-core';
import { z } from 'zod';

export const env = createEnv({
  /**
   * Client-side environment variables (must be prefixed with NEXT_PUBLIC_)
   * These are exposed to the browser.
   */
  clientPrefix: 'NEXT_PUBLIC_',

  client: {
    NEXT_PUBLIC_API_BASE_URL: z.string().min(1).url(),
    NEXT_PUBLIC_API_TIMEOUT: z.coerce.number().positive().default(30000),
    NEXT_PUBLIC_APP_NAME: z.string().default('Safsafah'),
    NEXT_PUBLIC_APP_ENV: z.enum(['development', 'production', 'staging']).default('development'),
  },

  /**
   * Runtime environment accessor for Next.js
   * Must explicitly reference each NEXT_PUBLIC_ variable
   */
  runtimeEnv: {
    NEXT_PUBLIC_API_BASE_URL: process.env.NEXT_PUBLIC_API_BASE_URL,
    NEXT_PUBLIC_API_TIMEOUT: process.env.NEXT_PUBLIC_API_TIMEOUT,
    NEXT_PUBLIC_APP_NAME: process.env.NEXT_PUBLIC_APP_NAME,
    NEXT_PUBLIC_APP_ENV: process.env.NEXT_PUBLIC_APP_ENV,
  },

  /**
   * Skip validation during build if needed
   */
  skipValidation: false,
});

/**
 * Utility to check if app is in development mode
 */
export const isDevelopment = env.NEXT_PUBLIC_APP_ENV === 'development';

/**
 * Utility to check if app is in production mode
 */
export const isProduction = env.NEXT_PUBLIC_APP_ENV === 'production';

/**
 * Utility to check if app is in staging mode
 */
export const isStaging = env.NEXT_PUBLIC_APP_ENV === 'staging';
