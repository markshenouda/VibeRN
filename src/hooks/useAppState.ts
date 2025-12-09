/**
 * useAppState Hook
 *
 * @description Track app foreground/background state
 *
 * @ai-guide
 * Usage:
 * ```tsx
 * const { appState, isActive } = useAppState();
 *
 * useEffect(() => {
 *   if (isActive) {
 *     refreshData();
 *   }
 * }, [isActive]);
 * ```
 */

import { useState, useEffect, useRef } from 'react';
import { AppState, AppStateStatus } from 'react-native';

interface UseAppStateReturn {
  /** Current app state */
  appState: AppStateStatus;
  /** Whether app is in foreground */
  isActive: boolean;
  /** Whether app is in background */
  isBackground: boolean;
}

/**
 * useAppState Hook
 *
 * Tracks the app's foreground/background state.
 *
 * @returns { appState, isActive, isBackground }
 *
 * @example
 * ```tsx
 * function App() {
 *   const { isActive } = useAppState();
 *
 *   useEffect(() => {
 *     if (isActive) {
 *       // App came to foreground
 *       refreshNotifications();
 *     }
 *   }, [isActive]);
 *
 *   return <MainContent />;
 * }
 * ```
 */
export function useAppState(): UseAppStateReturn {
  const [appState, setAppState] = useState<AppStateStatus>(AppState.currentState);

  useEffect(() => {
    const subscription = AppState.addEventListener('change', (nextState) => {
      setAppState(nextState);
    });

    return () => {
      subscription.remove();
    };
  }, []);

  return {
    appState,
    isActive: appState === 'active',
    isBackground: appState === 'background',
  };
}

/**
 * useAppStateChange Hook
 *
 * Calls a callback when app state changes.
 *
 * @param callback Function to call on state change
 *
 * @example
 * ```tsx
 * useAppStateChange((state) => {
 *   if (state === 'active') {
 *     checkForUpdates();
 *   } else if (state === 'background') {
 *     saveProgress();
 *   }
 * });
 * ```
 */
export function useAppStateChange(
  callback: (state: AppStateStatus, prevState: AppStateStatus) => void
): void {
  const prevStateRef = useRef<AppStateStatus>(AppState.currentState);

  useEffect(() => {
    const subscription = AppState.addEventListener('change', (nextState) => {
      callback(nextState, prevStateRef.current);
      prevStateRef.current = nextState;
    });

    return () => {
      subscription.remove();
    };
  }, [callback]);
}

/**
 * useOnForeground Hook
 *
 * Calls a callback when app comes to foreground.
 *
 * @param callback Function to call when app becomes active
 *
 * @example
 * ```tsx
 * useOnForeground(() => {
 *   refreshData();
 * });
 * ```
 */
export function useOnForeground(callback: () => void): void {
  const prevStateRef = useRef<AppStateStatus>(AppState.currentState);

  useEffect(() => {
    const subscription = AppState.addEventListener('change', (nextState) => {
      if (nextState === 'active' && prevStateRef.current !== 'active') {
        callback();
      }
      prevStateRef.current = nextState;
    });

    return () => {
      subscription.remove();
    };
  }, [callback]);
}

export default useAppState;
