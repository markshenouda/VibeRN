/**
 * Prettier Configuration for VibeRN
 *
 * @description Code formatting rules for consistent style across the project
 *
 * @ai-guide
 * - printWidth: Max line length before wrapping (default: 100)
 * - tabWidth: Spaces per indentation level (default: 2)
 * - semi: Add semicolons at end of statements
 * - singleQuote: Use single quotes instead of double
 * - trailingComma: Add trailing commas where valid in ES5
 * - bracketSpacing: Spaces between brackets in object literals
 * - bracketSameLine: Put > of multi-line JSX on same line
 * - arrowParens: Parentheses around single arrow function parameter
 *
 * To modify formatting:
 * - Change values below
 * - Run `npm run format` to apply to all files
 */
export default {
  printWidth: 100,
  tabWidth: 2,
  useTabs: false,
  semi: true,
  singleQuote: true,
  quoteProps: 'as-needed',
  jsxSingleQuote: false,
  trailingComma: 'es5',
  bracketSpacing: true,
  bracketSameLine: false,
  arrowParens: 'always',
  endOfLine: 'lf',
  plugins: [],
};
