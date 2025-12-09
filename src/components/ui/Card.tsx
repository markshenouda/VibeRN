/**
 * Card Component
 *
 * @description Container component with elevation and styling
 *
 * @ai-guide
 * Props:
 * - `variant`: Visual style (elevated, outlined, filled)
 * - `padding`: Padding size (none, sm, md, lg)
 * - `pressable`: Make card pressable with feedback
 *
 * Usage:
 * ```tsx
 * <Card>
 *   <Text>Card content</Text>
 * </Card>
 *
 * <Card variant="outlined" padding="lg">
 *   <Text>Outlined card</Text>
 * </Card>
 *
 * <Card pressable onPress={() => navigate('detail')}>
 *   <Text>Pressable card</Text>
 * </Card>
 * ```
 */

import React from 'react';
import { View, ViewProps, Pressable, PressableProps, StyleSheet, ViewStyle } from 'react-native';
import { useTheme } from '@/design-system';

// Card variants
type CardVariant = 'elevated' | 'outlined' | 'filled';

// Card padding sizes
type CardPadding = 'none' | 'sm' | 'md' | 'lg';

export interface CardProps extends ViewProps {
  /** Visual style variant */
  variant?: CardVariant;
  /** Padding size */
  padding?: CardPadding;
  /** Make card pressable */
  pressable?: boolean;
  /** Press handler (only when pressable) */
  onPress?: PressableProps['onPress'];
  /** Children content */
  children?: React.ReactNode;
}

/**
 * Card Component
 *
 * A container component for grouping related content.
 *
 * @example
 * ```tsx
 * <Card variant="elevated" padding="md">
 *   <Text variant="h4">Card Title</Text>
 *   <Text variant="body">Card description goes here.</Text>
 * </Card>
 * ```
 */
export function Card({
  variant = 'elevated',
  padding = 'md',
  pressable = false,
  onPress,
  children,
  style,
  ...props
}: CardProps) {
  const { theme } = useTheme();

  // Padding sizes
  const paddingSizes = {
    none: 0,
    sm: theme.spacing[3],
    md: theme.spacing[4],
    lg: theme.spacing[5],
  };

  // Base card style
  const baseStyle: ViewStyle = {
    borderRadius: theme.componentRadius.card,
    padding: paddingSizes[padding],
    overflow: 'hidden',
  };

  // Variant styles
  const variantStyles: Record<CardVariant, ViewStyle> = {
    elevated: {
      backgroundColor: theme.colors.surface,
      ...theme.shadows.md,
    },
    outlined: {
      backgroundColor: theme.colors.surface,
      borderWidth: 1,
      borderColor: theme.colors.border,
    },
    filled: {
      backgroundColor: theme.colors.surfaceSecondary,
    },
  };

  const cardStyle = [baseStyle, variantStyles[variant], style];

  // Render pressable or regular view
  if (pressable) {
    return (
      <Pressable
        style={({ pressed }) => [...cardStyle, pressed && { opacity: 0.9 }]}
        onPress={onPress}
        {...(props as PressableProps)}
      >
        {children}
      </Pressable>
    );
  }

  return (
    <View style={cardStyle} {...props}>
      {children}
    </View>
  );
}

export default Card;
