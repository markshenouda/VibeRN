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

import { ErrorBoundary } from '@/components/patterns';
import { ToastProvider } from '@/components/ui';
import { ThemeProvider, useTheme } from '@/design-system';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { SafeAreaProvider } from 'react-native-safe-area-context';

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
        <Stack.Screen name="index" options={{ headerShown: false }} />

        {/* Not found */}
        <Stack.Screen name="+not-found" />
      </Stack>
    </>
  );
}
