/**
 * Theme Composition for VibeRN Design System
 *
 * @description Combines all tokens into a unified theme object
 *
 * @ai-guide
 * Theme Structure:
 * - `colors`: Semantic colors (changes based on light/dark mode)
 * - `spacing`: Spacing scale
 * - `radius`: Border radius scale
 * - `shadows`: Shadow definitions
 * - `typography`: Text styles and font settings
 *
 * Usage:
 * ```tsx
 * const { theme } = useTheme();
 * <View style={{ backgroundColor: theme.colors.background }} />
 * ```
 *
 * To extend the theme:
 * 1. Add new tokens to the appropriate token file
 * 2. Include them in the theme object below
 * 3. Update the Theme type
 */

import {
  lightColors,
  darkColors,
  ColorTokens,
  spacing,
  semanticSpacing,
  radius,
  componentRadius,
  shadows,
  textStyles,
  fontFamilies,
  fontSizes,
  fontWeights,
} from './tokens';

// Theme structure
export interface Theme {
  colors: ColorTokens;
  spacing: typeof spacing;
  semanticSpacing: typeof semanticSpacing;
  radius: typeof radius;
  componentRadius: typeof componentRadius;
  shadows: typeof shadows;
  typography: {
    styles: typeof textStyles;
    fonts: typeof fontFamilies;
    sizes: typeof fontSizes;
    weights: typeof fontWeights;
  };
}

// Light theme
export const lightTheme: Theme = {
  colors: lightColors,
  spacing,
  semanticSpacing,
  radius,
  componentRadius,
  shadows,
  typography: {
    styles: textStyles,
    fonts: fontFamilies,
    sizes: fontSizes,
    weights: fontWeights,
  },
};

// Dark theme
export const darkTheme: Theme = {
  colors: darkColors,
  spacing,
  semanticSpacing,
  radius,
  componentRadius,
  shadows,
  typography: {
    styles: textStyles,
    fonts: fontFamilies,
    sizes: fontSizes,
    weights: fontWeights,
  },
};

// Theme mode type
export type ThemeMode = 'light' | 'dark' | 'system';

// Default theme
export const defaultTheme = lightTheme;
