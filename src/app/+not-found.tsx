/**
 * Not Found Screen
 *
 * @description 404 screen for unknown routes
 *
 * @ai-guide
 * This screen is shown when navigating to a route that doesn't exist.
 * The + prefix makes it a special Expo Router file.
 */

import { View, StyleSheet } from 'react-native';
import { Link, Stack } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useTheme } from '@/design-system';
import { Text, Button } from '@/components/ui';

export default function NotFoundScreen() {
  const { theme } = useTheme();
  const insets = useSafeAreaInsets();

  return (
    <>
      <Stack.Screen options={{ title: 'Oops!' }} />
      <View
        style={[
          styles.container,
          {
            backgroundColor: theme.colors.background,
            paddingTop: insets.top,
            paddingBottom: insets.bottom,
          },
        ]}
      >
        <Text variant="h1" align="center" style={styles.emoji}>
          🔍
        </Text>
        <Text variant="h2" align="center">
          Page Not Found
        </Text>
        <Text variant="body" color="textSecondary" align="center" style={styles.text}>
          The page you're looking for doesn't exist or has been moved.
        </Text>

        <Link href="/" asChild>
          <Button style={styles.button}>Go to Home</Button>
        </Link>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 24,
  },
  emoji: {
    fontSize: 64,
    marginBottom: 16,
  },
  text: {
    marginTop: 8,
    marginBottom: 32,
  },
  button: {
    minWidth: 200,
  },
});
