/**
 * useDebounce Hook
 *
 * @description Debounce a value or callback
 *
 * @ai-guide
 * Usage:
 * ```tsx
 * // Debounce a value
 * const debouncedQuery = useDebounce(query, 300);
 *
 * // Debounce a callback
 * const debouncedSearch = useDebouncedCallback(search, 300);
 * ```
 */

import { useState, useEffect, useCallback, useRef } from 'react';

/**
 * useDebounce Hook
 *
 * Debounces a value, returning the debounced value after a delay.
 *
 * @param value Value to debounce
 * @param delay Delay in milliseconds
 * @returns Debounced value
 *
 * @example
 * ```tsx
 * function Search() {
 *   const [query, setQuery] = useState('');
 *   const debouncedQuery = useDebounce(query, 300);
 *
 *   useEffect(() => {
 *     if (debouncedQuery) {
 *       fetchResults(debouncedQuery);
 *     }
 *   }, [debouncedQuery]);
 *
 *   return <Input value={query} onChangeText={setQuery} />;
 * }
 * ```
 */
export function useDebounce<T>(value: T, delay: number): T {
  const [debouncedValue, setDebouncedValue] = useState<T>(value);

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(timer);
    };
  }, [value, delay]);

  return debouncedValue;
}

/**
 * useDebouncedCallback Hook
 *
 * Returns a debounced version of a callback function.
 *
 * @param callback Function to debounce
 * @param delay Delay in milliseconds
 * @returns Debounced callback
 *
 * @example
 * ```tsx
 * function Search() {
 *   const handleSearch = useDebouncedCallback((query: string) => {
 *     fetchResults(query);
 *   }, 300);
 *
 *   return <Input onChangeText={handleSearch} />;
 * }
 * ```
 */
export function useDebouncedCallback<T extends (...args: any[]) => any>(
  callback: T,
  delay: number
): (...args: Parameters<T>) => void {
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);
  const callbackRef = useRef(callback);

  // Update callback ref when callback changes
  useEffect(() => {
    callbackRef.current = callback;
  }, [callback]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  return useCallback(
    (...args: Parameters<T>) => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }

      timeoutRef.current = setTimeout(() => {
        callbackRef.current(...args);
      }, delay);
    },
    [delay]
  );
}

export default useDebounce;
