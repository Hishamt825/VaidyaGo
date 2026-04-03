const fs = require('fs');
const path = require('path');
const rootDir = __dirname;
const srcDir = path.join(rootDir, 'src');

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

walkSync(srcDir, (filePath) => {
    if (filePath.endsWith('.jsx') || filePath.endsWith('.js')) {
        let content = fs.readFileSync(filePath, 'utf8');
        let originalContent = content;

        // Fix nested quotes: "url("/assets/xyz.jpg")" -> "url('/assets/xyz.jpg')"
        content = content.replace(/"url\("(\/assets\/[^"]+)"\)"/g, '"url(\'$1\')"');

        // Test on Hero.jsx line 75: `backgroundImage: "url("/assets/hero2.jpg")"`
        // Also fix cases where there are spaces or different quotes

        if (content !== originalContent) {
            fs.writeFileSync(filePath, content, 'utf8');
            console.log(`Fixed quotes in ${path.relative(rootDir, filePath)}`);
        }

        // Also let's re-run regex for url('...') that we might have missed because they were already single quotes:
        // If the original was url('name.png'), the older script replace regex:
        // /url\(["']?\/?(?!(?:assets\/))([^/"']+\.(png|jpg|jpeg|svg|gif|webp))["']?\)/gi, 'url("/assets/$1")'
        // This replaced url('hero.jpg') with url("/assets/hero.jpg")
        // If it was inside backgroundImage: "url('hero.jpg')", it became backgroundImage: "url("/assets/hero.jpg")"
        // Which is what we just fixed above. So it should be fine.
    }
});
