import sharp from 'sharp';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const publicDir = path.join(__dirname, '..', 'public');
const sourceImage = path.join(publicDir, 'services-montage.jpg');
const outputDir = path.join(publicDir, 'services');

// Get image dimensions first
async function extractServiceImages() {
  const metadata = await sharp(sourceImage).metadata();
  console.log(`Source image: ${metadata.width}x${metadata.height}`);

  // The image is NOT a perfect grid - icons are naturally spaced
  // Manual coordinates based on visual inspection of the montage
  // Format: { left, top, width, height, slug }
  // Image appears to be 1024x1024 based on typical generation

  const w = metadata.width;
  const h = metadata.height;

  // Calculate percentages for flexible extraction
  // Row 1: Tools, AC compressor, Oil change, Multimeter
  // Row 2: Engine, (skip jack), Center engine, Brake disc
  // Row 3: Shock absorber, (skip transmission), Battery, Tyre
  // Row 4: Inspection, (skip tow truck), Timing belt, Clipboard

  const serviceMap = [
    // Row 1 - approximately top 25% of image
    {
      slug: 'car-service-dubai',
      left: Math.floor(w * 0.0),
      top: Math.floor(h * 0.0),
      width: Math.floor(w * 0.22),
      height: Math.floor(h * 0.22)
    },
    {
      slug: 'ac-repair-dubai',
      left: Math.floor(w * 0.20),
      top: Math.floor(h * 0.0),
      width: Math.floor(w * 0.28),
      height: Math.floor(h * 0.24)
    },
    {
      slug: 'oil-change-dubai',
      left: Math.floor(w * 0.48),
      top: Math.floor(h * 0.0),
      width: Math.floor(w * 0.24),
      height: Math.floor(h * 0.24)
    },
    {
      slug: 'electrical-diagnostics-dubai',
      left: Math.floor(w * 0.74),
      top: Math.floor(h * 0.0),
      width: Math.floor(w * 0.26),
      height: Math.floor(h * 0.24)
    },

    // Row 2 - approximately 25-50% of image
    {
      slug: 'engine-repair-dubai',
      left: Math.floor(w * 0.0),
      top: Math.floor(h * 0.22),
      width: Math.floor(w * 0.26),
      height: Math.floor(h * 0.26)
    },
    {
      slug: 'transmission-repair-dubai',
      left: Math.floor(w * 0.24),
      top: Math.floor(h * 0.24),
      width: Math.floor(w * 0.24),
      height: Math.floor(h * 0.26)
    },
    {
      slug: 'brake-service-dubai',
      left: Math.floor(w * 0.72),
      top: Math.floor(h * 0.22),
      width: Math.floor(w * 0.28),
      height: Math.floor(h * 0.28)
    },

    // Row 3 - approximately 50-75% of image
    {
      slug: 'suspension-repair-dubai',
      left: Math.floor(w * 0.0),
      top: Math.floor(h * 0.48),
      width: Math.floor(w * 0.20),
      height: Math.floor(h * 0.26)
    },
    {
      slug: 'battery-replacement-dubai',
      left: Math.floor(w * 0.52),
      top: Math.floor(h * 0.48),
      width: Math.floor(w * 0.24),
      height: Math.floor(h * 0.26)
    },
    {
      slug: 'tyre-replacement-dubai',
      left: Math.floor(w * 0.76),
      top: Math.floor(h * 0.48),
      width: Math.floor(w * 0.24),
      height: Math.floor(h * 0.26)
    },

    // Row 4 - approximately 75-100% of image
    {
      slug: 'pre-purchase-inspection-dubai',
      left: Math.floor(w * 0.0),
      top: Math.floor(h * 0.74),
      width: Math.floor(w * 0.26),
      height: Math.floor(h * 0.26)
    },
    {
      slug: 'timing-belt-dubai',
      left: Math.floor(w * 0.50),
      top: Math.floor(h * 0.74),
      width: Math.floor(w * 0.26),
      height: Math.floor(h * 0.26)
    },
    {
      slug: 'vehicle-inspection-dubai',
      left: Math.floor(w * 0.78),
      top: Math.floor(h * 0.74),
      width: Math.floor(w * 0.22),
      height: Math.floor(h * 0.26)
    },
  ];

  // Create output directory
  const fs = await import('fs');
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  }

  // Extract each service image
  for (const service of serviceMap) {
    const outputPath = path.join(outputDir, `${service.slug}.webp`);

    await sharp(sourceImage)
      .extract({
        left: service.left,
        top: service.top,
        width: service.width,
        height: service.height
      })
      .resize(400, 400, {
        fit: 'contain',
        background: { r: 255, g: 255, b: 255, alpha: 1 }
      })
      .webp({ quality: 90 })
      .toFile(outputPath);

    console.log(`✓ Extracted: ${service.slug}.webp (${service.width}x${service.height} from ${service.left},${service.top})`);
  }

  console.log('\nAll service images extracted successfully!');
}

extractServiceImages().catch(console.error);
