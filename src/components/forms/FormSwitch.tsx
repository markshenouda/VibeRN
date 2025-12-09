/**
 * FormSwitch Component
 *
 * @description Switch component integrated with react-hook-form
 *
 * @ai-guide
 * Props:
 * - `name`: Field name (for react-hook-form)
 * - `control`: Form control from useForm()
 * - `label`: Switch label
 *
 * Usage:
 * ```tsx
 * const { control } = useForm();
 *
 * <FormSwitch
 *   name="notifications"
 *   control={control}
 *   label="Enable notifications"
 * />
 * ```
 */

import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Control, Controller, FieldValues, Path } from 'react-hook-form';
import { Switch, SwitchProps, Text } from '@/components/ui';

export interface FormSwitchProps<T extends FieldValues> extends Omit<
  SwitchProps,
  'value' | 'onValueChange'
> {
  /** Field name */
  name: Path<T>;
  /** Form control */
  control: Control<T>;
}

/**
 * FormSwitch Component
 *
 * Switch component with react-hook-form integration.
 *
 * @example
 * ```tsx
 * const { control } = useForm<SettingsForm>();
 *
 * <FormSwitch
 *   name="notifications"
 *   control={control}
 *   label="Push notifications"
 * />
 *
 * <FormSwitch
 *   name="darkMode"
 *   control={control}
 *   label="Dark mode"
 * />
 * ```
 */
export function FormSwitch<T extends FieldValues>({
  name,
  control,
  ...switchProps
}: FormSwitchProps<T>) {
  return (
    <Controller
      name={name}
      control={control}
      render={({ field: { onChange, value }, fieldState: { error } }) => (
        <View style={styles.container}>
          <Switch value={value ?? false} onValueChange={onChange} {...switchProps} />
          {error && (
            <Text variant="caption" color="error" style={styles.error}>
              {error.message}
            </Text>
          )}
        </View>
      )}
    />
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 16,
  },
  error: {
    marginTop: 4,
  },
});

export default FormSwitch;
