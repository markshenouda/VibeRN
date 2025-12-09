/**
 * useAsyncStorage Hook
 *
 * @description React hook for AsyncStorage with automatic state sync
 *
 * @ai-guide
 * Usage:
 * ```tsx
 * const [value, setValue, removeValue] = useAsyncStorage<User>('user', null);
 *
 * // Set value
 * await setValue({ name: 'John' });
 *
 * // Remove value
 * await removeValue();
 * ```
 *
 * Features:
 * - Automatic loading on mount
 * - Type-safe with generics
 * - Returns tuple like useState
 */

import { useState, useEffect, useCallback } from 'react';
import { storage } from '@/lib/storage';

/**
 * Hook return type
 */
type UseAsyncStorageReturn<T> = [
  /** Current value */
  T,
  /** Set value function */
  (value: T) => Promise<void>,
  /** Remove value function */
  () => Promise<void>,
  /** Loading state */
  boolean,
];

/**
 * useAsyncStorage Hook
 *
 * A hook for reading and writing to AsyncStorage with React state sync.
 *
 * @param key Storage key
 * @param defaultValue Default value if key doesn't exist
 * @returns [value, setValue, removeValue, isLoading]
 *
 * @example
 * ```tsx
 * function UserProfile() {
 *   const [user, setUser, removeUser, isLoading] = useAsyncStorage<User | null>(
 *     StorageKeys.USER,
 *     null
 *   );
 *
 *   if (isLoading) return <LoadingScreen />;
 *
 *   return (
 *     <View>
 *       <Text>{user?.name}</Text>
 *       <Button onPress={() => setUser({ name: 'John' })}>
 *         Update Name
 *       </Button>
 *       <Button onPress={removeUser}>
 *         Clear User
 *       </Button>
 *     </View>
 *   );
 * }
 * ```
 */
export function useAsyncStorage<T>(key: string, defaultValue: T): UseAsyncStorageReturn<T> {
  const [value, setValueState] = useState<T>(defaultValue);
  const [isLoading, setIsLoading] = useState(true);

  // Load initial value
  useEffect(() => {
    let mounted = true;

    const loadValue = async () => {
      try {
        const storedValue = await storage.get<T>(key);
        if (mounted) {
          setValueState(storedValue !== null ? storedValue : defaultValue);
        }
      } catch (error) {
        console.warn(`useAsyncStorage: Error loading ${key}`, error);
        if (mounted) {
          setValueState(defaultValue);
        }
      } finally {
        if (mounted) {
          setIsLoading(false);
        }
      }
    };

    loadValue();

    return () => {
      mounted = false;
    };
  }, [key, defaultValue]);

  // Set value
  const setValue = useCallback(
    async (newValue: T) => {
      try {
        await storage.set(key, newValue);
        setValueState(newValue);
      } catch (error) {
        console.warn(`useAsyncStorage: Error setting ${key}`, error);
        throw error;
      }
    },
    [key]
  );

  // Remove value
  const removeValue = useCallback(async () => {
    try {
      await storage.remove(key);
      setValueState(defaultValue);
    } catch (error) {
      console.warn(`useAsyncStorage: Error removing ${key}`, error);
      throw error;
    }
  }, [key, defaultValue]);

  return [value, setValue, removeValue, isLoading];
}

export default useAsyncStorage;
