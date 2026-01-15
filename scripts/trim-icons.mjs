import sharp from 'sharp';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const iconsDir = path.join(__dirname, '..', 'public', 'Icons');

async function trimIcon(filename) {
  const inputPath = path.join(iconsDir, filename);
  const outputPath = path.join(iconsDir, filename);

  try {
    // Read the image and trim whitespace
    await sharp(inputPath)
      .trim({
        background: '#ffffff',
        threshold: 50
      })
      .toBuffer()
      .then(async (buffer) => {
        // Write back to the same file
        await sharp(buffer)
          .png({ quality: 90 })
          .toFile(outputPath + '.tmp');

        // Replace original with trimmed version
        fs.renameSync(outputPath + '.tmp', outputPath);
        console.log(`✓ Trimmed: ${filename}`);
      });
  } catch (err) {
    console.error(`✗ Error trimming ${filename}:`, err.message);
  }
}

async function trimAllIcons() {
  const files = fs.readdirSync(iconsDir).filter(f => f.endsWith('.png'));

  console.log(`Found ${files.length} PNG files to trim...\n`);

  for (const file of files) {
    await trimIcon(file);
  }

  console.log('\nDone!');
}

trimAllIcons();
