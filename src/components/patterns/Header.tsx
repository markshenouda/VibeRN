/**
 * Header Component
 *
 * @description Reusable screen header with back button and actions
 *
 * @ai-guide
 * Props:
 * - `title`: Header title
 * - `subtitle`: Optional subtitle
 * - `showBack`: Show back button
 * - `onBack`: Back button handler
 * - `rightAction`: Right side action component
 *
 * Usage:
 * ```tsx
 * <Header title="Settings" showBack onBack={() => router.back()} />
 * <Header
 *   title="Profile"
 *   rightAction={<Button size="sm">Edit</Button>}
 * />
 * ```
 */

import React from 'react';
import { View, Pressable, StyleSheet, ViewStyle } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { useTheme } from '@/design-system';
import { Text, Icon } from '@/components/ui';

export interface HeaderProps {
  /** Header title */
  title?: string;
  /** Optional subtitle */
  subtitle?: string;
  /** Show back button */
  showBack?: boolean;
  /** Back button handler (defaults to router.back) */
  onBack?: () => void;
  /** Right side action */
  rightAction?: React.ReactNode;
  /** Large title style */
  large?: boolean;
  /** Transparent background */
  transparent?: boolean;
  /** Container style */
  style?: ViewStyle;
}

/**
 * Header Component
 *
 * A reusable screen header with navigation and actions.
 *
 * @example
 * ```tsx
 * <Header
 *   title="Settings"
 *   showBack
 *   rightAction={
 *     <Button variant="ghost" size="sm" onPress={handleSave}>
 *       Save
 *     </Button>
 *   }
 * />
 * ```
 */
export function Header({
  title,
  subtitle,
  showBack = false,
  onBack,
  rightAction,
  large = false,
  transparent = false,
  style,
}: HeaderProps) {
  const { theme } = useTheme();
  const insets = useSafeAreaInsets();
  const router = useRouter();

  const handleBack = () => {
    if (onBack) {
      onBack();
    } else {
      router.back();
    }
  };

  const containerStyle: ViewStyle = {
    paddingTop: insets.top,
    backgroundColor: transparent ? 'transparent' : theme.colors.surface,
    borderBottomWidth: transparent ? 0 : 1,
    borderBottomColor: theme.colors.border,
  };

  return (
    <View style={[containerStyle, style]}>
      <View style={styles.content}>
        {/* Left section - Back button */}
        <View style={styles.left}>
          {showBack && (
            <Pressable
              style={[styles.backButton, { backgroundColor: theme.colors.backgroundSecondary }]}
              onPress={handleBack}
            >
              <Icon name="arrow-back" size="md" color="textPrimary" />
            </Pressable>
          )}
        </View>

        {/* Center section - Title */}
        <View style={styles.center}>
          {!large && title && (
            <Text variant="h5" align="center" numberOfLines={1}>
              {title}
            </Text>
          )}
          {!large && subtitle && (
            <Text variant="caption" color="textSecondary" align="center" numberOfLines={1}>
              {subtitle}
            </Text>
          )}
        </View>

        {/* Right section - Action */}
        <View style={styles.right}>{rightAction}</View>
      </View>

      {/* Large title */}
      {large && title && (
        <View style={styles.largeTitle}>
          <Text variant="h1">{title}</Text>
          {subtitle && (
            <Text variant="body" color="textSecondary" style={styles.largeSubtitle}>
              {subtitle}
            </Text>
          )}
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  content: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 56,
    paddingHorizontal: 16,
  },
  left: {
    width: 60,
    alignItems: 'flex-start',
  },
  center: {
    flex: 1,
    alignItems: 'center',
  },
  right: {
    width: 60,
    alignItems: 'flex-end',
  },
  backButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
    justifyContent: 'center',
    alignItems: 'center',
  },
  largeTitle: {
    paddingHorizontal: 16,
    paddingBottom: 16,
  },
  largeSubtitle: {
    marginTop: 4,
  },
});

export default Header;
