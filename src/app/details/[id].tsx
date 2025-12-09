/**
 * Detail Screen
 *
 * @description Example dynamic route screen
 *
 * @ai-guide
 * This is an EXAMPLE screen demonstrating:
 * - Dynamic routes with [id] parameter
 * - useLocalSearchParams hook
 * - Detail view pattern
 *
 * CLEANUP: Keep this pattern but modify for your needs.
 */

import { View, ScrollView, StyleSheet } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useTheme } from '@/design-system';
import { Text, Button, Card, Badge, Divider } from '@/components/ui';
import { Header } from '@/components/patterns';

export default function DetailScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const { theme } = useTheme();
  const insets = useSafeAreaInsets();
  const router = useRouter();

  return (
    <ScrollView
      style={[styles.container, { backgroundColor: theme.colors.background }]}
      contentContainerStyle={{ paddingBottom: insets.bottom + 32 }}
    >
      <Header
        title={`Item ${id}`}
        showBack
        onBack={() => router.back()}
        style={{ paddingTop: insets.top }}
      />

      <View style={styles.content}>
        {/* Hero Section */}
        <Card variant="filled" padding="lg" style={styles.hero}>
          <Badge color="primary" style={styles.badge}>
            Detail View
          </Badge>
          <Text variant="h2" style={styles.title}>
            Item Details
          </Text>
          <Text variant="body" color="textSecondary">
            This is a dynamic route example. The ID from the URL is: {id}
          </Text>
        </Card>

        {/* Info Section */}
        <View style={styles.section}>
          <Text variant="h4" style={styles.sectionTitle}>
            Information
          </Text>

          <Card>
            <InfoRow label="ID" value={id || 'N/A'} />
            <Divider />
            <InfoRow label="Type" value="Example Item" />
            <Divider />
            <InfoRow label="Status" value="Active" />
            <Divider />
            <InfoRow label="Created" value="Dec 9, 2024" />
          </Card>
        </View>

        {/* Description Section */}
        <View style={styles.section}>
          <Text variant="h4" style={styles.sectionTitle}>
            Description
          </Text>

          <Card>
            <Text variant="body" color="textSecondary">
              This is an example detail screen that demonstrates how to use dynamic routes in Expo
              Router. The [id] in the filename creates a dynamic segment that can be accessed via
              useLocalSearchParams.
            </Text>
          </Card>
        </View>

        {/* Actions */}
        <View style={styles.actions}>
          <Button variant="outline" fullWidth onPress={() => router.back()}>
            Go Back
          </Button>
          <Button fullWidth onPress={() => router.push('/(tabs)')}>
            Go Home
          </Button>
        </View>
      </View>
    </ScrollView>
  );
}

function InfoRow({ label, value }: { label: string; value: string }) {
  return (
    <View style={styles.infoRow}>
      <Text variant="body" color="textSecondary">
        {label}
      </Text>
      <Text variant="body">{value}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    padding: 16,
  },
  hero: {
    marginBottom: 24,
  },
  badge: {
    marginBottom: 12,
  },
  title: {
    marginBottom: 8,
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    marginBottom: 12,
  },
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 12,
    paddingHorizontal: 16,
  },
  actions: {
    gap: 12,
  },
});
