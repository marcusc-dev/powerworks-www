---
name: create-image
description: Generate AI images using Google Vertex AI Imagen 4 Ultra. Creates photorealistic images from prompts, optimizes them with Sharp to ~200KB, and saves to the public/blog/ directory for use as article featured images.
---

# Create Image Skill

Generates high-quality AI images using Google's Vertex AI Imagen 4 Ultra model, optimizes them for web, and saves them to the project's public directory.

## CRITICAL: Image Optimization Requirement

**ALL images MUST be optimized with Sharp before saving.**

Imagen outputs PNG files that are typically 1-3MB. Without optimization:
- Page load times will be severely impacted
- Mobile users will experience slow loading
- SEO scores will suffer

**Target size: ~200KB per image** (progressive JPEG with MozJPEG encoding)

## Prerequisites

### Google Cloud Credentials

This skill uses the shared Google Cloud credentials from the vnetwork-frontend project:

```
GOOGLE_CLOUD_PROJECT_ID=visit-network-cms
GOOGLE_CLOUD_LOCATION=us-central1
GOOGLE_APPLICATION_CREDENTIALS=C:/dev/vnetwork-frontend/gcloud-service-account.json
```

These are set in the generation script. The service account (`vncms-941@visit-network-cms.iam.gserviceaccount.com`) has the "Vertex AI User" role.

### NPM Dependencies

```bash
npm install @google/genai
# sharp is already included via Next.js
```

## Usage

### Standalone Script

Run the batch generation script for blog post images:

```bash
npx tsx scripts/generate-blog-images.ts
```

This generates images for all blog posts that use Unsplash placeholder URLs.

### Generate a Single Image

```bash
npx tsx scripts/generate-blog-images.ts --slug car-service-cost-dubai-2026
```

### Integration Pattern

When creating new blog posts, follow this workflow:

1. Write the blog post content in `lib/blog-posts/batch-N.ts`
2. Set the image field to a placeholder or empty string
3. Run the generation script targeting the new slugs
4. The script saves optimized images to `public/blog/[slug].jpg`
5. Update the image field to `/blog/[slug].jpg`

## How It Works

### Step 1: Prompt Generation

Each blog post gets a context-aware prompt based on its title, category, and excerpt. Prompts follow these rules:

- **Always start with**: `"Single photograph, unified composition, one continuous image."`
- **Subject**: Derived from article title and content - must be SPECIFIC to the article topic
- **Style**: Professional automotive/workshop photography, natural lighting, editorial quality
- **Anti-collage suffix**: `"NO collage, NO multiple images, NO split frames, NO text, NO words, NO watermarks"`

#### Automotive-Specific Prompt Guidelines

| Category | Image Focus |
|----------|-------------|
| Cost Guide | Close-up workshop scenes, technician hands at work, parts and tools |
| Maintenance | Clean workshop bays, organized tool walls, car on lift |
| Diagnostics | Diagnostic equipment screens, OBD scanner on dashboard, warning lights |
| Emergency | Roadside scenes, recovery trucks, hazard triangles, Dubai road context |
| Buying Guide | Car showrooms, pre-purchase inspections, car lots |
| Tyres & Suspension | Tyre fitting, alignment machines, wheel close-ups |
| Expert Advice | Workshop consultation, mechanic explaining to customer |
| Electrical | Battery testing, multimeter readings, engine bay wiring |
| AC & Cooling | AC compressor, refrigerant gauges, climate controls |

### Step 2: Image Generation

Uses Imagen 4 Ultra (`imagen-4.0-ultra-generate-001`) via the `@google/genai` SDK:

```typescript
import { GoogleGenAI } from '@google/genai';

const genai = new GoogleGenAI({
  vertexai: true,
  project: 'visit-network-cms',
  location: 'us-central1',
});

const response = await genai.models.generateImages({
  model: 'imagen-4.0-ultra-generate-001',
  prompt: prompt,
  config: {
    numberOfImages: 1,
    aspectRatio: '4:3',  // Landscape, optimal for featured images
  },
});

const imageBytes = response.generatedImages[0].image.imageBytes;
const imageBuffer = Buffer.from(imageBytes, 'base64');
```

### Step 3: Optimization

All images are optimized using Sharp with progressive quality reduction:

```typescript
import sharp from 'sharp';

const TARGET_SIZE_KB = 200;

const strategies = [
  { width: 1200, quality: 80 },
  { width: 1200, quality: 75 },
  { width: 1000, quality: 70 },
  { width: 1000, quality: 65 },
  { width: 800, quality: 65 },
  { width: 800, quality: 60 },
];

for (const strategy of strategies) {
  const optimized = await sharp(rawBuffer)
    .resize(strategy.width, null, { fit: 'inside', withoutEnlargement: true })
    .jpeg({
      quality: strategy.quality,
      progressive: true,
      mozjpeg: true,
      chromaSubsampling: '4:2:0',
    })
    .toBuffer();

  if (optimized.length <= TARGET_SIZE_KB * 1024) {
    return optimized;  // Target met
  }
}
```

### Step 4: Save to Public Directory

Optimized images are saved to `public/blog/[slug].jpg` and referenced in blog posts as `/blog/[slug].jpg`.

## Output

- **Location**: `public/blog/[slug].jpg`
- **Format**: Progressive JPEG (MozJPEG)
- **Target size**: ~200KB
- **Dimensions**: Up to 1200px wide (responsive)
- **Aspect ratio**: 4:3 (landscape)

## Error Handling

| Error | Cause | Fix |
|-------|-------|-----|
| Authentication failed | Missing or invalid credentials | Check GOOGLE_APPLICATION_CREDENTIALS path |
| Quota exceeded | Too many requests | Wait and retry, or check Google Cloud quota limits |
| Safety filter blocked | Prompt triggered content filter | Rephrase prompt to be less ambiguous |
| Permission denied | Service account lacks role | Add "Vertex AI User" role in Google Cloud IAM |

## Cost

~$0.04-0.08 per image with Imagen 4 Ultra. Generating 20 blog post images costs approximately $1-2.

## File Structure

```
public/
  blog/
    car-service-cost-dubai-2026.jpg
    car-battery-replacement-cost-dubai.jpg
    ... (one per blog post)
scripts/
  generate-blog-images.ts    # Batch generation script
.claude/
  skills/
    create-image/
      SKILL.md               # This file
```
