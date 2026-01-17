/**
 * Image Optimization Script
 * Compresses PNG images and converts to WebP for better performance
 * Run: node scripts/optimize-images.mjs
 */

import sharp from 'sharp';
import * as fs from 'fs';
import * as path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const PUBLIC_DIR = path.join(__dirname, '..', 'client', 'public');

// Images to optimize with their target sizes
const IMAGES_TO_OPTIMIZE = [
    { name: 'hero-bg.png', maxWidth: 1200, quality: 80 },
    { name: 'soil-satellite.png', maxWidth: 800, quality: 75 },
    { name: 'cover-photo.png', maxWidth: 1200, quality: 80 },
    { name: 'disease-detector.png', maxWidth: 600, quality: 80 },
    { name: 'fertilizer-calculator.png', maxWidth: 600, quality: 80 },
    { name: 'logo.png', maxWidth: 512, quality: 90 },
];

async function optimizeImage(imageName, maxWidth, quality) {
    const inputPath = path.join(PUBLIC_DIR, imageName);
    const outputPath = path.join(PUBLIC_DIR, imageName.replace('.png', '-optimized.png'));
    const webpPath = path.join(PUBLIC_DIR, imageName.replace('.png', '.webp'));

    if (!fs.existsSync(inputPath)) {
        console.log(`Skipping ${imageName} - file not found`);
        return;
    }

    const originalSize = fs.statSync(inputPath).size;

    try {
        // Optimize PNG
        await sharp(inputPath)
            .resize(maxWidth, null, { withoutEnlargement: true })
            .png({ quality, compressionLevel: 9 })
            .toFile(outputPath);

        // Create WebP version
        await sharp(inputPath)
            .resize(maxWidth, null, { withoutEnlargement: true })
            .webp({ quality })
            .toFile(webpPath);

        const optimizedSize = fs.statSync(outputPath).size;
        const webpSize = fs.statSync(webpPath).size;

        const savings = ((originalSize - optimizedSize) / originalSize * 100).toFixed(1);
        const webpSavings = ((originalSize - webpSize) / originalSize * 100).toFixed(1);

        console.log(`✅ ${imageName}:`);
        console.log(`   Original: ${(originalSize / 1024).toFixed(1)} KB`);
        console.log(`   Optimized PNG: ${(optimizedSize / 1024).toFixed(1)} KB (${savings}% smaller)`);
        console.log(`   WebP: ${(webpSize / 1024).toFixed(1)} KB (${webpSavings}% smaller)`);

        // Replace original with optimized
        fs.renameSync(outputPath, inputPath);

    } catch (error) {
        console.error(`❌ Error optimizing ${imageName}:`, error);
    }
}

async function main() {
    console.log('🚀 Starting image optimization...\n');

    for (const img of IMAGES_TO_OPTIMIZE) {
        await optimizeImage(img.name, img.maxWidth, img.quality);
    }

    console.log('\n✅ Image optimization complete!');
    console.log('WebP versions created for modern browsers.');
}

main().catch(console.error);
