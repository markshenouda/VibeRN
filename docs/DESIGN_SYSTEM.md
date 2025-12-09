# Design System Guide

This guide covers the VibeRN design system, including tokens, theming, and component usage.

## Overview

The design system is built on a token-based architecture:

- **Tokens**: Raw values (colors, spacing, typography)
- **Theme**: Semantic mappings that change with light/dark mode
- **Components**: Pre-styled components using theme tokens

## Colors

### Color Palette

```typescript
import { palette } from '@/design-system/tokens';

// Primary - Indigo (brand color)
palette.primary[500]; // #6366f1

// Secondary - Violet
palette.secondary[500]; // #8b5cf6

// Neutral - Slate (grays)
palette.neutral[500]; // #64748b

// Semantic colors
palette.success[500]; // #22c55e
palette.warning[500]; // #f59e0b
palette.error[500]; // #ef4444
palette.info[500]; // #3b82f6
```

### Theme Colors

Access colors through the theme for automatic light/dark mode support:

```typescript
const { theme } = useTheme();

// Backgrounds
theme.colors.background; // Screen background
theme.colors.backgroundSecondary;
theme.colors.surface; // Card backgrounds
theme.colors.surfaceElevated;

// Text
theme.colors.textPrimary; // Main text
theme.colors.textSecondary; // Secondary text
theme.colors.textTertiary; // Muted text
theme.colors.textDisabled;

// Brand
theme.colors.primary;
theme.colors.primaryLight;
theme.colors.primaryDark;

// Borders
theme.colors.border;
theme.colors.borderFocus;

// Semantic
theme.colors.success;
theme.colors.warning;
theme.colors.error;
theme.colors.info;
```

### Changing Brand Colors

Edit `src/design-system/tokens/colors.ts`:

```typescript
export const palette = {
  primary: {
    50: '#your-lightest',
    // ... generate shades at https://uicolors.app
    500: '#your-main-color',
    // ...
    950: '#your-darkest',
  },
};
```

## Typography

### Font Sizes

```typescript
import { fontSizes } from '@/design-system/tokens';

fontSizes.xs; // 12
fontSizes.sm; // 14
fontSizes.base; // 16
fontSizes.lg; // 18
fontSizes.xl; // 20
fontSizes['2xl']; // 24
fontSizes['3xl']; // 30
fontSizes['4xl']; // 36
```

### Text Variants

Use the `Text` component with variants:

```tsx
<Text variant="h1">Heading 1</Text>
<Text variant="h2">Heading 2</Text>
<Text variant="h3">Heading 3</Text>
<Text variant="body">Body text</Text>
<Text variant="bodySmall">Small body</Text>
<Text variant="caption">Caption text</Text>
<Text variant="label">Label text</Text>
```

### Text Colors

```tsx
<Text color="textPrimary">Primary</Text>
<Text color="textSecondary">Secondary</Text>
<Text color="primary">Brand color</Text>
<Text color="error">Error message</Text>
```

### Custom Fonts

To add custom fonts:

1. Add font files to `assets/fonts/`
2. Update `src/design-system/tokens/typography.ts`:

```typescript
export const fontFamilies = {
  heading: 'YourFont-Bold',
  body: 'YourFont-Regular',
};
```

3. Load fonts in `src/app/_layout.tsx`:

```typescript
import { useFonts } from 'expo-font';

const [loaded] = useFonts({
  'YourFont-Bold': require('@/assets/fonts/YourFont-Bold.ttf'),
  'YourFont-Regular': require('@/assets/fonts/YourFont-Regular.ttf'),
});
```

## Spacing

### Spacing Scale

```typescript
import { spacing } from '@/design-system/tokens';

spacing[0]; // 0
spacing[1]; // 4
spacing[2]; // 8
spacing[3]; // 12
spacing[4]; // 16
spacing[5]; // 20
spacing[6]; // 24
spacing[8]; // 32
spacing[10]; // 40
```

### Semantic Spacing

```typescript
import { semanticSpacing } from '@/design-system/tokens';

semanticSpacing.screenHorizontal; // 16 - screen padding
semanticSpacing.cardPadding; // 16 - card padding
semanticSpacing.sectionGap; // 24 - between sections
semanticSpacing.componentGap; // 8 - between elements
```

## Border Radius

```typescript
const { theme } = useTheme();

theme.radius.none; // 0
theme.radius.sm; // 4
theme.radius.md; // 8
theme.radius.lg; // 12
theme.radius.xl; // 16
theme.radius.full; // 9999 (circular)

// Component-specific
theme.componentRadius.button; // 8
theme.componentRadius.card; // 12
theme.componentRadius.modal; // 16
theme.componentRadius.avatar; // 9999
```

## Shadows

```typescript
const { theme } = useTheme();

theme.shadows.none;
theme.shadows.sm; // Subtle
theme.shadows.md; // Default for cards
theme.shadows.lg; // Elevated elements
theme.shadows.xl; // Modals, dropdowns
```

Usage:

```tsx
<View style={[styles.card, theme.shadows.md]}>{/* Content */}</View>
```

## Theme Provider

Wrap your app with `ThemeProvider`:

```tsx
// Already done in _layout.tsx
<ThemeProvider>
  <App />
</ThemeProvider>
```

### Using the Theme

```tsx
import { useTheme } from '@/design-system';

function MyComponent() {
  const { theme, isDark, mode, setMode, toggleTheme } = useTheme();

  return (
    <View style={{ backgroundColor: theme.colors.background }}>
      <Text>Current mode: {mode}</Text>
      <Button onPress={toggleTheme}>Toggle Theme</Button>
      <Button onPress={() => setMode('system')}>Use System</Button>
    </View>
  );
}
```

### Theme Modes

- `light` - Always light mode
- `dark` - Always dark mode
- `system` - Follow device setting

## Best Practices

1. **Always use theme colors** - Never hardcode colors
2. **Use spacing scale** - Maintain consistent spacing
3. **Use Text component** - For consistent typography
4. **Test both modes** - Verify light and dark mode
5. **Use semantic colors** - `textPrimary` not `neutral[900]`
