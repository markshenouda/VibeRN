---
name: add-navigation-screen
description: Add a new screen or navigation group to the Expo Router app. Use when creating a new route, tab, drawer, stack, or modal in src/app.
---

# Add a Navigation Screen

## When to Use

Use this skill when adding a new screen or navigation group to the Expo Router file-based router in `src/app/`.

## Steps

1. **Read the conventions first.** Read `AI_INSTRUCTIONS.md` (Navigation) and `docs/NAVIGATION.md`.
2. **Create the screen file** in `src/app/`:
   - Static route: `src/app/foo.tsx`
   - Dynamic route: `src/app/foo/[id].tsx` (access params via `useLocalSearchParams`)
   - Nested group: create a folder with a `_layout.tsx` (e.g. `src/app/examples/tabs/_layout.tsx`)
3. **Use Expo Router hooks** for navigation:
   - `useRouter()` → `router.push('/path')`, `router.replace('/path')`, `router.back()`
   - `<Link href="/path">` for inline links
   - `useLocalSearchParams<{ id: string }>()` for dynamic params
4. **For a new navigation group** (tabs, drawer, stack, modal):
   - Create the group folder in `src/app/`.
   - Add a `_layout.tsx` using the appropriate navigator from `expo-router` (`Tabs`, `Stack`, `Drawer` from `expo-router/drawer`, etc.).
   - Register child screens as `<Tabs.Screen>` / `<Stack.Screen>` / `<Drawer.Screen>` entries.
   - **Do not import from `@react-navigation/*` directly** — expo-router bundles its own; use the `expo-router` exports.
5. **Update docs:** add the route to `docs/NAVIGATION.md` and the project structure in `README.md`.
6. **Verify:** run `npm run typecheck`, `npm run lint`, `npm run format`.

## Notes

- File-based routing: the file path determines the route.
- See `src/app/examples/` for working examples of tabs, drawer, stack, and dynamic routes.
