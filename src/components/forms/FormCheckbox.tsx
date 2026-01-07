/**
 * FormCheckbox - Checkbox component integrated with react-hook-form
 * @see docs/COMPONENT_PATTERNS.md for usage patterns
 */

import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Control, Controller, FieldValues, Path } from 'react-hook-form';
import { Checkbox, CheckboxProps, Text } from '@/components/ui';

export interface FormCheckboxProps<T extends FieldValues> extends Omit<
  CheckboxProps,
  'checked' | 'onCheckedChange'
> {
  /** Field name */
  name: Path<T>;
  /** Form control */
  control: Control<T>;
}

export function FormCheckbox<T extends FieldValues>({
  name,
  control,
  ...checkboxProps
}: FormCheckboxProps<T>) {
  return (
    <Controller
      name={name}
      control={control}
      render={({ field: { onChange, value }, fieldState: { error } }) => (
        <View style={styles.container}>
          <Checkbox
            checked={value ?? false}
            onCheckedChange={onChange}
            error={!!error}
            {...checkboxProps}
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
  error: {
    marginTop: 4,
    marginLeft: 28,
  },
});

export default FormCheckbox;
