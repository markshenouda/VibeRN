/**
 * Switch Component
 *
 * @description Toggle switch for boolean settings
 *
 * @ai-guide
 * Props:
 * - `value`: Current switch state
 * - `onValueChange`: Callback when state changes
 * - `label`: Optional label text
 * - `disabled`: Disable the switch
 *
 * Usage:
 * ```tsx
 * <Switch
 *   value={notifications}
 *   onValueChange={setNotifications}
 *   label="Enable notifications"
 * />
 * ```
 */

import React from 'react';
import {
  Switch as RNSwitch,
  View,
  StyleSheet,
  ViewStyle,
  SwitchProps as RNSwitchProps,
} from 'react-native';
import { useTheme } from '@/design-system';
import { Text } from './Text';

export interface SwitchProps extends Omit<RNSwitchProps, 'value' | 'onValueChange'> {
  /** Switch state */
  value?: boolean;
  /** Change handler */
  onValueChange?: (value: boolean) => void;
  /** Label text */
  label?: string;
  /** Label position */
  labelPosition?: 'left' | 'right';
  /** Disable switch */
  disabled?: boolean;
  /** Container style */
  style?: ViewStyle;
}

/**
 * Switch Component
 *
 * A toggle switch for boolean values.
 *
 * @example
 * ```tsx
 * const [enabled, setEnabled] = useState(false);
 *
 * <Switch
 *   value={enabled}
 *   onValueChange={setEnabled}
 *   label="Dark mode"
 * />
 * ```
 */
export function Switch({
  value = false,
  onValueChange,
  label,
  labelPosition = 'left',
  disabled = false,
  style,
  ...props
}: SwitchProps) {
  const { theme } = useTheme();

  const switchElement = (
    <RNSwitch
      value={value}
      onValueChange={onValueChange}
      disabled={disabled}
      trackColor={{
        false: theme.colors.border,
        true: theme.colors.primaryLight,
      }}
      thumbColor={value ? theme.colors.primary : theme.colors.surface}
      ios_backgroundColor={theme.colors.border}
      {...props}
    />
  );

  if (!label) {
    return switchElement;
  }

  return (
    <View style={[styles.container, labelPosition === 'right' && styles.containerReverse, style]}>
      {labelPosition === 'left' && (
        <Text
          variant="body"
          color={disabled ? 'textDisabled' : 'textPrimary'}
          style={styles.labelLeft}
        >
          {label}
        </Text>
      )}
      {switchElement}
      {labelPosition === 'right' && (
        <Text
          variant="body"
          color={disabled ? 'textDisabled' : 'textPrimary'}
          style={styles.labelRight}
        >
          {label}
        </Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  containerReverse: {
    justifyContent: 'flex-start',
  },
  labelLeft: {
    flex: 1,
  },
  labelRight: {
    marginLeft: 12,
  },
});

export default Switch;
