# VibeRN - React Native Starter for Vibe Coders

## Project Overview

A production-ready React Native (Expo) starter kit designed for rapid development with AI assistance. Features a complete design system, form handling, navigation patterns, and excellent developer experience.

---

## Project Structure

```
VibeRN/
├── src/
│   ├── app/                      # Expo Router app directory
│   │   ├── (auth)/               # Auth group (login, register, forgot-password)
│   │   ├── (tabs)/               # Main tab navigation
│   │   │   ├── _layout.tsx
│   │   │   ├── index.tsx         # Home tab
│   │   │   ├── explore.tsx       # Explore tab
│   │   │   └── profile.tsx       # Profile tab
│   │   ├── (stack)/              # Stack navigation examples
│   │   │   ├── _layout.tsx
│   │   │   ├── details/[id].tsx  # Dynamic route example
│   │   │   └── settings.tsx
│   │   ├── (modals)/             # Modal screens
│   │   │   └── filter.tsx
│   │   ├── _layout.tsx           # Root layout
│   │   ├── index.tsx             # Entry redirect
│   │   └── +not-found.tsx
│   │
│   ├── components/
│   │   ├── ui/                   # Design system primitives
│   │   │   ├── Button.tsx
│   │   │   ├── Text.tsx
│   │   │   ├── Input.tsx
│   │   │   ├── Card.tsx
│   │   │   ├── Avatar.tsx
│   │   │   ├── Badge.tsx
│   │   │   ├── Checkbox.tsx
│   │   │   ├── Radio.tsx
│   │   │   ├── Switch.tsx
│   │   │   ├── Select.tsx
│   │   │   ├── Modal.tsx
│   │   │   ├── Toast.tsx
│   │   │   ├── Skeleton.tsx
│   │   │   ├── Divider.tsx
│   │   │   ├── Icon.tsx
│   │   │   └── index.ts
│   │   │
│   │   ├── forms/                # Form compositions
│   │   │   ├── FormField.tsx     # Field wrapper with label/error
│   │   │   ├── FormInput.tsx     # Input with react-hook-form
│   │   │   ├── FormSelect.tsx
│   │   │   ├── FormCheckbox.tsx
│   │   │   ├── FormRadioGroup.tsx
│   │   │   ├── FormSwitch.tsx
│   │   │   └── index.ts
│   │   │
│   │   ├── patterns/             # Common UI patterns
│   │   │   ├── Header.tsx
│   │   │   ├── BottomSheet.tsx
│   │   │   ├── EmptyState.tsx
│   │   │   ├── ErrorBoundary.tsx
│   │   │   ├── LoadingScreen.tsx
│   │   │   ├── ListItem.tsx
│   │   │   ├── SearchBar.tsx
│   │   │   └── index.ts
│   │   │
│   │   └── templates/            # Screen templates
│   │       ├── AuthScreen.tsx
│   │       ├── ListScreen.tsx
│   │       ├── DetailScreen.tsx
│   │       ├── FormScreen.tsx
│   │       ├── SettingsScreen.tsx
│   │       └── index.ts
│   │
│   ├── design-system/
│   │   ├── tokens/
│   │   │   ├── colors.ts         # Color palette
│   │   │   ├── typography.ts     # Font sizes, weights, families
│   │   │   ├── spacing.ts        # Spacing scale
│   │   │   ├── radius.ts         # Border radius
│   │   │   ├── shadows.ts        # Shadow definitions
│   │   │   └── index.ts
│   │   ├── theme.ts              # Theme composition
│   │   ├── ThemeProvider.tsx     # Theme context
│   │   └── useTheme.ts           # Theme hook
│   │
│   ├── hooks/
│   │   ├── useAsyncStorage.ts    # AsyncStorage with state sync
│   │   ├── useStorageState.ts    # Persistent state hook
│   │   ├── useDebounce.ts
│   │   ├── useKeyboard.ts
│   │   ├── useRefreshControl.ts
│   │   ├── useAppState.ts
│   │   ├── useNetworkStatus.ts
│   │   └── index.ts
│   │
│   ├── lib/
│   │   ├── storage.ts            # AsyncStorage wrapper
│   │   ├── validation.ts         # Common Zod schemas
│   │   ├── api.ts                # API client setup (optional)
│   │   └── utils.ts              # Utility functions
│   │
│   ├── constants/
│   │   ├── layout.ts             # Screen dimensions, safe areas
│   │   └── config.ts             # App configuration
│   │
│   └── types/
│       ├── navigation.ts         # Navigation type definitions
│       └── common.ts             # Shared types
│
├── scripts/
│   ├── clean-project.ts          # Remove example screens
│   ├── generate-icons.ts         # Generate app icons
│   ├── generate-splash.ts        # Generate splash screens
│   ├── setup.ts                  # Initial project setup
│   └── new-screen.ts             # Scaffold new screen
│
├── assets/
│   ├── fonts/
│   ├── images/
│   │   ├── icon.png              # App icon source (1024x1024)
│   │   └── splash.png            # Splash source
│   └── icons/                    # SVG icons
│
├── docs/
│   ├── DESIGN_SYSTEM.md          # Design system guide
│   ├── COMPONENTS.md             # Component documentation
│   ├── FORMS.md                  # Form handling guide
│   ├── NAVIGATION.md             # Navigation patterns
│   └── SCRIPTS.md                # Available scripts
│
├── .cursor/
│   └── rules                     # AI agent rules
│
├── .github/
│   └── copilot-instructions.md   # GitHub Copilot rules
│
├── .vscode/
│   └── settings.json             # VSCode settings
│
├── app.json                      # Expo config
├── babel.config.js
├── tsconfig.json
├── eslint.config.mjs             # ESLint flat config
├── prettier.config.mjs           # Prettier config
├── .editorconfig
├── package.json
└── README.md
```

---

## 1. Design System

### Color Tokens (Light/Dark mode)

- **Primary**: Brand color with variants (50-900)
- **Secondary**: Accent color
- **Neutral**: Gray scale for text/backgrounds
- **Semantic**: Success, Warning, Error, Info
- **Surface**: Background, Card, Modal colors

### Typography

- **Font Family**: Inter (or system default)
- **Scale**: xs, sm, base, lg, xl, 2xl, 3xl, 4xl
- **Weights**: normal, medium, semibold, bold

### Spacing

- Scale: 0, 1, 2, 3, 4, 5, 6, 8, 10, 12, 16, 20, 24, 32, 40, 48, 56, 64

### Component Variants

Each component supports:

- **Size**: sm, md, lg
- **Variant**: solid, outline, ghost, soft
- **Color**: primary, secondary, neutral, success, warning, error

---

## 2. Form Handling

### Stack

- **react-hook-form**: Form state management
- **zod**: Schema validation
- **@hookform/resolvers**: Zod integration

### Common Validation Patterns

```typescript
// src/lib/validation.ts
- email
- password (min 8, uppercase, lowercase, number)
- phone
- url
- required string/number
- date
- creditCard
- confirmPassword (refine)
```

### Form Components

- FormField: Wrapper with label, error, hint
- FormInput: Text input with validation
- FormSelect: Dropdown select
- FormCheckbox/FormRadioGroup: Selection inputs
- FormSwitch: Toggle switch

---

## 3. AsyncStorage Hooks

```typescript
// Basic key-value
const [value, setValue, removeValue] = useAsyncStorage<T>('key', defaultValue);

// With loading state
const { value, setValue, isLoading, error } = useStorageState<T>('key');

// Storage utilities
storage.get<T>(key);
storage.set(key, value);
storage.remove(key);
storage.clear();
storage.getAllKeys();
```

---

## 4. Navigation Patterns

### Implemented Patterns

1. **Tab Navigation**: Bottom tabs with icons
2. **Stack Navigation**: Standard push/pop
3. **Modal Navigation**: Bottom sheets, full-screen modals
4. **Auth Flow**: Protected routes, auth redirect
5. **Deep Linking**: Configured URL schemes
6. **Dynamic Routes**: [id], [...params]

### Easy Cleanup

- All example screens in clearly marked folders
- `clean-project.ts` script removes all examples
- Leaves only core infrastructure

---

## 5. Screen Templates

### Available Templates

1. **AuthScreen**: Login/Register with form
2. **ListScreen**: FlatList with search, filters, empty state
3. **DetailScreen**: Header image, content, actions
4. **FormScreen**: Multi-step or single form
5. **SettingsScreen**: Grouped settings with toggles

---

## 6. Static Testing Tools

### ESLint

- `eslint-plugin-react`
- `eslint-plugin-react-native`
- `eslint-plugin-react-hooks`
- `@typescript-eslint/eslint-plugin`
- Custom rules for Expo Router

### Prettier

- Consistent code formatting
- Integrated with ESLint

### TypeScript

- Strict mode enabled
- Path aliases configured

### Additional

- `lefthook`: Git hooks for pre-commit
- Type checking on staged files

---

## 7. Scripts

```bash
# Development
npm run dev              # Start Expo dev server
npm run ios              # Run on iOS simulator
npm run android          # Run on Android emulator

# Code Quality
npm run lint             # Run ESLint
npm run lint:fix         # Fix ESLint errors
npm run typecheck        # Run TypeScript check
npm run format           # Run Prettier

# Project Management
npm run clean            # Remove example screens
npm run generate:icons   # Generate app icons from source
npm run generate:splash  # Generate splash screens
npm run new:screen       # Scaffold a new screen

# Build
npm run build:ios        # EAS Build iOS
npm run build:android    # EAS Build Android
```

---

## 8. AI Agent Rules

### .cursor/rules

- Project structure explanation
- Component patterns
- Form handling conventions
- Navigation patterns
- Design system usage
- Code style preferences

### .github/copilot-instructions.md

- Same rules for GitHub Copilot

---

## 9. Documentation

### README.md

- Quick start (3 commands)
- Project structure overview
- Available scripts
- Links to detailed docs

### docs/DESIGN_SYSTEM.md

- Token reference
- Component usage
- Theming guide

### docs/COMPONENTS.md

- Each component with:
  - Props table
  - Usage examples
  - Variants showcase

### docs/FORMS.md

- Form setup
- Validation patterns
- Custom validation
- Form submission handling

### docs/NAVIGATION.md

- Route structure
- Navigation patterns
- Deep linking setup
- Type-safe navigation

---

## 10. Additional Recommendations

### Added Features

1. **Toast/Snackbar System**: Global notification system
2. **Error Boundary**: Graceful error handling with fallback UI
3. **Network Status Hook**: Online/offline detection
4. **App State Hook**: Background/foreground detection
5. **Skeleton Loaders**: Loading placeholders for better UX
6. **Bottom Sheet**: Common mobile pattern (using @gorhom/bottom-sheet)

### Suggested Dependencies

```json
{
  "dependencies": {
    "expo": "~52.0.0",
    "expo-router": "~4.0.0",
    "@react-native-async-storage/async-storage": "^2.0.0",
    "react-hook-form": "^7.53.0",
    "@hookform/resolvers": "^3.9.0",
    "zod": "^3.23.0",
    "@gorhom/bottom-sheet": "^5.0.0",
    "react-native-reanimated": "~3.16.0",
    "react-native-gesture-handler": "~2.20.0",
    "react-native-safe-area-context": "^4.12.0",
    "@expo/vector-icons": "^14.0.0",
    "expo-haptics": "~14.0.0",
    "expo-status-bar": "~2.0.0"
  },
  "devDependencies": {
    "typescript": "^5.3.0",
    "eslint": "^9.0.0",
    "@typescript-eslint/eslint-plugin": "^8.0.0",
    "@typescript-eslint/parser": "^8.0.0",
    "eslint-plugin-react": "^7.37.0",
    "eslint-plugin-react-hooks": "^5.0.0",
    "eslint-plugin-react-native": "^4.1.0",
    "prettier": "^3.4.0",
    "lefthook": "^1.8.0"
  }
}
```

---

## Implementation Order

1. **Phase 1: Foundation**
   - Initialize Expo project
   - Configure TypeScript, ESLint, Prettier
   - Set up project structure with `src/app/`
   - Create design system tokens

2. **Phase 2: Design System**
   - Implement ThemeProvider
   - Build UI primitives (Button, Text, Input, etc.)
   - Create component variants

3. **Phase 3: Forms**
   - Set up validation schemas
   - Build form components
   - Create form examples

4. **Phase 4: Navigation**
   - Configure Expo Router (src/app)
   - Implement navigation patterns
   - Add auth flow

5. **Phase 5: Hooks & Utilities**
   - AsyncStorage hooks
   - Utility hooks
   - Storage utilities

6. **Phase 6: Templates & Examples**
   - Screen templates
   - Example screens
   - Pattern demonstrations

7. **Phase 7: Scripts & DX**
   - Project management scripts
   - Git hooks
   - Documentation

8. **Phase 8: Documentation**
   - README
   - Component docs
   - Design system guide
   - AI rules files

---

## Questions for You

1. **Color Palette**: Do you have specific brand colors, or should I use a modern default (e.g., indigo/violet)?

2. **Font**: Inter (modern, clean) or system fonts (better performance, native feel)?

3. **Icon Set**: Lucide (modern, consistent) or @expo/vector-icons (more variety)?

4. **State Management**: Include Zustand setup, or keep it minimal (just Context + hooks)?

5. **API Layer**: Include a basic API client (fetch wrapper with interceptors), or leave blank?

6. **Authentication**: Include a mock auth context with protected routes, or just navigation structure?

Let me know your preferences, or I can proceed with sensible defaults!
