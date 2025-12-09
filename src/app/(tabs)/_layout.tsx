/**
 * Tab Navigator Layout
 *
 * @description Bottom tab navigation layout
 *
 * @ai-guide
 * This layout defines the bottom tab navigation.
 *
 * To add a new tab:
 * 1. Create a new file in (tabs)/ folder
 * 2. Add a Tabs.Screen entry below
 * 3. Configure the icon and title
 *
 * To remove example tabs when cleaning:
 * - Remove the Tabs.Screen entries
 * - Delete the corresponding files
 */

import { Tabs } from 'expo-router';
import { Text as RNText } from 'react-native';
import { useTheme } from '@/design-system';

/**
 * Tab Bar Icon Component
 *
 * Simple text-based icons. Replace with your icon library.
 *
 * @ai-guide
 * To use custom icons:
 * 1. Install an icon library (e.g., @expo/vector-icons, lucide-react-native)
 * 2. Replace TabIcon with your icon component
 *
 * Example with Ionicons:
 * ```tsx
 * import { Ionicons } from '@expo/vector-icons';
 *
 * function TabIcon({ name, color }: { name: keyof typeof Ionicons.glyphMap; color: string }) {
 *   return <Ionicons name={name} size={24} color={color} />;
 * }
 * ```
 */
function TabIcon({ icon, color }: { icon: string; color: string }) {
  return <RNText style={{ fontSize: 24, color }}>{icon}</RNText>;
}

export default function TabLayout() {
  const { theme } = useTheme();

  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: theme.colors.primary,
        tabBarInactiveTintColor: theme.colors.textTertiary,
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: 'Home',
          tabBarIcon: ({ color }) => <TabIcon icon="🏠" color={color} />,
        }}
      />

      <Tabs.Screen
        name="explore"
        options={{
          title: 'Explore',
          tabBarIcon: ({ color }) => <TabIcon icon="🔍" color={color} />,
        }}
      />

      <Tabs.Screen
        name="profile"
        options={{
          title: 'Profile',
          tabBarIcon: ({ color }) => <TabIcon icon="👤" color={color} />,
        }}
      />
    </Tabs>
  );
}
