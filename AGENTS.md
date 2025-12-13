# AI Agent Rules for VibeRN & Associated Services

This document outlines the comprehensive conventions, guidelines, and expectations for all AI agents interacting with the VibeRN codebase and its associated backend services. Adhering to these rules ensures consistency, maintainability, and alignment with project standards across all AI-driven modifications.

---

## 1. Core Mandates for All AI Agents

These mandates apply universally to any AI agent working within this project ecosystem.

- **Conventions:** Rigorously adhere to existing project conventions. Analyze surrounding code, tests, and configuration first.
- **Libraries/Frameworks:** NEVER assume a library/framework is available. Verify its established usage before employing it.
- **Style & Structure:** Mimic the style (formatting, naming), structure, and architectural patterns of existing code.
- **Idiomatic Changes:** Ensure your changes integrate naturally and idiomatically with the local context.
- **Documentation First:** **Always update relevant documentation** when introducing new features, components, or patterns.

---

## 2. Frontend (VibeRN) Project Guidelines

These rules apply specifically when modifying the React Native frontend codebase.

### Project Overview & Structure

- **Framework:** React Native with Expo.
- **Navigation:** Expo Router for file-based routing in `src/app/`.
- **Directory Structure:** Follow the established `src/` directory structure (`app`, `components`, `design-system`, `hooks`, `lib`, `constants`, `types`).
- **Example Screens:** All example screens are located in `src/app/(examples)/`. To start fresh, delete this folder.

### Code Style & Conventions

- **Imports:** Always use path aliases (e.g., `@/design-system`, `@/components/ui`).
- **Components:** Use functional components with TypeScript and include a JSDoc `@ai-guide` section for modification instructions.
- **Styling:** Always use `useTheme()` for accessing design tokens (colors, spacing, etc.). **Never hardcode style values.**
- **Forms:** Use components integrated with `react-hook-form` and `zod` for validation.

### Operational Notes

- **Safe Area:** Use `useSafeAreaInsets()` for screen padding.
- **Storage:** Use the `useAsyncStorage` hook for persistent storage.
- **Quality Checks:** Ensure all changes pass `npm run typecheck`, `npm run lint`, and `npm run format`.

---

## 3. Backend & Agent Framework Guidelines

This section details configurations and specific rules for the Python-based agent framework that powers backend services.

### General Framework Principles

- **LLM Registration:** Language models are treated as classes (e.g., `class Claude(BaseLlm)`) and must be registered with the `LLMRegistry` to be discoverable by the system.
- **Settings Management:** Application-wide settings are managed via a database-backed `Setting` model and can be updated through `save_all_settings()` or `set_setting()` functions. Settings are prefixed (e.g., `llm.`, `search.`, `app.`).

### Claude Agent

The Claude agent integration has two primary implementations: a direct API client and a Vertex AI client.

- **Configuration & API Keys:**
  - **Direct API:** The `Claude_API_KEY` environment variable or an API key passed during initialization is required.
  - **Vertex AI:** The `GOOGLE_CLOUD_PROJECT` and `GOOGLE_CLOUD_LOCATION` environment variables must be set.
- **Model Specification:**
  - A model name must be provided during initialization (e.g., `claude-3-5-sonnet-v2@20241022`).
  - Supported models are validated against regex patterns like `r"claude-3-.*"` and `r"claude-.*-4.*"`.
- **Prompting & Roles:**
  - Prompts are constructed using a strict conversational format, alternating between `Human:` and `Assistant:`. The final prompt must end with `Assistant:`.
  - Internal application roles are mapped to either `"user"` or `"assistant"` to fit this format.
- **Tool Usage:** The Vertex AI implementation (`class Claude(BaseLlm)`) supports function calling (tools). Tools are passed to the model via the `tools` and `tool_choice` parameters.

### Gemini Agent

The Gemini agent adheres to the general framework principles. The `.gemini/rules.md` file serves as a foundational guide for Gemini's interaction patterns, reinforcing the core mandates and project-specific guidelines.

---

## 4. Git & Quality Control

The project uses automated checks to ensure code quality before commits and pushes.

### ESLint (`eslint.config.mjs`)

- AI agents must generate code that adheres to the project's ESLint rules. Key rules include warnings for `no-unused-vars` and errors for `react-hooks/rules-of-hooks`.
- Agents should not modify files listed in the `ignores` array.

### Git Hooks (`lefthook.yml`)

- **Pre-commit:** Automatically runs type-checking (`tsc`), linting (`eslint --fix`), and formatting (`prettier --write`).
- **Pre-push:** Runs a final check for types and linting across the project.

Agents should aim to generate code that passes these checks to ensure a smooth development workflow.
