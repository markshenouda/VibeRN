# Scripts Reference

Available npm scripts for development and project management.

## Development

### Start Development Server

```bash
npm run start
# or
npm run start
```

Starts the Expo development server. Press:

- `i` for iOS simulator
- `a` for Android emulator
- `w` for web browser

### Platform-Specific

```bash
npm run ios      # Start on iOS simulator
npm run android  # Start on Android emulator
npm run web      # Start in web browser
```

## Code Quality

### Linting

```bash
npm run lint        # Run ESLint
npm run lint:fix    # Run ESLint with auto-fix
```

### Type Checking

```bash
npm run typecheck   # Run TypeScript compiler check
```

### Formatting

```bash
npm run format       # Format all files with Prettier
npm run format:check # Check formatting without changes
```

### All Checks

```bash
npm run check   # Run typecheck + lint + format:check
```

## Project Management

### Clean Project

```bash
npm run clean
```

Removes example screens and resets tabs to minimal templates.

**What it removes:**

- `src/app/(examples)/` folder
- Example content in tab screens

**What it keeps:**

- Design system and components
- Form components and validation
- Hooks and utilities
- Navigation structure
- Auth flow structure

**After running:**

1. Update `app.json` with your app details
2. Customize tab screens
3. Update auth screens with your logic

### Generate App Icons

```bash
npm run generate:icons
```

Generates all required app icon sizes from a source image.

**Setup:**

1. Create a 1024x1024 PNG image
2. Save as `assets/images/icon-source.png`
3. Run the script

**Generated files:**

- `assets/images/icon.png` (1024x1024)
- `assets/images/adaptive-icon.png` (1024x1024)
- `assets/images/favicon.png` (48x48)

### Generate Splash Screen

```bash
npm run generate:splash
```

Generates splash screen from a source logo.

**Setup:**

1. Create a logo image (512x512 recommended)
2. Save as `assets/images/splash-source.png`
3. Run the script

**Output:**

- `assets/images/splash.png` with centered logo

**Customization:**
Edit `scripts/generate-splash.ts` to change:

- `BACKGROUND_COLOR` - splash background
- `LOGO_SIZE` - logo size in splash
- `OUTPUT_SIZE` - splash dimensions

## Build

### EAS Build

```bash
npm run build:ios      # Build for iOS
npm run build:android  # Build for Android
```

Requires EAS CLI setup. See [Expo EAS Build docs](https://docs.expo.dev/build/introduction/).

## Git Hooks

Git hooks are managed by Lefthook:

### Pre-commit

- TypeScript check
- ESLint with auto-fix
- Prettier formatting

### Pre-push

- Full TypeScript check
- Full ESLint check

### Disable Hooks Temporarily

```bash
LEFTHOOK=0 git commit -m "message"
```

### Skip Specific Hook

```bash
LEFTHOOK_EXCLUDE=lint git commit -m "message"
```

## Configuration Files

| File                    | Purpose                  |
| ----------------------- | ------------------------ |
| `eslint.config.mjs`     | ESLint configuration     |
| `prettier.config.mjs`   | Prettier configuration   |
| `lefthook.yml`          | Git hooks configuration  |
| `tsconfig.json`         | TypeScript configuration |
| `.editorconfig`         | Editor settings          |
| `.vscode/settings.json` | VSCode settings          |

## Adding Custom Scripts

Add to `package.json`:

```json
{
  "scripts": {
    "custom:script": "tsx scripts/custom-script.ts"
  }
}
```

Create script in `scripts/` folder:

```typescript
// scripts/custom-script.ts
import * as fs from 'fs';
import * as path from 'path';

async function main() {
  console.log('Running custom script...');
  // Your logic here
}

main().catch(console.error);
```
