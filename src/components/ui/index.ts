/**
 * UI Components - Main Export
 *
 * @description Central export for all UI primitives
 *
 * @ai-guide
 * Import components from this file:
 * ```tsx
 * import { Button, Text, Input, Card } from '@/components/ui';
 * ```
 *
 * Available Components:
 * - Text: Themed text with variants (h1, body, caption, etc.)
 * - Button: Multiple variants (solid, outline, ghost, soft)
 * - Input: Text input with label/error support
 * - Card: Container with elevation/outline variants
 * - Avatar: User avatar with initials fallback
 * - Badge: Status/count labels
 * - Checkbox: Selectable checkbox
 * - Switch: Toggle switch
 * - RadioGroup: Single selection radio buttons
 * - Select: Dropdown select
 * - Modal: Dialog modal
 * - Skeleton: Loading placeholders
 * - Divider: Content separator
 * - Toast: Notification system (use with ToastProvider)
 */

// Core components
export { Text, type TextProps } from './Text';
export { Button, type ButtonProps } from './Button';
export { Input, type InputProps } from './Input';
export { Card, type CardProps } from './Card';

// Display components
export { Avatar, type AvatarProps } from './Avatar';
export { Badge, type BadgeProps } from './Badge';
export { Skeleton, SkeletonText, SkeletonAvatar, type SkeletonProps } from './Skeleton';
export { Divider, type DividerProps } from './Divider';

// Form components
export { Checkbox, type CheckboxProps } from './Checkbox';
export { Switch, type SwitchProps } from './Switch';
export { RadioGroup, type RadioGroupProps, type RadioOption } from './Radio';
export { Select, type SelectProps, type SelectOption } from './Select';

// Overlay components
export { Modal, type ModalProps } from './Modal';
export { ToastProvider, useToast } from './Toast';
