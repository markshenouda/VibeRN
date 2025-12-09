/**
 * App Configuration
 *
 * @description Centralized app configuration and environment settings
 *
 * @ai-guide
 * This file contains:
 * - App metadata
 * - API configuration
 * - Feature flags
 * - Environment detection
 *
 * To add environment variables:
 * 1. Add to your .env file (create if needed)
 * 2. Access via process.env or expo-constants
 */

import Constants from 'expo-constants';

/**
 * Environment detection
 */
export const isDev = __DEV__;
export const isProd = !__DEV__;

/**
 * App information from expo config
 */
export const appConfig = {
  name: Constants.expoConfig?.name ?? 'VibeRN',
  slug: Constants.expoConfig?.slug ?? 'vibern',
  version: Constants.expoConfig?.version ?? '1.0.0',
  scheme: Constants.expoConfig?.scheme ?? 'vibern',
};

/**
 * API Configuration
 *
 * @ai-guide
 * To set up your API:
 * 1. Replace the placeholder URLs below
 * 2. For environment-specific URLs, use:
 *    - Create .env.local, .env.production
 *    - Use expo-env package or similar
 */
export const apiConfig = {
  /** Base URL for API requests */
  baseUrl: isDev ? 'https://api.dev.example.com' : 'https://api.example.com',

  /** Request timeout in milliseconds */
  timeout: 30000,

  /** API version */
  version: 'v1',
};

/**
 * Feature flags
 *
 * @ai-guide
 * Add feature flags here for:
 * - A/B testing
 * - Gradual rollouts
 * - Dev-only features
 */
export const features = {
  /** Enable dark mode */
  darkMode: true,

  /** Enable analytics */
  analytics: isProd,

  /** Enable crash reporting */
  crashReporting: isProd,

  /** Enable in-app purchases */
  iap: false,

  /** Enable push notifications */
  pushNotifications: true,

  /** Enable biometric authentication */
  biometricAuth: true,
};

/**
 * Social/OAuth configuration
 *
 * @ai-guide
 * Add your OAuth credentials here.
 * For production, use environment variables.
 */
export const authConfig = {
  /** Google OAuth client ID */
  googleClientId: '',

  /** Apple Sign In service ID */
  appleServiceId: '',
};

/**
 * Analytics configuration
 */
export const analyticsConfig = {
  /** Enable analytics tracking */
  enabled: features.analytics,

  /** Analytics provider (e.g., 'mixpanel', 'amplitude', 'firebase') */
  provider: 'firebase',
};

/**
 * Storage keys prefix
 * Used to namespace all AsyncStorage keys
 */
export const storagePrefix = '@vibern';

/**
 * Deep link configuration
 */
export const deepLinkConfig = {
  scheme: appConfig.scheme,
  prefixes: [`${appConfig.scheme}://`, 'https://example.com', 'https://www.example.com'],
};

/**
 * Default export for convenience
 */
export default {
  app: appConfig,
  api: apiConfig,
  features,
  auth: authConfig,
  analytics: analyticsConfig,
  storage: { prefix: storagePrefix },
  deepLink: deepLinkConfig,
  isDev,
  isProd,
};
