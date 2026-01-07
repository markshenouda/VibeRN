/**
 * Color Tokens for VibeRN Design System
 * @see docs/DESIGN_SYSTEM.md for customization guide
 */

// Raw color palette - Indigo/Violet theme
export const palette = {
  // Primary - Indigo
  primary: {
    50: '#eef2ff',
    100: '#e0e7ff',
    200: '#c7d2fe',
    300: '#a5b4fc',
    400: '#818cf8',
    500: '#6366f1',
    600: '#4f46e5',
    700: '#4338ca',
    800: '#3730a3',
    900: '#312e81',
    950: '#1e1b4b',
  },

  // Secondary - Violet
  secondary: {
    50: '#f5f3ff',
    100: '#ede9fe',
    200: '#ddd6fe',
    300: '#c4b5fd',
    400: '#a78bfa',
    500: '#8b5cf6',
    600: '#7c3aed',
    700: '#6d28d9',
    800: '#5b21b6',
    900: '#4c1d95',
    950: '#2e1065',
  },

  // Neutral - Slate
  neutral: {
    50: '#f8fafc',
    100: '#f1f5f9',
    200: '#e2e8f0',
    300: '#cbd5e1',
    400: '#94a3b8',
    500: '#64748b',
    600: '#475569',
    700: '#334155',
    800: '#1e293b',
    900: '#0f172a',
    950: '#020617',
  },

  // Semantic - Success (Green)
  success: {
    50: '#f0fdf4',
    100: '#dcfce7',
    200: '#bbf7d0',
    300: '#86efac',
    400: '#4ade80',
    500: '#22c55e',
    600: '#16a34a',
    700: '#15803d',
    800: '#166534',
    900: '#14532d',
    950: '#052e16',
  },

  // Semantic - Warning (Amber)
  warning: {
    50: '#fffbeb',
    100: '#fef3c7',
    200: '#fde68a',
    300: '#fcd34d',
    400: '#fbbf24',
    500: '#f59e0b',
    600: '#d97706',
    700: '#b45309',
    800: '#92400e',
    900: '#78350f',
    950: '#451a03',
  },

  // Semantic - Error (Red)
  error: {
    50: '#fef2f2',
    100: '#fee2e2',
    200: '#fecaca',
    300: '#fca5a5',
    400: '#f87171',
    500: '#ef4444',
    600: '#dc2626',
    700: '#b91c1c',
    800: '#991b1b',
    900: '#7f1d1d',
    950: '#450a0a',
  },

  // Semantic - Info (Blue)
  info: {
    50: '#eff6ff',
    100: '#dbeafe',
    200: '#bfdbfe',
    300: '#93c5fd',
    400: '#60a5fa',
    500: '#3b82f6',
    600: '#2563eb',
    700: '#1d4ed8',
    800: '#1e40af',
    900: '#1e3a8a',
    950: '#172554',
  },

  // Pure colors
  white: '#ffffff',
  black: '#000000',
  transparent: 'transparent',
} as const;

// Light mode semantic colors
export const lightColors = {
  // Backgrounds
  background: palette.white,
  backgroundSecondary: palette.neutral[50],
  backgroundTertiary: palette.neutral[100],

  // Surfaces (cards, modals, etc.)
  surface: palette.white,
  surfaceSecondary: palette.neutral[50],
  surfaceElevated: palette.white,

  // Text
  textPrimary: palette.neutral[900],
  textSecondary: palette.neutral[600],
  textTertiary: palette.neutral[400],
  textInverse: palette.white,
  textDisabled: palette.neutral[300],

  // Primary
  primary: palette.primary[500],
  primaryHover: palette.primary[600],
  primaryActive: palette.primary[700],
  primaryLight: palette.primary[100],
  primaryDark: palette.primary[700],

  // Secondary
  secondary: palette.secondary[500],
  secondaryHover: palette.secondary[600],
  secondaryActive: palette.secondary[700],
  secondaryLight: palette.secondary[100],

  // Borders
  border: palette.neutral[200],
  borderSecondary: palette.neutral[100],
  borderFocus: palette.primary[500],

  // Semantic
  success: palette.success[500],
  successLight: palette.success[100],
  successDark: palette.success[700],

  warning: palette.warning[500],
  warningLight: palette.warning[100],
  warningDark: palette.warning[700],

  error: palette.error[500],
  errorLight: palette.error[100],
  errorDark: palette.error[700],

  info: palette.info[500],
  infoLight: palette.info[100],
  infoDark: palette.info[700],

  // Interactive states
  overlay: 'rgba(0, 0, 0, 0.5)',
  scrim: 'rgba(0, 0, 0, 0.3)',
  skeleton: palette.neutral[200],

  // Input specific
  inputBackground: palette.white,
  inputBorder: palette.neutral[300],
  inputBorderFocus: palette.primary[500],
  inputPlaceholder: palette.neutral[400],
} as const;

// Dark mode semantic colors
export const darkColors = {
  // Backgrounds
  background: palette.neutral[950],
  backgroundSecondary: palette.neutral[900],
  backgroundTertiary: palette.neutral[800],

  // Surfaces
  surface: palette.neutral[900],
  surfaceSecondary: palette.neutral[800],
  surfaceElevated: palette.neutral[800],

  // Text
  textPrimary: palette.neutral[50],
  textSecondary: palette.neutral[400],
  textTertiary: palette.neutral[500],
  textInverse: palette.neutral[900],
  textDisabled: palette.neutral[600],

  // Primary
  primary: palette.primary[400],
  primaryHover: palette.primary[300],
  primaryActive: palette.primary[500],
  primaryLight: palette.primary[900],
  primaryDark: palette.primary[300],

  // Secondary
  secondary: palette.secondary[400],
  secondaryHover: palette.secondary[300],
  secondaryActive: palette.secondary[500],
  secondaryLight: palette.secondary[900],

  // Borders
  border: palette.neutral[700],
  borderSecondary: palette.neutral[800],
  borderFocus: palette.primary[400],

  // Semantic
  success: palette.success[400],
  successLight: palette.success[900],
  successDark: palette.success[300],

  warning: palette.warning[400],
  warningLight: palette.warning[900],
  warningDark: palette.warning[300],

  error: palette.error[400],
  errorLight: palette.error[900],
  errorDark: palette.error[300],

  info: palette.info[400],
  infoLight: palette.info[900],
  infoDark: palette.info[300],

  // Interactive states
  overlay: 'rgba(0, 0, 0, 0.7)',
  scrim: 'rgba(0, 0, 0, 0.5)',
  skeleton: palette.neutral[700],

  // Input specific
  inputBackground: palette.neutral[800],
  inputBorder: palette.neutral[600],
  inputBorderFocus: palette.primary[400],
  inputPlaceholder: palette.neutral[500],
} as const;

// Type for color tokens - using string type for color values to allow both light and dark themes
export type ColorTokens = {
  [K in keyof typeof lightColors]: string;
};
