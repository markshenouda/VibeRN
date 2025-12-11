/**
 * Icon Component
 *
 * @description Themed icon component wrapping @expo/vector-icons
 *
 * @ai-guide
 * Props:
 * - `name`: Icon name from the selected family
 * - `family`: Icon family (Ionicons, MaterialCommunityIcons, Feather, etc.)
 * - `size`: Icon size (xs, sm, md, lg, xl) or number
 * - `color`: Theme color or custom color string
 *
 * Usage:
 * ```tsx
 * <Icon name="home" />
 * <Icon name="settings" size="lg" color="primary" />
 * <Icon name="heart" family="Feather" color="error" />
 * <Icon name="check-circle" family="MaterialCommunityIcons" size={32} />
 * ```
 *
 * Available families:
 * - Ionicons (default): iOS-style icons
 * - MaterialCommunityIcons: Material Design icons
 * - Feather: Feather icons (minimal style)
 * - FontAwesome: FontAwesome icons
 * - MaterialIcons: Google Material icons
 *
 * To customize:
 * - Add more icon families from @expo/vector-icons
 * - Modify size presets in the `sizes` object
 * - Add custom color mappings
 */

import React from 'react';
import { StyleProp, TextStyle } from 'react-native';
import {
  Ionicons,
  MaterialCommunityIcons,
  Feather,
  FontAwesome,
  MaterialIcons,
} from '@expo/vector-icons';
import { useTheme } from '@/design-system';

// Icon families
type IconFamily =
  | 'Ionicons'
  | 'MaterialCommunityIcons'
  | 'Feather'
  | 'FontAwesome'
  | 'MaterialIcons';

// Predefined sizes
type IconSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl';

// Theme colors
type ThemeColor =
  | 'primary'
  | 'secondary'
  | 'success'
  | 'warning'
  | 'error'
  | 'info'
  | 'textPrimary'
  | 'textSecondary'
  | 'textTertiary'
  | 'textInverse';

// Icon component map
const IconComponents = {
  Ionicons,
  MaterialCommunityIcons,
  Feather,
  FontAwesome,
  MaterialIcons,
} as const;

// Type helpers for icon names
type IoniconsName = keyof typeof Ionicons.glyphMap;
type MaterialCommunityIconsName = keyof typeof MaterialCommunityIcons.glyphMap;
type FeatherName = keyof typeof Feather.glyphMap;
type FontAwesomeName = keyof typeof FontAwesome.glyphMap;
type MaterialIconsName = keyof typeof MaterialIcons.glyphMap;

// Props type with conditional icon name based on family
export type IconProps = {
  /** Icon size - preset name or number */
  size?: IconSize | number;
  /** Theme color name or custom color string */
  color?: ThemeColor | string;
  /** Additional styles */
  style?: StyleProp<TextStyle>;
  /** Test ID for testing */
  testID?: string;
} & (
  | { family?: 'Ionicons'; name: IoniconsName }
  | { family: 'MaterialCommunityIcons'; name: MaterialCommunityIconsName }
  | { family: 'Feather'; name: FeatherName }
  | { family: 'FontAwesome'; name: FontAwesomeName }
  | { family: 'MaterialIcons'; name: MaterialIconsName }
);

/**
 * Icon Component
 *
 * A flexible, themed icon component that wraps @expo/vector-icons.
 * Supports multiple icon families and integrates with the design system.
 *
 * @example
 * ```tsx
 * // Basic usage (defaults to Ionicons)
 * <Icon name="home" />
 *
 * // With size preset
 * <Icon name="settings" size="lg" />
 *
 * // With theme color
 * <Icon name="heart" color="error" />
 *
 * // Different icon family
 * <Icon name="github" family="Feather" />
 *
 * // Custom size and color
 * <Icon name="star" size={28} color="#FFD700" />
 *
 * // In a Button
 * <Button leftIcon={<Icon name="add" size="sm" color="textInverse" />}>
 *   Add Item
 * </Button>
 * ```
 */
export function Icon({
  name,
  family = 'Ionicons',
  size = 'md',
  color = 'textPrimary',
  style,
  testID,
}: IconProps) {
  const { theme } = useTheme();

  // Size presets
  const sizes: Record<IconSize, number> = {
    xs: 12,
    sm: 16,
    md: 20,
    lg: 24,
    xl: 32,
  };

  // Resolve size
  const resolvedSize = typeof size === 'number' ? size : sizes[size];

  // Theme color mapping
  const themeColors: Record<ThemeColor, string> = {
    primary: theme.colors.primary,
    secondary: theme.colors.secondary,
    success: theme.colors.success,
    warning: theme.colors.warning,
    error: theme.colors.error,
    info: theme.colors.info,
    textPrimary: theme.colors.textPrimary,
    textSecondary: theme.colors.textSecondary,
    textTertiary: theme.colors.textTertiary,
    textInverse: theme.colors.textInverse,
  };

  // Resolve color - check if it's a theme color or custom string
  const resolvedColor = color in themeColors ? themeColors[color as ThemeColor] : color;

  // Get the icon component for the family
  const IconComponent = IconComponents[family];

  return (
    <IconComponent
      name={name as any}
      size={resolvedSize}
      color={resolvedColor}
      style={style}
      testID={testID}
    />
  );
}

export default Icon;
