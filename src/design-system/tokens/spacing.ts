/**
 * Spacing Tokens for VibeRN Design System
 *
 * @description Consistent spacing scale for margins, paddings, and gaps
 *
 * @ai-guide
 * Spacing Scale:
 * - Based on 4px base unit (common in design systems)
 * - Values: 0, 1, 2, 3, 4, 5, 6, 8, 10, 12, 16, 20, 24, 32, 40, 48, 56, 64
 *
 * Usage Guidelines:
 * - Use `spacing.xs` to `spacing.xl` for component internal spacing
 * - Use numbered values for precise control
 * - Screen padding: typically `spacing[4]` (16px) or `spacing[5]` (20px)
 * - Component gaps: typically `spacing[2]` (8px) to `spacing[4]` (16px)
 *
 * To add new spacing values:
 * - Add to the `spacing` object below
 * - Follow the 4px base unit pattern for consistency
 */

// Base unit for spacing calculations
const BASE_UNIT = 4;

// Spacing scale (value * BASE_UNIT)
export const spacing = {
  0: 0,
  px: 1,
  0.5: BASE_UNIT * 0.5, // 2
  1: BASE_UNIT * 1, // 4
  1.5: BASE_UNIT * 1.5, // 6
  2: BASE_UNIT * 2, // 8
  2.5: BASE_UNIT * 2.5, // 10
  3: BASE_UNIT * 3, // 12
  3.5: BASE_UNIT * 3.5, // 14
  4: BASE_UNIT * 4, // 16
  5: BASE_UNIT * 5, // 20
  6: BASE_UNIT * 6, // 24
  7: BASE_UNIT * 7, // 28
  8: BASE_UNIT * 8, // 32
  9: BASE_UNIT * 9, // 36
  10: BASE_UNIT * 10, // 40
  11: BASE_UNIT * 11, // 44
  12: BASE_UNIT * 12, // 48
  14: BASE_UNIT * 14, // 56
  16: BASE_UNIT * 16, // 64
  20: BASE_UNIT * 20, // 80
  24: BASE_UNIT * 24, // 96
  28: BASE_UNIT * 28, // 112
  32: BASE_UNIT * 32, // 128
  36: BASE_UNIT * 36, // 144
  40: BASE_UNIT * 40, // 160
  44: BASE_UNIT * 44, // 176
  48: BASE_UNIT * 48, // 192
  52: BASE_UNIT * 52, // 208
  56: BASE_UNIT * 56, // 224
  60: BASE_UNIT * 60, // 240
  64: BASE_UNIT * 64, // 256
  72: BASE_UNIT * 72, // 288
  80: BASE_UNIT * 80, // 320
  96: BASE_UNIT * 96, // 384
} as const;

// Semantic spacing aliases for common use cases
export const semanticSpacing = {
  // Extra small - icon padding, tight gaps
  xs: spacing[1], // 4

  // Small - button padding, small gaps
  sm: spacing[2], // 8

  // Medium - default component padding
  md: spacing[3], // 12

  // Large - section padding
  lg: spacing[4], // 16

  // Extra large - screen padding
  xl: spacing[5], // 20

  // 2XL - large section gaps
  '2xl': spacing[6], // 24

  // 3XL - major section gaps
  '3xl': spacing[8], // 32

  // 4XL - screen sections
  '4xl': spacing[10], // 40

  // Screen padding (horizontal)
  screenHorizontal: spacing[4], // 16

  // Screen padding (vertical)
  screenVertical: spacing[5], // 20

  // Card padding
  cardPadding: spacing[4], // 16

  // Input padding horizontal
  inputHorizontal: spacing[3], // 12

  // Input padding vertical
  inputVertical: spacing[2.5], // 10

  // Button padding horizontal
  buttonHorizontal: spacing[4], // 16

  // Button padding vertical
  buttonVertical: spacing[2.5], // 10

  // List item padding
  listItemPadding: spacing[4], // 16

  // Section gap
  sectionGap: spacing[6], // 24

  // Component gap (between elements in a component)
  componentGap: spacing[2], // 8

  // Stack gap (vertical list of items)
  stackGap: spacing[3], // 12
} as const;

export type SpacingKey = keyof typeof spacing;
export type SemanticSpacingKey = keyof typeof semanticSpacing;
