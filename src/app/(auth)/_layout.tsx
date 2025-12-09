/**
 * Auth Layout
 *
 * @description Layout for authentication screens
 *
 * @ai-guide
 * This layout wraps auth screens (login, register, forgot-password).
 * Presented as a modal from the main app.
 *
 * CLEANUP: Keep this layout but modify screens as needed.
 */

import { Stack } from 'expo-router';
import { useTheme } from '@/design-system';

export default function AuthLayout() {
  const { theme } = useTheme();

  return (
    <Stack
      screenOptions={{
        headerShown: false,
        contentStyle: { backgroundColor: theme.colors.background },
        animation: 'slide_from_right',
      }}
    >
      <Stack.Screen name="login" />
      <Stack.Screen name="register" />
      <Stack.Screen name="forgot-password" />
    </Stack>
  );
}
