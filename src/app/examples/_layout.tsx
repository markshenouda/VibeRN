/**
 * Examples Layout
 *
 * @description Layout for example/demo screens
 *
 * @ai-guide
 * This layout wraps example screens that demonstrate components.
 *
 * CLEANUP: Remove this entire folder when cleaning the project.
 * The clean-project script will remove all files in examples/.
 */

import { Stack } from 'expo-router';
import { useTheme } from '@/design-system';

export default function ExamplesLayout() {
  const { theme } = useTheme();

  return (
    <Stack
      screenOptions={{
        headerShown: false,
        contentStyle: { backgroundColor: theme.colors.background },
        animation: 'slide_from_right',
      }}
    >
      <Stack.Screen name="tabs" />
      <Stack.Screen name="components" />
      <Stack.Screen name="forms" />
      <Stack.Screen name="drawer" />
    </Stack>
  );
}
