/**
 * Design System - Main Export
 *
 * @description Central export for the VibeRN design system
 *
 * @ai-guide
 * Import from this file:
 * ```tsx
 * import { useTheme, lightTheme, spacing, radius } from '@/design-system';
 * ```
 *
 * Available exports:
 * - Theme: `useTheme`, `ThemeProvider`, `lightTheme`, `darkTheme`
 * - Tokens: All tokens from `./tokens`
 *
 * For individual token imports:
 * ```tsx
 * import { palette, textStyles } from '@/design-system/tokens';
 * ```
 */

// Theme
export { ThemeProvider, useTheme, ThemeContext } from './ThemeProvider';
export { lightTheme, darkTheme, defaultTheme, type Theme, type ThemeMode } from './theme';

// Re-export all tokens
export * from './tokens';
