/**
 * Checkbox Component
 *
 * @description Selectable checkbox with label support
 *
 * @ai-guide
 * Props:
 * - `checked`: Current checked state
 * - `onCheckedChange`: Callback when state changes
 * - `label`: Optional label text
 * - `disabled`: Disable the checkbox
 *
 * Usage:
 * ```tsx
 * <Checkbox
 *   checked={agreed}
 *   onCheckedChange={setAgreed}
 *   label="I agree to terms"
 * />
 * ```
 *
 * For form integration, use FormCheckbox from @/components/forms
 */

import React from 'react';
import { Pressable, View, StyleSheet, ViewStyle } from 'react-native';
import * as Haptics from 'expo-haptics';
import { useTheme } from '@/design-system';
import { Text } from './Text';

export interface CheckboxProps {
  /** Checked state */
  checked?: boolean;
  /** Change handler */
  onCheckedChange?: (checked: boolean) => void;
  /** Label text */
  label?: string;
  /** Disable checkbox */
  disabled?: boolean;
  /** Error state */
  error?: boolean;
  /** Container style */
  style?: ViewStyle;
}

/**
 * Checkbox Component
 *
 * A selectable checkbox with optional label.
 *
 * @example
 * ```tsx
 * const [checked, setChecked] = useState(false);
 *
 * <Checkbox
 *   checked={checked}
 *   onCheckedChange={setChecked}
 *   label="Remember me"
 * />
 * ```
 */
export function Checkbox({
  checked = false,
  onCheckedChange,
  label,
  disabled = false,
  error = false,
  style,
}: CheckboxProps) {
  const { theme } = useTheme();

  const handlePress = () => {
    if (disabled) return;
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    onCheckedChange?.(!checked);
  };

  // Box style
  const boxStyle: ViewStyle = {
    width: 20,
    height: 20,
    borderRadius: theme.componentRadius.checkbox,
    borderWidth: 2,
    borderColor: error
      ? theme.colors.error
      : checked
        ? theme.colors.primary
        : theme.colors.inputBorder,
    backgroundColor: checked ? theme.colors.primary : 'transparent',
    justifyContent: 'center',
    alignItems: 'center',
    opacity: disabled ? 0.5 : 1,
  };

  return (
    <Pressable style={[styles.container, style]} onPress={handlePress} disabled={disabled}>
      <View style={boxStyle}>
        {checked && (
          <View style={styles.checkmark}>
            <Text style={{ color: theme.colors.textInverse, fontSize: 12, fontWeight: 'bold' }}>
              ✓
            </Text>
          </View>
        )}
      </View>
      {label && (
        <Text variant="body" color={disabled ? 'textDisabled' : 'textPrimary'} style={styles.label}>
          {label}
        </Text>
      )}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  checkmark: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  label: {
    marginLeft: 8,
  },
});

export default Checkbox;
