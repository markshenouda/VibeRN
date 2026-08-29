# VibeRN — AI Agent Rules

> **Primary Reference:** Read [AI_INSTRUCTIONS.md](./AI_INSTRUCTIONS.md) for the complete project guide.

This file is read by all AI agents (Claude Code, Cursor, Codex, Cline, Gemini CLI, GitHub Copilot, etc.). It is the single canonical entry point — agent-specific files defer to it.

## Stack

- **Expo SDK 57** · React Native 0.86 · React 19.2
- **Expo Router** — file-based routing in `src/app/`
- **TypeScript** — strict mode
- **Forms** — react-hook-form + zod
- **Storage** — AsyncStorage
- **Design system** — custom theme with light/dark mode

## Non-Negotiables

- **Path aliases:** always import via `@/design-system`, `@/components/ui`, `@/components/forms`, etc. Never use relative paths.
- **Theme:** always use `useTheme()` for colors, spacing, radius, shadows. Never hardcode style values.
- **Safe area:** use `useSafeAreaInsets()` for screen padding.
- **Forms:** always use react-hook-form + zod for validation.
- **Navigation:** file-based routing in `src/app/`; use `expo-router` hooks (`useRouter`, `Link`, `useLocalSearchParams`).
- **Docs:** always update the relevant docs when adding features (see `AI_INSTRUCTIONS.md` → Documentation Requirements).

## Skills

Reusable project skills live in `.agents/skills/` using the portable `SKILL.md` format (frontmatter `name` + `description`). They are read by all agents that support `.agents/skills/`. Invoke them for the workflows they describe (e.g., adding a component, form screen, or navigation screen).

## Quality Checks

Ensure changes pass:

```bash
npm run typecheck
npm run lint
npm run format
```

Pre-commit hooks (lefthook) run these automatically.
