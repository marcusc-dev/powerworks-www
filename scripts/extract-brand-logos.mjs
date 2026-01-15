import sharp from 'sharp';
import path from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const inputPath = path.join(__dirname, '../public/brand-logos.png');
const outputDir = path.join(__dirname, '../public/logos');

// Grid layout: 3 columns x 2 rows (1536x1024)
// Row 1: Range Rover, Rolls-Royce, Aston Martin
// Row 2: Mercedes, Mercedes (duplicate), Jaguar

const logos = [
  { name: 'rangerover', row: 0, col: 0 },
  { name: 'rollsroyce', row: 0, col: 1 },
  { name: 'astonmartin', row: 0, col: 2 },
  { name: 'mercedes', row: 1, col: 0 },
  // Skip duplicate mercedes at row 1, col 1
  { name: 'jaguar', row: 1, col: 2 },
];

async function extractLogos() {
  // Get image metadata
  const metadata = await sharp(inputPath).metadata();
  console.log(`Image dimensions: ${metadata.width}x${metadata.height}`);

  const cols = 3;
  const rows = 2;
  const cellWidth = Math.floor(metadata.width / cols);
  const cellHeight = Math.floor(metadata.height / rows);

  console.log(`Cell size: ${cellWidth}x${cellHeight}`);

  // Create output directory if it doesn't exist
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  }

  // Extract each logo
  for (const logo of logos) {
    const left = logo.col * cellWidth;
    const top = logo.row * cellHeight;

    const outputPath = path.join(outputDir, `${logo.name}.png`);

    await sharp(inputPath)
      .extract({
        left,
        top,
        width: cellWidth,
        height: cellHeight
      })
      .png()
      .toFile(outputPath);

    console.log(`Extracted: ${logo.name}.png`);
  }

  console.log('\nDone! Logos saved to public/logos/');
}

extractLogos().catch(console.error);
