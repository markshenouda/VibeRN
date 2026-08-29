---
name: add-component
description: Scaffold a new UI component following the VibeRN design system. Use when creating a reusable component in src/components (ui, forms, patterns, or templates).
---

# Add a Component

## When to Use

Use this skill when adding a new reusable component to `src/components/`. Choose the folder by scope:

- `src/components/ui/` — small, reusable primitives (Text, Button, Input, Card, etc.)
- `src/components/forms/` — form components wired to react-hook-form (FormInput, FormSelect, etc.)
- `src/components/patterns/` — complex patterns (Header, SearchBar, EmptyState, etc.)
- `src/components/templates/` — full screen templates

## Steps

1. **Read the conventions first.** Read `AI_INSTRUCTIONS.md` (Component Patterns) and `docs/COMPONENTS.md` to match existing style.
2. **Create the component file** in the appropriate folder, e.g. `src/components/ui/MyComponent.tsx`.
3. **Follow the component template** from `AI_INSTRUCTIONS.md`:
   - Functional component with TypeScript, named export + exported props interface.
   - JSDoc block with `@description` and an `@ai-guide` section.
   - Use `useTheme()` for all colors, spacing, radius, shadows — never hardcode values.
   - Use `StyleSheet.create()` for static styles; inline styles only for dynamic values.
4. **Export it** from the folder's `index.ts` (e.g. `src/components/ui/index.ts`).
5. **Update docs:** add the component to `docs/COMPONENTS.md` (and `docs/FORMS.md` if it's a form component).
6. **Verify:** run `npm run typecheck`, `npm run lint`, `npm run format`.

## Notes

- Match the naming and style of existing components in the same folder.
- If the component is a form field, see the `add-form-screen` skill for how forms are wired.
