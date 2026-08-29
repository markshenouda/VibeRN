---
name: add-form-screen
description: Scaffold a new form screen using react-hook-form + zod in the VibeRN design system. Use when creating a screen with form inputs and validation.
---

# Add a Form Screen

## When to Use

Use this skill when adding a new screen that contains a form (login, register, settings, etc.) with validation.

## Steps

1. **Read the conventions first.** Read `AI_INSTRUCTIONS.md` (Form Component Template) and `docs/FORMS.md`.
2. **Define a zod schema** in `src/lib/validation.ts` (or locally if screen-specific). Export the schema and its inferred type. Reuse existing schemas (`emailSchema`, `passwordSchema`, `loginFormSchema`, `registerFormSchema`) where possible.
3. **Create the screen** in `src/app/` (e.g. `src/app/examples/auth/login.tsx`).
4. **Wire the form** using the pattern from `AI_INSTRUCTIONS.md`:
   - `useForm` from `react-hook-form` with `zodResolver(schema)`.
   - Use form components from `@/components/forms` (FormInput, FormSelect, FormCheckbox, FormRadioGroup, FormSwitch).
   - Use `useSafeAreaInsets()` for screen padding and `useTheme()` for styling.
5. **Handle submit** with `handleSubmit(onSubmit)`; show errors via the form components.
6. **Update docs:** add the route to `docs/NAVIGATION.md` and any new schemas to `docs/FORMS.md`.
7. **Verify:** run `npm run typecheck`, `npm run lint`, `npm run format`.

## Notes

- Never hand-roll validation — always use zod schemas.
- Match the style of existing form screens in `src/app/examples/auth/`.
