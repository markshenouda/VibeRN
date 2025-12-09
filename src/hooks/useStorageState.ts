/**
 * useStorageState Hook
 *
 * @description Extended storage hook with full state management
 *
 * @ai-guide
 * Usage:
 * ```tsx
 * const { value, setValue, isLoading, error, refresh } = useStorageState<User>('user');
 *
 * if (isLoading) return <Loading />;
 * if (error) return <Error message={error.message} />;
 *
 * return <Profile user={value} />;
 * ```
 *
 * Features:
 * - Loading state
 * - Error handling
 * - Refresh function
 * - Object-based return
 */

import { useState, useEffect, useCallback } from 'react';
import { storage } from '@/lib/storage';

/**
 * Hook return type
 */
interface UseStorageStateReturn<T> {
  /** Current value */
  value: T | null;
  /** Set value function */
  setValue: (value: T) => Promise<void>;
  /** Remove value function */
  removeValue: () => Promise<void>;
  /** Loading state */
  isLoading: boolean;
  /** Error if any */
  error: Error | null;
  /** Refresh from storage */
  refresh: () => Promise<void>;
}

/**
 * useStorageState Hook
 *
 * An extended storage hook with loading state and error handling.
 *
 * @param key Storage key
 * @returns Object with value, setValue, isLoading, error, refresh
 *
 * @example
 * ```tsx
 * function Settings() {
 *   const {
 *     value: settings,
 *     setValue: setSettings,
 *     isLoading,
 *     error,
 *     refresh,
 *   } = useStorageState<AppSettings>(StorageKeys.SETTINGS);
 *
 *   if (isLoading) return <LoadingScreen />;
 *
 *   if (error) {
 *     return (
 *       <EmptyState
 *         title="Error loading settings"
 *         action={<Button onPress={refresh}>Retry</Button>}
 *       />
 *     );
 *   }
 *
 *   return (
 *     <SettingsForm
 *       settings={settings}
 *       onSave={setSettings}
 *     />
 *   );
 * }
 * ```
 */
export function useStorageState<T>(key: string): UseStorageStateReturn<T> {
  const [value, setValueState] = useState<T | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  // Load value from storage
  const loadValue = useCallback(async () => {
    setIsLoading(true);
    setError(null);

    try {
      const storedValue = await storage.get<T>(key);
      setValueState(storedValue);
    } catch (err) {
      setError(err instanceof Error ? err : new Error('Failed to load from storage'));
    } finally {
      setIsLoading(false);
    }
  }, [key]);

  // Load on mount
  useEffect(() => {
    loadValue();
  }, [loadValue]);

  // Set value
  const setValue = useCallback(
    async (newValue: T) => {
      setError(null);
      try {
        await storage.set(key, newValue);
        setValueState(newValue);
      } catch (err) {
        const error = err instanceof Error ? err : new Error('Failed to save to storage');
        setError(error);
        throw error;
      }
    },
    [key]
  );

  // Remove value
  const removeValue = useCallback(async () => {
    setError(null);
    try {
      await storage.remove(key);
      setValueState(null);
    } catch (err) {
      const error = err instanceof Error ? err : new Error('Failed to remove from storage');
      setError(error);
      throw error;
    }
  }, [key]);

  // Refresh from storage
  const refresh = useCallback(async () => {
    await loadValue();
  }, [loadValue]);

  return {
    value,
    setValue,
    removeValue,
    isLoading,
    error,
    refresh,
  };
}

export default useStorageState;
