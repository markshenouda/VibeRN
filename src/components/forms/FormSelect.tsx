/**
 * FormSelect - Select component integrated with react-hook-form
 * @see docs/COMPONENT_PATTERNS.md for usage patterns
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
