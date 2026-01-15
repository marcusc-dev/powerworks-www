import sharp from 'sharp';
import path from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const inputImage = path.join(__dirname, '../public/brand-logos2.png');
const outputDir = path.join(__dirname, '../public/logos');

// Ensure output directory exists
if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
}

// Image is 1536x1024, 3x2 grid
const cols = 3;
const rows = 2;
const cellWidth = 1536 / cols;  // 512
const cellHeight = 1024 / rows; // 512

// Logo positions based on the image:
// Row 0: Ford, Chevrolet, Chevrolet (skip duplicate)
// Row 1: Toyota, Nissan, BMW
const logos = [
  { name: 'ford', row: 0, col: 0 },
  { name: 'chevrolet', row: 0, col: 1 },
  // Skip row 0 col 2 (duplicate chevrolet)
  { name: 'toyota', row: 1, col: 0 },
  { name: 'nissan', row: 1, col: 1 },
  { name: 'bmw', row: 1, col: 2 },
];

async function extractLogos() {
  console.log('Extracting logos from brand-logos2.png...');
  console.log(`Cell size: ${cellWidth}x${cellHeight}`);

  for (const logo of logos) {
    const left = logo.col * cellWidth;
    const top = logo.row * cellHeight;

    const outputPath = path.join(outputDir, `${logo.name}.png`);

    await sharp(inputImage)
      .extract({
        left: Math.round(left),
        top: Math.round(top),
        width: Math.round(cellWidth),
        height: Math.round(cellHeight)
      })
      .toFile(outputPath);

    console.log(`Extracted: ${logo.name}.png (${left}, ${top})`);
  }

  console.log('\nDone! Logos saved to public/logos/');
}

extractLogos().catch(console.error);
