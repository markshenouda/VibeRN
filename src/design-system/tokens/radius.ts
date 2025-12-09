/**
 * Border Radius Tokens for VibeRN Design System
 *
 * @description Consistent border radius values for rounded corners
 *
 * @ai-guide
 * Radius Scale:
 * - `none`: 0 - sharp corners
 * - `sm`: 4px - subtle rounding
 * - `md`: 8px - default for most components
 * - `lg`: 12px - cards, modals
 * - `xl`: 16px - large cards
 * - `2xl`: 24px - pills, tags
 * - `full`: 9999px - circular elements
 *
 * Usage Guidelines:
 * - Buttons: `radius.md` or `radius.lg`
 * - Cards: `radius.lg` or `radius.xl`
 * - Inputs: `radius.md`
 * - Avatars: `radius.full`
 * - Badges/Tags: `radius.full` or `radius.2xl`
 *
 * To modify:
 * - Adjust values to match your design language
 * - Keep the scale consistent (each step roughly doubles)
 */

export const radius = {
  none: 0,
  xs: 2,
  sm: 4,
  md: 8,
  lg: 12,
  xl: 16,
  '2xl': 24,
  '3xl': 32,
  full: 9999,
} as const;

// Component-specific radius (semantic aliases)
export const componentRadius = {
  button: radius.md,
  buttonSmall: radius.sm,
  buttonLarge: radius.lg,

  input: radius.md,
  inputSmall: radius.sm,

  card: radius.lg,
  cardSmall: radius.md,

  modal: radius.xl,
  bottomSheet: radius['2xl'],

  avatar: radius.full,
  avatarSquare: radius.lg,

  badge: radius.full,
  tag: radius.md,

  tooltip: radius.md,
  toast: radius.lg,

  checkbox: radius.sm,
  switch: radius.full,

  skeleton: radius.md,
} as const;

export type RadiusKey = keyof typeof radius;
export type ComponentRadiusKey = keyof typeof componentRadius;
