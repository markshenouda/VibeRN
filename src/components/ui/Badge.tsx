/**
 * Badge Component
 *
 * @description Small label for status, counts, or categorization
 *
 * @ai-guide
 * Props:
 * - `variant`: Visual style (solid, soft, outline)
 * - `color`: Color scheme (primary, secondary, success, etc.)
 * - `size`: Badge size (sm, md)
 *
 * Usage:
 * ```tsx
 * <Badge>Default</Badge>
 * <Badge color="success">Active</Badge>
 * <Badge variant="soft" color="warning">Pending</Badge>
 * ```
 */

import React from 'react';
import { View, StyleSheet, ViewStyle, TextStyle } from 'react-native';
import { useTheme } from '@/design-system';
import { Text } from './Text';

// Badge variants
type BadgeVariant = 'solid' | 'soft' | 'outline';

// Badge colors
type BadgeColor = 'primary' | 'secondary' | 'success' | 'warning' | 'error' | 'info' | 'neutral';

// Badge sizes
type BadgeSize = 'sm' | 'md';

export interface BadgeProps {
  /** Visual style variant */
  variant?: BadgeVariant;
  /** Color scheme */
  color?: BadgeColor;
  /** Badge size */
  size?: BadgeSize;
  /** Badge content */
  children?: React.ReactNode;
  /** Container style */
  style?: ViewStyle;
}

/**
 * Badge Component
 *
 * A small label for displaying status or counts.
 *
 * @example
 * ```tsx
 * <Badge color="success" variant="soft">
 *   Active
 * </Badge>
 *
 * <Badge color="error">
 *   3
 * </Badge>
 * ```
 */
export function Badge({
  variant = 'soft',
  color = 'primary',
  size = 'sm',
  children,
  style,
}: BadgeProps) {
  const { theme } = useTheme();

  // Get color values
  const getColorValues = () => {
    const colorMap = {
      primary: { main: theme.colors.primary, light: theme.colors.primaryLight },
      secondary: { main: theme.colors.secondary, light: theme.colors.secondaryLight },
      success: { main: theme.colors.success, light: theme.colors.successLight },
      warning: { main: theme.colors.warning, light: theme.colors.warningLight },
      error: { main: theme.colors.error, light: theme.colors.errorLight },
      info: { main: theme.colors.info, light: theme.colors.infoLight },
      neutral: { main: theme.colors.textSecondary, light: theme.colors.backgroundSecondary },
    };
    return colorMap[color];
  };

  const colorValues = getColorValues();

  // Size configurations
  const sizes = {
    sm: {
      paddingVertical: theme.spacing[0.5],
      paddingHorizontal: theme.spacing[2],
      fontSize: theme.typography.sizes.xs,
    },
    md: {
      paddingVertical: theme.spacing[1],
      paddingHorizontal: theme.spacing[2.5],
      fontSize: theme.typography.sizes.sm,
    },
  };

  const sizeConfig = sizes[size];

  // Get styles based on variant
  const getContainerStyle = (): ViewStyle => {
    const baseStyle: ViewStyle = {
      borderRadius: theme.componentRadius.badge,
      paddingVertical: sizeConfig.paddingVertical,
      paddingHorizontal: sizeConfig.paddingHorizontal,
      alignSelf: 'flex-start',
    };

    const variantStyles: Record<BadgeVariant, ViewStyle> = {
      solid: {
        backgroundColor: colorValues.main,
      },
      soft: {
        backgroundColor: colorValues.light,
      },
      outline: {
        backgroundColor: 'transparent',
        borderWidth: 1,
        borderColor: colorValues.main,
      },
    };

    return { ...baseStyle, ...variantStyles[variant] };
  };

  // Get text color
  const getTextColor = () => {
    if (variant === 'solid') {
      return theme.colors.textInverse;
    }
    return colorValues.main;
  };

  const textStyle: TextStyle = {
    fontSize: sizeConfig.fontSize,
    fontWeight: theme.typography.weights.medium,
    color: getTextColor(),
  };

  return (
    <View style={[getContainerStyle(), style]}>
      {typeof children === 'string' ? <Text style={textStyle}>{children}</Text> : children}
    </View>
  );
}

export default Badge;
