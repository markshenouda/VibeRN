# AI Instructions for VibeRN

This is the master reference for all AI agents working with the VibeRN codebase. Agent-specific files (AGENTS.md, .github/copilot-instructions.md, .gemini/rules.md) reference this document for consistency.

## Core Mandates

These apply universally to any AI agent working within this project:

- **Conventions:** Rigorously adhere to existing project conventions. Analyze surrounding code, tests, and configuration first.
- **Libraries/Frameworks:** NEVER assume a library/framework is available. Verify its established usage before employing it.
- **Style & Structure:** Mimic the style (formatting, naming), structure, and architectural patterns of existing code.
- **Idiomatic Changes:** Ensure your changes integrate naturally and idiomatically with the local context.
- **Documentation First:** **Always update relevant documentation** when introducing new features, components, or patterns.

## Project Context

**Framework:** React Native with Expo
**Navigation:** Expo Router for file-based routing (`src/app/`)
**Language:** TypeScript with strict mode
**Forms:** react-hook-form + zod for validation
**Storage:** AsyncStorage for persistence
**Design System:** Custom theme with light/dark mode

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

## Project Structure

```
src/
├── app/                 # Expo Router screens & layouts
│   ├── index.tsx       # Entry point (redirects to /examples/tabs)
│   └── examples/       # Example screens (delete to start fresh)
├── components/
│   ├── ui/            # Small, reusable UI elements
│   ├── forms/         # Form components (FormInput, FormSelect, etc.)
│   └── patterns/      # Complex patterns (Header, SearchBar, etc.)
├── design-system/     # Theme, tokens, hooks
├── hooks/            # Custom React hooks
├── lib/              # Utilities, validation schemas
├── constants/        # App constants
└── types/            # TypeScript types
```

## Component Patterns

### Screen Component Template

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

### Form Component Template

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

Text, Button, Input, Card, Avatar, Badge, Checkbox, Switch, RadioGroup, Select, Modal, Skeleton, Divider, Toast

### Form Components (`@/components/forms`)

FormInput, FormSelect, FormCheckbox, FormRadioGroup, FormSwitch

### Pattern Components (`@/components/patterns`)

Header, EmptyState, LoadingScreen, ListItem, SearchBar, ErrorBoundary

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

**ALWAYS use theme values. Never hardcode style values.**

## Navigation

```typescript
import { useRouter } from 'expo-router';

const router = useRouter();
router.push('/path');
router.replace('/path');
router.back();

// Dynamic routes
router.push('/examples/details/123');
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

## Operational Notes

- **Safe Area:** Use `useSafeAreaInsets()` for screen padding
- **Quality Checks:** Ensure all changes pass `npm run typecheck`, `npm run lint`, and `npm run format`
- **Git Hooks:** Pre-commit runs type-checking, linting, and formatting automatically

## Documentation Requirements

**IMPORTANT: Always update documentation when adding new features!**

Update the relevant docs:

- `README.md` - Features list, project structure
- `docs/NAVIGATION.md` - New routes, navigation patterns
- `docs/COMPONENTS.md` - New UI components
- `docs/FORMS.md` - New form patterns or validation schemas
- `docs/DESIGN_SYSTEM.md` - New design tokens or theme changes

## Backend & Agent Framework (Python)

### General Framework Principles

- **LLM Registration:** Language models are treated as classes and must be registered with `LLMRegistry`
- **Settings Management:** Application-wide settings are managed via database-backed `Setting` model

### Claude Agent

- **Configuration:** Requires `Claude_API_KEY` or Vertex AI setup (`GOOGLE_CLOUD_PROJECT`, `GOOGLE_CLOUD_LOCATION`)
- **Model Specification:** Must provide model name (e.g., `claude-3-5-sonnet-v2@20241022`)
- **Prompting:** Uses strict conversational format, alternating between `Human:` and `Assistant:`
- **Tool Usage:** Vertex AI implementation supports function calling

### Gemini Agent

Adheres to general framework principles. See `.gemini/rules.md` for specific interaction patterns.
