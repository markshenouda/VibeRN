/**
 * useRefreshControl Hook
 *
 * @description Pull-to-refresh functionality for lists
 *
 * @ai-guide
 * Usage:
 * ```tsx
 * const { refreshControl, refresh } = useRefreshControl(fetchData);
 *
 * return (
 *   <FlatList
 *     data={items}
 *     refreshControl={refreshControl}
 *   />
 * );
 * ```
 */

import { useState, useCallback, useMemo } from 'react';
import { RefreshControl, RefreshControlProps } from 'react-native';
import { useTheme } from '@/design-system';

interface UseRefreshControlOptions {
  /** Custom tint color */
  tintColor?: string;
  /** Custom title */
  title?: string;
  /** Callback on refresh */
  onRefresh: () => Promise<void>;
}

interface UseRefreshControlReturn {
  /** RefreshControl component to pass to list */
  refreshControl: React.ReactElement<RefreshControlProps>;
  /** Whether currently refreshing */
  isRefreshing: boolean;
  /** Manually trigger refresh */
  refresh: () => Promise<void>;
}

/**
 * useRefreshControl Hook
 *
 * Creates a RefreshControl with automatic state management.
 *
 * @param onRefresh Async function to call on refresh
 * @returns { refreshControl, isRefreshing, refresh }
 *
 * @example
 * ```tsx
 * function ItemList() {
 *   const [items, setItems] = useState([]);
 *
 *   const fetchItems = async () => {
 *     const data = await api.getItems();
 *     setItems(data);
 *   };
 *
 *   const { refreshControl } = useRefreshControl(fetchItems);
 *
 *   return (
 *     <FlatList
 *       data={items}
 *       renderItem={({ item }) => <ItemCard item={item} />}
 *       refreshControl={refreshControl}
 *     />
 *   );
 * }
 * ```
 */
export function useRefreshControl(onRefresh: () => Promise<void>): UseRefreshControlReturn;
export function useRefreshControl(options: UseRefreshControlOptions): UseRefreshControlReturn;
export function useRefreshControl(
  optionsOrOnRefresh: UseRefreshControlOptions | (() => Promise<void>)
): UseRefreshControlReturn {
  const { theme } = useTheme();
  const [isRefreshing, setIsRefreshing] = useState(false);

  // Normalize options
  const options: UseRefreshControlOptions =
    typeof optionsOrOnRefresh === 'function'
      ? { onRefresh: optionsOrOnRefresh }
      : optionsOrOnRefresh;

  // Handle refresh
  const handleRefresh = useCallback(async () => {
    setIsRefreshing(true);
    try {
      await options.onRefresh();
    } finally {
      setIsRefreshing(false);
    }
  }, [options]);

  // Create RefreshControl element
  const refreshControl = useMemo(
    () => (
      <RefreshControl
        refreshing={isRefreshing}
        onRefresh={handleRefresh}
        tintColor={options.tintColor || theme.colors.primary}
        colors={[theme.colors.primary]} // Android
        title={options.title}
        titleColor={theme.colors.textSecondary}
      />
    ),
    [isRefreshing, handleRefresh, options, theme]
  );

  return {
    refreshControl,
    isRefreshing,
    refresh: handleRefresh,
  };
}

export default useRefreshControl;
