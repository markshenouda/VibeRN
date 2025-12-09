/**
 * Generate App Icons Script
 *
 * @description Generates all required app icon sizes from a source image
 *
 * @ai-guide
 * This script generates:
 * - iOS icon (1024x1024)
 * - Android adaptive icon foreground (1024x1024)
 * - Favicon (48x48)
 *
 * Usage:
 * 1. Place your source icon at assets/images/icon-source.png (1024x1024 recommended)
 * 2. Run: npm run generate:icons
 *
 * Requirements:
 * - sharp package (included in devDependencies)
 * - Source image should be at least 1024x1024
 */

import * as fs from 'fs';
import * as path from 'path';
import sharp from 'sharp';

const ROOT_DIR = path.resolve(__dirname, '..');
const ASSETS_DIR = path.join(ROOT_DIR, 'assets', 'images');

// Source file
const SOURCE_FILE = path.join(ASSETS_DIR, 'icon-source.png');

// Output configurations
const ICON_CONFIGS = [
  { name: 'icon.png', size: 1024 },
  { name: 'adaptive-icon.png', size: 1024 },
  { name: 'favicon.png', size: 48 },
];

async function generateIcons() {
  console.log('\n🎨 Icon Generator\n');

  // Check if source exists
  if (!fs.existsSync(SOURCE_FILE)) {
    console.log(`❌ Source file not found: ${path.relative(ROOT_DIR, SOURCE_FILE)}`);
    console.log('\nPlease create a source icon:');
    console.log(`  1. Create a 1024x1024 PNG image`);
    console.log(`  2. Save it as: assets/images/icon-source.png`);
    console.log(`  3. Run this script again\n`);
    process.exit(1);
  }

  console.log(`📁 Source: ${path.relative(ROOT_DIR, SOURCE_FILE)}\n`);
  console.log('Generating icons:');

  for (const config of ICON_CONFIGS) {
    const outputPath = path.join(ASSETS_DIR, config.name);

    try {
      await sharp(SOURCE_FILE)
        .resize(config.size, config.size, {
          fit: 'contain',
          background: { r: 255, g: 255, b: 255, alpha: 0 },
        })
        .png()
        .toFile(outputPath);

      console.log(`  ✅ ${config.name} (${config.size}x${config.size})`);
    } catch (error) {
      console.log(`  ❌ ${config.name} - Error: ${error}`);
    }
  }

  console.log('\n✅ Icon generation complete!\n');
  console.log('Generated files:');
  ICON_CONFIGS.forEach((config) => {
    console.log(`  - assets/images/${config.name}`);
  });
  console.log('');
}

generateIcons().catch(console.error);
