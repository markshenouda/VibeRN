# Component Patterns & AI Guide

This document provides standardized patterns for AI agents when working with components. Components in the codebase follow these conventions.

## General Component Pattern

All components follow this structure:

```tsx
/**
 * ComponentName Component
 *
 * @description Brief description of what the component does
 */

import React from 'react';
// ... imports

export interface ComponentNameProps {
  /** Prop description */
  propName: Type;
}

export function ComponentName({ propName }: ComponentNameProps) {
  return (
    // Component JSX
  );
}

export default ComponentName;
```

## Form Component Pattern

Form components integrate with `react-hook-form`:

```tsx
import { Control, Controller, FieldValues, Path } from 'react-hook-form';

export interface FormComponentProps<T extends FieldValues> {
  name: Path<T>;
  control: Control<T>;
  // ... other props
}

export function FormComponent<T extends FieldValues>({
  name,
  control,
  ...otherProps
}: FormComponentProps<T>) {
  return (
    <Controller
      name={name}
      control={control}
      render={({ field: { onChange, onBlur, value }, fieldState: { error } }) => (
        <UIComponent
          value={value}
          onChange={onChange}
          onBlur={onBlur}
          error={error?.message}
          {...otherProps}
        />
      )}
    />
  );
}
```

### Usage Example

```tsx
const { control, handleSubmit } = useForm({
  resolver: zodResolver(schema),
});

<FormInput name="email" control={control} label="Email" />;
```

## Screen Component Pattern

```tsx
import { View, StyleSheet } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useTheme } from '@/design-system';

export default function ScreenName() {
  const { theme } = useTheme();
  const insets = useSafeAreaInsets();

  return (
    <View
      style={[
        styles.container,
        {
          backgroundColor: theme.colors.background,
          paddingTop: insets.top,
        },
      ]}
    >
      {/* Content */}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
});
```

## Styling Conventions

- **Always use `useTheme()`** for colors, spacing, and other design tokens
- **Never hardcode values** like `color: '#FFF'` or `fontSize: 16`
- Use `StyleSheet.create()` for static styles
- Apply dynamic theme values via inline styles

```tsx
const { theme } = useTheme();

// ✅ Correct
<View style={[styles.container, { backgroundColor: theme.colors.background }]} />

// ❌ Wrong
<View style={[styles.container, { backgroundColor: '#FFF' }]} />
```

## TypeScript Conventions

- Use interfaces for props: `export interface ComponentProps {}`
- Export component and props separately
- Use generics for form components: `<T extends FieldValues>`
- Avoid using `any` - prefer `unknown` or proper types

## Component Categories

### UI Components (`@/components/ui`)

Small, reusable primitives: Button, Input, Card, Text, etc.

### Form Components (`@/components/forms`)

Form-integrated components: FormInput, FormSelect, FormCheckbox, etc.

### Pattern Components (`@/components/patterns`)

Complex patterns combining multiple UI elements: Header, SearchBar, EmptyState, etc.

## Documentation Guidelines

When adding new components:

1. Add brief JSDoc comment with component name and description
2. Document props with inline comments: `/** Description */`
3. Update relevant docs:
   - `docs/COMPONENTS.md` for UI components
   - `docs/FORMS.md` for form components
   - `docs/DESIGN_SYSTEM.md` for design tokens

## Example Component with Full Pattern

```tsx
/**
 * Button Component
 *
 * @description Versatile button with multiple variants and states
 */

import React from 'react';
import { Pressable, StyleSheet } from 'react-native';
import { useTheme } from '@/design-system';
import { Text } from '@/components/ui';

export interface ButtonProps {
  /** Button text */
  children: string;
  /** Button variant */
  variant?: 'solid' | 'outline' | 'ghost';
  /** Press handler */
  onPress: () => void;
  /** Disabled state */
  disabled?: boolean;
}

export function Button({ children, variant = 'solid', onPress, disabled = false }: ButtonProps) {
  const { theme } = useTheme();

  return (
    <Pressable
      onPress={onPress}
      disabled={disabled}
      style={[
        styles.button,
        {
          backgroundColor: variant === 'solid' ? theme.colors.primary : 'transparent',
          borderColor: theme.colors.primary,
          opacity: disabled ? 0.5 : 1,
        },
      ]}
    >
      <Text
        style={{ color: variant === 'solid' ? theme.colors.textInverse : theme.colors.primary }}
      >
        {children}
      </Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
    borderWidth: 1,
    alignItems: 'center',
  },
});

export default Button;
```
