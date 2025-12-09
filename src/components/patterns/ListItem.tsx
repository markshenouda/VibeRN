/**
 * ListItem Component
 *
 * @description Pressable list item for lists and settings
 *
 * @ai-guide
 * Props:
 * - `title`: Item title
 * - `subtitle`: Optional subtitle
 * - `leftElement`: Left side element (icon, avatar)
 * - `rightElement`: Right side element (badge, chevron)
 * - `onPress`: Press handler
 *
 * Usage:
 * ```tsx
 * <ListItem
 *   title="Profile"
 *   subtitle="Update your information"
 *   leftElement={<Avatar name="John" size="sm" />}
 *   rightElement={<Text>→</Text>}
 *   onPress={() => navigate('profile')}
 * />
 * ```
 */

import React from 'react';
import { Pressable, View, StyleSheet, ViewStyle } from 'react-native';
import * as Haptics from 'expo-haptics';
import { useTheme } from '@/design-system';
import { Text } from '@/components/ui';

export interface ListItemProps {
  /** Item title */
  title: string;
  /** Optional subtitle */
  subtitle?: string;
  /** Left element (icon, avatar) */
  leftElement?: React.ReactNode;
  /** Right element (badge, chevron, switch) */
  rightElement?: React.ReactNode;
  /** Press handler */
  onPress?: () => void;
  /** Disable item */
  disabled?: boolean;
  /** Show chevron indicator */
  showChevron?: boolean;
  /** Show bottom border */
  showBorder?: boolean;
  /** Container style */
  style?: ViewStyle;
}

/**
 * ListItem Component
 *
 * A versatile list item for settings, menus, etc.
 *
 * @example
 * ```tsx
 * <ListItem
 *   title="Notifications"
 *   subtitle="Manage notification preferences"
 *   leftElement={<BellIcon />}
 *   showChevron
 *   onPress={() => router.push('/settings/notifications')}
 * />
 *
 * <ListItem
 *   title="Dark Mode"
 *   leftElement={<MoonIcon />}
 *   rightElement={
 *     <Switch value={isDark} onValueChange={toggleTheme} />
 *   }
 * />
 * ```
 */
export function ListItem({
  title,
  subtitle,
  leftElement,
  rightElement,
  onPress,
  disabled = false,
  showChevron = false,
  showBorder = true,
  style,
}: ListItemProps) {
  const { theme } = useTheme();

  const handlePress = () => {
    if (disabled || !onPress) return;
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    onPress();
  };

  const containerStyle: ViewStyle = {
    borderBottomWidth: showBorder ? 1 : 0,
    borderBottomColor: theme.colors.border,
    opacity: disabled ? 0.5 : 1,
  };

  const content = (
    <View style={[styles.container, containerStyle, style]}>
      {leftElement && <View style={styles.left}>{leftElement}</View>}

      <View style={styles.content}>
        <Text variant="body" numberOfLines={1}>
          {title}
        </Text>
        {subtitle && (
          <Text variant="bodySmall" color="textSecondary" numberOfLines={2}>
            {subtitle}
          </Text>
        )}
      </View>

      {(rightElement || showChevron) && (
        <View style={styles.right}>
          {rightElement}
          {showChevron && (
            <Text color="textTertiary" style={styles.chevron}>
              ›
            </Text>
          )}
        </View>
      )}
    </View>
  );

  if (onPress) {
    return (
      <Pressable
        onPress={handlePress}
        disabled={disabled}
        style={({ pressed }) => [pressed && { opacity: 0.7 }]}
      >
        {content}
      </Pressable>
    );
  }

  return content;
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 16,
    minHeight: 56,
  },
  left: {
    marginRight: 12,
  },
  content: {
    flex: 1,
    gap: 2,
  },
  right: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 12,
  },
  chevron: {
    fontSize: 20,
    marginLeft: 4,
  },
});

export default ListItem;
