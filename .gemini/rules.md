# Gemini Rules for VibeRN

This document outlines the rules and conventions for using AI assistants, like Gemini, in the VibeRN project. Following these guidelines ensures consistency, quality, and maintainability of the codebase.

## Core Mandates

- **Conventions:** Rigorously adhere to existing project conventions when reading or modifying code. Analyze surrounding code, tests, and configuration first.
- **Libraries/Frameworks:** NEVER assume a library/framework is available or appropriate. Verify its established usage within the project (check imports, `package.json`, `babel.config.js`, etc.) before employing it. This project is built on Expo and React Native.
- **Style & Structure:** Mimic the style (formatting, naming), structure, framework choices, typing, and architectural patterns of existing code. The project is written in TypeScript and uses Prettier for formatting.
- **Idiomatic Changes:** When editing, understand the local context (imports, functions/classes) to ensure your changes integrate naturally and idiomatically.

## Project-Specific Guidelines

### File Structure & Routing

- **Expo Router:** This project uses Expo Router for navigation. All routes and screens are defined within the `src/app` directory. Follow the file-based routing conventions for creating new screens or navigation folders (e.g., `tabs`, `drawer`).
- **App Entry Point:** The app uses `src/app/index.tsx` as the entry point, which redirects to `/examples/tabs` by default. Replace this file with your own home screen when ready.
- **Example Screens:** All example screens (auth, tabs, drawer, forms, components) are located in `src/app/examples/`. To start fresh, simply delete this folder.
- **Component Organization:**
  - **UI Components (`src/components/ui`):** For small, reusable, and generic UI elements (e.g., `Button`, `Card`, `Input`).
  - **Pattern Components (`src/components/patterns`):** For more complex components that combine multiple UI elements into a recurring pattern (e.g., `Header`, `SearchBar`, `EmptyState`).
  - **Form Components (`src/components/forms`):** For components specifically designed to be used within forms.
- **Hooks:** Reusable, custom React hooks are located in `src/hooks`. Create new hooks here.
- **Types:** Global or shared TypeScript types should be defined in the `src/types` directory.

### Design System

- **Theme & Tokens:** The project has a dedicated design system located in `src/design-system`.
- **ALWAYS** use theme values and tokens for styling:
  - **Colors:** `theme.colors.primary`, `theme.colors.background`, etc. (from `src/design-system/tokens/colors.ts`)
  - **Spacing:** `theme.spacing.sm`, `theme.spacing.md`, etc. (from `src/design-system/tokens/spacing.ts`)
  - **Typography:** Use the `<Text>` component which applies theme-based typography.
  - **Radius & Shadows:** `theme.radius`, `theme.shadows` (from `src/design-system/tokens/`)
- Avoid hard-coding style values (e.g., `color: '#FFF'`, `fontSize: 16`).

### Code Quality & Best Practices

- **TypeScript:** Write strongly-typed code. Avoid using `any` unless absolutely necessary.
- **Tests:** When adding new features or fixing bugs, include tests to ensure correctness and prevent regressions. (Verify testing setup, e.g., Jest or React Native Testing Library).
- **Comments:** Add code comments sparingly. Focus on _why_ something is done (e.g., complex logic, workarounds) rather than _what_ is done.
- **Scripts:** Utility scripts for project maintenance are located in the `scripts/` directory.

By adhering to these rules, we can leverage AI to accelerate development while maintaining a high-quality, consistent, and easy-to-navigate codebase.
