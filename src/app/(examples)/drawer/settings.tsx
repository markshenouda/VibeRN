/**
 * Drawer Settings Screen
 *
 * @description Settings screen within drawer navigation example
 *
 * @ai-guide
 * This is an example settings screen within the drawer navigator.
 *
 * CLEANUP: Remove this file when cleaning the project.
 */

import { View, ScrollView, StyleSheet } from 'react-native';
import { useTheme } from '@/design-system';
import { Text, Card, Icon, Switch } from '@/components/ui';
import { useState } from 'react';

interface SettingItem {
  id: string;
  title: string;
  description: string;
  icon: 'notifications' | 'moon' | 'lock-closed' | 'cloud' | 'language' | 'help-circle';
  type: 'toggle' | 'link';
}

const SETTINGS: SettingItem[] = [
  {
    id: 'notifications',
    title: 'Push Notifications',
    description: 'Receive push notifications for updates',
    icon: 'notifications',
    type: 'toggle',
  },
  {
    id: 'darkMode',
    title: 'Dark Mode',
    description: 'Use dark theme throughout the app',
    icon: 'moon',
    type: 'toggle',
  },
  {
    id: 'privacy',
    title: 'Privacy Settings',
    description: 'Manage your privacy preferences',
    icon: 'lock-closed',
    type: 'link',
  },
  {
    id: 'backup',
    title: 'Cloud Backup',
    description: 'Automatically backup your data',
    icon: 'cloud',
    type: 'toggle',
  },
  {
    id: 'language',
    title: 'Language',
    description: 'English (US)',
    icon: 'language',
    type: 'link',
  },
  {
    id: 'help',
    title: 'Help & Support',
    description: 'Get help with the app',
    icon: 'help-circle',
    type: 'link',
  },
];

export default function DrawerSettingsScreen() {
  const { theme, isDark, toggleTheme } = useTheme();
  const [settings, setSettings] = useState<Record<string, boolean>>({
    notifications: true,
    darkMode: isDark,
    backup: false,
  });

  const handleToggle = (id: string) => {
    if (id === 'darkMode') {
      toggleTheme();
    }
    setSettings((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const renderSetting = (item: SettingItem) => {
    const isToggle = item.type === 'toggle';
    const isOn = item.id === 'darkMode' ? isDark : settings[item.id];

    const content = (
      <View style={styles.settingContent}>
        <View style={[styles.iconContainer, { backgroundColor: theme.colors.surfaceSecondary }]}>
          <Icon name={item.icon} size="md" color="primary" />
        </View>
        <View style={styles.textContainer}>
          <Text variant="body">{item.title}</Text>
          <Text variant="caption" color="textSecondary">
            {item.description}
          </Text>
        </View>
        {isToggle ? (
          <Switch value={isOn} onValueChange={() => handleToggle(item.id)} />
        ) : (
          <Icon name="chevron-forward" size="md" color="textTertiary" />
        )}
      </View>
    );

    if (isToggle) {
      return (
        <Card key={item.id} style={styles.settingCard}>
          {content}
        </Card>
      );
    }

    return (
      <Card key={item.id} pressable style={styles.settingCard}>
        {content}
      </Card>
    );
  };

  return (
    <ScrollView
      style={[styles.container, { backgroundColor: theme.colors.background }]}
      contentContainerStyle={styles.content}
    >
      <View style={styles.header}>
        <Icon name="settings" size="xl" color="primary" />
        <Text variant="h4" style={styles.headerTitle}>
          Settings
        </Text>
      </View>

      <Text variant="labelSmall" color="textSecondary" style={styles.sectionLabel}>
        PREFERENCES
      </Text>
      {SETTINGS.slice(0, 2).map(renderSetting)}

      <Text variant="labelSmall" color="textSecondary" style={styles.sectionLabel}>
        ACCOUNT
      </Text>
      {SETTINGS.slice(2, 4).map(renderSetting)}

      <Text variant="labelSmall" color="textSecondary" style={styles.sectionLabel}>
        OTHER
      </Text>
      {SETTINGS.slice(4).map(renderSetting)}

      <View style={styles.footer}>
        <Text variant="caption" color="textTertiary" style={styles.version}>
          Version 1.0.0
        </Text>
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
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 24,
  },
  headerTitle: {
    marginLeft: 8,
  },
  sectionLabel: {
    marginTop: 16,
    marginBottom: 8,
    marginLeft: 4,
  },
  settingCard: {
    marginBottom: 8,
    padding: 12,
  },
  settingContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconContainer: {
    width: 40,
    height: 40,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  textContainer: {
    flex: 1,
    marginLeft: 12,
  },
  footer: {
    alignItems: 'center',
    marginTop: 32,
    paddingBottom: 16,
  },
  version: {
    textAlign: 'center',
  },
});
