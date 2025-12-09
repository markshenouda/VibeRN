/**
 * AsyncStorage Utilities
 *
 * @description Type-safe wrapper around AsyncStorage
 *
 * @ai-guide
 * Usage:
 * ```tsx
 * import { storage } from '@/lib/storage';
 *
 * // Set value
 * await storage.set('user', { name: 'John' });
 *
 * // Get value
 * const user = await storage.get<User>('user');
 *
 * // Remove value
 * await storage.remove('user');
 * ```
 *
 * Storage Keys:
 * - Define typed keys in `StorageKeys` for type safety
 * - Use `storage.keys` for autocompletion
 */

import AsyncStorage from '@react-native-async-storage/async-storage';

/**
 * Storage key definitions
 * Add your app's storage keys here for type safety
 */
export const StorageKeys = {
  // Auth
  AUTH_TOKEN: '@vibern/auth-token',
  USER: '@vibern/user',

  // App state
  THEME_MODE: '@vibern/theme-mode',
  ONBOARDING_COMPLETED: '@vibern/onboarding-completed',
  LANGUAGE: '@vibern/language',

  // Cache
  CACHE_PREFIX: '@vibern/cache/',

  // Settings
  SETTINGS: '@vibern/settings',
  NOTIFICATIONS_ENABLED: '@vibern/notifications-enabled',
} as const;

export type StorageKey = (typeof StorageKeys)[keyof typeof StorageKeys];

/**
 * Type-safe storage wrapper
 */
export const storage = {
  /**
   * Get a value from storage
   * @param key Storage key
   * @returns Parsed value or null
   */
  async get<T>(key: string): Promise<T | null> {
    try {
      const value = await AsyncStorage.getItem(key);
      if (value === null) return null;
      return JSON.parse(value) as T;
    } catch (error) {
      console.warn(`Error reading from storage [${key}]:`, error);
      return null;
    }
  },

  /**
   * Set a value in storage
   * @param key Storage key
   * @param value Value to store (will be JSON stringified)
   */
  async set<T>(key: string, value: T): Promise<void> {
    try {
      const stringValue = JSON.stringify(value);
      await AsyncStorage.setItem(key, stringValue);
    } catch (error) {
      console.warn(`Error writing to storage [${key}]:`, error);
      throw error;
    }
  },

  /**
   * Remove a value from storage
   * @param key Storage key
   */
  async remove(key: string): Promise<void> {
    try {
      await AsyncStorage.removeItem(key);
    } catch (error) {
      console.warn(`Error removing from storage [${key}]:`, error);
      throw error;
    }
  },

  /**
   * Get multiple values from storage
   * @param keys Array of storage keys
   * @returns Object with key-value pairs
   */
  async getMultiple<T extends Record<string, unknown>>(keys: string[]): Promise<Partial<T>> {
    try {
      const pairs = await AsyncStorage.multiGet(keys);
      const result: Record<string, unknown> = {};

      for (const [key, value] of pairs) {
        if (value !== null) {
          try {
            result[key] = JSON.parse(value);
          } catch {
            result[key] = value;
          }
        }
      }

      return result as Partial<T>;
    } catch (error) {
      console.warn('Error reading multiple from storage:', error);
      return {};
    }
  },

  /**
   * Set multiple values in storage
   * @param items Object with key-value pairs
   */
  async setMultiple<T extends Record<string, unknown>>(items: T): Promise<void> {
    try {
      const pairs = Object.entries(items).map(([key, value]) => [key, JSON.stringify(value)]) as [
        string,
        string,
      ][];

      await AsyncStorage.multiSet(pairs);
    } catch (error) {
      console.warn('Error writing multiple to storage:', error);
      throw error;
    }
  },

  /**
   * Remove multiple values from storage
   * @param keys Array of storage keys
   */
  async removeMultiple(keys: string[]): Promise<void> {
    try {
      await AsyncStorage.multiRemove(keys);
    } catch (error) {
      console.warn('Error removing multiple from storage:', error);
      throw error;
    }
  },

  /**
   * Get all storage keys
   * @returns Array of all keys
   */
  async getAllKeys(): Promise<string[]> {
    try {
      const keys = await AsyncStorage.getAllKeys();
      return keys as string[];
    } catch (error) {
      console.warn('Error getting all keys from storage:', error);
      return [];
    }
  },

  /**
   * Clear all storage (use with caution!)
   */
  async clear(): Promise<void> {
    try {
      await AsyncStorage.clear();
    } catch (error) {
      console.warn('Error clearing storage:', error);
      throw error;
    }
  },

  /**
   * Clear storage with a specific prefix
   * @param prefix Key prefix to clear
   */
  async clearPrefix(prefix: string): Promise<void> {
    try {
      const allKeys = await this.getAllKeys();
      const keysToRemove = allKeys.filter((key) => key.startsWith(prefix));
      if (keysToRemove.length > 0) {
        await this.removeMultiple(keysToRemove);
      }
    } catch (error) {
      console.warn(`Error clearing storage prefix [${prefix}]:`, error);
      throw error;
    }
  },

  /**
   * Check if a key exists in storage
   * @param key Storage key
   * @returns True if key exists
   */
  async has(key: string): Promise<boolean> {
    try {
      const value = await AsyncStorage.getItem(key);
      return value !== null;
    } catch (error) {
      console.warn(`Error checking storage [${key}]:`, error);
      return false;
    }
  },

  // Export keys for convenience
  keys: StorageKeys,
};

export default storage;
