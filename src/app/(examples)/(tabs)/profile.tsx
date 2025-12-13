/**
 * Profile Screen
 *
 * @description Example profile/settings tab
 *
 * @ai-guide
 * This is an EXAMPLE screen demonstrating:
 * - Settings list pattern
 * - User profile header
 * - Toggle settings with Switch
 * - Navigation to sub-screens
 *
 * CLEANUP: Replace with your own profile screen.
 */

import { View, ScrollView, StyleSheet, Alert } from 'react-native';
import { useRouter } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useTheme } from '@/design-system';
import { Text, Avatar, Switch, Divider } from '@/components/ui';
import { ListItem, Header } from '@/components/patterns';

export default function ProfileScreen() {
  const { theme, toggleTheme, isDark, mode, setMode } = useTheme();
  const insets = useSafeAreaInsets();
  const router = useRouter();

  const handleLogout = () => {
    Alert.alert('Logout', 'Are you sure you want to logout?', [
      { text: 'Cancel', style: 'cancel' },
      {
        text: 'Logout',
        style: 'destructive',
        onPress: () => router.replace('/(examples)/(auth)/login'),
      },
    ]);
  };

  return (
    <ScrollView
      style={[styles.container, { backgroundColor: theme.colors.background }]}
      contentContainerStyle={{ paddingBottom: insets.bottom + 16 }}
    >
      <Header title="Profile" large style={{ paddingTop: insets.top }} />

      {/* Profile Header */}
      <View style={styles.profileSection}>
        <Avatar name="John Doe" size="xl" />
        <View style={styles.profileInfo}>
          <Text variant="h3">John Doe</Text>
          <Text variant="body" color="textSecondary">
            john.doe@example.com
          </Text>
        </View>
      </View>

      <Divider spacing={16} />

      {/* Account Section */}
      <View style={styles.section}>
        <Text variant="label" color="textSecondary" style={styles.sectionHeader}>
          ACCOUNT
        </Text>

        <ListItem
          title="Edit Profile"
          leftElement={<Text>👤</Text>}
          showChevron
          onPress={() => router.push('/(examples)/forms')}
        />

        <ListItem
          title="Notifications"
          leftElement={<Text>🔔</Text>}
          showChevron
          onPress={() => Alert.alert('Notifications', 'Coming soon!')}
        />

        <ListItem
          title="Privacy"
          leftElement={<Text>🔒</Text>}
          showChevron
          onPress={() => Alert.alert('Privacy', 'Coming soon!')}
        />
      </View>

      {/* Appearance Section */}
      <View style={styles.section}>
        <Text variant="label" color="textSecondary" style={styles.sectionHeader}>
          APPEARANCE
        </Text>

        <ListItem
          title="Dark Mode"
          subtitle={`Currently: ${mode === 'system' ? 'System' : mode === 'dark' ? 'Dark' : 'Light'}`}
          leftElement={<Text>{isDark ? '🌙' : '☀️'}</Text>}
          rightElement={
            <Switch value={isDark} onValueChange={() => setMode(isDark ? 'light' : 'dark')} />
          }
        />

        <ListItem
          title="Use System Theme"
          leftElement={<Text>📱</Text>}
          rightElement={
            <Switch
              value={mode === 'system'}
              onValueChange={(value) => setMode(value ? 'system' : isDark ? 'dark' : 'light')}
            />
          }
        />
      </View>

      {/* Examples Section - REMOVE WHEN CLEANING */}
      <View style={styles.section}>
        <Text variant="label" color="textSecondary" style={styles.sectionHeader}>
          EXAMPLES
        </Text>

        <ListItem
          title="UI Components"
          leftElement={<Text>📦</Text>}
          showChevron
          onPress={() => router.push('/(examples)/components')}
        />

        <ListItem
          title="Form Examples"
          leftElement={<Text>📋</Text>}
          showChevron
          onPress={() => router.push('/(examples)/forms')}
        />
      </View>

      {/* Support Section */}
      <View style={styles.section}>
        <Text variant="label" color="textSecondary" style={styles.sectionHeader}>
          SUPPORT
        </Text>

        <ListItem
          title="Help Center"
          leftElement={<Text>❓</Text>}
          showChevron
          onPress={() => Alert.alert('Help', 'Coming soon!')}
        />

        <ListItem
          title="Send Feedback"
          leftElement={<Text>💬</Text>}
          showChevron
          onPress={() => Alert.alert('Feedback', 'Coming soon!')}
        />

        <ListItem
          title="About"
          leftElement={<Text>ℹ️</Text>}
          subtitle="Version 1.0.0"
          showChevron={false}
        />
      </View>

      {/* Logout */}
      <View style={styles.section}>
        <ListItem
          title="Logout"
          leftElement={<Text>🚪</Text>}
          onPress={handleLogout}
          showBorder={false}
        />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  profileSection: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    gap: 16,
  },
  profileInfo: {
    flex: 1,
  },
  section: {
    marginTop: 8,
  },
  sectionHeader: {
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
});
