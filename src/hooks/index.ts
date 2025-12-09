/**
 * Hooks - Main Export
 *
 * @description Custom React hooks for common functionality
 *
 * @ai-guide
 * Import from this file:
 * ```tsx
 * import { useAsyncStorage, useDebounce, useKeyboard } from '@/hooks';
 * ```
 *
 * Available Hooks:
 * - useAsyncStorage: Persistent state with AsyncStorage
 * - useStorageState: Extended storage hook with loading/error
 * - useDebounce: Debounce values
 * - useDebouncedCallback: Debounce callbacks
 * - useKeyboard: Track keyboard visibility/height
 * - useRefreshControl: Pull-to-refresh for lists
 * - useAppState: Track app foreground/background
 * - useNetworkStatus: Track network connectivity
 */

// Storage hooks
export { useAsyncStorage } from './useAsyncStorage';
export { useStorageState } from './useStorageState';

// Utility hooks
export { useDebounce, useDebouncedCallback } from './useDebounce';
export { useKeyboard, dismissKeyboard } from './useKeyboard';
export { useRefreshControl } from './useRefreshControl';

// App state hooks
export { useAppState, useAppStateChange, useOnForeground } from './useAppState';
export { useNetworkStatus } from './useNetworkStatus';
