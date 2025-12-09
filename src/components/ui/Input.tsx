/**
 * Input Component
 *
 * @description Themed text input with label and error support
 *
 * @ai-guide
 * Props:
 * - `label`: Input label text
 * - `error`: Error message to display
 * - `hint`: Helper text below input
 * - `leftIcon`/`rightIcon`: Icon components
 * - `size`: Input size (sm, md, lg)
 *
 * Usage:
 * ```tsx
 * <Input label="Email" placeholder="Enter email" />
 * <Input label="Password" secureTextEntry error="Invalid password" />
 * <Input label="Search" leftIcon={<SearchIcon />} />
 * ```
 *
 * For form integration, use FormInput from @/components/forms
 */

import React, { forwardRef, useState } from 'react';
import { TextInput, TextInputProps, View, StyleSheet, ViewStyle, Pressable } from 'react-native';
import { useTheme } from '@/design-system';
import { Text } from './Text';

// Input sizes
type InputSize = 'sm' | 'md' | 'lg';

export interface InputProps extends TextInputProps {
  /** Input label */
  label?: string;
  /** Error message */
  error?: string;
  /** Helper text */
  hint?: string;
  /** Input size */
  size?: InputSize;
  /** Icon on the left */
  leftIcon?: React.ReactNode;
  /** Icon on the right */
  rightIcon?: React.ReactNode;
  /** Disable the input */
  disabled?: boolean;
  /** Container style */
  containerStyle?: ViewStyle;
}

/**
 * Input Component
 *
 * A styled text input with label, error, and icon support.
 *
 * @example
 * ```tsx
 * <Input
 *   label="Email"
 *   placeholder="you@example.com"
 *   keyboardType="email-address"
 * />
 *
 * <Input
 *   label="Password"
 *   secureTextEntry
 *   error={errors.password?.message}
 * />
 * ```
 */
export const Input = forwardRef<TextInput, InputProps>(
  (
    {
      label,
      error,
      hint,
      size = 'md',
      leftIcon,
      rightIcon,
      disabled = false,
      containerStyle,
      style,
      onFocus,
      onBlur,
      ...props
    },
    ref
  ) => {
    const { theme } = useTheme();
    const [isFocused, setIsFocused] = useState(false);

    // Size configurations
    const sizes = {
      sm: {
        paddingVertical: theme.spacing[2],
        paddingHorizontal: theme.spacing[2.5],
        fontSize: theme.typography.sizes.sm,
        iconSize: 16,
        minHeight: 36,
      },
      md: {
        paddingVertical: theme.spacing[2.5],
        paddingHorizontal: theme.spacing[3],
        fontSize: theme.typography.sizes.base,
        iconSize: 20,
        minHeight: 44,
      },
      lg: {
        paddingVertical: theme.spacing[3],
        paddingHorizontal: theme.spacing[3.5],
        fontSize: theme.typography.sizes.lg,
        iconSize: 24,
        minHeight: 52,
      },
    };

    const sizeConfig = sizes[size];

    // Handle focus
    const handleFocus = (e: any) => {
      setIsFocused(true);
      onFocus?.(e);
    };

    // Handle blur
    const handleBlur = (e: any) => {
      setIsFocused(false);
      onBlur?.(e);
    };

    // Get border color
    const getBorderColor = () => {
      if (error) return theme.colors.error;
      if (isFocused) return theme.colors.inputBorderFocus;
      return theme.colors.inputBorder;
    };

    // Input container style
    const inputContainerStyle: ViewStyle = {
      flexDirection: 'row',
      alignItems: 'center',
      backgroundColor: theme.colors.inputBackground,
      borderWidth: 1.5,
      borderColor: getBorderColor(),
      borderRadius: theme.componentRadius.input,
      minHeight: sizeConfig.minHeight,
      paddingHorizontal: sizeConfig.paddingHorizontal,
      opacity: disabled ? 0.5 : 1,
    };

    // Text input style
    const inputStyle = {
      flex: 1,
      fontSize: sizeConfig.fontSize,
      color: theme.colors.textPrimary,
      paddingVertical: sizeConfig.paddingVertical,
    };

    return (
      <View style={[styles.container, containerStyle]}>
        {label && (
          <Text variant="label" style={styles.label}>
            {label}
          </Text>
        )}

        <View style={inputContainerStyle}>
          {leftIcon && <View style={[styles.icon, styles.leftIcon]}>{leftIcon}</View>}

          <TextInput
            ref={ref}
            style={[inputStyle, style]}
            placeholderTextColor={theme.colors.inputPlaceholder}
            editable={!disabled}
            onFocus={handleFocus}
            onBlur={handleBlur}
            {...props}
          />

          {rightIcon && <View style={[styles.icon, styles.rightIcon]}>{rightIcon}</View>}
        </View>

        {(error || hint) && (
          <Text variant="caption" color={error ? 'error' : 'textTertiary'} style={styles.helper}>
            {error || hint}
          </Text>
        )}
      </View>
    );
  }
);

Input.displayName = 'Input';

const styles = StyleSheet.create({
  container: {
    width: '100%',
  },
  label: {
    marginBottom: 6,
  },
  icon: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  leftIcon: {
    marginRight: 8,
  },
  rightIcon: {
    marginLeft: 8,
  },
  helper: {
    marginTop: 4,
  },
});

export default Input;
