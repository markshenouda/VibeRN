# AI Agent Rules for VibeRN

> **Primary Reference:** See [AI_INSTRUCTIONS.md](./AI_INSTRUCTIONS.md) for comprehensive AI agent guidelines.

This document contains agent-specific rules and overrides for the VibeRN project.

---

## Backend & Agent Framework Guidelines

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
