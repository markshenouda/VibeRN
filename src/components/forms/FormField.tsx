/**
 * FormField Component
 *
 * @description Wrapper component for form fields with label and error
 *
 * @ai-guide
 * Props:
 * - `label`: Field label
 * - `error`: Error message
 * - `hint`: Helper text
 * - `required`: Show required indicator
 *
 * Usage:
 * ```tsx
 * <FormField label="Email" error={errors.email?.message} required>
 *   <Input {...register('email')} />
 * </FormField>
 * ```
 *
 * Note: For most cases, use FormInput, FormSelect, etc.
 * which already include this wrapper.
 */

import React from 'react';
import { View, StyleSheet, ViewStyle } from 'react-native';
import { useTheme } from '@/design-system';
import { Text } from '@/components/ui';

export interface FormFieldProps {
  /** Field label */
  label?: string;
  /** Error message */
  error?: string;
  /** Helper text */
  hint?: string;
  /** Show required indicator */
  required?: boolean;
  /** Children (input component) */
  children: React.ReactNode;
  /** Container style */
  style?: ViewStyle;
}

/**
 * FormField Component
 *
 * A wrapper for form inputs with label and error support.
 *
 * @example
 * ```tsx
 * <FormField
 *   label="Email Address"
 *   error={errors.email?.message}
 *   hint="We'll never share your email"
 *   required
 * >
 *   <TextInput {...register('email')} />
 * </FormField>
 * ```
 */
export function FormField({
  label,
  error,
  hint,
  required = false,
  children,
  style,
}: FormFieldProps) {
  const { theme } = useTheme();

  return (
    <View style={[styles.container, style]}>
      {label && (
        <View style={styles.labelContainer}>
          <Text variant="label">{label}</Text>
          {required && (
            <Text variant="label" color="error" style={styles.required}>
              *
            </Text>
          )}
        </View>
      )}

      {children}

      {(error || hint) && (
        <Text variant="caption" color={error ? 'error' : 'textTertiary'} style={styles.helper}>
          {error || hint}
        </Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    marginBottom: 16,
  },
  labelContainer: {
    flexDirection: 'row',
    marginBottom: 6,
  },
  required: {
    marginLeft: 2,
  },
  helper: {
    marginTop: 4,
  },
});

export default FormField;
