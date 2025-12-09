/**
 * Layout Constants
 *
 * @description Screen dimensions and layout constants
 *
 * @ai-guide
 * Available constants:
 * - `SCREEN_WIDTH`, `SCREEN_HEIGHT`: Device dimensions
 * - `isSmallDevice`, `isTablet`: Device type checks
 * - `hitSlop`: Standard hit area for touch targets
 */

import { Dimensions, Platform, StatusBar } from 'react-native';

const { width, height } = Dimensions.get('window');

/**
 * Screen dimensions
 */
export const SCREEN_WIDTH = width;
export const SCREEN_HEIGHT = height;

/**
 * Device type checks
 */
export const isSmallDevice = width < 375;
export const isTablet = width >= 768;
export const isIOS = Platform.OS === 'ios';
export const isAndroid = Platform.OS === 'android';

/**
 * Status bar height
 */
export const STATUS_BAR_HEIGHT = StatusBar.currentHeight ?? (isIOS ? 44 : 0);

/**
 * Standard hit slop for touch targets
 * Use this to increase the touchable area of small buttons
 */
export const hitSlop = {
  top: 10,
  bottom: 10,
  left: 10,
  right: 10,
};

/**
 * Common layout values
 */
export const layout = {
  /** Standard screen horizontal padding */
  screenPaddingHorizontal: 16,

  /** Standard screen vertical padding */
  screenPaddingVertical: 20,

  /** Bottom tab bar height (approximate) */
  tabBarHeight: 80,

  /** Header height */
  headerHeight: 56,

  /** Card border radius */
  cardRadius: 12,

  /** Button border radius */
  buttonRadius: 8,

  /** Input border radius */
  inputRadius: 8,

  /** Modal border radius */
  modalRadius: 16,
};

/**
 * Responsive breakpoints
 */
export const breakpoints = {
  small: 375,
  medium: 768,
  large: 1024,
};

/**
 * Get responsive value based on screen width
 *
 * @example
 * const padding = getResponsiveValue({
 *   small: 12,
 *   medium: 16,
 *   large: 24,
 * });
 */
export function getResponsiveValue<T>(values: { small: T; medium?: T; large?: T }): T {
  if (width >= breakpoints.large && values.large !== undefined) {
    return values.large;
  }
  if (width >= breakpoints.medium && values.medium !== undefined) {
    return values.medium;
  }
  return values.small;
}
