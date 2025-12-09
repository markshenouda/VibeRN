/**
 * FormCheckbox Component
 *
 * @description Checkbox component integrated with react-hook-form
 *
 * @ai-guide
 * Props:
 * - `name`: Field name (for react-hook-form)
 * - `control`: Form control from useForm()
 * - `label`: Checkbox label
 *
 * Usage:
 * ```tsx
 * const { control } = useForm();
 *
 * <FormCheckbox
 *   name="acceptTerms"
 *   control={control}
 *   label="I accept the terms and conditions"
 * />
 * ```
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

/**
 * FormCheckbox Component
 *
 * Checkbox component with react-hook-form integration.
 *
 * @example
 * ```tsx
 * const { control, handleSubmit } = useForm<SignupForm>({
 *   resolver: zodResolver(signupSchema),
 * });
 *
 * <FormCheckbox
 *   name="acceptTerms"
 *   control={control}
 *   label="I accept the terms and conditions"
 * />
 *
 * <FormCheckbox
 *   name="newsletter"
 *   control={control}
 *   label="Subscribe to newsletter"
 * />
 * ```
 */
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
