/**
 * useNetworkStatus Hook
 *
 * @description Track network connectivity status
 *
 * @ai-guide
 * Usage:
 * ```tsx
 * const { isConnected, isInternetReachable } = useNetworkStatus();
 *
 * if (!isConnected) {
 *   return <OfflineScreen />;
 * }
 * ```
 *
 * Note: This is a simplified version. For production,
 * consider using @react-native-community/netinfo
 */

import { useState, useEffect } from 'react';

interface NetworkState {
  /** Whether device is connected to network */
  isConnected: boolean;
  /** Whether internet is reachable */
  isInternetReachable: boolean | null;
}

/**
 * useNetworkStatus Hook
 *
 * Tracks network connectivity. This is a simplified implementation
 * that periodically checks connectivity.
 *
 * For more accurate real-time tracking, install:
 * npm install @react-native-community/netinfo
 *
 * @returns { isConnected, isInternetReachable }
 *
 * @example
 * ```tsx
 * function App() {
 *   const { isConnected, isInternetReachable } = useNetworkStatus();
 *
 *   if (!isConnected) {
 *     return (
 *       <EmptyState
 *         title="No Connection"
 *         description="Please check your internet connection"
 *       />
 *     );
 *   }
 *
 *   return <MainContent />;
 * }
 * ```
 */
export function useNetworkStatus(): NetworkState {
  const [state, setState] = useState<NetworkState>({
    isConnected: true, // Assume connected initially
    isInternetReachable: null,
  });

  useEffect(() => {
    // Simple connectivity check using fetch
    const checkConnectivity = async () => {
      try {
        // Try to fetch a small resource
        const response = await fetch('https://www.google.com/generate_204', {
          method: 'HEAD',
          cache: 'no-cache',
        });

        setState({
          isConnected: true,
          isInternetReachable: response.status === 204,
        });
      } catch {
        setState({
          isConnected: false,
          isInternetReachable: false,
        });
      }
    };

    // Check immediately
    checkConnectivity();

    // Check periodically (every 30 seconds)
    const interval = setInterval(checkConnectivity, 30000);

    return () => clearInterval(interval);
  }, []);

  return state;
}

export default useNetworkStatus;

/**
 * For production apps, replace with @react-native-community/netinfo:
 *
 * ```typescript
 * import NetInfo, { NetInfoState } from '@react-native-community/netinfo';
 *
 * export function useNetworkStatus(): NetworkState {
 *   const [state, setState] = useState<NetworkState>({
 *     isConnected: true,
 *     isInternetReachable: null,
 *   });
 *
 *   useEffect(() => {
 *     const unsubscribe = NetInfo.addEventListener((netState: NetInfoState) => {
 *       setState({
 *         isConnected: netState.isConnected ?? false,
 *         isInternetReachable: netState.isInternetReachable,
 *       });
 *     });
 *
 *     return () => unsubscribe();
 *   }, []);
 *
 *   return state;
 * }
 * ```
 */
