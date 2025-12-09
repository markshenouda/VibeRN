# GitHub Copilot Instructions for VibeRN

## Project Context

This is a React Native (Expo) project using:

- **Expo Router** for file-based navigation (`src/app/`)
- **TypeScript** with strict mode
- **Custom design system** with light/dark mode
- **react-hook-form + zod** for form handling
- **AsyncStorage** for persistence

## Import Conventions

Always use path aliases:

```typescript
// ✅ Correct
import { useTheme } from '@/design-system';
import { Button, Text } from '@/components/ui';
import { FormInput } from '@/components/forms';

// ❌ Wrong
import { useTheme } from '../../design-system';
```

## Component Patterns

### Screen Component

```typescript
import { View, StyleSheet } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useTheme } from '@/design-system';
import { Text } from '@/components/ui';

export default function ScreenName() {
  const { theme } = useTheme();
  const insets = useSafeAreaInsets();

  return (
    <View style={[styles.container, {
      backgroundColor: theme.colors.background,
      paddingTop: insets.top
    }]}>
      {/* Content */}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
});
```

### Form Component

```typescript
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { FormInput, Button } from '@/components/forms';

const schema = z.object({
  email: z.string().email(),
});

function MyForm() {
  const { control, handleSubmit } = useForm({
    resolver: zodResolver(schema),
  });

  return (
    <>
      <FormInput name="email" control={control} label="Email" />
      <Button onPress={handleSubmit(onSubmit)}>Submit</Button>
    </>
  );
}
```

## Available Components

### UI Components (`@/components/ui`)

- `Text` - Themed text with variants (h1, body, caption)
- `Button` - Multiple variants (solid, outline, ghost)
- `Input` - Text input with label/error
- `Card` - Container with elevation
- `Avatar`, `Badge`, `Checkbox`, `Switch`
- `RadioGroup`, `Select`, `Modal`
- `Skeleton`, `Divider`, `Toast`

### Form Components (`@/components/forms`)

- `FormInput`, `FormSelect`, `FormCheckbox`
- `FormRadioGroup`, `FormSwitch`

### Pattern Components (`@/components/patterns`)

- `Header`, `EmptyState`, `LoadingScreen`
- `ListItem`, `SearchBar`, `ErrorBoundary`

## Theme Usage

```typescript
const { theme, isDark, toggleTheme } = useTheme();

// Colors
theme.colors.primary;
theme.colors.background;
theme.colors.textPrimary;

// Spacing
theme.spacing[4]; // 16px

// Shadows
theme.shadows.md;

// Typography
theme.typography.styles.h1;
```

## Navigation

```typescript
import { useRouter, Link } from 'expo-router';

const router = useRouter();
router.push('/path');
router.replace('/path');
router.back();

// Dynamic routes
router.push('/details/123');
```

## Validation Schemas

Available in `@/lib/validation`:

- `emailSchema`, `passwordSchema`
- `phoneSchema`, `urlSchema`
- `requiredString`, `optionalString`
- `loginFormSchema`, `registerFormSchema`

## Hooks

Available in `@/hooks`:

- `useAsyncStorage` - Persistent state
- `useDebounce` - Debounce values
- `useKeyboard` - Keyboard state
- `useRefreshControl` - Pull to refresh
- `useAppState` - App foreground/background
