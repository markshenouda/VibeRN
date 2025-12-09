/**
 * FormRadioGroup Component
 *
 * @description Radio group component integrated with react-hook-form
 *
 * @ai-guide
 * Props:
 * - `name`: Field name (for react-hook-form)
 * - `control`: Form control from useForm()
 * - `options`: Radio options
 * - `label`: Group label
 *
 * Usage:
 * ```tsx
 * const { control } = useForm();
 *
 * <FormRadioGroup
 *   name="plan"
 *   control={control}
 *   label="Select Plan"
 *   options={[
 *     { value: 'free', label: 'Free' },
 *     { value: 'pro', label: 'Pro' },
 *   ]}
 * />
 * ```
 */

import React from 'react';
import { View, StyleSheet, ViewStyle } from 'react-native';
import { Control, Controller, FieldValues, Path } from 'react-hook-form';
import { RadioGroup, RadioGroupProps, Text } from '@/components/ui';

export interface FormRadioGroupProps<T extends FieldValues> extends Omit<
  RadioGroupProps,
  'value' | 'onValueChange'
> {
  /** Field name */
  name: Path<T>;
  /** Form control */
  control: Control<T>;
  /** Group label */
  label?: string;
  /** Container style */
  containerStyle?: ViewStyle;
}

/**
 * FormRadioGroup Component
 *
 * Radio group with react-hook-form integration.
 *
 * @example
 * ```tsx
 * const { control } = useForm<SubscriptionForm>();
 *
 * <FormRadioGroup
 *   name="plan"
 *   control={control}
 *   label="Select Your Plan"
 *   options={[
 *     { value: 'free', label: 'Free - $0/month' },
 *     { value: 'pro', label: 'Pro - $9.99/month' },
 *     { value: 'enterprise', label: 'Enterprise - Contact us' },
 *   ]}
 * />
 * ```
 */
export function FormRadioGroup<T extends FieldValues>({
  name,
  control,
  label,
  containerStyle,
  ...radioProps
}: FormRadioGroupProps<T>) {
  return (
    <Controller
      name={name}
      control={control}
      render={({ field: { onChange, value }, fieldState: { error } }) => (
        <View style={[styles.container, containerStyle]}>
          {label && (
            <Text variant="label" style={styles.label}>
              {label}
            </Text>
          )}
          <RadioGroup
            value={value ?? ''}
            onValueChange={onChange}
            error={!!error}
            {...radioProps}
          />
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
  label: {
    marginBottom: 8,
  },
  error: {
    marginTop: 4,
  },
});

export default FormRadioGroup;
