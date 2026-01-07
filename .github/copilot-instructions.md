# GitHub Copilot Instructions for VibeRN

> **Primary Reference:** See [AI_INSTRUCTIONS.md](../AI_INSTRUCTIONS.md) for complete guidelines.

## Quick Reference for Copilot

### Component Templates

See AI_INSTRUCTIONS.md for full screen and form component templates.

### Available Components

- **UI:** Text, Button, Input, Card, Avatar, Badge, Checkbox, Switch, RadioGroup, Select, Modal, Skeleton, Divider, Toast
- **Forms:** FormInput, FormSelect, FormCheckbox, FormRadioGroup, FormSwitch
- **Patterns:** Header, EmptyState, LoadingScreen, ListItem, SearchBar, ErrorBoundary

### Key Reminders

- Always use path aliases: `@/design-system`, `@/components/ui`
- Always use `useTheme()` for styling - never hardcode values
- Use `useSafeAreaInsets()` for screen padding
- Forms use `react-hook-form` + `zod`

## Documentation Requirements

**IMPORTANT: Always update documentation when adding new features!**

When adding new features, update the relevant docs:

- `README.md` - Features list, project structure
- `docs/NAVIGATION.md` - New routes, navigation patterns (tabs, drawer, stack, modal)
- `docs/COMPONENTS.md` - New UI components
- `docs/FORMS.md` - New form patterns or validation schemas
- `docs/DESIGN_SYSTEM.md` - New design tokens or theme changes

### Adding Navigation Patterns

1. Create navigation group folder in `src/app/`
2. Add layout file with proper configuration
3. Register in root `_layout.tsx`
4. Update `README.md` project structure
5. Update `docs/NAVIGATION.md` with examples
