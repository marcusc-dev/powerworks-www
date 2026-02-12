/**
 * Blog Image Generator
 *
 * Generates AI images for blog posts using Google Vertex AI Imagen 4 Ultra.
 * Optimizes images to ~200KB with Sharp and saves to public/blog/.
 *
 * Usage:
 *   npx tsx scripts/generate-blog-images.ts              # All posts needing images
 *   npx tsx scripts/generate-blog-images.ts --slug NAME   # Single post by slug
 *   npx tsx scripts/generate-blog-images.ts --batch 3     # Specific batch only
 */

import { GoogleGenAI } from '@google/genai';
import sharp from 'sharp';
import * as fs from 'fs';
import * as path from 'path';

// --- Configuration ---
const GOOGLE_PROJECT_ID = 'visit-network-cms';
const GOOGLE_LOCATION = 'us-central1';
const CREDENTIALS_PATH = 'C:/dev/vnetwork-frontend/gcloud-service-account.json';
const MODEL = 'imagen-4.0-ultra-generate-001';
const OUTPUT_DIR = path.resolve(__dirname, '../public/blog');
const TARGET_SIZE_KB = 200;
const ASPECT_RATIO = '4:3';

// --- Optimization strategies ---
const OPTIMIZATION_STRATEGIES = [
  { width: 1200, quality: 80 },
  { width: 1200, quality: 75 },
  { width: 1200, quality: 70 },
  { width: 1000, quality: 70 },
  { width: 1000, quality: 65 },
  { width: 800, quality: 65 },
  { width: 800, quality: 60 },
  { width: 700, quality: 55 },
];

// --- Blog post image prompts ---
interface BlogImageConfig {
  slug: string;
  prompt: string;
}

const BLOG_IMAGE_CONFIGS: BlogImageConfig[] = [
  // Batch 1
  {
    slug: 'car-service-cost-dubai-2026',
    prompt: 'Single photograph, unified composition, one continuous image. Professional automotive workshop interior in Dubai, a skilled technician in clean uniform performing an oil change on a modern SUV raised on a hydraulic lift, organized tool wall visible in background, bright LED workshop lighting, clean professional environment, warm tones, shot from slightly low angle showing the scale of the workshop, professional automotive photography, natural lighting supplemented by workshop LEDs, editorial magazine quality, 8K resolution, sharp focus, photorealistic. NO collage, NO multiple images, NO split frames, NO photo grid, NO composite, NO text, NO words, NO watermarks',
  },
  {
    slug: 'car-battery-replacement-cost-dubai',
    prompt: 'Single photograph, unified composition, one continuous image. Close-up of a professional mechanic testing a car battery with a digital multimeter in a modern Dubai garage, the battery terminals clearly visible, technician wearing clean gloves, diagnostic equipment in soft focus background, engine bay partially visible, warm workshop lighting with subtle blue tones from the digital display, professional automotive photography, editorial quality, 8K resolution, sharp focus, photorealistic. NO collage, NO multiple images, NO split frames, NO photo grid, NO composite, NO text, NO words, NO watermarks',
  },
  {
    slug: 'check-car-accident-history-uae',
    prompt: 'Single photograph, unified composition, one continuous image. Professional pre-purchase car inspection scene, a mechanic with a clipboard carefully examining the body panel alignment of a white sedan in a well-lit inspection bay, using a paint thickness gauge, the car elevated slightly, detailed inspection in progress, clean organized workshop environment, professional automotive photography, natural lighting, editorial quality, 8K resolution, sharp focus, photorealistic. NO collage, NO multiple images, NO split frames, NO photo grid, NO composite, NO text, NO words, NO watermarks',
  },
  {
    slug: 'car-repair-cost-dubai-average',
    prompt: 'Single photograph, unified composition, one continuous image. Wide shot of a busy professional car repair workshop in Dubai with multiple service bays, one car on a lift with wheels removed for brake work, another having its engine bay serviced, organized tools and equipment, professional technicians at work, clean well-maintained facility, bright overhead lighting, professional automotive photography, editorial quality, 8K resolution, sharp focus, photorealistic. NO collage, NO multiple images, NO split frames, NO photo grid, NO composite, NO text, NO words, NO watermarks',
  },
  {
    slug: 'tyres-cost-dubai-price-guide',
    prompt: 'Single photograph, unified composition, one continuous image. Professional tyre fitting scene, a technician balancing a new premium tyre on a modern wheel balancing machine, stack of new tyres visible in the background, the rubber tread pattern crisp and detailed, workshop environment with tyre fitting equipment, warm lighting, shot at eye level showing the precision of the work, professional automotive photography, editorial quality, 8K resolution, sharp focus, photorealistic. NO collage, NO multiple images, NO split frames, NO photo grid, NO composite, NO text, NO words, NO watermarks',
  },
  // Batch 2
  {
    slug: 'how-to-jump-start-car',
    prompt: 'Single photograph, unified composition, one continuous image. Close-up of red and black jump start cables connected to a car battery in an engine bay, morning light, the cables clearly showing proper positive-to-positive connection, another car visible in the background providing the boost, residential parking area with hints of Dubai architecture, practical real-world scene, professional automotive photography, natural golden morning light, editorial quality, 8K resolution, sharp focus, photorealistic. NO collage, NO multiple images, NO split frames, NO photo grid, NO composite, NO text, NO words, NO watermarks',
  },
  {
    slug: 'car-ac-repair-cost-dubai-guide',
    prompt: 'Single photograph, unified composition, one continuous image. Professional AC system diagnosis, a technician connecting refrigerant pressure gauges to a car AC system, the blue and red gauge dials visible and in focus, car bonnet open, AC compressor and hoses visible in the engine bay, cool blue tones contrasting with warm workshop environment, Dubai summer light visible through workshop entrance, professional automotive photography, editorial quality, 8K resolution, sharp focus, photorealistic. NO collage, NO multiple images, NO split frames, NO photo grid, NO composite, NO text, NO words, NO watermarks',
  },
  {
    slug: 'complete-car-service-checklist',
    prompt: 'Single photograph, unified composition, one continuous image. Overhead flat-lay style photograph of a car service in progress, organized array of new oil filter, air filter, brake fluid, coolant bottle, and spark plugs laid out neatly on a clean workbench next to a digital inspection tablet, professional workshop environment, bright clean lighting, the parts arranged methodically suggesting thoroughness and organization, professional automotive photography, editorial quality, 8K resolution, sharp focus, photorealistic. NO collage, NO multiple images, NO split frames, NO photo grid, NO composite, NO text, NO words, NO watermarks',
  },
  {
    slug: 'car-valuation-uae-guide',
    prompt: 'Single photograph, unified composition, one continuous image. A professional mechanic conducting a thorough vehicle inspection on a luxury sedan, checking underneath the car on a lift with a bright inspection lamp, the car is clean and presentable suggesting a pre-sale valuation scenario, modern workshop with professional equipment visible, warm lighting, professional automotive photography, editorial quality, 8K resolution, sharp focus, photorealistic. NO collage, NO multiple images, NO split frames, NO photo grid, NO composite, NO text, NO words, NO watermarks',
  },
  {
    slug: 'car-maintenance-schedule-mileage',
    prompt: 'Single photograph, unified composition, one continuous image. A modern car dashboard showing the digital odometer and service indicator, the interior is clean and well-maintained, soft natural light coming through the windshield, shallow depth of field focusing on the instrument cluster, hints of Dubai skyline visible through the windshield in soft bokeh, professional automotive interior photography, editorial quality, 8K resolution, sharp focus, photorealistic. NO collage, NO multiple images, NO split frames, NO photo grid, NO composite, NO text, NO words, NO watermarks',
  },
  // Batch 3
  {
    slug: 'abs-warning-light-meaning',
    prompt: 'Single photograph, unified composition, one continuous image. Close-up of a car dashboard with an illuminated ABS warning light glowing amber, other dashboard instruments visible in soft focus, the interior is modern and clean, dramatic lighting with the warning light as the focal point glowing against the darker dashboard, shallow depth of field, professional automotive photography, moody atmospheric lighting, editorial quality, 8K resolution, sharp focus, photorealistic. NO collage, NO multiple images, NO split frames, NO photo grid, NO composite, NO text, NO words, NO watermarks',
  },
  {
    slug: 'car-breakdown-dubai-what-to-do',
    prompt: 'Single photograph, unified composition, one continuous image. A car stopped on the hard shoulder of a wide Dubai highway at sunset, hazard warning triangle placed behind the vehicle, the car bonnet is raised, warm orange sunset light illuminating the scene, Dubai city skyline visible in the distance, the road stretching into the horizon, a sense of isolation but safety, professional automotive photography, golden hour natural lighting, editorial quality, 8K resolution, sharp focus, photorealistic. NO collage, NO multiple images, NO split frames, NO photo grid, NO composite, NO text, NO words, NO watermarks',
  },
  {
    slug: 'car-recovery-dubai-cost',
    prompt: 'Single photograph, unified composition, one continuous image. A professional yellow flatbed recovery truck loading a sedan using its hydraulic ramp on a Dubai street, the flatbed tilted at an angle with the car partway up, modern Dubai buildings in the background, daytime with bright clear sky, the recovery operator guiding the process, professional and organized operation, professional automotive photography, natural daylight, editorial quality, 8K resolution, sharp focus, photorealistic. NO collage, NO multiple images, NO split frames, NO photo grid, NO composite, NO text, NO words, NO watermarks',
  },
  {
    slug: 'check-engine-light-causes',
    prompt: 'Single photograph, unified composition, one continuous image. A professional diagnostic scanner plugged into a car OBD port under the dashboard, the scanner screen showing diagnostic data, a technician hand holding the device, the car interior visible with the check engine light illuminated on the dashboard in the background bokeh, mix of ambient and focused task lighting, professional automotive photography, editorial quality, 8K resolution, sharp focus, photorealistic. NO collage, NO multiple images, NO split frames, NO photo grid, NO composite, NO text, NO words, NO watermarks',
  },
  {
    slug: 'dashboard-warning-lights-meaning',
    prompt: 'Single photograph, unified composition, one continuous image. Modern car dashboard instrument cluster with multiple warning lights illuminated in different colors including red oil pressure, amber check engine, blue temperature, and green indicators, the dashboard is sleek and modern, photographed from the driver perspective, dramatic dark interior with the glowing lights as focal points, professional automotive photography, atmospheric lighting, editorial quality, 8K resolution, sharp focus, photorealistic. NO collage, NO multiple images, NO split frames, NO photo grid, NO composite, NO text, NO words, NO watermarks',
  },
  // Batch 4
  {
    slug: 'wheel-alignment-matters-dubai',
    prompt: 'Single photograph, unified composition, one continuous image. A car positioned on a modern 3D four-wheel alignment machine in a professional workshop, laser alignment sensors attached to all four wheels with red laser lines visible, the alignment computer screen showing readings in the background, professional clean workshop environment, the precision of the equipment evident, professional automotive photography, bright workshop lighting, editorial quality, 8K resolution, sharp focus, photorealistic. NO collage, NO multiple images, NO split frames, NO photo grid, NO composite, NO text, NO words, NO watermarks',
  },
  {
    slug: 'dealer-vs-independent-garage-dubai',
    prompt: 'Single photograph, unified composition, one continuous image. An experienced mechanic in a clean independent workshop consulting with a customer over an engine bay, pointing to a component while explaining, the workshop is professional but personal with tools organized on the wall, a European luxury car (BMW or Mercedes style) on the lift behind them, warm and welcoming atmosphere, trust and expertise conveyed through body language, professional automotive photography, natural and workshop lighting, editorial quality, 8K resolution, sharp focus, photorealistic. NO collage, NO multiple images, NO split frames, NO photo grid, NO composite, NO text, NO words, NO watermarks',
  },
  {
    slug: 'chinese-cars-uae-reliability',
    prompt: 'Single photograph, unified composition, one continuous image. A row of modern Chinese-brand SUVs in a Dubai car showroom, sleek contemporary vehicles in white and grey colors, the showroom is modern with floor-to-ceiling windows showing Dubai cityscape outside, polished floor reflecting the cars, clean minimalist showroom design, professional automotive photography, bright showroom lighting with natural light from windows, editorial quality, 8K resolution, sharp focus, photorealistic. NO collage, NO multiple images, NO split frames, NO photo grid, NO composite, NO text, NO words, NO watermarks',
  },
  {
    slug: 'gcc-spec-vs-non-gcc',
    prompt: 'Single photograph, unified composition, one continuous image. Under-bonnet shot of a car engine bay showing the cooling system components, a larger upgraded radiator and oil cooler visible, clean engine bay with professional-grade components, the mechanic pointing at the cooling system modifications, well-lit workshop environment, focus on the engineering details that differentiate GCC-spec vehicles, professional automotive photography, bright directional lighting, editorial quality, 8K resolution, sharp focus, photorealistic. NO collage, NO multiple images, NO split frames, NO photo grid, NO composite, NO text, NO words, NO watermarks',
  },
  {
    slug: 'preventive-maintenance-saves-thousands',
    prompt: 'Single photograph, unified composition, one continuous image. A mechanic performing a thorough multi-point inspection on a car, using a checklist on a tablet while inspecting the underside of a vehicle on a lift, organized clean workshop with professional tools visible, the scene conveys thoroughness and preventive care, warm workshop lighting, oil change equipment and filters visible on a nearby trolley, professional automotive photography, natural and LED lighting, editorial quality, 8K resolution, sharp focus, photorealistic. NO collage, NO multiple images, NO split frames, NO photo grid, NO composite, NO text, NO words, NO watermarks',
  },
];

// --- Core functions ---

async function initGenAI(): Promise<GoogleGenAI> {
  // Set credentials environment variable
  process.env.GOOGLE_APPLICATION_CREDENTIALS = CREDENTIALS_PATH;

  if (!fs.existsSync(CREDENTIALS_PATH)) {
    throw new Error(`Google Cloud credentials not found at: ${CREDENTIALS_PATH}`);
  }

  return new GoogleGenAI({
    vertexai: true,
    project: GOOGLE_PROJECT_ID,
    location: GOOGLE_LOCATION,
  });
}

async function generateImage(genai: GoogleGenAI, prompt: string): Promise<Buffer> {
  const response = await genai.models.generateImages({
    model: MODEL,
    prompt: prompt,
    config: {
      numberOfImages: 1,
      aspectRatio: ASPECT_RATIO,
    },
  });

  if (!response.generatedImages || response.generatedImages.length === 0) {
    throw new Error('No images generated - empty response from Imagen API');
  }

  const imageBytes = response.generatedImages[0].image?.imageBytes;
  if (!imageBytes) {
    throw new Error('Missing image data in response');
  }

  return Buffer.from(imageBytes, 'base64');
}

async function optimizeImage(rawBuffer: Buffer): Promise<{ buffer: Buffer; sizeKB: number; strategy: string }> {
  const targetSizeBytes = TARGET_SIZE_KB * 1024;

  for (const strategy of OPTIMIZATION_STRATEGIES) {
    const optimized = await sharp(rawBuffer)
      .resize(strategy.width, null, { fit: 'inside', withoutEnlargement: true })
      .jpeg({
        quality: strategy.quality,
        progressive: true,
        mozjpeg: true,
        chromaSubsampling: '4:2:0',
      })
      .toBuffer();

    if (optimized.length <= targetSizeBytes) {
      return {
        buffer: optimized,
        sizeKB: Math.round(optimized.length / 1024),
        strategy: `${strategy.width}px @ ${strategy.quality}%`,
      };
    }
  }

  // Fallback: use smallest strategy
  const last = OPTIMIZATION_STRATEGIES[OPTIMIZATION_STRATEGIES.length - 1];
  const optimized = await sharp(rawBuffer)
    .resize(last.width, null, { fit: 'inside', withoutEnlargement: true })
    .jpeg({
      quality: last.quality,
      progressive: true,
      mozjpeg: true,
      chromaSubsampling: '4:2:0',
    })
    .toBuffer();

  return {
    buffer: optimized,
    sizeKB: Math.round(optimized.length / 1024),
    strategy: `${last.width}px @ ${last.quality}% (best effort)`,
  };
}

async function processPost(genai: GoogleGenAI, config: BlogImageConfig, index: number, total: number): Promise<void> {
  const outputPath = path.join(OUTPUT_DIR, `${config.slug}.jpg`);

  // Skip if already generated
  if (fs.existsSync(outputPath)) {
    const stats = fs.statSync(outputPath);
    if (stats.size > 10000) { // >10KB means it's a real image
      console.log(`  [${index + 1}/${total}] SKIP ${config.slug} (already exists, ${Math.round(stats.size / 1024)}KB)`);
      return;
    }
  }

  console.log(`  [${index + 1}/${total}] Generating: ${config.slug}`);

  // Generate
  const rawBuffer = await generateImage(genai, config.prompt);
  console.log(`    Raw: ${Math.round(rawBuffer.length / 1024)}KB`);

  // Optimize
  const result = await optimizeImage(rawBuffer);
  console.log(`    Optimized: ${result.sizeKB}KB (${result.strategy})`);

  // Save
  fs.writeFileSync(outputPath, result.buffer);
  console.log(`    Saved: ${outputPath}`);
}

// --- Main ---

async function main() {
  console.log('\n=== Blog Image Generator ===\n');
  console.log(`Model: ${MODEL}`);
  console.log(`Output: ${OUTPUT_DIR}`);
  console.log(`Target: ~${TARGET_SIZE_KB}KB per image\n`);

  // Ensure output directory exists
  if (!fs.existsSync(OUTPUT_DIR)) {
    fs.mkdirSync(OUTPUT_DIR, { recursive: true });
    console.log(`Created output directory: ${OUTPUT_DIR}\n`);
  }

  // Parse CLI args
  const args = process.argv.slice(2);
  let configs = BLOG_IMAGE_CONFIGS;

  const slugIndex = args.indexOf('--slug');
  if (slugIndex !== -1 && args[slugIndex + 1]) {
    const targetSlug = args[slugIndex + 1];
    configs = configs.filter(c => c.slug === targetSlug);
    if (configs.length === 0) {
      console.error(`No config found for slug: ${targetSlug}`);
      process.exit(1);
    }
  }

  const batchIndex = args.indexOf('--batch');
  if (batchIndex !== -1 && args[batchIndex + 1]) {
    const batchNum = parseInt(args[batchIndex + 1]);
    const start = (batchNum - 1) * 5;
    configs = BLOG_IMAGE_CONFIGS.slice(start, start + 5);
    console.log(`Batch ${batchNum}: Processing ${configs.length} images\n`);
  }

  // Initialize
  const genai = await initGenAI();
  console.log('Google Cloud credentials loaded\n');

  // Process each post
  let success = 0;
  let failed = 0;
  let skipped = 0;

  for (let i = 0; i < configs.length; i++) {
    try {
      const outputPath = path.join(OUTPUT_DIR, `${configs[i].slug}.jpg`);
      if (fs.existsSync(outputPath) && fs.statSync(outputPath).size > 10000) {
        skipped++;
        console.log(`  [${i + 1}/${configs.length}] SKIP ${configs[i].slug} (exists)`);
        continue;
      }

      await processPost(genai, configs[i], i, configs.length);
      success++;

      // Rate limit: 1 second between requests
      if (i < configs.length - 1) {
        await new Promise(resolve => setTimeout(resolve, 1000));
      }
    } catch (error: any) {
      failed++;
      console.error(`  [${i + 1}/${configs.length}] FAILED ${configs[i].slug}: ${error.message}`);

      // If safety filter, retry with simplified prompt
      if (error.message.includes('blocked') || error.message.includes('safety')) {
        console.log('    Retrying with simplified prompt...');
        try {
          const simplePrompt = `Single photograph. Professional car workshop interior, automotive service scene, clean modern garage environment, bright lighting, professional photography, 8K, photorealistic. NO collage, NO text, NO watermarks`;
          const rawBuffer = await generateImage(genai, simplePrompt);
          const result = await optimizeImage(rawBuffer);
          const outputPath = path.join(OUTPUT_DIR, `${configs[i].slug}.jpg`);
          fs.writeFileSync(outputPath, result.buffer);
          console.log(`    Retry succeeded: ${result.sizeKB}KB`);
          success++;
          failed--;
        } catch (retryError: any) {
          console.error(`    Retry also failed: ${retryError.message}`);
        }
      }
    }
  }

  console.log(`\n=== Complete ===`);
  console.log(`  Success: ${success}`);
  console.log(`  Skipped: ${skipped}`);
  console.log(`  Failed:  ${failed}`);
  console.log(`  Total:   ${configs.length}\n`);
}

main().catch((error) => {
  console.error('\nFatal error:', error.message);
  process.exit(1);
});
