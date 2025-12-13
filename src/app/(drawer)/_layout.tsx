/**
 * Drawer Layout
 *
 * @description Example drawer navigation layout
 *
 * @ai-guide
 * This layout demonstrates drawer navigation with Expo Router.
 * It wraps child screens in a drawer navigator.
 *
 * Key features:
 * - Custom drawer content
 * - Themed drawer styling
 * - Icon support for drawer items
 *
 * CLEANUP: Remove this entire folder when cleaning the project.
 * The clean-project script will remove all files in (drawer)/.
 */

import { Button, Icon, Text } from '@/components/ui';
import { useTheme } from '@/design-system';
import { DrawerContentScrollView, DrawerItemList } from '@react-navigation/drawer';
import { useRouter } from 'expo-router';
import { Drawer } from 'expo-router/drawer';
import { Pressable, StyleSheet, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

/**
 * Custom Drawer Content
 *
 * Renders custom header and footer in the drawer.
 */
function CustomDrawerContent(props: any) {
  const { theme, toggleTheme, isDark } = useTheme();
  const insets = useSafeAreaInsets();
  const router = useRouter();

  return (
    <View style={[styles.drawerContainer, { backgroundColor: theme.colors.background }]}>
      {/* Drawer Header */}
      <View
        style={[
          styles.drawerHeader,
          {
            paddingTop: insets.top + 16,
            backgroundColor: theme.colors.primary,
          },
        ]}
      >
        <View style={styles.headerIcon}>
          <Icon name="menu" size="xl" color="textInverse" />
        </View>
        <Text variant="h4" style={{ color: theme.colors.textInverse }}>
          Drawer Example
        </Text>
        <Text variant="bodySmall" style={{ color: theme.colors.textInverse, opacity: 0.8 }}>
          Navigation made simple
        </Text>
      </View>

      {/* Drawer Items */}
      <DrawerContentScrollView {...props} contentContainerStyle={styles.drawerContent}>
        <DrawerItemList {...props} />
      </DrawerContentScrollView>

      {/* Drawer Footer */}
      <View
        style={[
          styles.drawerFooter,
          {
            paddingBottom: insets.bottom + 16,
            borderTopColor: theme.colors.border,
          },
        ]}
      >
        <Pressable style={styles.footerButton} onPress={toggleTheme}>
          <Icon name={isDark ? 'sunny' : 'moon'} size="md" color="textSecondary" />
          <Text variant="bodySmall" color="textSecondary" style={styles.footerButtonText}>
            {isDark ? 'Light Mode' : 'Dark Mode'}
          </Text>
        </Pressable>

        <Button
          variant="ghost"
          size="sm"
          onPress={() => router.dismissAll()}
          leftIcon={<Icon name="arrow-back" size="sm" color="primary" />}
        >
          Exit Drawer
        </Button>
      </View>
    </View>
  );
}

export default function DrawerLayout() {
  const { theme } = useTheme();

  return (
    <Drawer
      drawerContent={(props) => <CustomDrawerContent {...props} />}
      screenOptions={{
        headerShown: true,
        headerStyle: {
          backgroundColor: theme.colors.surface,
        },
        headerTintColor: theme.colors.textPrimary,
        headerTitleStyle: {
          fontWeight: '600',
        },
        drawerActiveTintColor: theme.colors.primary,
        drawerInactiveTintColor: theme.colors.textSecondary,
        drawerActiveBackgroundColor: theme.colors.primaryLight,
        drawerLabelStyle: {
          marginLeft: 0,
          fontWeight: '500',
        },
        drawerStyle: {
          backgroundColor: theme.colors.background,
          width: 280,
        },
      }}
    >
      <Drawer.Screen
        name="index"
        options={{
          title: 'Home',
          drawerLabel: 'Home',
          drawerIcon: ({ color, size }) => <Icon name="home" size={size} color={color} />,
        }}
      />
      <Drawer.Screen
        name="inbox"
        options={{
          title: 'Inbox',
          drawerLabel: 'Inbox',
          drawerIcon: ({ color, size }) => <Icon name="mail" size={size} color={color} />,
        }}
      />
      <Drawer.Screen
        name="favorites"
        options={{
          title: 'Favorites',
          drawerLabel: 'Favorites',
          drawerIcon: ({ color, size }) => <Icon name="heart" size={size} color={color} />,
        }}
      />
      <Drawer.Screen
        name="settings"
        options={{
          title: 'Settings',
          drawerLabel: 'Settings',
          drawerIcon: ({ color, size }) => <Icon name="settings" size={size} color={color} />,
        }}
      />
    </Drawer>
  );
}

const styles = StyleSheet.create({
  drawerContainer: {
    flex: 1,
  },
  drawerHeader: {
    padding: 16,
    paddingBottom: 24,
  },
  headerIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: 'rgba(255,255,255,0.2)',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
  },
  drawerContent: {
    paddingTop: 8,
  },
  drawerFooter: {
    padding: 16,
    borderTopWidth: 1,
    gap: 12,
  },
  footerButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 8,
  },
  footerButtonText: {
    marginLeft: 12,
  },
});
