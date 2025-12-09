/**
 * Generate Splash Screen Script
 *
 * @description Generates splash screen image from a source image
 *
 * @ai-guide
 * This script generates:
 * - Splash screen image (optimized for various screen sizes)
 *
 * Usage:
 * 1. Place your source logo at assets/images/splash-source.png
 * 2. Run: npm run generate:splash
 *
 * Requirements:
 * - sharp package (included in devDependencies)
 * - Source image should be your logo (recommended min 512x512)
 */

import * as fs from 'fs';
import * as path from 'path';
import sharp from 'sharp';

const ROOT_DIR = path.resolve(__dirname, '..');
const ASSETS_DIR = path.join(ROOT_DIR, 'assets', 'images');

// Source file
const SOURCE_FILE = path.join(ASSETS_DIR, 'splash-source.png');

// Output configuration
const OUTPUT_FILE = path.join(ASSETS_DIR, 'splash.png');
const OUTPUT_SIZE = { width: 1284, height: 2778 }; // iPhone 14 Pro Max
const LOGO_SIZE = 512; // Logo size in the center
const BACKGROUND_COLOR = '#6366f1'; // Primary color

async function generateSplash() {
  console.log('\n🖼️  Splash Screen Generator\n');

  // Check if source exists
  if (!fs.existsSync(SOURCE_FILE)) {
    console.log(`❌ Source file not found: ${path.relative(ROOT_DIR, SOURCE_FILE)}`);
    console.log('\nPlease create a source image:');
    console.log(`  1. Create a logo image (512x512 recommended)`);
    console.log(`  2. Save it as: assets/images/splash-source.png`);
    console.log(`  3. Run this script again\n`);

    // Create a simple placeholder
    console.log('Creating placeholder splash screen...\n');

    await sharp({
      create: {
        width: OUTPUT_SIZE.width,
        height: OUTPUT_SIZE.height,
        channels: 4,
        background: BACKGROUND_COLOR,
      },
    })
      .png()
      .toFile(OUTPUT_FILE);

    console.log(`  ✅ Created placeholder: ${path.relative(ROOT_DIR, OUTPUT_FILE)}\n`);
    return;
  }

  console.log(`📁 Source: ${path.relative(ROOT_DIR, SOURCE_FILE)}\n`);
  console.log('Generating splash screen...');

  try {
    // Resize logo
    const logo = await sharp(SOURCE_FILE)
      .resize(LOGO_SIZE, LOGO_SIZE, {
        fit: 'contain',
        background: { r: 0, g: 0, b: 0, alpha: 0 },
      })
      .toBuffer();

    // Create splash with centered logo
    await sharp({
      create: {
        width: OUTPUT_SIZE.width,
        height: OUTPUT_SIZE.height,
        channels: 4,
        background: BACKGROUND_COLOR,
      },
    })
      .composite([
        {
          input: logo,
          gravity: 'center',
        },
      ])
      .png()
      .toFile(OUTPUT_FILE);

    console.log(`  ✅ ${path.relative(ROOT_DIR, OUTPUT_FILE)}`);
    console.log(`     Size: ${OUTPUT_SIZE.width}x${OUTPUT_SIZE.height}`);
    console.log(`     Logo: ${LOGO_SIZE}x${LOGO_SIZE} (centered)`);
    console.log(`     Background: ${BACKGROUND_COLOR}`);
  } catch (error) {
    console.log(`  ❌ Error: ${error}`);
    process.exit(1);
  }

  console.log('\n✅ Splash screen generation complete!\n');
  console.log('To change the background color:');
  console.log('  1. Edit scripts/generate-splash.ts');
  console.log('  2. Update BACKGROUND_COLOR constant');
  console.log('  3. Also update app.json splash.backgroundColor\n');
}

generateSplash().catch(console.error);
