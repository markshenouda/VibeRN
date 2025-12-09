/**
 * FormInput Component
 *
 * @description Input component integrated with react-hook-form
 *
 * @ai-guide
 * Props:
 * - `name`: Field name (for react-hook-form)
 * - `control`: Form control from useForm()
 * - `label`: Input label
 * - All Input props
 *
 * Usage:
 * ```tsx
 * const { control } = useForm();
 *
 * <FormInput
 *   name="email"
 *   control={control}
 *   label="Email"
 *   placeholder="Enter email"
 *   keyboardType="email-address"
 * />
 * ```
 */

import React from 'react';
import { Control, Controller, FieldValues, Path } from 'react-hook-form';
import { Input, InputProps } from '@/components/ui';

export interface FormInputProps<T extends FieldValues> extends Omit<
  InputProps,
  'value' | 'onChangeText'
> {
  /** Field name */
  name: Path<T>;
  /** Form control */
  control: Control<T>;
  /** Transform value before setting */
  transform?: (value: string) => string;
}

/**
 * FormInput Component
 *
 * Input component with react-hook-form integration.
 *
 * @example
 * ```tsx
 * const { control, handleSubmit } = useForm<LoginForm>({
 *   resolver: zodResolver(loginSchema),
 * });
 *
 * <FormInput
 *   name="email"
 *   control={control}
 *   label="Email"
 *   placeholder="you@example.com"
 *   keyboardType="email-address"
 *   autoCapitalize="none"
 * />
 *
 * <FormInput
 *   name="password"
 *   control={control}
 *   label="Password"
 *   secureTextEntry
 * />
 * ```
 */
export function FormInput<T extends FieldValues>({
  name,
  control,
  transform,
  ...inputProps
}: FormInputProps<T>) {
  return (
    <Controller
      name={name}
      control={control}
      render={({ field: { onChange, onBlur, value }, fieldState: { error } }) => (
        <Input
          value={value ?? ''}
          onChangeText={(text) => {
            const transformedValue = transform ? transform(text) : text;
            onChange(transformedValue);
          }}
          onBlur={onBlur}
          error={error?.message}
          {...inputProps}
        />
      )}
    />
  );
}

export default FormInput;
