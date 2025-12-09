/**
 * EmptyState Component
 *
 * @description Placeholder for empty lists or no data states
 *
 * @ai-guide
 * Props:
 * - `title`: Main message
 * - `description`: Secondary description
 * - `icon`: Optional icon component
 * - `action`: Optional action button
 *
 * Usage:
 * ```tsx
 * <EmptyState
 *   title="No results found"
 *   description="Try adjusting your search"
 *   action={<Button onPress={clearSearch}>Clear Search</Button>}
 * />
 * ```
 */

import React from 'react';
import { View, StyleSheet, ViewStyle } from 'react-native';
import { useTheme } from '@/design-system';
import { Text } from '@/components/ui';

export interface EmptyStateProps {
  /** Main title */
  title: string;
  /** Description text */
  description?: string;
  /** Icon component */
  icon?: React.ReactNode;
  /** Action button */
  action?: React.ReactNode;
  /** Container style */
  style?: ViewStyle;
}

/**
 * EmptyState Component
 *
 * A placeholder for empty content states.
 *
 * @example
 * ```tsx
 * {items.length === 0 ? (
 *   <EmptyState
 *     icon={<SearchIcon size={48} color="gray" />}
 *     title="No items found"
 *     description="Your search didn't match any items"
 *     action={
 *       <Button onPress={handleClear}>
 *         Clear filters
 *       </Button>
 *     }
 *   />
 * ) : (
 *   <FlatList data={items} ... />
 * )}
 * ```
 */
export function EmptyState({ title, description, icon, action, style }: EmptyStateProps) {
  const { theme } = useTheme();

  return (
    <View style={[styles.container, style]}>
      {icon && (
        <View style={[styles.iconContainer, { backgroundColor: theme.colors.backgroundSecondary }]}>
          {icon}
        </View>
      )}

      <Text variant="h4" align="center" style={styles.title}>
        {title}
      </Text>

      {description && (
        <Text variant="body" color="textSecondary" align="center" style={styles.description}>
          {description}
        </Text>
      )}

      {action && <View style={styles.action}>{action}</View>}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 32,
  },
  iconContainer: {
    width: 80,
    height: 80,
    borderRadius: 40,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 24,
  },
  title: {
    marginBottom: 8,
  },
  description: {
    marginBottom: 24,
    maxWidth: 280,
  },
  action: {
    marginTop: 8,
  },
});

export default EmptyState;
