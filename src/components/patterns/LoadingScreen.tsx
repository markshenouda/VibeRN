/**
 * LoadingScreen Component
 *
 * @description Full screen loading indicator
 *
 * @ai-guide
 * Props:
 * - `message`: Optional loading message
 * - `transparent`: Transparent background overlay
 *
 * Usage:
 * ```tsx
 * {isLoading && <LoadingScreen message="Loading data..." />}
 * ```
 */

import React from 'react';
import { View, ActivityIndicator, StyleSheet, ViewStyle } from 'react-native';
import { useTheme } from '@/design-system';
import { Text } from '@/components/ui';

export interface LoadingScreenProps {
  /** Loading message */
  message?: string;
  /** Transparent overlay */
  transparent?: boolean;
  /** Container style */
  style?: ViewStyle;
}

/**
 * LoadingScreen Component
 *
 * A full screen loading indicator.
 *
 * @example
 * ```tsx
 * // In a component
 * if (isLoading) {
 *   return <LoadingScreen message="Fetching data..." />;
 * }
 *
 * // As overlay
 * <>
 *   <MainContent />
 *   {isSaving && (
 *     <LoadingScreen transparent message="Saving..." />
 *   )}
 * </>
 * ```
 */
export function LoadingScreen({ message, transparent = false, style }: LoadingScreenProps) {
  const { theme } = useTheme();

  const containerStyle: ViewStyle = {
    backgroundColor: transparent ? theme.colors.overlay : theme.colors.background,
  };

  return (
    <View style={[styles.container, containerStyle, style]}>
      <View
        style={[
          styles.content,
          transparent && {
            backgroundColor: theme.colors.surface,
            borderRadius: theme.radius.lg,
            padding: 24,
            ...theme.shadows.lg,
          },
        ]}
      >
        <ActivityIndicator size="large" color={theme.colors.primary} />
        {message && (
          <Text variant="body" color="textSecondary" align="center" style={styles.message}>
            {message}
          </Text>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 999,
  },
  content: {
    alignItems: 'center',
  },
  message: {
    marginTop: 16,
  },
});

export default LoadingScreen;
