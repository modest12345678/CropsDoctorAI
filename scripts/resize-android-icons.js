const sharp = require('sharp');
const path = require('path');
const fs = require('fs');

const resDir = path.join(__dirname, 'android/app/src/main/res');
const sourceIcon = path.join(resDir, 'mipmap-xxxhdpi/ic_launcher.png');

const sizes = {
    'mipmap-mdpi': 48,
    'mipmap-hdpi': 72,
    'mipmap-xhdpi': 96,
    'mipmap-xxhdpi': 144,
    'mipmap-xxxhdpi': 192
};

const iconTypes = ['ic_launcher.png', 'ic_launcher_round.png', 'ic_launcher_foreground.png'];

async function resizeIcons() {
    console.log('Resizing launcher icons...');

    for (const [folder, size] of Object.entries(sizes)) {
        const folderPath = path.join(resDir, folder);

        for (const iconType of iconTypes) {
            const outputPath = path.join(folderPath, iconType);

            try {
                await sharp(sourceIcon)
                    .resize(size, size)
                    .png()
                    .toFile(outputPath + '.tmp');

                // Replace original with resized
                fs.unlinkSync(outputPath);
                fs.renameSync(outputPath + '.tmp', outputPath);

                console.log(`✓ ${folder}/${iconType} -> ${size}x${size}`);
            } catch (err) {
                console.error(`✗ ${folder}/${iconType}: ${err.message}`);
            }
        }
    }

    console.log('Done!');
}

resizeIcons();
