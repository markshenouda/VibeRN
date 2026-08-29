---
name: generate-splash
description: Generate the splash screen images from a source logo. Use when the splash screen needs to be regenerated or updated.
---

# Generate Splash Screen

## When to Use

Use this skill when the splash screen needs to be generated or updated (e.g., after replacing the brand logo).

## Steps

1. **Provide a source logo:** place a 512x512 (or larger) PNG at `assets/images/splash-source.png`.
2. **Run the generator:**
   ```bash
   npm run generate:splash
   ```
3. **Verify the output.** The script writes:
   - `assets/images/splash.png` (1284x2778, centered logo on `#6366f1`)
   - `assets/images/splash-icon.png` (200x200, used by expo-router)
4. **If the source is missing**, the script creates a placeholder splash and exits.

## Notes

- Requires the `sharp` devDependency (already installed).
- To change the background color, edit `BACKGROUND_COLOR` in `scripts/generate-splash.ts` and the `expo-splash-screen` plugin config in `app.json`.
- See `docs/SCRIPTS.md` for details.
