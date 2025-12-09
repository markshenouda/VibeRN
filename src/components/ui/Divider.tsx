/**
 * Divider Component
 *
 * @description Visual separator for content sections
 *
 * @ai-guide
 * Props:
 * - `orientation`: horizontal or vertical
 * - `thickness`: Line thickness
 * - `spacing`: Margin around divider
 * - `label`: Optional center label
 *
 * Usage:
 * ```tsx
 * <Divider />
 * <Divider label="OR" />
 * <Divider orientation="vertical" />
 * ```
 */

import React from 'react';
import { View, StyleSheet, ViewStyle } from 'react-native';
import { useTheme } from '@/design-system';
import { Text } from './Text';

export interface DividerProps {
  /** Orientation */
  orientation?: 'horizontal' | 'vertical';
  /** Line thickness */
  thickness?: number;
  /** Spacing around divider */
  spacing?: number;
  /** Optional label text */
  label?: string;
  /** Custom color */
  color?: string;
  /** Container style */
  style?: ViewStyle;
}

/**
 * Divider Component
 *
 * A visual separator for content sections.
 *
 * @example
 * ```tsx
 * <Divider />
 *
 * <Divider label="OR" spacing={16} />
 *
 * <View style={{ flexDirection: 'row' }}>
 *   <Text>Left</Text>
 *   <Divider orientation="vertical" spacing={12} />
 *   <Text>Right</Text>
 * </View>
 * ```
 */
export function Divider({
  orientation = 'horizontal',
  thickness = 1,
  spacing = 0,
  label,
  color,
  style,
}: DividerProps) {
  const { theme } = useTheme();

  const lineColor = color || theme.colors.border;

  // Horizontal divider with optional label
  if (orientation === 'horizontal') {
    if (label) {
      return (
        <View style={[styles.labelContainer, { marginVertical: spacing }, style]}>
          <View style={[styles.line, { backgroundColor: lineColor, height: thickness }]} />
          <Text variant="caption" color="textTertiary" style={styles.label}>
            {label}
          </Text>
          <View style={[styles.line, { backgroundColor: lineColor, height: thickness }]} />
        </View>
      );
    }

    return (
      <View
        style={[
          {
            height: thickness,
            backgroundColor: lineColor,
            marginVertical: spacing,
          },
          style,
        ]}
      />
    );
  }

  // Vertical divider
  return (
    <View
      style={[
        {
          width: thickness,
          backgroundColor: lineColor,
          marginHorizontal: spacing,
          alignSelf: 'stretch',
        },
        style,
      ]}
    />
  );
}

const styles = StyleSheet.create({
  labelContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  line: {
    flex: 1,
  },
  label: {
    paddingHorizontal: 12,
  },
});

export default Divider;
