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
   * Client-side environment variables (must be prefixed with VITE_)
   * These are exposed to the browser.
   */
  clientPrefix: 'VITE_',

  client: {
    VITE_API_BASE_URL: z.string().min(1).url(),
    VITE_API_TIMEOUT: z.coerce.number().positive().default(30000),
    VITE_APP_NAME: z.string().default('Safsafah'),
    VITE_APP_ENV: z.enum(['development', 'production', 'staging']).default('development'),
  },

  /**
   * Runtime environment accessor for Vite
   */
  runtimeEnv: import.meta.env,

  /**
   * Skip validation during build if needed
   */
  skipValidation: false,
});

/**
 * Utility to check if app is in development mode
 */
export const isDevelopment = env.VITE_APP_ENV === 'development';

/**
 * Utility to check if app is in production mode
 */
export const isProduction = env.VITE_APP_ENV === 'production';

/**
 * Utility to check if app is in staging mode
 */
export const isStaging = env.VITE_APP_ENV === 'staging';
