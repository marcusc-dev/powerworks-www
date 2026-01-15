import sharp from 'sharp';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const inputPath = path.join(__dirname, '../public/brands-vehicles.jpg');
const outputDir = path.join(__dirname, '../public/vehicles');

// Grid layout: 3 columns x 3 rows
// Based on the image analysis:
// Row 1: Land Rover Defender, Range Rover Sport, Aston Martin
// Row 2: Bentley Continental, Porsche 911, Mercedes S-Class
// Row 3: Rolls Royce Phantom, VW Golf, Jaguar F-Type

const vehicles = [
  { name: 'land-rover', row: 0, col: 0 },
  { name: 'range-rover', row: 0, col: 1 },
  { name: 'aston-martin', row: 0, col: 2 },
  { name: 'bentley', row: 1, col: 0 },
  { name: 'porsche', row: 1, col: 1 },
  { name: 'mercedes', row: 1, col: 2 },
  { name: 'rolls-royce', row: 2, col: 0 },
  { name: 'volkswagen', row: 2, col: 1 },
  { name: 'jaguar', row: 2, col: 2 },
];

async function extractImages() {
  // Get image metadata
  const metadata = await sharp(inputPath).metadata();
  console.log(`Image dimensions: ${metadata.width}x${metadata.height}`);

  const cols = 3;
  const rows = 3;
  const cellWidth = Math.floor(metadata.width / cols);
  const cellHeight = Math.floor(metadata.height / rows);

  console.log(`Cell size: ${cellWidth}x${cellHeight}`);

  // Create output directory if it doesn't exist
  const fs = await import('fs');
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  }

  // Extract each vehicle
  for (const vehicle of vehicles) {
    const left = vehicle.col * cellWidth;
    const top = vehicle.row * cellHeight;

    const outputPath = path.join(outputDir, `${vehicle.name}.jpg`);

    await sharp(inputPath)
      .extract({
        left,
        top,
        width: cellWidth,
        height: cellHeight
      })
      .jpeg({ quality: 90 })
      .toFile(outputPath);

    console.log(`Extracted: ${vehicle.name}.jpg`);
  }

  console.log('\nDone! Images saved to public/vehicles/');
}

extractImages().catch(console.error);
