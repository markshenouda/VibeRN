/**
 * FormInput - Input component integrated with react-hook-form
 * @see docs/COMPONENT_PATTERNS.md for usage patterns
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
