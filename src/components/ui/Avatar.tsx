/**
 * Avatar Component
 *
 * @description User avatar with image, initials, or icon fallback
 *
 * @ai-guide
 * Props:
 * - `source`: Image source
 * - `name`: Name for initials fallback
 * - `size`: Avatar size (xs, sm, md, lg, xl)
 * - `shape`: Shape (circle, square)
 *
 * Usage:
 * ```tsx
 * <Avatar source={{ uri: 'https://...' }} />
 * <Avatar name="John Doe" size="lg" />
 * <Avatar shape="square" size="md" />
 * ```
 */

import React from 'react';
import { View, Image, ImageSourcePropType, StyleSheet, ViewStyle } from 'react-native';
import { useTheme } from '@/design-system';
import { Text } from './Text';

// Avatar sizes
type AvatarSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl';

// Avatar shape
type AvatarShape = 'circle' | 'square';

export interface AvatarProps {
  /** Image source */
  source?: ImageSourcePropType;
  /** Name for initials (fallback) */
  name?: string;
  /** Avatar size */
  size?: AvatarSize;
  /** Avatar shape */
  shape?: AvatarShape;
  /** Custom background color */
  backgroundColor?: string;
  /** Container style */
  style?: ViewStyle;
}

/**
 * Avatar Component
 *
 * Displays user avatar with fallback to initials.
 *
 * @example
 * ```tsx
 * <Avatar source={{ uri: user.avatarUrl }} size="lg" />
 * <Avatar name="John Doe" /> // Shows "JD"
 * ```
 */
export function Avatar({
  source,
  name,
  size = 'md',
  shape = 'circle',
  backgroundColor,
  style,
}: AvatarProps) {
  const { theme } = useTheme();

  // Size configurations
  const sizes = {
    xs: { container: 24, text: 10 },
    sm: { container: 32, text: 12 },
    md: { container: 40, text: 14 },
    lg: { container: 56, text: 18 },
    xl: { container: 72, text: 24 },
  };

  const sizeConfig = sizes[size];

  // Get initials from name
  const getInitials = (name: string): string => {
    const parts = name.trim().split(' ').filter(Boolean);
    if (parts.length === 0) return '?';
    if (parts.length === 1) return parts[0][0].toUpperCase();
    return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
  };

  // Container style
  const containerStyle: ViewStyle = {
    width: sizeConfig.container,
    height: sizeConfig.container,
    borderRadius:
      shape === 'circle' ? sizeConfig.container / 2 : theme.componentRadius.avatarSquare,
    backgroundColor: backgroundColor || theme.colors.primaryLight,
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',
  };

  // Render image if source is provided
  if (source) {
    return (
      <View style={[containerStyle, style]}>
        <Image
          source={source}
          style={{
            width: sizeConfig.container,
            height: sizeConfig.container,
          }}
          resizeMode="cover"
        />
      </View>
    );
  }

  // Render initials
  return (
    <View style={[containerStyle, style]}>
      <Text
        style={{
          fontSize: sizeConfig.text,
          fontWeight: theme.typography.weights.semibold,
          color: theme.colors.primary,
        }}
      >
        {name ? getInitials(name) : '?'}
      </Text>
    </View>
  );
}

export default Avatar;
