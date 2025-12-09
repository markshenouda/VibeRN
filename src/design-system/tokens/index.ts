/**
 * Design System Tokens - Main Export
 *
 * @description Central export for all design tokens
 *
 * @ai-guide
 * Import tokens from this file:
 * ```tsx
 * import { palette, spacing, radius, shadows, textStyles } from '@/design-system/tokens';
 * ```
 *
 * Available exports:
 * - Colors: `palette`, `lightColors`, `darkColors`
 * - Typography: `fontSizes`, `fontWeights`, `textStyles`, `fontFamilies`
 * - Spacing: `spacing`, `semanticSpacing`
 * - Radius: `radius`, `componentRadius`
 * - Shadows: `shadows`, `createShadow`
 */

// Colors
export { palette, lightColors, darkColors, type ColorTokens } from './colors';

// Typography
export {
  fontFamilies,
  fontSizes,
  fontWeights,
  lineHeights,
  letterSpacing,
  textStyles,
  type TextStyleName,
} from './typography';

// Spacing
export { spacing, semanticSpacing, type SpacingKey, type SemanticSpacingKey } from './spacing';

// Border Radius
export { radius, componentRadius, type RadiusKey, type ComponentRadiusKey } from './radius';

// Shadows
export { shadows, createShadow, type ShadowKey } from './shadows';
