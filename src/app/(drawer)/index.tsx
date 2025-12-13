/**
 * Drawer Home Screen
 *
 * @description Home screen within drawer navigation example
 *
 * @ai-guide
 * This is an example screen within the drawer navigator.
 * It demonstrates content layout with drawer navigation.
 *
 * CLEANUP: Remove this file when cleaning the project.
 */

import { View, ScrollView, StyleSheet } from 'react-native';
import { useTheme } from '@/design-system';
import { Text, Card, Icon } from '@/components/ui';

export default function DrawerHomeScreen() {
  const { theme } = useTheme();

  return (
    <ScrollView
      style={[styles.container, { backgroundColor: theme.colors.background }]}
      contentContainerStyle={styles.content}
    >
      <View style={styles.header}>
        <Icon name="home" size="xl" color="primary" />
        <Text variant="h2" style={styles.title}>
          Welcome Home
        </Text>
        <Text variant="body" color="textSecondary" style={styles.subtitle}>
          This is the home screen of the drawer navigator. Swipe from the left edge or tap the menu
          icon to open the drawer.
        </Text>
      </View>

      <Card style={styles.card}>
        <Text variant="h5">Quick Stats</Text>
        <View style={styles.statsGrid}>
          <View style={styles.stat}>
            <Text variant="h3" color="primary">
              24
            </Text>
            <Text variant="caption" color="textSecondary">
              Messages
            </Text>
          </View>
          <View style={styles.stat}>
            <Text variant="h3" color="success">
              12
            </Text>
            <Text variant="caption" color="textSecondary">
              Favorites
            </Text>
          </View>
          <View style={styles.stat}>
            <Text variant="h3" color="warning">
              3
            </Text>
            <Text variant="caption" color="textSecondary">
              Pending
            </Text>
          </View>
        </View>
      </Card>

      <Card style={styles.card}>
        <Text variant="h5">Recent Activity</Text>
        <View style={styles.activityList}>
          <View style={styles.activityItem}>
            <Icon name="mail-outline" size="md" color="primary" />
            <Text variant="body" style={styles.activityText}>
              New message received
            </Text>
          </View>
          <View style={styles.activityItem}>
            <Icon name="heart-outline" size="md" color="error" />
            <Text variant="body" style={styles.activityText}>
              Item added to favorites
            </Text>
          </View>
          <View style={styles.activityItem}>
            <Icon name="settings-outline" size="md" color="textSecondary" />
            <Text variant="body" style={styles.activityText}>
              Settings updated
            </Text>
          </View>
        </View>
      </Card>
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
    alignItems: 'center',
    marginBottom: 24,
    paddingTop: 16,
  },
  title: {
    marginTop: 12,
    textAlign: 'center',
  },
  subtitle: {
    marginTop: 8,
    textAlign: 'center',
  },
  card: {
    marginBottom: 16,
  },
  statsGrid: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 16,
  },
  stat: {
    alignItems: 'center',
  },
  activityList: {
    marginTop: 12,
    gap: 12,
  },
  activityItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  activityText: {
    marginLeft: 12,
  },
});
