/**
 * Radio Component
 *
 * @description Radio button group for single selection
 *
 * @ai-guide
 * Props:
 * - `value`: Currently selected value
 * - `onValueChange`: Callback when selection changes
 * - `options`: Array of { value, label } options
 * - `direction`: Layout direction (vertical, horizontal)
 *
 * Usage:
 * ```tsx
 * <RadioGroup
 *   value={selected}
 *   onValueChange={setSelected}
 *   options={[
 *     { value: 'option1', label: 'Option 1' },
 *     { value: 'option2', label: 'Option 2' },
 *   ]}
 * />
 * ```
 */

import React from 'react';
import { View, Pressable, StyleSheet, ViewStyle } from 'react-native';
import * as Haptics from 'expo-haptics';
import { useTheme } from '@/design-system';
import { Text } from './Text';

// Radio option type
export interface RadioOption {
  value: string;
  label: string;
  disabled?: boolean;
}

export interface RadioGroupProps {
  /** Currently selected value */
  value?: string;
  /** Change handler */
  onValueChange?: (value: string) => void;
  /** Available options */
  options: RadioOption[];
  /** Layout direction */
  direction?: 'vertical' | 'horizontal';
  /** Disable all options */
  disabled?: boolean;
  /** Error state */
  error?: boolean;
  /** Container style */
  style?: ViewStyle;
}

/**
 * RadioGroup Component
 *
 * A group of radio buttons for single selection.
 *
 * @example
 * ```tsx
 * const [plan, setPlan] = useState('free');
 *
 * <RadioGroup
 *   value={plan}
 *   onValueChange={setPlan}
 *   options={[
 *     { value: 'free', label: 'Free Plan' },
 *     { value: 'pro', label: 'Pro Plan' },
 *     { value: 'enterprise', label: 'Enterprise' },
 *   ]}
 * />
 * ```
 */
export function RadioGroup({
  value,
  onValueChange,
  options,
  direction = 'vertical',
  disabled = false,
  error = false,
  style,
}: RadioGroupProps) {
  const { theme } = useTheme();

  const handleSelect = (optionValue: string) => {
    if (disabled) return;
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    onValueChange?.(optionValue);
  };

  return (
    <View style={[styles.container, direction === 'horizontal' && styles.horizontal, style]}>
      {options.map((option) => {
        const isSelected = value === option.value;
        const isDisabled = disabled || option.disabled;

        const outerStyle: ViewStyle = {
          width: 20,
          height: 20,
          borderRadius: 10,
          borderWidth: 2,
          borderColor: error
            ? theme.colors.error
            : isSelected
              ? theme.colors.primary
              : theme.colors.inputBorder,
          justifyContent: 'center',
          alignItems: 'center',
          opacity: isDisabled ? 0.5 : 1,
        };

        const innerStyle: ViewStyle = {
          width: 10,
          height: 10,
          borderRadius: 5,
          backgroundColor: theme.colors.primary,
        };

        return (
          <Pressable
            key={option.value}
            style={styles.option}
            onPress={() => handleSelect(option.value)}
            disabled={isDisabled}
          >
            <View style={outerStyle}>{isSelected && <View style={innerStyle} />}</View>
            <Text
              variant="body"
              color={isDisabled ? 'textDisabled' : 'textPrimary'}
              style={styles.label}
            >
              {option.label}
            </Text>
          </Pressable>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    gap: 12,
  },
  horizontal: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 16,
  },
  option: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  label: {
    marginLeft: 8,
  },
});

export default RadioGroup;
