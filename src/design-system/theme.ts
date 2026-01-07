/**
 * Theme Composition for VibeRN Design System
 * @see docs/DESIGN_SYSTEM.md for usage patterns and customization
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

// Theme factory function to eliminate duplication
function createTheme(colors: ColorTokens): Theme {
  return {
    colors,
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
}

// Light and dark themes
export const lightTheme = createTheme(lightColors);
export const darkTheme = createTheme(darkColors);

// Theme mode type
export type ThemeMode = 'light' | 'dark' | 'system';

// Default theme
export const defaultTheme = lightTheme;
