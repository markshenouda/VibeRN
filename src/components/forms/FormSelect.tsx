/**
 * FormSelect Component
 *
 * @description Select component integrated with react-hook-form
 *
 * @ai-guide
 * Props:
 * - `name`: Field name (for react-hook-form)
 * - `control`: Form control from useForm()
 * - `options`: Select options
 * - All Select props
 *
 * Usage:
 * ```tsx
 * const { control } = useForm();
 *
 * <FormSelect
 *   name="country"
 *   control={control}
 *   label="Country"
 *   options={countries}
 *   placeholder="Select country"
 * />
 * ```
 */

import React from 'react';
import { Control, Controller, FieldValues, Path } from 'react-hook-form';
import { Select, SelectProps } from '@/components/ui';

export interface FormSelectProps<T extends FieldValues> extends Omit<
  SelectProps,
  'value' | 'onValueChange'
> {
  /** Field name */
  name: Path<T>;
  /** Form control */
  control: Control<T>;
}

/**
 * FormSelect Component
 *
 * Select component with react-hook-form integration.
 *
 * @example
 * ```tsx
 * const { control } = useForm<ProfileForm>();
 *
 * <FormSelect
 *   name="country"
 *   control={control}
 *   label="Country"
 *   options={[
 *     { value: 'us', label: 'United States' },
 *     { value: 'uk', label: 'United Kingdom' },
 *   ]}
 *   placeholder="Select your country"
 * />
 * ```
 */
export function FormSelect<T extends FieldValues>({
  name,
  control,
  ...selectProps
}: FormSelectProps<T>) {
  return (
    <Controller
      name={name}
      control={control}
      render={({ field: { onChange, value }, fieldState: { error } }) => (
        <Select
          value={value ?? ''}
          onValueChange={onChange}
          error={error?.message}
          {...selectProps}
        />
      )}
    />
  );
}

export default FormSelect;
