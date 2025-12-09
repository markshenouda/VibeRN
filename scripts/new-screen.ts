/**
 * New Screen Generator Script
 *
 * @description Scaffolds a new screen with boilerplate code
 *
 * @ai-guide
 * This script creates a new screen file with:
 * - Proper imports
 * - Basic layout with safe area
 * - Theme integration
 * - TypeScript types
 *
 * Usage:
 * ```bash
 * npm run new:screen -- --name=settings --path=(tabs)
 * npm run new:screen -- --name=product-detail --path=products
 * ```
 *
 * Arguments:
 * --name: Screen name (will be converted to proper file name)
 * --path: Path within src/app/ (optional, defaults to root)
 */

import * as fs from 'fs';
import * as path from 'path';

const ROOT_DIR = path.resolve(__dirname, '..');
const APP_DIR = path.join(ROOT_DIR, 'src', 'app');

// Parse command line arguments
function parseArgs(): { name: string; screenPath: string } {
  const args = process.argv.slice(2);
  let name = '';
  let screenPath = '';

  for (const arg of args) {
    if (arg.startsWith('--name=')) {
      name = arg.replace('--name=', '');
    } else if (arg.startsWith('--path=')) {
      screenPath = arg.replace('--path=', '');
    }
  }

  return { name, screenPath };
}

// Convert name to various formats
function formatName(name: string) {
  // kebab-case to PascalCase
  const pascal = name
    .split('-')
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join('');

  // kebab-case file name
  const kebab = name.toLowerCase().replace(/\s+/g, '-');

  // Title case for display
  const title = name
    .split('-')
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(' ');

  return { pascal, kebab, title };
}

// Generate screen template
function generateScreenTemplate(name: { pascal: string; kebab: string; title: string }): string {
  return `/**
 * ${name.title} Screen
 *
 * @description [Add description]
 */

import { View, ScrollView, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useTheme } from '@/design-system';
import { Text, Button } from '@/components/ui';
import { Header } from '@/components/patterns';

export default function ${name.pascal}Screen() {
  const { theme } = useTheme();
  const insets = useSafeAreaInsets();
  const router = useRouter();

  return (
    <View style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <Header
        title="${name.title}"
        showBack
        onBack={() => router.back()}
        style={{ paddingTop: insets.top }}
      />

      <ScrollView
        style={styles.content}
        contentContainerStyle={{ paddingBottom: insets.bottom + 16 }}
      >
        <Text variant="h2">${name.title}</Text>
        <Text variant="body" color="textSecondary" style={styles.description}>
          Add your content here
        </Text>

        {/* Add your content here */}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    flex: 1,
    padding: 16,
  },
  description: {
    marginTop: 8,
  },
});
`;
}

async function main() {
  console.log('\n📄 New Screen Generator\n');

  const { name, screenPath } = parseArgs();

  if (!name) {
    console.log('❌ Please provide a screen name\n');
    console.log('Usage:');
    console.log('  npm run new:screen -- --name=my-screen');
    console.log('  npm run new:screen -- --name=my-screen --path=(tabs)\n');
    process.exit(1);
  }

  const formatted = formatName(name);
  const targetDir = screenPath ? path.join(APP_DIR, screenPath) : APP_DIR;
  const targetFile = path.join(targetDir, `${formatted.kebab}.tsx`);

  console.log(`Creating screen: ${formatted.title}`);
  console.log(`File: ${path.relative(ROOT_DIR, targetFile)}\n`);

  // Check if directory exists
  if (!fs.existsSync(targetDir)) {
    console.log(`Creating directory: ${path.relative(ROOT_DIR, targetDir)}`);
    fs.mkdirSync(targetDir, { recursive: true });
  }

  // Check if file already exists
  if (fs.existsSync(targetFile)) {
    console.log(`❌ File already exists: ${path.relative(ROOT_DIR, targetFile)}`);
    process.exit(1);
  }

  // Generate and write file
  const content = generateScreenTemplate(formatted);
  fs.writeFileSync(targetFile, content);

  console.log(`✅ Created: ${path.relative(ROOT_DIR, targetFile)}\n`);
  console.log('Next steps:');
  console.log(`  1. Open ${path.relative(ROOT_DIR, targetFile)}`);
  console.log('  2. Add your screen content');
  if (screenPath) {
    console.log(`  3. The screen is accessible at: /${screenPath}/${formatted.kebab}`);
  } else {
    console.log(`  3. The screen is accessible at: /${formatted.kebab}`);
  }
  console.log('');
}

main().catch(console.error);
