/**
 * Shadow Tokens for VibeRN Design System
 *
 * @description Platform-specific shadow definitions for elevation
 *
 * @ai-guide
 * Shadow Scale:
 * - `none`: No shadow
 * - `sm`: Subtle shadow for slight elevation
 * - `md`: Default shadow for cards
 * - `lg`: Elevated elements like modals
 * - `xl`: High elevation, dropdowns
 * - `2xl`: Maximum elevation
 *
 * Platform Notes:
 * - iOS uses shadowColor, shadowOffset, shadowOpacity, shadowRadius
 * - Android uses elevation (simpler but less control)
 * - Both are included for cross-platform consistency
 *
 * Usage:
 * ```tsx
 * <View style={shadows.md} />
 * ```
 *
 * To customize shadows:
 * - Adjust shadowOpacity for intensity
 * - Adjust shadowRadius for blur amount
 * - Adjust shadowOffset.height for direction
 */

import { Platform, ViewStyle } from 'react-native';

// Shadow color (can be customized per theme if needed)
const shadowColor = '#000000';

// iOS shadow definitions
const iosShadows = {
  none: {
    shadowColor: 'transparent',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0,
    shadowRadius: 0,
  },
  sm: {
    shadowColor,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
  },
  md: {
    shadowColor,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  lg: {
    shadowColor,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 8,
  },
  xl: {
    shadowColor,
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.2,
    shadowRadius: 16,
  },
  '2xl': {
    shadowColor,
    shadowOffset: { width: 0, height: 12 },
    shadowOpacity: 0.25,
    shadowRadius: 24,
  },
} as const;

// Android elevation values
const androidElevations = {
  none: 0,
  sm: 2,
  md: 4,
  lg: 8,
  xl: 12,
  '2xl': 24,
} as const;

// Combined shadow definitions that work cross-platform
type ShadowStyle = Pick<
  ViewStyle,
  'shadowColor' | 'shadowOffset' | 'shadowOpacity' | 'shadowRadius' | 'elevation'
>;

export const shadows: Record<keyof typeof iosShadows, ShadowStyle> = {
  none: {
    ...iosShadows.none,
    elevation: androidElevations.none,
  },
  sm: {
    ...iosShadows.sm,
    elevation: androidElevations.sm,
  },
  md: {
    ...iosShadows.md,
    elevation: androidElevations.md,
  },
  lg: {
    ...iosShadows.lg,
    elevation: androidElevations.lg,
  },
  xl: {
    ...iosShadows.xl,
    elevation: androidElevations.xl,
  },
  '2xl': {
    ...iosShadows['2xl'],
    elevation: androidElevations['2xl'],
  },
};

// Utility to create custom shadows
export function createShadow(
  offsetY: number,
  radius: number,
  opacity: number,
  elevation: number
): ShadowStyle {
  return Platform.select({
    ios: {
      shadowColor,
      shadowOffset: { width: 0, height: offsetY },
      shadowOpacity: opacity,
      shadowRadius: radius,
    },
    android: {
      elevation,
    },
    default: {
      shadowColor,
      shadowOffset: { width: 0, height: offsetY },
      shadowOpacity: opacity,
      shadowRadius: radius,
      elevation,
    },
  }) as ShadowStyle;
}

export type ShadowKey = keyof typeof shadows;
