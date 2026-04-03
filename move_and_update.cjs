const fs = require('fs');
const path = require('path');

const rootDir = __dirname;
const publicAssetsDir = path.join(rootDir, 'public', 'assets');

if (!fs.existsSync(publicAssetsDir)) {
    fs.mkdirSync(publicAssetsDir, { recursive: true });
}

// 1. Move images to public/assets
const extensions = ['.png', '.jpg', '.jpeg', '.svg', '.gif', '.webp'];
const filesInRoot = fs.readdirSync(rootDir);
let movedCount = 0;
for (const file of filesInRoot) {
    const ext = path.extname(file).toLowerCase();
    if (extensions.includes(ext) && file !== 'hero2.jpg') {
        // Wait, hero2.jpg was in the regex error but let's just move everything
        const oldPath = path.join(rootDir, file);
        const newPath = path.join(publicAssetsDir, file);
        try {
            fs.renameSync(oldPath, newPath);
            movedCount++;
        } catch (e) {
            console.error(`Failed to move ${file}: ${e.message}`);
        }
    } else if (file === 'hero2.jpg') {
        const oldPath = path.join(rootDir, file);
        const newPath = path.join(publicAssetsDir, file);
        try {
            fs.renameSync(oldPath, newPath);
            movedCount++;
        } catch (e) { }
    }
}
console.log(`Moved ${movedCount} images to public/assets`);

// 2. Find and replace in src directory
function walkSync(currentDirPath, callback) {
    fs.readdirSync(currentDirPath).forEach((name) => {
        const filePath = path.join(currentDirPath, name);
        const stat = fs.statSync(filePath);
        if (stat.isFile()) {
            callback(filePath, stat);
        } else if (stat.isDirectory()) {
            walkSync(filePath, callback);
        }
    });
}

const srcDir = path.join(rootDir, 'src');
let updatedFiles = 0;
walkSync(srcDir, (filePath) => {
    if (filePath.endsWith('.jsx') || filePath.endsWith('.js') || filePath.endsWith('.css')) {
        let content = fs.readFileSync(filePath, 'utf8');
        let originalContent = content;

        // Replace src="/image.png" or src="image.png" -> src="/assets/image.png"
        // The negative lookahead prevents renaming something like /assets/assets/
        const srcRegex = /(src|href|img)=["']\/?(?!(?:assets\/))([^/"']+\.(png|jpg|jpeg|svg|gif|webp))["']/gi;
        content = content.replace(srcRegex, '$1="/assets/$2"');

        // Handle string literal backgrounds: style={{ backgroundImage: "url('/hero2.jpg')" }}
        const urlRegex = /url\(["']?\/?(?!(?:assets\/))([^/"']+\.(png|jpg|jpeg|svg|gif|webp))["']?\)/gi;
        content = content.replace(urlRegex, 'url("/assets/$1")');

        if (content !== originalContent) {
            fs.writeFileSync(filePath, content, 'utf8');
            updatedFiles++;
            console.log(`Updated ${path.relative(rootDir, filePath)}`);
        }
    }
});

console.log(`Updated ${updatedFiles} files.`);
console.log('Done!');
