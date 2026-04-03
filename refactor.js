const fs = require('fs');
const path = require('path');

const rootDir = __dirname;
const srcDir = path.join(rootDir, 'src');
const assetsDir = path.join(srcDir, 'assets');

// Ensure assets directory exists
if (!fs.existsSync(assetsDir)) {
    fs.mkdirSync(assetsDir, { recursive: true });
}

// Image extensions
const extensions = ['.png', '.jpg', '.jpeg', '.svg', '.gif', '.webp'];

// 1. Move all images from root to src/assets
const filesInRoot = fs.readdirSync(rootDir);
const movedImages = [];
for (const file of filesInRoot) {
    const ext = path.extname(file).toLowerCase();
    if (extensions.includes(ext)) {
        const oldPath = path.join(rootDir, file);
        const newPath = path.join(assetsDir, file);
        fs.renameSync(oldPath, newPath);
        movedImages.push(file);
        console.log(`Moved ${file} to src/assets`);
    }
}

// Walk function to get all files
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

// 2. Scan all .jsx or .js files in src and update references
// Since adding imports via AST is complex, we will add them manually by rewriting the file
walkSync(srcDir, (filePath) => {
    if (filePath.endsWith('.jsx') || (filePath.endsWith('.js') && !filePath.includes('vite.config.js') && !filePath.includes('tailwind.config.js') && !filePath.includes('postcss.config.js'))) {
        let content = fs.readFileSync(filePath, 'utf8');
        let originalContent = content;

        // We will find all src="/imagename.ext" or src="imagename.ext" and replace with import.
        // Instead of doing multiple imports, we can use Vite's new URL feature or just create a simple string replacement.
        // Better yet: Vite allows URL construction: new URL('../../assets/image.png', import.meta.url).href
        // To construct the relative path to assets:
        let relPathToAssets = path.relative(path.dirname(filePath), assetsDir).replace(/\\/g, '/');
        if (!relPathToAssets.startsWith('.')) {
            relPathToAssets = './' + relPathToAssets;
        }

        // Replace src="/image.png" -> src={new URL('relPath/image.png', import.meta.url).href}
        // and url('/image.png') -> url('${new URL('relPath/image.png', import.meta.url).href}')  (Wait, css url() doesn't work like this)
        // Actually, simple imports:
        let importsToAdd = new Set();

        // Find img src="/xyz.png"
        const srcRegex = /src=["']\/?([^/"']+\.(png|jpg|jpeg|svg|gif|webp))["']/gi;
        content = content.replace(srcRegex, (match, filename) => {
            // Find a safe variable name
            const varName = 'img_' + filename.replace(/[^a-zA-Z0-9]/g, '_');
            importsToAdd.add(`import ${varName} from '${relPathToAssets}/${filename}';`);
            return `src={${varName}}`;
        });

        // Find style url('/xyz.png') 
        const urlRegex = /url\(["']?\/?([^/"']+\.(png|jpg|jpeg|svg|gif|webp))["']?\)/gi;
        content = content.replace(urlRegex, (match, filename) => {
            const varName = 'img_' + filename.replace(/[^a-zA-Z0-9]/g, '_');
            importsToAdd.add(`import ${varName} from '${relPathToAssets}/${filename}';`);
            // If it's in a style object we strings should be concatenated.
            // Let's assume style={{ backgroundImage: `url(${varName})` }}
            // This script replaces url('/hero2.jpg') with url(${img_hero2_jpg}), if it's already in a template literal it works, if it's in a string it might break. 
            // A safer way is to check if it's inside style={{...}}
            // But this regex is too risky for url(). Let's handle it manually or just do it.
            return `url(\${${varName}})`;
        });

        if (importsToAdd.size > 0 && content !== originalContent) {
            // Fix url() inside string literals vs template literals
            // If content has url(${varName}), we need to ensure it's in a template literal.
            // E.g. style={{ backgroundImage: "url('/hero2.jpg')" }}
            // we replaced it with style={{ backgroundImage: "url(${img_hero2_jpg})" }} -> THIS IS INVALID JSX.
            // So we need to fix it: "url(${...})" -> \`url(\${...})\`
            content = content.replace(/["']url\(\$\{([^}]+)\}\)["']/g, '\`url(\${$1})\`');

            // Add imports after the last import statement, or at the top
            const importArray = Array.from(importsToAdd).join('\n');

            // Find last import
            const lastImportIndex = content.lastIndexOf('import ');
            if (lastImportIndex !== -1) {
                const endOfLastImport = content.indexOf('\n', lastImportIndex);
                content = content.slice(0, endOfLastImport + 1) + importArray + '\n' + content.slice(endOfLastImport + 1);
            } else {
                content = importArray + '\n' + content;
            }

            fs.writeFileSync(filePath, content, 'utf8');
            console.log(`Updated ${filePath}`);
        }
    }
});
console.log('Refactoring complete.');
