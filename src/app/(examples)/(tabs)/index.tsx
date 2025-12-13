/**
 * Home Screen
 *
 * @description Main home tab screen
 *
 * @ai-guide
 * This is an EXAMPLE screen. It demonstrates:
 * - Using design system components
 * - Navigation patterns
 * - Theme usage
 *
 * CLEANUP: This file can be modified or replaced with your own home screen.
 */

import { View, ScrollView, StyleSheet, Linking, Pressable } from 'react-native';
import { Link, useRouter } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useTheme } from '@/design-system';
import { Text, Button, Card } from '@/components/ui';

export default function HomeScreen() {
  const { theme, toggleTheme, isDark } = useTheme();
  const insets = useSafeAreaInsets();
  const router = useRouter();

  return (
    <ScrollView
      style={[styles.container, { backgroundColor: theme.colors.background }]}
      contentContainerStyle={[
        styles.content,
        { paddingTop: insets.top + 16, paddingBottom: insets.bottom + 16 },
      ]}
    >
      {/* Header */}
      <View style={styles.header}>
        <Text variant="h1">VibeRN</Text>
        <Text variant="body" color="textSecondary">
          React Native Starter for Vibe Coders
        </Text>
      </View>

      {/* Quick Actions */}
      <View style={styles.section}>
        <Text variant="h4" style={styles.sectionTitle}>
          Quick Actions
        </Text>

        <View style={styles.buttonRow}>
          <Button onPress={toggleTheme} variant="outline" style={styles.flexButton}>
            {isDark ? '☀️ Light' : '🌙 Dark'}
          </Button>

          <Button onPress={() => router.push('/(examples)/components')} style={styles.flexButton}>
            Components
          </Button>
        </View>

        <View style={styles.buttonRow}>
          <Button
            onPress={() => router.push('/(examples)/forms')}
            variant="soft"
            style={styles.flexButton}
          >
            Forms
          </Button>

          <Button
            onPress={() => router.push('/(examples)/drawer')}
            variant="outline"
            style={styles.flexButton}
          >
            Drawer
          </Button>
        </View>

        <View style={styles.buttonRow}>
          <Button
            onPress={() => router.push('/(examples)/(auth)/login')}
            variant="ghost"
            style={styles.flexButton}
          >
            Auth Flow
          </Button>
        </View>
      </View>

      {/* Feature Cards */}
      <View style={styles.section}>
        <Text variant="h4" style={styles.sectionTitle}>
          Features
        </Text>

        <Card style={styles.card}>
          <Text variant="h5">🎨 Design System</Text>
          <Text variant="bodySmall" color="textSecondary" style={styles.cardText}>
            Complete design tokens, themed components, light/dark mode support.
          </Text>
        </Card>

        <Card style={styles.card}>
          <Text variant="h5">📝 Form Handling</Text>
          <Text variant="bodySmall" color="textSecondary" style={styles.cardText}>
            React Hook Form + Zod validation with pre-built form components.
          </Text>
        </Card>

        <Card style={styles.card}>
          <Text variant="h5">🧭 Navigation</Text>
          <Text variant="bodySmall" color="textSecondary" style={styles.cardText}>
            Expo Router with tabs, stacks, modals, and typed routes.
          </Text>
        </Card>

        <Card style={styles.card}>
          <Text variant="h5">💾 Storage</Text>
          <Text variant="bodySmall" color="textSecondary" style={styles.cardText}>
            AsyncStorage hooks with type safety and automatic sync.
          </Text>
        </Card>
      </View>

      {/* Links */}
      <View style={styles.section}>
        <Text variant="h4" style={styles.sectionTitle}>
          Examples
        </Text>

        <Link href="/(examples)/components" asChild>
          <Card pressable style={styles.linkCard}>
            <Text variant="body">📦 UI Components</Text>
            <Text color="textTertiary">→</Text>
          </Card>
        </Link>

        <Link href="/(examples)/forms" asChild>
          <Card pressable style={styles.linkCard}>
            <Text variant="body">📋 Form Examples</Text>
            <Text color="textTertiary">→</Text>
          </Card>
        </Link>

        <Link href="/details/123" asChild>
          <Card pressable style={styles.linkCard}>
            <Text variant="body">📄 Detail Screen</Text>
            <Text color="textTertiary">→</Text>
          </Card>
        </Link>

        <Link href="/(examples)/drawer" asChild>
          <Card pressable style={styles.linkCard}>
            <Text variant="body">🗂️ Drawer Navigation</Text>
            <Text color="textTertiary">→</Text>
          </Card>
        </Link>
      </View>

      {/* Footer */}
      <View style={styles.footer}>
        <Pressable onPress={() => Linking.openURL('https://github.com/markshenouda/VibeRN')}>
          <Text variant="bodySmall" color="textSecondary" style={styles.footerText}>
            Made with love for vibe coders
          </Text>
          <Text variant="caption" color="textTertiary" style={styles.footerText}>
            ⭐ Star us on GitHub if this helped you ship faster
          </Text>
        </Pressable>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    padding: 16,
  },
  header: {
    marginBottom: 24,
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    marginBottom: 12,
  },
  buttonRow: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 12,
  },
  flexButton: {
    flex: 1,
  },
  card: {
    marginBottom: 12,
  },
  cardText: {
    marginTop: 4,
  },
  linkCard: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  footer: {
    alignItems: 'center',
    paddingTop: 16,
  },
  footerText: {
    textAlign: 'center',
  },
});
