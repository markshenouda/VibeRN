---
name: generate-icons
description: Generate all required app icon sizes from a source image. Use when the app icon needs to be regenerated or updated.
---

# Generate App Icons

## When to Use

Use this skill when the app icon needs to be generated or updated (e.g., after replacing the brand icon).

## Steps

1. **Provide a source image:** place a 1024x1024 PNG at `assets/images/icon-source.png`.
2. **Run the generator:**
   ```bash
   npm run generate:icons
   ```
3. **Verify the output.** The script writes:
   - `assets/images/icon.png` (1024x1024, iOS)
   - `assets/images/adaptive-icon.png` (1024x1024, Android adaptive foreground)
   - `assets/images/favicon.png` (48x48, web)
4. **If the source is missing**, the script exits with instructions — create the source and re-run.

## Notes

- Requires the `sharp` devDependency (already installed).
- Source should be at least 1024x1024.
- See `docs/SCRIPTS.md` for details.
