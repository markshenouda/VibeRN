/**
 * Clean Project Script
 *
 * @description Removes example and auth screens to prepare project for production
 *
 * @ai-guide
 * This script removes:
 * - Example screens in src/app/(examples)/
 * - Auth screens in src/app/(auth)/
 * - Example tab content (but keeps tab structure)
 * - Demo data and mock content
 *
 * Usage:
 * ```bash
 * npm run clean
 * ```
 *
 * What it preserves:
 * - Design system and components
 * - Form components and validation
 * - Hooks and utilities
 * - Navigation structure (layouts)
 *
 * After running:
 * 1. Update tab screens with your content
 * 2. Add your own auth solution if needed
 * 3. Update app.json with your app details
 */

import * as fs from 'fs';
import * as path from 'path';
import * as readline from 'readline';

const ROOT_DIR = path.resolve(__dirname, '..');
const SRC_DIR = path.join(ROOT_DIR, 'src');
const APP_DIR = path.join(SRC_DIR, 'app');

// Files/folders to remove
const ITEMS_TO_REMOVE = [
  // Example screens folder
  path.join(APP_DIR, '(examples)'),

  // Auth screens folder
  path.join(APP_DIR, '(auth)'),

  // Plan file
  path.join(ROOT_DIR, 'PLAN.md'),
];

// Files to reset (replace with minimal content)
const FILES_TO_RESET: Record<string, string> = {
  // Home tab - minimal version
  [path.join(APP_DIR, '(tabs)/index.tsx')]: `/**
 * Home Screen
 *
 * @description Main home tab - customize this for your app
 */

import { View, StyleSheet } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useTheme } from '@/design-system';
import { Text } from '@/components/ui';

export default function HomeScreen() {
  const { theme } = useTheme();
  const insets = useSafeAreaInsets();

  return (
    <View
      style={[
        styles.container,
        {
          backgroundColor: theme.colors.background,
          paddingTop: insets.top,
        },
      ]}
    >
      <Text variant="h1">Home</Text>
      <Text variant="body" color="textSecondary">
        Start building your app here
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
});
`,

  // Explore tab - minimal version
  [path.join(APP_DIR, '(tabs)/explore.tsx')]: `/**
 * Explore Screen
 *
 * @description Explore tab - customize this for your app
 */

import { View, StyleSheet } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useTheme } from '@/design-system';
import { Text } from '@/components/ui';

export default function ExploreScreen() {
  const { theme } = useTheme();
  const insets = useSafeAreaInsets();

  return (
    <View
      style={[
        styles.container,
        {
          backgroundColor: theme.colors.background,
          paddingTop: insets.top,
        },
      ]}
    >
      <Text variant="h1">Explore</Text>
      <Text variant="body" color="textSecondary">
        Add your explore content here
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
});
`,

  // Profile tab - minimal version
  [path.join(APP_DIR, '(tabs)/profile.tsx')]: `/**
 * Profile Screen
 *
 * @description Profile tab - customize this for your app
 */

import { View, StyleSheet } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useTheme } from '@/design-system';
import { Text, Button } from '@/components/ui';

export default function ProfileScreen() {
  const { theme, toggleTheme, isDark } = useTheme();
  const insets = useSafeAreaInsets();

  return (
    <View
      style={[
        styles.container,
        {
          backgroundColor: theme.colors.background,
          paddingTop: insets.top,
        },
      ]}
    >
      <Text variant="h1">Profile</Text>
      <Text variant="body" color="textSecondary">
        Add your profile content here
      </Text>

      <Button onPress={toggleTheme} style={styles.themeButton}>
        {isDark ? '☀️ Light Mode' : '🌙 Dark Mode'}
      </Button>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  themeButton: {
    marginTop: 24,
  },
});
`,
};

// Update root layout to remove examples and auth references
const ROOT_LAYOUT_UPDATE = {
  file: path.join(APP_DIR, '_layout.tsx'),
  remove: [
    // Remove examples screen registration
    `        {/* Example screens - REMOVE THESE WHEN CLEANING PROJECT */}
        <Stack.Screen name="(examples)" />`,
    // Remove auth screen registration
    `        {/* Auth screens - REMOVE WHEN CLEANING PROJECT */}
        <Stack.Screen
          name="(auth)"
          options={{
            presentation: 'modal',
            animation: 'slide_from_bottom',
          }}
        />`,
  ],
};

async function confirm(message: string): Promise<boolean> {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });

  return new Promise((resolve) => {
    rl.question(`${message} (y/N): `, (answer) => {
      rl.close();
      resolve(answer.toLowerCase() === 'y');
    });
  });
}

function removeItem(itemPath: string): void {
  if (!fs.existsSync(itemPath)) {
    console.log(`  ⏭️  Skipping (not found): ${path.relative(ROOT_DIR, itemPath)}`);
    return;
  }

  const stat = fs.statSync(itemPath);

  if (stat.isDirectory()) {
    fs.rmSync(itemPath, { recursive: true });
    console.log(`  🗑️  Removed directory: ${path.relative(ROOT_DIR, itemPath)}`);
  } else {
    fs.unlinkSync(itemPath);
    console.log(`  🗑️  Removed file: ${path.relative(ROOT_DIR, itemPath)}`);
  }
}

function resetFile(filePath: string, content: string): void {
  if (!fs.existsSync(filePath)) {
    console.log(`  ⏭️  Skipping (not found): ${path.relative(ROOT_DIR, filePath)}`);
    return;
  }

  fs.writeFileSync(filePath, content);
  console.log(`  📝 Reset file: ${path.relative(ROOT_DIR, filePath)}`);
}

function updateRootLayout(): void {
  const { file, remove } = ROOT_LAYOUT_UPDATE;

  if (!fs.existsSync(file)) {
    console.log(`  ⏭️  Skipping root layout update (not found)`);
    return;
  }

  let content = fs.readFileSync(file, 'utf-8');

  for (const text of remove) {
    content = content.replace(text, '');
  }

  fs.writeFileSync(file, content);
  console.log(`  📝 Updated root layout`);
}

async function main() {
  console.log('\n🧹 VibeRN Project Cleaner\n');
  console.log('This will remove example screens and reset tab content.\n');

  console.log('Items to remove:');
  ITEMS_TO_REMOVE.forEach((item) => {
    console.log(`  - ${path.relative(ROOT_DIR, item)}`);
  });

  console.log('\nFiles to reset:');
  Object.keys(FILES_TO_RESET).forEach((file) => {
    console.log(`  - ${path.relative(ROOT_DIR, file)}`);
  });

  console.log('');

  const confirmed = await confirm('Continue with cleanup?');

  if (!confirmed) {
    console.log('\n❌ Cleanup cancelled.\n');
    process.exit(0);
  }

  console.log('\n🚀 Starting cleanup...\n');

  // Remove items
  console.log('Removing example files:');
  ITEMS_TO_REMOVE.forEach(removeItem);

  // Reset files
  console.log('\nResetting files:');
  Object.entries(FILES_TO_RESET).forEach(([file, content]) => {
    resetFile(file, content);
  });

  // Update root layout
  console.log('\nUpdating navigation:');
  updateRootLayout();

  console.log('\n✅ Cleanup complete!\n');
  console.log('Next steps:');
  console.log('  1. Update app.json with your app name and details');
  console.log('  2. Customize the tab screens for your app');
  console.log('  3. Update auth screens with your authentication logic');
  console.log('  4. Run: npm run dev\n');
}

main().catch(console.error);
