/**
 * Tab Navigator Layout
 *
 * @description Bottom tab navigation layout
 *
 * @ai-guide
 * This layout defines the bottom tab navigation.
 *
 * To add a new tab:
 * 1. Create a new file in tabs/ folder
 * 2. Add a Tabs.Screen entry below
 * 3. Configure the icon and title
 *
 * To remove example tabs when cleaning:
 * - Remove the Tabs.Screen entries
 * - Delete the corresponding files
 */

import { Tabs } from 'expo-router';
import { useTheme } from '@/design-system';
import { Icon } from '@/components/ui';

export default function TabLayout() {
  const { theme } = useTheme();

  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: theme.colors.primary,
        tabBarInactiveTintColor: theme.colors.textTertiary,
        tabBarStyle: {
          backgroundColor: theme.colors.surface,
          borderTopColor: theme.colors.border,
        },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: 'Home',
          tabBarIcon: ({ color }) => <Icon name="home" size="lg" color={color} />,
        }}
      />

      <Tabs.Screen
        name="explore"
        options={{
          title: 'Explore',
          tabBarIcon: ({ color }) => <Icon name="search" size="lg" color={color} />,
        }}
      />

      <Tabs.Screen
        name="profile"
        options={{
          title: 'Profile',
          tabBarIcon: ({ color }) => <Icon name="person" size="lg" color={color} />,
        }}
      />
    </Tabs>
  );
}
