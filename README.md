# VibeRN

A production-ready React Native (Expo) starter kit for vibe coders. Features a complete design system, form handling, navigation patterns, and excellent developer experience.

## Screenshots

### iOS

<p align="center">
  <img src="assets/screenshots/ios-home.png" width="200" alt="Home Screen (iOS)" />
  <img src="assets/screenshots/ios-login.png" width="200" alt="Login Screen (iOS)" />
  <img src="assets/screenshots/ios-dark-mode.png" width="200" alt="Dark Mode (iOS)" />
</p>

### Android

<p align="center">
  <img src="assets/screenshots/android-home.png" width="200" alt="Home Screen (Android)" />
  <img src="assets/screenshots/android-login.png" width="200" alt="Login Screen (Android)" />
  <img src="assets/screenshots/android-dark-mode.png" width="200" alt="Dark Mode (Android)" />
</p>

## Features

- **Design System**: Complete token-based design system with light/dark mode
- **Form Handling**: react-hook-form + zod with pre-built form components
- **Navigation**: Expo Router with tabs, stacks, drawers, modals, and typed routes
- **Storage**: AsyncStorage hooks with TypeScript support
- **Static Testing**: ESLint 9, Prettier, TypeScript strict mode, lefthook
- **Developer Experience**: Path aliases, VSCode settings, AI agent rules
- **Scripts**: Icon generation, screen scaffolding

## Quick Start

```bash
# Create a new project from this template
npx degit markshenouda/VibeRN my-app
cd my-app

# Initialize Git repository
git init && git add -A && git commit -m "Initial commit"

# Install dependencies
npm install

# Start development server
npm run start

# Run on iOS
npm run ios

# Run on Android
npm run android
```

## Project Structure

```
src/
├── app/                    # Expo Router screens & layouts
├── components/             # UI, forms, and pattern components
├── design-system/          # Theme, tokens, providers
├── hooks/                  # Custom React hooks
├── lib/                    # Utilities and validation
└── constants/              # App configuration
```

See [docs/NAVIGATION.md](docs/NAVIGATION.md) for detailed structure.

## Documentation

- [Design System Guide](docs/DESIGN_SYSTEM.md) - Colors, typography, components
- [Components Reference](docs/COMPONENTS.md) - All UI components
- [Form Handling](docs/FORMS.md) - Form validation patterns
- [Navigation](docs/NAVIGATION.md) - Routing and navigation
- [Scripts](docs/SCRIPTS.md) - Available npm scripts

## Usage Examples

See documentation for detailed examples:

- [Design System Guide](docs/DESIGN_SYSTEM.md) - Theme usage and styling
- [Components Reference](docs/COMPONENTS.md) - All UI components with examples
- [Form Handling](docs/FORMS.md) - Form validation and components

### Quick Example

```tsx
import { useTheme } from '@/design-system';
import { Text, Button } from '@/components/ui';

function MyComponent() {
  const { theme } = useTheme();
  return <Button onPress={handlePress}>Click Me</Button>;
}
```

## Scripts

See [docs/SCRIPTS.md](docs/SCRIPTS.md) for complete list.

## Customization

### 1. Update App Info

Edit `app.json`:

```json
{
  "expo": {
    "name": "Your App Name",
    "slug": "your-app",
    "scheme": "yourapp"
  }
}
```

### 2. Change Brand Colors

Edit `src/design-system/tokens/colors.ts`:

```typescript
export const palette = {
  primary: {
    500: '#your-color',
    // ... other shades
  },
};
```

### 3. Clean Example Screens

Simply delete the `src/app/examples/` folder to remove all example screens and start fresh.

### 4. Create Your First Screen

The app uses `src/app/index.tsx` as the entry point (currently redirects to examples). Replace it with your own home screen when ready. See [docs/NAVIGATION.md](docs/NAVIGATION.md) for detailed examples.

## Tech Stack

- **Framework**: React Native with Expo SDK 54
- **Navigation**: Expo Router 6
- **Forms**: react-hook-form + zod
- **Storage**: @react-native-async-storage/async-storage
- **Animations**: react-native-reanimated
- **Gestures**: react-native-gesture-handler
- **Styling**: React Native's `StyleSheet` API and a custom design system. Does not use `styled-components`, `NativeWind`, or similar external styling libraries.
- **TypeScript**: Strict mode with path aliases

## AI Agent Support

This project includes AI agent guidelines for consistent code generation:

- [AI_INSTRUCTIONS.md](AI_INSTRUCTIONS.md) - Master reference for all AI agents
- [AGENTS.md](AGENTS.md) - Backend/framework-specific rules
- `.github/copilot-instructions.md` - GitHub Copilot configuration
- `.gemini/rules.md` - Gemini-specific guidelines

## License

MIT
