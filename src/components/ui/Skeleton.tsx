/**
 * Skeleton Component
 *
 * @description Loading placeholder with shimmer animation
 *
 * @ai-guide
 * Props:
 * - `width`: Skeleton width (number or percentage)
 * - `height`: Skeleton height
 * - `variant`: Shape variant (text, circular, rectangular)
 * - `animation`: Enable shimmer animation
 *
 * Usage:
 * ```tsx
 * <Skeleton width={200} height={20} />
 * <Skeleton variant="circular" width={48} height={48} />
 * <Skeleton variant="rectangular" width="100%" height={120} />
 * ```
 */

import React, { useEffect, useRef } from 'react';
import { View, Animated, StyleSheet, ViewStyle, DimensionValue } from 'react-native';
import { useTheme } from '@/design-system';

// Skeleton variants
type SkeletonVariant = 'text' | 'circular' | 'rectangular';

export interface SkeletonProps {
  /** Width */
  width?: DimensionValue;
  /** Height */
  height?: DimensionValue;
  /** Shape variant */
  variant?: SkeletonVariant;
  /** Enable animation */
  animation?: boolean;
  /** Border radius (for rectangular) */
  borderRadius?: number;
  /** Container style */
  style?: ViewStyle;
}

/**
 * Skeleton Component
 *
 * A loading placeholder with optional shimmer animation.
 *
 * @example
 * ```tsx
 * // Text placeholder
 * <Skeleton width={150} height={16} />
 *
 * // Avatar placeholder
 * <Skeleton variant="circular" width={48} height={48} />
 *
 * // Card placeholder
 * <Skeleton variant="rectangular" width="100%" height={200} />
 * ```
 */
export function Skeleton({
  width = '100%',
  height = 16,
  variant = 'text',
  animation = true,
  borderRadius,
  style,
}: SkeletonProps) {
  const { theme } = useTheme();
  const animatedValue = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (animation) {
      const shimmer = Animated.loop(
        Animated.sequence([
          Animated.timing(animatedValue, {
            toValue: 1,
            duration: 1000,
            useNativeDriver: true,
          }),
          Animated.timing(animatedValue, {
            toValue: 0,
            duration: 1000,
            useNativeDriver: true,
          }),
        ])
      );
      shimmer.start();
      return () => shimmer.stop();
    }
  }, [animation, animatedValue]);

  // Get border radius based on variant
  const getBorderRadius = () => {
    if (borderRadius !== undefined) return borderRadius;
    switch (variant) {
      case 'circular':
        return typeof height === 'number' ? height / 2 : 9999;
      case 'text':
        return theme.componentRadius.skeleton;
      case 'rectangular':
        return theme.componentRadius.skeleton;
      default:
        return theme.componentRadius.skeleton;
    }
  };

  const opacity = animation
    ? animatedValue.interpolate({
        inputRange: [0, 1],
        outputRange: [0.5, 1],
      })
    : 1;

  const skeletonStyle: ViewStyle = {
    width,
    height,
    borderRadius: getBorderRadius(),
    backgroundColor: theme.colors.skeleton,
  };

  return <Animated.View style={[skeletonStyle, { opacity }, style]} />;
}

// Convenience components
export function SkeletonText({ lines = 3, ...props }: SkeletonProps & { lines?: number }) {
  return (
    <View style={styles.textContainer}>
      {Array.from({ length: lines }).map((_, index) => (
        <Skeleton
          key={index}
          height={14}
          width={index === lines - 1 ? '60%' : '100%'}
          style={styles.textLine}
          {...props}
        />
      ))}
    </View>
  );
}

export function SkeletonAvatar({ size = 48 }: { size?: number }) {
  return <Skeleton variant="circular" width={size} height={size} />;
}

const styles = StyleSheet.create({
  textContainer: {
    gap: 8,
  },
  textLine: {
    marginBottom: 4,
  },
});

export default Skeleton;
