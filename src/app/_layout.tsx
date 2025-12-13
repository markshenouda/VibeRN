/**
 * Root Layout
 *
 * @description Root layout for the app with providers
 *
 * @ai-guide
 * This is the entry point for the app. It sets up:
 * - ThemeProvider for theming
 * - ToastProvider for notifications
 * - SafeAreaProvider for safe areas
 * - GestureHandlerRootView for gestures
 *
 * To add new providers:
 * 1. Import the provider
 * 2. Wrap children with the provider
 * 3. Keep ThemeProvider near the root for theme access
 */

import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { ThemeProvider, useTheme } from '@/design-system';
import { ToastProvider } from '@/components/ui';
import { ErrorBoundary } from '@/components/patterns';

/**
 * Root Layout Component
 *
 * Wraps the entire app with necessary providers.
 */
export default function RootLayout() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <SafeAreaProvider>
        <ThemeProvider>
          <ErrorBoundary>
            <ToastProvider>
              <RootNavigator />
            </ToastProvider>
          </ErrorBoundary>
        </ThemeProvider>
      </SafeAreaProvider>
    </GestureHandlerRootView>
  );
}

/**
 * Root Navigator
 *
 * Handles the main navigation stack.
 * Separated to access theme context.
 */
function RootNavigator() {
  const { theme, isDark } = useTheme();

  return (
    <>
      <StatusBar style={isDark ? 'light' : 'dark'} />
      <Stack
        screenOptions={{
          headerShown: false,
          contentStyle: { backgroundColor: theme.colors.background },
          animation: 'slide_from_right',
        }}
      >
        {/* Example screens - delete src/app/(examples)/ to remove */}
        <Stack.Screen name="(examples)" />

        {/* Not found */}
        <Stack.Screen name="+not-found" />
      </Stack>
    </>
  );
}
