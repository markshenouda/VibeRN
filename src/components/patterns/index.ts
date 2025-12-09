/**
 * Pattern Components - Main Export
 *
 * @description Common UI patterns and compositions
 *
 * @ai-guide
 * Import from this file:
 * ```tsx
 * import { Header, EmptyState, ListItem } from '@/components/patterns';
 * ```
 *
 * Available Components:
 * - Header: Screen header with back button and actions
 * - EmptyState: Placeholder for empty content
 * - LoadingScreen: Full screen loading indicator
 * - ListItem: Pressable list item
 * - SearchBar: Search input with debounce
 * - ErrorBoundary: Error catching wrapper
 */

export { Header, type HeaderProps } from './Header';
export { EmptyState, type EmptyStateProps } from './EmptyState';
export { LoadingScreen, type LoadingScreenProps } from './LoadingScreen';
export { ListItem, type ListItemProps } from './ListItem';
export { SearchBar, type SearchBarProps } from './SearchBar';
export { ErrorBoundary } from './ErrorBoundary';
