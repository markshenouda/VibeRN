/**
 * Text Component
 *
 * @description Themed text component with pre-defined styles
 *
 * @ai-guide
 * Props:
 * - `variant`: Pre-defined text style (h1, h2, body, caption, etc.)
 * - `color`: Semantic color name from theme
 * - `align`: Text alignment
 * - `weight`: Font weight override
 *
 * Usage:
 * ```tsx
 * <Text variant="h1">Heading</Text>
 * <Text variant="body" color="textSecondary">Body text</Text>
 * <Text variant="caption" align="center">Caption</Text>
 * ```
 *
 * To add new variants:
 * 1. Add the style to `textStyles` in tokens/typography.ts
 * 2. The variant will automatically be available
 */

import React from 'react';
import { Text as RNText, TextProps as RNTextProps, StyleSheet, TextStyle } from 'react-native';
import { useTheme } from '@/design-system';
import { TextStyleName, fontWeights } from '@/design-system/tokens';
import { ColorTokens } from '@/design-system/tokens/colors';

export interface TextProps extends RNTextProps {
  /** Pre-defined text style variant */
  variant?: TextStyleName;
  /** Semantic color from theme */
  color?: keyof ColorTokens;
  /** Text alignment */
  align?: 'left' | 'center' | 'right';
  /** Font weight override */
  weight?: keyof typeof fontWeights;
  /** Children content */
  children?: React.ReactNode;
}

/**
 * Text Component
 *
 * A themed text component that uses design system typography.
 *
 * @example
 * ```tsx
 * <Text variant="h1">Welcome</Text>
 * <Text variant="body" color="textSecondary">
 *   This is body text with secondary color
 * </Text>
 * ```
 */
export function Text({
  variant = 'body',
  color = 'textPrimary',
  align,
  weight,
  style,
  children,
  ...props
}: TextProps) {
  const { theme } = useTheme();

  const textStyle: TextStyle = {
    ...theme.typography.styles[variant],
    color: theme.colors[color],
    ...(align && { textAlign: align }),
    ...(weight && { fontWeight: fontWeights[weight] }),
  };

  return (
    <RNText style={[textStyle, style]} {...props}>
      {children}
    </RNText>
  );
}

// Export default for convenience
export default Text;
