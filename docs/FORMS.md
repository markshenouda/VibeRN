# Form Handling Guide

This guide covers form handling with react-hook-form and zod validation.

## Overview

VibeRN uses:

- **react-hook-form**: Form state management
- **zod**: Schema validation
- **@hookform/resolvers**: Connect zod with react-hook-form

## Basic Form Setup

```tsx
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { FormInput, Button } from '@/components/forms';

// 1. Define schema
const schema = z.object({
  email: z.string().email('Invalid email'),
  password: z.string().min(8, 'Min 8 characters'),
});

// 2. Infer type
type FormData = z.infer<typeof schema>;

// 3. Create form
function MyForm() {
  const {
    control,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const onSubmit = async (data: FormData) => {
    console.log(data);
  };

  return (
    <>
      <FormInput name="email" control={control} label="Email" />
      <FormInput name="password" control={control} label="Password" secureTextEntry />
      <Button onPress={handleSubmit(onSubmit)} loading={isSubmitting}>
        Submit
      </Button>
    </>
  );
}
```

## Form Components

### FormInput

```tsx
<FormInput
  name="email"
  control={control}
  label="Email"
  placeholder="you@example.com"
  keyboardType="email-address"
  autoCapitalize="none"
/>
```

### FormSelect

```tsx
<FormSelect
  name="country"
  control={control}
  label="Country"
  options={[
    { value: 'us', label: 'United States' },
    { value: 'uk', label: 'United Kingdom' },
  ]}
  placeholder="Select country"
/>
```

### FormCheckbox

```tsx
<FormCheckbox name="acceptTerms" control={control} label="I accept the terms and conditions" />
```

### FormRadioGroup

```tsx
<FormRadioGroup
  name="plan"
  control={control}
  label="Select Plan"
  options={[
    { value: 'free', label: 'Free' },
    { value: 'pro', label: 'Pro' },
  ]}
/>
```

### FormSwitch

```tsx
<FormSwitch name="notifications" control={control} label="Enable notifications" />
```

## Pre-built Validation Schemas

Import from `@/lib/validation`:

```typescript
import {
  // String validations
  emailSchema,
  passwordSchema,
  phoneSchema,
  urlSchema,
  requiredString,
  optionalString,

  // Pre-built form schemas
  loginFormSchema,
  registerFormSchema,
  profileFormSchema,
  contactFormSchema,

  // Types
  type LoginFormData,
  type RegisterFormData,
} from '@/lib/validation';
```

### Email

```typescript
import { emailSchema } from '@/lib/validation';

const schema = z.object({
  email: emailSchema,
});
```

### Password

```typescript
import { passwordSchema, simplePasswordSchema } from '@/lib/validation';

// With strength requirements (min 8, uppercase, lowercase, number)
passwordSchema;

// Simple (just non-empty) - use for login
simplePasswordSchema;
```

### Phone

```typescript
import { phoneSchema, optionalPhoneSchema } from '@/lib/validation';

phoneSchema; // Required, validates format
optionalPhoneSchema; // Optional, validates if provided
```

### Password Confirmation

```typescript
import { passwordSchema, confirmPasswordSchema } from '@/lib/validation';

const schema = z
  .object({
    password: passwordSchema,
    confirmPassword: confirmPasswordSchema,
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ['confirmPassword'],
  });
```

## Custom Validation

### Creating Schemas

```typescript
import { z } from 'zod';

// Simple string
const nameSchema = z.string().min(2, 'Name required');

// With transform
const trimmedString = z.string().transform((val) => val.trim());

// With refinement
const usernameSchema = z
  .string()
  .min(3)
  .max(20)
  .regex(/^[a-zA-Z0-9_]+$/, 'Only letters, numbers, underscores');

// Number from string
const ageSchema = z
  .string()
  .transform((val) => parseInt(val, 10))
  .refine((val) => !isNaN(val) && val >= 18, 'Must be 18+');
```

### Conditional Validation

```typescript
const schema = z
  .object({
    hasPhone: z.boolean(),
    phone: z.string().optional(),
  })
  .refine((data) => !data.hasPhone || (data.phone && data.phone.length > 0), {
    message: 'Phone required when hasPhone is true',
    path: ['phone'],
  });
```

### Async Validation

```typescript
const emailAvailable = z
  .string()
  .email()
  .refine(
    async (email) => {
      const exists = await checkEmailExists(email);
      return !exists;
    },
    { message: 'Email already taken' }
  );
```

## Form Patterns

### Login Form

```tsx
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { FormInput, loginFormSchema, LoginFormData } from '@/components/forms';

function LoginForm() {
  const { control, handleSubmit } = useForm<LoginFormData>({
    resolver: zodResolver(loginFormSchema),
  });

  return (
    <>
      <FormInput name="email" control={control} label="Email" />
      <FormInput name="password" control={control} label="Password" secureTextEntry />
    </>
  );
}
```

### Registration Form

```tsx
import { registerFormSchema, RegisterFormData } from '@/components/forms';

function RegisterForm() {
  const { control, handleSubmit } = useForm<RegisterFormData>({
    resolver: zodResolver(registerFormSchema),
  });

  return (
    <>
      <FormInput name="name" control={control} label="Name" />
      <FormInput name="email" control={control} label="Email" />
      <FormInput name="password" control={control} label="Password" secureTextEntry />
      <FormInput
        name="confirmPassword"
        control={control}
        label="Confirm Password"
        secureTextEntry
      />
    </>
  );
}
```

### Multi-Step Form

```tsx
function MultiStepForm() {
  const [step, setStep] = useState(1);
  const { control, handleSubmit, trigger } = useForm();

  const nextStep = async () => {
    // Validate current step fields
    const fields = step === 1 ? ['name', 'email'] : ['address', 'city'];
    const isValid = await trigger(fields);
    if (isValid) setStep(step + 1);
  };

  return (
    <>
      {step === 1 && (
        <>
          <FormInput name="name" control={control} />
          <FormInput name="email" control={control} />
        </>
      )}
      {step === 2 && (
        <>
          <FormInput name="address" control={control} />
          <FormInput name="city" control={control} />
        </>
      )}
      {step < 2 ? (
        <Button onPress={nextStep}>Next</Button>
      ) : (
        <Button onPress={handleSubmit(onSubmit)}>Submit</Button>
      )}
    </>
  );
}
```

## Form State

```tsx
const {
  control,
  handleSubmit,
  formState: {
    errors, // Validation errors
    isSubmitting, // Submit in progress
    isValid, // All fields valid
    isDirty, // Form modified
  },
  reset, // Reset form
  setValue, // Set field value
  watch, // Watch field value
  trigger, // Trigger validation
} = useForm();
```

## Error Display

Errors are automatically shown on FormInput. For custom display:

```tsx
const {
  formState: { errors },
} = useForm();

{
  errors.email && <Text color="error">{errors.email.message}</Text>;
}
```

## Best Practices

1. **Define schemas separately** - Keep validation logic reusable
2. **Use TypeScript types** - Infer from schemas with `z.infer`
3. **Set defaultValues** - Always provide initial values
4. **Handle loading states** - Use `isSubmitting` for button state
5. **Show field-level errors** - FormInput does this automatically
6. **Validate on blur** - Better UX than real-time validation
