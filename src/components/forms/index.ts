/**
 * Form Components - Main Export
 *
 * @description Form components with react-hook-form integration
 *
 * @ai-guide
 * Import from this file:
 * ```tsx
 * import { FormInput, FormSelect, FormCheckbox } from '@/components/forms';
 * ```
 *
 * Available Components:
 * - FormField: Generic field wrapper
 * - FormInput: Text input with validation
 * - FormSelect: Dropdown select
 * - FormCheckbox: Checkbox input
 * - FormRadioGroup: Radio button group
 * - FormSwitch: Toggle switch
 *
 * Usage Example:
 * ```tsx
 * import { useForm } from 'react-hook-form';
 * import { zodResolver } from '@hookform/resolvers/zod';
 * import { FormInput, FormCheckbox } from '@/components/forms';
 * import { loginFormSchema, LoginFormData } from '@/lib/validation';
 *
 * function LoginForm() {
 *   const { control, handleSubmit } = useForm<LoginFormData>({
 *     resolver: zodResolver(loginFormSchema),
 *   });
 *
 *   return (
 *     <>
 *       <FormInput name="email" control={control} label="Email" />
 *       <FormInput name="password" control={control} label="Password" secureTextEntry />
 *       <FormCheckbox name="remember" control={control} label="Remember me" />
 *       <Button onPress={handleSubmit(onSubmit)}>Login</Button>
 *     </>
 *   );
 * }
 * ```
 */

export { FormField, type FormFieldProps } from './FormField';
export { FormInput, type FormInputProps } from './FormInput';
export { FormSelect, type FormSelectProps } from './FormSelect';
export { FormCheckbox, type FormCheckboxProps } from './FormCheckbox';
export { FormRadioGroup, type FormRadioGroupProps } from './FormRadioGroup';
export { FormSwitch, type FormSwitchProps } from './FormSwitch';

// Re-export validation schemas for convenience
export * from '@/lib/validation';
