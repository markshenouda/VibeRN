/**
 * Button - Themed button with multiple variants and sizes
 * @see docs/COMPONENTS.md for full API reference
 */

import React from 'react';
import {
  Pressable,
  PressableProps,
  StyleSheet,
  View,
  ViewStyle,
  TextStyle,
  ActivityIndicator,
  StyleProp,
} from 'react-native';
import * as Haptics from 'expo-haptics';
import { useTheme } from '@/design-system';
import { Text } from './Text';

// Button variants
type ButtonVariant = 'solid' | 'outline' | 'ghost' | 'soft';

// Button sizes
type ButtonSize = 'sm' | 'md' | 'lg';

// Button colors
type ButtonColor = 'primary' | 'secondary' | 'success' | 'warning' | 'error' | 'neutral';

export interface ButtonProps extends Omit<PressableProps, 'children'> {
  /** Visual style variant */
  variant?: ButtonVariant;
  /** Button size */
  size?: ButtonSize;
  /** Color scheme */
  color?: ButtonColor;
  /** Disable the button */
  disabled?: boolean;
  /** Show loading spinner */
  loading?: boolean;
  /** Take full width of container */
  fullWidth?: boolean;
  /** Icon on the left side */
  leftIcon?: React.ReactNode;
  /** Icon on the right side */
  rightIcon?: React.ReactNode;
  /** Enable haptic feedback */
  haptic?: boolean;
  /** Button content */
  children?: React.ReactNode;
}

/**
 * Button Component
 *
 * A versatile button with multiple variants, sizes, and colors.
 *
 * @example
 * ```tsx
 * <Button onPress={() => alert('Pressed!')}>
 *   Press Me
 * </Button>
 *
 * <Button variant="outline" color="secondary" size="lg">
 *   Large Outline Button
 * </Button>
 *
 * <Button loading disabled>
 *   Submitting...
 * </Button>
 * ```
 */
export function Button({
  variant = 'solid',
  size = 'md',
  color = 'primary',
  disabled = false,
  loading = false,
  fullWidth = false,
  leftIcon,
  rightIcon,
  haptic = true,
  children,
  onPress,
  style,
  ...props
}: ButtonProps) {
  const { theme } = useTheme();

  // Handle press with haptic feedback
  const handlePress = (event: any) => {
    if (haptic && !disabled && !loading) {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    }
    onPress?.(event);
  };

  // Get color values based on color prop
  const getColorValues = () => {
    const colorMap = {
      primary: {
        main: theme.colors.primary,
        light: theme.colors.primaryLight,
        dark: theme.colors.primaryDark,
      },
      secondary: {
        main: theme.colors.secondary,
        light: theme.colors.secondaryLight,
        dark: theme.colors.secondary,
      },
      success: {
        main: theme.colors.success,
        light: theme.colors.successLight,
        dark: theme.colors.successDark,
      },
      warning: {
        main: theme.colors.warning,
        light: theme.colors.warningLight,
        dark: theme.colors.warningDark,
      },
      error: {
        main: theme.colors.error,
        light: theme.colors.errorLight,
        dark: theme.colors.errorDark,
      },
      neutral: {
        main: theme.colors.textSecondary,
        light: theme.colors.backgroundSecondary,
        dark: theme.colors.textPrimary,
      },
    };
    return colorMap[color];
  };

  const colorValues = getColorValues();

  // Size configurations
  const sizes = {
    sm: {
      paddingVertical: theme.spacing[2],
      paddingHorizontal: theme.spacing[3],
      fontSize: theme.typography.sizes.sm,
      iconSize: 16,
      gap: theme.spacing[1.5],
    },
    md: {
      paddingVertical: theme.spacing[2.5],
      paddingHorizontal: theme.spacing[4],
      fontSize: theme.typography.sizes.base,
      iconSize: 20,
      gap: theme.spacing[2],
    },
    lg: {
      paddingVertical: theme.spacing[3],
      paddingHorizontal: theme.spacing[5],
      fontSize: theme.typography.sizes.lg,
      iconSize: 24,
      gap: theme.spacing[2],
    },
  };

  const sizeConfig = sizes[size];

  // Get styles based on variant
  const getStyles = (pressed: boolean) => {
    const baseStyle: ViewStyle = {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      borderRadius: theme.componentRadius.button,
      paddingVertical: sizeConfig.paddingVertical,
      paddingHorizontal: sizeConfig.paddingHorizontal,
      gap: sizeConfig.gap,
      opacity: disabled ? 0.5 : pressed ? 0.8 : 1,
    };

    const variantStyles: Record<ButtonVariant, ViewStyle> = {
      solid: {
        backgroundColor: colorValues.main,
      },
      outline: {
        backgroundColor: 'transparent',
        borderWidth: 1.5,
        borderColor: colorValues.main,
      },
      ghost: {
        backgroundColor: pressed ? colorValues.light : 'transparent',
      },
      soft: {
        backgroundColor: colorValues.light,
      },
    };

    return { ...baseStyle, ...variantStyles[variant] };
  };

  // Get text color based on variant
  const getTextColor = () => {
    if (variant === 'solid') {
      return theme.colors.textInverse;
    }
    return colorValues.main;
  };

  // Text style
  const textStyle: TextStyle = {
    fontSize: sizeConfig.fontSize,
    fontWeight: theme.typography.weights.semibold,
    color: getTextColor(),
  };

  // Compute button style based on pressed state
  const computeStyle = ({ pressed }: { pressed: boolean }): StyleProp<ViewStyle> => {
    const computedStyles: ViewStyle[] = [getStyles(pressed)];
    if (fullWidth) {
      computedStyles.push(styles.fullWidth);
    }
    if (style) {
      computedStyles.push(style as ViewStyle);
    }
    return computedStyles;
  };

  return (
    <Pressable style={computeStyle} disabled={disabled || loading} onPress={handlePress} {...props}>
      {loading ? (
        <ActivityIndicator
          size="small"
          color={variant === 'solid' ? theme.colors.textInverse : colorValues.main}
        />
      ) : (
        <>
          {leftIcon && <View style={styles.icon}>{leftIcon}</View>}
          {typeof children === 'string' ? <Text style={textStyle}>{children}</Text> : children}
          {rightIcon && <View style={styles.icon}>{rightIcon}</View>}
        </>
      )}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  fullWidth: {
    width: '100%',
  },
  icon: {
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default Button;
